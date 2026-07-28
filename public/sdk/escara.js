/**
 * EscaraPay Checkout SDK v1.0
 * https://escarapay.in
 *
 * Usage:
 * <script src="https://escarapay.in/sdk/escara.js"
 *         data-seller-id="YOUR_SELLER_ID">
 * </script>
 *
 * What this does:
 * 1. Injects "Secured by EscaraPay" trust badge near checkout
 * 2. Detects COD order placement
 * 3. Sends order data to EscaraPay automatically
 */
(function () {
  "use strict";

  /* ── Config ── */
  const SELLER_ID   = (document.currentScript || {}).getAttribute("data-seller-id") || "";
  const ESCARA_API  = "https://escarapay-backend.onrender.com";
  const ESCARA_SITE = "https://escarapay.in";

  if (!SELLER_ID) {
    console.warn("[EscaraPay] ⚠️ data-seller-id missing on <script> tag. Badge will show but orders won't be tracked.");
  }

  /* ════════════════════════════════════
     BADGE INJECTION
  ════════════════════════════════════ */
  function injectBadge() {
    if (document.getElementById("escara-trust-badge")) return;

    const badge = document.createElement("div");
    badge.id = "escara-trust-badge";
    badge.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        gap: 12px;
        background: linear-gradient(135deg, #f0fdf4, #eff6ff);
        border: 1px solid #86efac;
        border-radius: 10px;
        padding: 12px 16px;
        margin: 14px 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
        box-shadow: 0 1px 4px rgba(0,0,0,.06);
      ">
        <div style="font-size:28px;flex-shrink:0;">🛡️</div>
        <div style="flex:1;">
          <div style="font-weight:700;font-size:13px;color:#166534;margin-bottom:2px;">
            COD Orders Secured by EscaraPay
          </div>
          <div style="font-size:11px;color:#64748b;line-height:1.5;">
            A small refundable token confirms your order is genuine &amp; protects you from fraud.
            <a href="${ESCARA_SITE}" target="_blank" rel="noopener"
               style="color:#0ea5e9;text-decoration:none;font-weight:600;margin-left:4px;">
              Learn more →
            </a>
          </div>
        </div>
        <div style="
          background:#fff;border:1px solid #e2e8f0;border-radius:8px;
          padding:6px 10px;font-size:10px;font-weight:700;
          color:#0ea5e9;white-space:nowrap;flex-shrink:0;text-align:center;
        ">
          ✅ Secured<br/>by EscaraPay
        </div>
      </div>
    `;

    /* Try to insert before submit/place-order button */
    const btnSelectors = [
      'button[name="checkout"]',
      'button[type="submit"]',
      '#place_order',
      '.place-order button',
      '.checkout-button',
      'input[type="submit"]',
      '[data-testid="place-order-button"]',
      '.btn-place-order',
    ];

    let inserted = false;
    for (const sel of btnSelectors) {
      const btn = document.querySelector(sel);
      if (btn && btn.parentNode) {
        btn.parentNode.insertBefore(badge, btn);
        inserted = true;
        break;
      }
    }

    /* Fallback — insert at end of first form, or at body end */
    if (!inserted) {
      const form = document.querySelector("form");
      if (form) {
        form.appendChild(badge);
      } else {
        document.body.appendChild(badge);
      }
    }
  }

  /* ════════════════════════════════════
     DATA EXTRACTION HELPERS
  ════════════════════════════════════ */

  /* Try multiple selectors, return first non-empty value */
  function getField(selectors) {
    for (const sel of selectors) {
      try {
        const el = document.querySelector(sel);
        if (el) {
          const val = (el.value || el.textContent || "").trim();
          if (val) return val;
        }
      } catch(e) {}
    }
    return "";
  }

  function extractBuyerName() {
    const first = getField([
      '[name="first_name"]', '[name="billing_first_name"]',
      '#billing_first_name', '[name="firstName"]',
      '[placeholder*="First"]', '[id*="first_name"]',
    ]);
    const last = getField([
      '[name="last_name"]', '[name="billing_last_name"]',
      '#billing_last_name', '[name="lastName"]',
      '[placeholder*="Last"]', '[id*="last_name"]',
    ]);
    return (first + " " + last).trim() || getField([
      '[name="name"]', '[name="full_name"]',
      '#billing_full_name', '[placeholder*="Name"]',
    ]) || "Customer";
  }

  function extractEmail() {
    return getField([
      '[name="email"]', '[name="billing_email"]',
      '#billing_email', '#email', 'input[type="email"]',
    ]).toLowerCase();
  }

  function extractPhone() {
    const raw = getField([
      '[name="phone"]', '[name="billing_phone"]',
      '#billing_phone', '#phone', 'input[type="tel"]',
      '[name="mobile"]', '[name="mobile_number"]',
      '[placeholder*="phone"]', '[placeholder*="Phone"]',
      '[placeholder*="Mobile"]',
    ]);
    return raw.replace(/\D/g, "").slice(-10);
  }

  function extractAmount() {
    /* Try data attributes first (most reliable) */
    const dataEls = document.querySelectorAll("[data-total],[data-order-total],[data-cart-total]");
    for (const el of dataEls) {
      const v = parseFloat(el.getAttribute("data-total") || el.getAttribute("data-order-total") || el.getAttribute("data-cart-total"));
      if (v > 0) return v;
    }
    /* Try common text selectors */
    const amtSelectors = [
      ".order-total .amount", ".cart_totals .order-total td",
      ".woocommerce-Price-amount", ".total-amount",
      "[data-testid='total-price']", ".order-summary__total-recap",
      ".payment-due__price", "#order-total",
      ".checkout-summary-total", ".cart-total",
    ];
    for (const sel of amtSelectors) {
      const el = document.querySelector(sel);
      if (el) {
        const match = (el.textContent || "").match(/[\d,]+\.?\d*/);
        if (match) {
          const v = parseFloat(match[0].replace(/,/g, ""));
          if (v > 0) return v;
        }
      }
    }
    return 0;
  }

  function extractProduct() {
    return getField([
      "h1.product_title", ".product-title", ".item-name",
      ".cart-item__title", ".product__title", "[data-product-title]",
      ".product-name", "h1.entry-title",
    ]).slice(0, 200) || "Order";
  }

  /* ════════════════════════════════════
     COD DETECTION
  ════════════════════════════════════ */
  function isCODSelected() {
    /* Check all payment radio/input elements */
    const paymentInputs = document.querySelectorAll(
      "input[name='payment_method'], input[name='paymentMethod'], " +
      "input[id*='payment'], input[value*='cod'], input[value*='cash'], " +
      "input[id*='cod'], input[id*='cash_on_delivery']"
    );
    for (const inp of paymentInputs) {
      if (inp.checked) {
        const v = (inp.value || inp.id || "").toLowerCase();
        if (v.includes("cod") || v.includes("cash")) return true;
      }
    }

    /* Check selected payment text visible on page */
    const selectedPaymentText = document.querySelector(
      ".payment-method--active, .payment-method.selected, " +
      "[data-payment-method].selected, .payment_method_cod"
    );
    if (selectedPaymentText) {
      const txt = selectedPaymentText.textContent.toLowerCase();
      if (txt.includes("cod") || txt.includes("cash on delivery") || txt.includes("cash")) return true;
    }

    /* Wix/custom: look for visible COD label near checked input */
    const labels = document.querySelectorAll("label");
    for (const label of labels) {
      const txt = label.textContent.toLowerCase();
      if ((txt.includes("cash on delivery") || txt.includes("cod")) &&
          label.classList.toString().toLowerCase().includes("selected")) {
        return true;
      }
    }

    return false;
  }

  /* ════════════════════════════════════
     SEND ORDER TO ESCARAPAY
  ════════════════════════════════════ */
  let orderSent = false; /* prevent double-send */

  function sendOrder(formEl) {
    if (orderSent) return;
    if (!isCODSelected()) return; /* skip prepaid */

    const buyer_name   = extractBuyerName();
    const buyer_email  = extractEmail();
    const buyer_phone  = extractPhone();
    const order_amount = extractAmount();
    const product_name = extractProduct();

    /* Need at least phone or email to notify buyer */
    if (!buyer_phone && !buyer_email) {
      console.log("[EscaraPay] COD detected but no buyer contact found — skipping");
      return;
    }
    if (order_amount < 200) {
      console.log("[EscaraPay] Order amount too low (min ₹200) — skipping");
      return;
    }

    const payload = {
      seller_id:         SELLER_ID,
      buyer_name,
      buyer_email,
      buyer_phone,
      product_name,
      order_amount,
      platform_order_id: "SDK-" + Date.now(),
    };

    orderSent = true;
    console.log("[EscaraPay] 🛡️ COD order detected — sending to EscaraPay", payload);

    fetch(`${ESCARA_API}/api/integrations/public-order`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          console.log("[EscaraPay] ✅ Order protected:", data.escara_order_id, "| Pay:", data.payment_link);
        } else {
          console.warn("[EscaraPay] Order creation issue:", data.error);
          orderSent = false; /* allow retry */
        }
      })
      .catch(err => {
        console.warn("[EscaraPay] Could not reach server:", err.message);
        orderSent = false;
      });
  }

  /* ════════════════════════════════════
     EVENT LISTENERS
  ════════════════════════════════════ */
  function attachListeners() {
    /* Listen for form submit */
    document.addEventListener("submit", function (e) {
      sendOrder(e.target);
    }, { capture: true });

    /* Shopify checkout button click */
    document.addEventListener("click", function (e) {
      const btn = e.target.closest(
        'button[name="checkout"], button[type="submit"], #place_order, ' +
        '[data-testid="place-order-button"], .checkout-button'
      );
      if (btn) {
        setTimeout(() => sendOrder(null), 200); /* slight delay to let form populate */
      }
    }, { capture: false });
  }

  /* ════════════════════════════════════
     INIT
  ════════════════════════════════════ */
  function init() {
    injectBadge();
    attachListeners();
    console.log("[EscaraPay] 🛡️ SDK loaded | Seller:", SELLER_ID || "NOT SET");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    /* DOM already ready */
    init();
  }

  /* Re-inject badge if SPA navigates (Wix/Shopify SPAs) */
  let lastUrl = location.href;
  new MutationObserver(function () {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(injectBadge, 800);
    }
  }).observe(document.body, { childList: true, subtree: true });

})();