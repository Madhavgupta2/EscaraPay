



// const BASE_URL = "http://localhost:5000";

// /* ── Auth ── */
// export const registerUser = async (name, email, phone, role, password, shopName = "") => {
//   try {
//     const res = await fetch(`${BASE_URL}/api/auth/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, phone, role, password, upi_id: "", shop_name: shopName }),
//     });
//     const data = await res.json();
//     if (!res.ok) return { success: false, error: data.error || "Register failed" };
//     return { success: true, data };
//   } catch (err) {
//     return { success: false, error: "Backend se connect nahi hua. Backend on hai?" };
//   }
// };

// export const loginUser = async (email, password, role) => {
//   try {
//     const res = await fetch(`${BASE_URL}/api/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password, role }),
//     });
//     const data = await res.json();
//     if (!res.ok) return { success: false, error: data.error || "Login failed" };
//     return { success: true, data };
//   } catch (err) {
//     return { success: false, error: "Backend se connect nahi hua. Backend on hai?" };
//   }
// };

// /* ── Orders ── */
// export const createOrder = async (sellerId, productName, orderAmount, tokenPct, buyerName, buyerPhone) => {
//   try {
//     const res = await fetch(`${BASE_URL}/api/orders/create`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         seller_id: sellerId,
//         product_name: productName,
//         order_amount: orderAmount,
//         token_pct: tokenPct,
//         buyer_name: buyerName,
//         buyer_phone: buyerPhone,
//       }),
//     });
//     const data = await res.json();
//     if (!res.ok) return { success: false, error: data.error || "Order create nahi hua" };
//     return { success: true, data };
//   } catch (err) {
//     return { success: false, error: "Backend se connect nahi hua." };
//   }
// };

// export const getSellerOrders = async (sellerId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/api/orders/seller/${sellerId}`);
//     const data = await res.json();
//     if (!res.ok) return { success: false, error: data.error || "Orders load nahi hue" };
//     return { success: true, data };
//   } catch (err) {
//     return { success: false, error: "Backend se connect nahi hua." };
//   }
// };

// export const getBuyerOrders = async (buyerPhone) => {
//   try {
//     const res = await fetch(`${BASE_URL}/api/orders/buyer/${buyerPhone}`);
//     const data = await res.json();
//     if (!res.ok) return { success: false, error: data.error || "Orders load nahi hue" };
//     return { success: true, data };
//   } catch (err) {
//     return { success: false, error: "Backend se connect nahi hua." };
//   }
// };

// export const getOrderById = async (orderId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/api/orders/${orderId}`);
//     const data = await res.json();
//     if (!res.ok) return { success: false, error: data.error || "Order nahi mila" };
//     return { success: true, data };
//   } catch (err) {
//     return { success: false, error: "Backend se connect nahi hua." };
//   }
// };

// export const dispatchOrder = async (orderId, trackingNumber) => {
//   try {
//     const res = await fetch(`${BASE_URL}/api/orders/${orderId}/dispatch`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ tracking_number: trackingNumber }),
//     });
//     const data = await res.json();
//     if (!res.ok) return { success: false, error: data.error || "Dispatch failed" };
//     return { success: true, data };
//   } catch (err) {
//     return { success: false, error: "Backend se connect nahi hua." };
//   }
// };

// export const confirmDelivery = async (orderId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/api/orders/${orderId}/confirm-delivery`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//     });
//     const data = await res.json();
//     if (!res.ok) return { success: false, error: data.error || "Delivery confirm failed" };
//     return { success: true, data };
//   } catch (err) {
//     return { success: false, error: "Backend se connect nahi hua." };
//   }
// };

// export const buyerCancel = async (orderId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/api/orders/${orderId}/buyer-cancel`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//     });
//     const data = await res.json();
//     if (!res.ok) return { success: false, error: data.error || "Cancel failed" };
//     return { success: true, data };
//   } catch (err) {
//     return { success: false, error: "Backend se connect nahi hua." };
//   }
// };

// export const sellerCancel = async (orderId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/api/orders/${orderId}/seller-cancel`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//     });
//     const data = await res.json();
//     if (!res.ok) return { success: false, error: data.error || "Cancel failed" };
//     return { success: true, data };
//   } catch (err) {
//     return { success: false, error: "Backend se connect nahi hua." };
//   }
// };

