const BASE_URL = "https://escarapay-backend.onrender.com";

/* ── Auth ── */
export const registerUser = async (name, email, phone, role, password, shopName = "", pan = "", gst = "") => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, role, password, upi_id: "", shop_name: shopName, pan_number: pan, gst_number: gst }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Register failed" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Could not connect to server. Please try again." }; }
};

export const loginUser = async (email, password, role) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Login failed" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Could not connect to server. Please try again." }; }
};

/* ── Orders ── */
export const createOrder = async (sellerId, productName, orderAmount, tokenPct, buyerName, buyerPhone) => {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/create`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seller_id: sellerId, product_name: productName, order_amount: orderAmount, token_pct: tokenPct, buyer_name: buyerName, buyer_phone: buyerPhone }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Order could not be created" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Could not connect to server." }; }
};

export const getSellerOrders = async (sellerId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/seller/${sellerId}`);
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Orders could not be loaded" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Could not connect to server." }; }
};

export const getBuyerOrders = async (buyerPhone) => {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/buyer/${buyerPhone}`);
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Orders could not be loaded" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Could not connect to server." }; }
};

export const getOrderById = async (orderId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/${orderId}`);
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Order not found" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Could not connect to server." }; }
};

// ✅ Fixed — seller_id now sent to verify ownership
export const dispatchOrder = async (orderId, trackingNumber, sellerId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/${orderId}/dispatch`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tracking_number: trackingNumber, seller_id: sellerId }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Dispatch failed" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Could not connect to server." }; }
};

export const confirmDelivery = async (orderId, buyerPhone) => {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/${orderId}/confirm-delivery`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ buyer_phone: buyerPhone }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Delivery confirmation failed" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Could not connect to server." }; }
};

export const raiseDispute = async (orderId, reason, raisedBy = "buyer") => {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/${orderId}/dispute`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason, raised_by: raisedBy }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Dispute could not be raised" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Could not connect to server." }; }
};

export const buyerCancel = async (orderId, buyerPhone) => {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/${orderId}/buyer-cancel`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ buyer_phone: buyerPhone }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Cancel failed" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Could not connect to server." }; }
};

export const sellerCancel = async (orderId, sellerId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/${orderId}/seller-cancel`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seller_id: sellerId }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Cancel failed" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Could not connect to server." }; }
};

/* ── Payments ── */
export const createPaymentOrder = async (orderId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/payment/create-order`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Payment order creation failed" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Could not connect to server." }; }
};

export const verifyPayment = async (rzpOrderId, rzpPaymentId, rzpSignature, escaraOrderId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/payment/verify`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: escaraOrderId }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Payment verification failed" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Could not connect to server." }; }
};

export const getSellerAnalytics = async (sellerId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/analytics/seller/${sellerId}`);
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Analytics could not be loaded" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Could not connect to server." }; }
};

export const sendOTP = async (email, role) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/send-otp`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "OTP could not be sent" };
    return { success: true, message: data.message };
  } catch (err) { return { success: false, error: "Could not connect to server." }; }
};

export const verifyOTP = async (email, role, otp) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role, otp }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "OTP verification failed" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Could not connect to server." }; }
};

export const sendRegisterOTP = async (email, name) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/send-otp-register`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "OTP could not be sent" };
    return { success: true, message: data.message };
  } catch (err) { return { success: false, error: "Could not connect to server." }; }
};

export const verifyRegisterOTP = async (email, otp) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/verify-otp-register`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "OTP verification failed" };
    return { success: true };
  } catch (err) { return { success: false, error: "Could not connect to server." }; }
};