// /* ── Payments ── */
// export const createPaymentOrder = async (orderId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/api/payment/create-order`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ orderId }),
//     });
//     const data = await res.json();
//     if (!res.ok) return { success: false, error: data.error || "Payment order create failed" };
//     return { success: true, data };
//   } catch (err) {
//     return { success: false, error: "Backend se connect nahi hua." };
//   }
// };

// export const verifyPayment = async (razorpayOrderId, razorpayPaymentId, razorpaySignature, escaraOrderId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/api/payment/verify`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         razorpay_order_id: razorpayOrderId,
//         razorpay_payment_id: razorpayPaymentId,
//         razorpay_signature: razorpaySignature,
//         escara_order_id: escaraOrderId,
//       }),
//     });
//     const data = await res.json();
//     if (!res.ok) return { success: false, error: data.error || "Payment verify failed" };
//     return { success: true, data };
//   } catch (err) {
//     return { success: false, error: "Backend se connect nahi hua." };
//   }
// };

// export const getSellerAnalytics = async (sellerId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/api/analytics/seller/${sellerId}`);
//     const data = await res.json();
//     if (!res.ok) return { success: false, error: data.error || "Analytics load failed" };
//     return { success: true, data };
//   } catch (err) {
//     return { success: false, error: "Backend se connect nahi hua." };
//   }
// };

const BASE_URL = "https://escarapay-backend-production.up.railway.app";

/* ── Auth ── */
export const registerUser = async (name, email, phone, role, password, shopName = "") => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, role, password, upi_id: "", shop_name: shopName }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Register failed" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Backend se connect nahi hua. Backend on hai?" }; }
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
  } catch (err) { return { success: false, error: "Backend se connect nahi hua. Backend on hai?" }; }
};

/* ── Orders ── */
export const createOrder = async (sellerId, productName, orderAmount, tokenPct, buyerName, buyerPhone) => {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/create`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seller_id: sellerId, product_name: productName, order_amount: orderAmount, token_pct: tokenPct, buyer_name: buyerName, buyer_phone: buyerPhone }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Order create nahi hua" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Backend se connect nahi hua." }; }
};

export const getSellerOrders = async (sellerId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/seller/${sellerId}`);
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Orders load nahi hue" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Backend se connect nahi hua." }; }
};

export const getBuyerOrders = async (buyerPhone) => {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/buyer/${buyerPhone}`);
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Orders load nahi hue" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Backend se connect nahi hua." }; }
};

export const getOrderById = async (orderId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/${orderId}`);
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Order nahi mila" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Backend se connect nahi hua." }; }
};

export const dispatchOrder = async (orderId, trackingNumber) => {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/${orderId}/dispatch`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tracking_number: trackingNumber }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Dispatch failed" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Backend se connect nahi hua." }; }
};

export const confirmDelivery = async (orderId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/${orderId}/confirm-delivery`, {
      method: "POST", headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Delivery confirm failed" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Backend se connect nahi hua." }; }
};

export const raiseDispute = async (orderId, reason, raisedBy = "buyer") => {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/${orderId}/dispute`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason, raised_by: raisedBy }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Dispute raise nahi hua" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Backend se connect nahi hua." }; }
};

export const buyerCancel = async (orderId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/${orderId}/buyer-cancel`, {
      method: "POST", headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Cancel failed" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Backend se connect nahi hua." }; }
};

export const sellerCancel = async (orderId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/${orderId}/seller-cancel`, {
      method: "POST", headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Cancel failed" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Backend se connect nahi hua." }; }
};

/* ── Payments ── */
export const createPaymentOrder = async (orderId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/payment/create-order`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Payment order create failed" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Backend se connect nahi hua." }; }
};

export const verifyPayment = async (razorpayOrderId, razorpayPaymentId, razorpaySignature, escaraOrderId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/payment/verify`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ razorpay_order_id: razorpayOrderId, razorpay_payment_id: razorpayPaymentId, razorpay_signature: razorpaySignature, escara_order_id: escaraOrderId }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Payment verify failed" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Backend se connect nahi hua." }; }
};

export const getSellerAnalytics = async (sellerId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/analytics/seller/${sellerId}`);
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Analytics load failed" };
    return { success: true, data };
  } catch (err) { return { success: false, error: "Backend se connect nahi hua." }; }
};
