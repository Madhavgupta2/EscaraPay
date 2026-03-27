/* eslint-disable */
import { registerUser, loginUser, createOrder as apiCreateOrder, getSellerOrders, getBuyerOrders, getOrderById, createPaymentOrder, verifyPayment, confirmDelivery, raiseDispute, dispatchOrder } from './api';
import { useState, useEffect } from "react";
import LOGO_SRC from "./escarapay-logo.jpg";

const BACKEND_URL = "https://escarapay-backend-production.up.railway.app";

// Language translations
const T = {
  en: {
    tagline: "India's Trusted Escrow Platform",
    hero1: "WhatsApp Deal Ka",
    hero2: "Safest Way",
    heroDesc: "Seller's RTO loss eliminated. Buyer's fraud fear eliminated. Minimum ₹200 token for 100% protection.",
    sellerBtn: "Seller — Start Free",
    buyerBtn: "Buyer — Safe Order",
    howWorks: "How Does It Work?",
    sellerView: "Seller View",
    buyerView: "Buyer View",
    myOrders: "My Orders",
    payViaLink: "Pay via Link",
    createDeal: "Create Deal",
    help: "Help",
    dashboard: "Dashboard",
    allOrders: "All Orders",
    analytics: "Analytics",
    payments: "Payments",
    settings: "Settings",
    logout: "Logout",
    login: "Login",
    register: "Register",
    newOrder: "+ New Order Link",
    noOrders: "No orders yet!",
    loading: "Loading...",
  },
  hi: {
    tagline: "भारत का भरोसेमंद एस्क्रो प्लेटफॉर्म",
    hero1: "व्हाट्सऐप डील का",
    hero2: "सबसे सुरक्षित तरीका",
    heroDesc: "सेलर का RTO नुकसान खत्म। बायर का फ्रॉड का डर खत्म। न्यूनतम ₹200 टोकन से 100% सुरक्षा।",
    sellerBtn: "सेलर — फ्री शुरू करें",
    buyerBtn: "बायर — सेफ ऑर्डर",
    howWorks: "यह कैसे काम करता है?",
    sellerView: "सेलर व्यू",
    buyerView: "बायर व्यू",
    myOrders: "मेरे ऑर्डर",
    payViaLink: "लिंक से पेमेंट",
    createDeal: "डील बनाएं",
    help: "मदद",
    dashboard: "डैशबोर्ड",
    allOrders: "सभी ऑर्डर",
    analytics: "एनालिटिक्स",
    payments: "पेमेंट",
    settings: "सेटिंग",
    logout: "लॉगआउट",
    login: "लॉगिन",
    register: "रजिस्टर",
    newOrder: "+ नया ऑर्डर लिंक",
    noOrders: "अभी कोई ऑर्डर नहीं!",
    loading: "लोड हो रहा है...",
  },
  hl: {
    tagline: "India Ka Trusted Escrow Platform",
    hero1: "WhatsApp Deal Ka",
    hero2: "Sabse Safe Tarika",
    heroDesc: "Seller ka RTO loss khatam. Buyer ka fraud ka darr khatam. Minimum ₹200 token se dono ko 100% protection.",
    sellerBtn: "Seller — Free Shuru Karo",
    buyerBtn: "Buyer — Safe Order Do",
    howWorks: "Kaise Kaam Karta Hai?",
    sellerView: "Seller View",
    buyerView: "Buyer View",
    myOrders: "Mere Orders",
    payViaLink: "Link se Pay Karo",
    createDeal: "Deal Banao",
    help: "Help",
    dashboard: "Dashboard",
    allOrders: "Saare Orders",
    analytics: "Analytics",
    payments: "Payments",
    settings: "Settings",
    logout: "Logout",
    login: "Login Karo",
    register: "Register Karo",
    newOrder: "+ Naya Order Link",
    noOrders: "Koi orders nahi abhi!",
    loading: "Load ho raha hai...",
  },
};

function getStyle(dark) {
  return `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root {
    --bg:      ${dark?"#0a0a0f":"#f0f7ff"};
    --surface: ${dark?"#12121a":"#ffffff"};
    --sf2:     ${dark?"#1a1a26":"#e4f1fb"};
    --border:  ${dark?"rgba(255,255,255,0.07)":"rgba(14,165,233,0.18)"};
    --gold:    ${dark?"#f0b429":"#0ea5e9"};
    --gold2:   ${dark?"#f7c948":"#38bdf8"};
    --green:   ${dark?"#22c55e":"#059669"};
    --red:     ${dark?"#ef4444":"#dc2626"};
    --blue:    ${dark?"#60a5fa":"#0284c7"};
    --text:    ${dark?"#f0f0f5":"#0c2340"};
    --muted:   ${dark?"#8888a0":"#4a7fa5"};
    --accent:  ${dark?"#7c3aed":"#0369a1"};
  }
  body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;}
  .syne{font-family:'Syne',sans-serif;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:var(--bg);}
  ::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
  @keyframes pulseGold{0%,100%{box-shadow:0 0 0 0 rgba(240,180,41,.4)}50%{box-shadow:0 0 0 14px rgba(240,180,41,0)}}
  .fu{animation:fadeUp .55s ease forwards}
  .fu2{animation:fadeUp .55s .13s ease both}
  .fu3{animation:fadeUp .55s .26s ease both}
  .float{animation:float 3s ease-in-out infinite}
  .btn-gold{background:linear-gradient(135deg,var(--gold),var(--gold2));color:${dark?"#0a0a0f":"#fff"};border:none;padding:11px 26px;border-radius:10px;font-family:'Syne',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:all .2s;white-space:nowrap;}
  .btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(14,165,233,.35);}
  .btn-gold.pulse{animation:pulseGold 2s infinite;}
  .btn-green{background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;border:none;padding:11px 26px;border-radius:10px;font-family:'Syne',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:all .2s;white-space:nowrap;}
  .btn-green:hover{transform:translateY(-2px);}
  .btn-red{background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff;border:none;padding:11px 26px;border-radius:10px;font-family:'Syne',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:all .2s;white-space:nowrap;}
  .btn-outline{background:transparent;color:var(--gold);border:1.5px solid var(--gold);padding:10px 26px;border-radius:10px;font-family:'Syne',sans-serif;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;white-space:nowrap;}
  .btn-outline:hover{background:rgba(14,165,233,.1);transform:translateY(-2px);}
  .btn-ghost{background:var(--sf2);color:var(--text);border:1px solid var(--border);padding:9px 18px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:500;font-size:13px;cursor:pointer;transition:all .2s;white-space:nowrap;}
  .btn-ghost:hover{border-color:var(--gold);color:var(--gold);}
  .btn-whatsapp{background:linear-gradient(135deg,#25D366,#128C7E);color:#fff;border:none;padding:11px 20px;border-radius:10px;font-family:'Syne',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:7px;white-space:nowrap;}
  .btn-whatsapp:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(37,211,102,.35);}
  .card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:22px;transition:border-color .3s;}
  .card:hover{border-color:rgba(14,165,233,.3);}
  .input{width:100%;background:var(--sf2);border:1px solid var(--border);color:var(--text);padding:11px 14px;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;outline:none;transition:border-color .2s;}
  .input:focus{border-color:var(--gold);}
  .input::placeholder{color:var(--muted);}
  .select{width:100%;background:var(--sf2);border:1px solid var(--border);color:var(--text);padding:11px 14px;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;outline:none;cursor:pointer;}
  .label{display:block;font-size:12px;color:var(--muted);margin-bottom:5px;font-weight:500;}
  .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600;}
  .bg{background:rgba(5,150,105,.15);color:var(--green);}
  .bo{background:rgba(14,165,233,.15);color:var(--gold);}
  .br{background:rgba(220,38,38,.15);color:var(--red);}
  .bb{background:rgba(2,132,199,.15);color:var(--blue);}
  .bm{background:var(--sf2);color:var(--muted);}
  .bpur{background:rgba(124,58,237,.15);color:#a78bfa;}
  .borange{background:rgba(251,146,60,.15);color:#fb923c;}
  .chip{display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;border:1px solid var(--border);background:var(--sf2);color:var(--muted);transition:all .2s;}
  .chip:hover{border-color:var(--gold);color:var(--gold);}
  .chip.active{background:rgba(14,165,233,.15);border-color:var(--gold);color:var(--gold);}
  .nav{position:sticky;top:0;z-index:100;background:${dark?"rgba(10,10,15,.9)":"rgba(240,247,255,.93)"};backdrop-filter:blur(22px);border-bottom:1px solid var(--border);padding:0 16px;height:62px;display:flex;align-items:center;justify-content:space-between;gap:8px;}
  .logo-img{height:30px;width:auto;object-fit:contain;flex-shrink:0;}
  .logo-wrap{display:flex;align-items:center;gap:6px;cursor:pointer;flex-shrink:0;}
  .logo-name{font-family:'Syne',sans-serif;font-size:16px;font-weight:800;background:linear-gradient(135deg,var(--gold),var(--gold2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .toggle-btn{display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:20px;border:1px solid var(--border);background:var(--sf2);cursor:pointer;font-size:12px;color:var(--muted);transition:all .2s;flex-shrink:0;}
  .toggle-btn:hover{border-color:var(--gold);color:var(--gold);}
  .sidebar{width:220px;background:var(--surface);border-right:1px solid var(--border);padding:18px 10px;position:fixed;top:62px;left:0;bottom:0;overflow-y:auto;display:flex;flex-direction:column;}
  .si{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:9px;cursor:pointer;font-size:14px;font-weight:500;color:var(--muted);transition:all .2s;margin-bottom:2px;}
  .si:hover{background:var(--sf2);color:var(--text);}
  .si.active{background:rgba(14,165,233,.12);color:var(--gold);}
  .main{margin-left:220px;padding:24px;min-height:calc(100vh - 62px);}
  .step{display:flex;align-items:flex-start;gap:12px;padding:14px;border-radius:12px;border:1px solid var(--border);background:var(--surface);}
  .step-num{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:700;font-size:13px;flex-shrink:0;}
  .g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
  .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
  .tbl{width:100%;border-collapse:collapse;}
  .tbl th{text-align:left;padding:11px 13px;font-size:11px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border);white-space:nowrap;}
  .tbl td{padding:12px 13px;font-size:13px;border-bottom:1px solid var(--border);}
  .tbl tr:hover td{background:var(--sf2);}
  .tbl tr:last-child td{border-bottom:none;}
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);backdrop-filter:blur(4px);z-index:200;display:flex;align-items:center;justify-content:center;padding:14px;}
  .modal{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:26px;width:100%;max-width:470px;animation:fadeUp .3s ease;max-height:92vh;overflow-y:auto;}
  .tl{display:flex;gap:12px;padding-bottom:20px;position:relative;}
  .tl:not(:last-child)::before{content:'';position:absolute;left:14px;top:30px;bottom:0;width:2px;background:var(--border);}
  .tl-dot{width:30px;height:30px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;}
  .shimmer{background:linear-gradient(90deg,var(--gold),${dark?"#fff":"#0369a1"},var(--gold));background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3s linear infinite;}
  .hero-glow{position:absolute;width:400px;height:400px;border-radius:50%;filter:blur(80px);pointer-events:none;}
  .avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--accent));display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:700;font-size:13px;color:white;flex-shrink:0;}
  .ficon{width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:12px;}
  .stat-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px 20px;}
  .pbar{height:5px;background:var(--sf2);border-radius:3px;overflow:hidden;}
  .pfill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--gold),var(--gold2));transition:width .5s;}
  .tracking-box{background:rgba(2,132,199,.1);border:1px solid rgba(2,132,199,.3);border-radius:10px;padding:12px;display:flex;align-items:center;gap:10px;}
  .hold-box{background:rgba(124,58,237,.1);border:1px solid rgba(124,58,237,.3);border-radius:10px;padding:12px;}
  .copy-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--green);color:#fff;padding:10px 22px;border-radius:10px;font-size:13px;font-weight:600;z-index:999;animation:fadeUp .3s ease;}
  .mobile-nav{display:none;position:fixed;bottom:0;left:0;right:0;background:${dark?"rgba(18,18,26,.97)":"rgba(255,255,255,.97)"};backdrop-filter:blur(20px);border-top:1px solid var(--border);z-index:100;padding:8px 0 max(8px,env(safe-area-inset-bottom));}
  .mni{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 16px;cursor:pointer;border-radius:10px;transition:all .2s;color:var(--muted);font-size:10px;font-weight:500;min-width:60px;}
  .mni.active{color:var(--gold);}
  .mni span:first-child{font-size:20px;}
  @media(max-width:1024px){.g4{grid-template-columns:1fr 1fr;}}
  @media(max-width:800px){.g3{grid-template-columns:1fr 1fr;}}
  @media(max-width:640px){
    .sidebar{display:none;}
    .mobile-nav{display:flex;justify-content:space-around;align-items:center;}
    .main{margin-left:0 !important;padding:14px;padding-bottom:90px;width:100%;max-width:100vw;overflow-x:hidden;}
    .g2,.g3,.g4{grid-template-columns:1fr;}
    .nav{padding:0 10px;}
    .hide-m{display:none;}
    body{overflow-x:hidden;}
    .card{padding:14px;}
    .tbl{font-size:11px;}
    .tbl th,.tbl td{padding:8px 6px;}
    .copy-toast{bottom:90px;}
  }
  *{box-sizing:border-box;}
  html,body{max-width:100vw;overflow-x:hidden;}
  `;
}

const MIN_TOKEN = 200;
const calcToken = (amount, pct) => Math.max(MIN_TOKEN, Math.round(Number(amount)*Number(pct)/100));
const BASE_URL = process.env.REACT_APP_FRONTEND_URL || "https://escara-pay.vercel.app";

const STATUS_META = {
  pending:                { label:"Awaiting Token",       cls:"bm",     icon:"⏳" },
  pending_seller_confirm: { label:"Seller Confirm Karo",  cls:"borange", icon:"🤝" },
  token_paid:             { label:"Token Paid",           cls:"bo",     icon:"🔐" },
  dispatched:             { label:"Dispatched",           cls:"bb",     icon:"📦" },
  delivered:              { label:"Delivered",            cls:"bg",     icon:"✅" },
  cancelled_buyer:        { label:"Cancelled (Buyer)",    cls:"br",     icon:"❌" },
  cancelled_seller:       { label:"Cancelled (Seller)",   cls:"br",     icon:"❌" },
  refunded:               { label:"Refunded",             cls:"bb",     icon:"↩️" },
  disputed:               { label:"Disputed",             cls:"bpur",   icon:"⚠️" },
};

const getDaysLeft = (d) => {
  if (!d) return 7;
  return Math.max(0, 7 - Math.floor((new Date()-new Date(d))/(1000*60*60*24)));
};

const getTrackingUrl = (tn) => {
  if (!tn) return null;
  const t = tn.toUpperCase();
  if (t.startsWith("DTDC")) return `https://www.dtdc.in/tracking.asp?strCnno=${tn}`;
  if (t.startsWith("BLUE")||t.startsWith("BD")) return `https://www.bluedart.com/tracking?trackid=${tn}`;
  if (t.startsWith("ECOM")) return `https://ecomexpress.in/tracking/?awb_field=${tn}`;
  if (t.startsWith("DEL")) return `https://www.delhivery.com/track/package/${tn}`;
  return `https://www.google.com/search?q=track+courier+${tn}`;
};

function Toast({ msg, onDone }) {
  useEffect(()=>{ const t=setTimeout(onDone,2500); return ()=>clearTimeout(t); },[onDone]);
  return <div className="copy-toast">✅ {msg}</div>;
}

function Logo({ onClick }) {
  return (
    <div className="logo-wrap" onClick={onClick}>
      <img src={LOGO_SRC} alt="EscaraPay" className="logo-img" onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
      <div style={{display:"none",width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#0ea5e9,#38bdf8)",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,color:"#fff",fontFamily:"'Syne',sans-serif"}}>E₹</div>
      <span className="logo-name">EscaraPay</span>
    </div>
  );
}

function ThemeToggle({ dark, onToggle }) {
  return <div className="toggle-btn" onClick={onToggle}><span>{dark?"🌙":"☀️"}</span><span className="hide-m">{dark?"Dark":"Light"}</span></div>;
}

function LangToggle({ lang, onToggle }) {
  const labels = { en:"EN", hi:"हि", hl:"HI" };
  const next = { en:"hi", hi:"hl", hl:"en" };
  return (
    <div className="toggle-btn" onClick={()=>onToggle(next[lang])} style={{minWidth:40,justifyContent:"center",fontWeight:700,fontSize:13}}>
      {labels[lang]}
    </div>
  );
}

function Bdg({ status }) {
  const s = STATUS_META[status] || STATUS_META.pending;
  return <span className={`badge ${s.cls}`}>{s.icon} {s.label}</span>;
}

/* ══════════ DIRECT PAYMENT PAGE ══════════ */
function PayPage({ orderId, dark, onToggle, onGoHome }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [payStep, setPayStep] = useState(0);
  const [payError, setPayError] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");

  useEffect(()=>{
    getOrderById(orderId).then(r=>{
      setLoading(false);
      if (r.success) setOrder(r.data.order);
      else setError("Order nahi mila. Link check karo.");
    });
  },[orderId]);

  const loadRazorpay = () => new Promise(resolve=>{
    if (document.getElementById("rzp-script")) { resolve(true); return; }
    const s = document.createElement("script"); s.id="rzp-script";
    s.src="https://checkout.razorpay.com/v1/checkout.js";
    s.onload=()=>resolve(true); s.onerror=()=>resolve(false);
    document.body.appendChild(s);
  });

  const handlePay = async () => {
    setPayError(""); setPayStep(1);
    const loaded = await loadRazorpay();
    if (!loaded) { setPayError("Razorpay load nahi hua."); setPayStep(0); return; }
    const result = await createPaymentOrder(order.id);
    if (!result.success) { setPayError(result.error); setPayStep(0); return; }
    const { razorpayOrderId, amount, keyId } = result.data;
    setPayStep(0);
    new window.Razorpay({
      key: keyId || process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount, currency:"INR", name:"EscaraPay",
      description:`Token: ${order.product_name}`,
      order_id: razorpayOrderId,
      handler: async (response) => {
        setPayStep(2);
        const verify = await verifyPayment(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature, order.id);
        if (verify.success) { setPayStep(3); setOrder(prev=>({...prev,status:"token_paid"})); }
        else { setPayError("Verify failed: "+verify.error); setPayStep(0); }
      },
      prefill: { name: buyerName||order?.buyer_name||"", contact: buyerPhone||order?.buyer_phone||"" },
      theme: { color:"#f0b429" },
      modal: { ondismiss: ()=>setPayStep(0) },
    }).open();
  };

  return (
    <div style={{minHeight:"100vh"}}>
      <nav className="nav">
        <Logo onClick={onGoHome} />
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <button className="btn-ghost" style={{fontSize:12}} onClick={onGoHome}>← Home</button>
        </div>
      </nav>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"calc(100vh - 62px)",padding:20}}>
        <div style={{width:"100%",maxWidth:460}}>
          {loading && <div className="card" style={{textAlign:"center",padding:50}}><div style={{width:44,height:44,border:"3px solid var(--gold)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}} /><div style={{color:"var(--muted)"}}>Order load ho raha hai...</div></div>}
          {error && <div className="card" style={{textAlign:"center",padding:40}}><div style={{fontSize:40,marginBottom:12}}>❌</div><div className="syne" style={{fontWeight:800,fontSize:18,marginBottom:8}}>Order Nahi Mila</div><div style={{color:"var(--muted)",fontSize:13,marginBottom:20}}>{error}</div><button className="btn-ghost" onClick={onGoHome}>← Home</button></div>}
          {payStep===3 && <div className="card fu" style={{textAlign:"center",padding:40}}><div style={{fontSize:60,marginBottom:16}}>🎉</div><div className="syne" style={{fontWeight:800,fontSize:24,color:"var(--green)",marginBottom:8}}>Token Secured!</div><div style={{color:"var(--muted)",fontSize:14,marginBottom:20}}>₹{order?.token_amount} escrow mein lock ho gaya</div><div style={{background:"rgba(14,165,233,.1)",border:"1px solid rgba(14,165,233,.2)",borderRadius:12,padding:14,marginBottom:16}}><div style={{fontSize:11,color:"var(--muted)",marginBottom:4}}>Order ID save karo:</div><div style={{fontFamily:"monospace",fontWeight:700,color:"var(--gold)",fontSize:16}}>{order?.id}</div></div><button className="btn-ghost" onClick={onGoHome}>← Home pe Jao</button></div>}
          {payStep===2 && <div className="card" style={{textAlign:"center",padding:50}}><div style={{width:44,height:44,border:"3px solid var(--green)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}} /><div className="syne" style={{fontWeight:700,fontSize:16}}>Payment Verify ho rahi hai...</div></div>}
          {payStep===1 && <div className="card" style={{textAlign:"center",padding:50}}><div style={{width:44,height:44,border:"3px solid var(--gold)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}} /><div className="syne" style={{fontWeight:700,fontSize:16}}>Payment Gateway Load ho raha hai...</div></div>}
          {order && !loading && payStep===0 && (
            order.status !== "pending" ? (
              <div className="card" style={{textAlign:"center",padding:40}}>
                <div style={{fontSize:44,marginBottom:12}}>{order.status==="token_paid"?"🔐":"✅"}</div>
                <div className="syne" style={{fontWeight:800,fontSize:20,marginBottom:10}}>{order.status==="token_paid"?"Token Already Paid!":"Order Processed"}</div>
                <Bdg status={order.status} />
                <div style={{color:"var(--muted)",fontSize:13,marginTop:14,marginBottom:20}}>Is order ke liye payment already ho chuka hai.</div>
                <button className="btn-ghost" onClick={onGoHome}>← Home</button>
              </div>
            ) : (
              <div className="fu">
                <div style={{textAlign:"center",marginBottom:20}}>
                  <img src={LOGO_SRC} alt="EscaraPay" style={{height:44,objectFit:"contain",marginBottom:12}} onError={e=>e.target.style.display="none"} />
                  <div style={{fontSize:12,color:"var(--muted)",marginBottom:4}}>🛡️ Secured by EscaraPay Escrow</div>
                  <h2 className="syne" style={{fontWeight:800,fontSize:22}}>Secure Token Payment</h2>
                </div>
                <div className="card" style={{marginBottom:14,background:"rgba(14,165,233,.05)",borderColor:"rgba(14,165,233,.25)"}}>
                  <div style={{marginBottom:14}}>
                    <div style={{fontSize:11,color:"var(--muted)",marginBottom:3}}>Order: <span style={{fontFamily:"monospace",color:"var(--gold)"}}>{order.id}</span></div>
                    <div className="syne" style={{fontWeight:800,fontSize:22}}>{order.product_name}</div>
                    <div style={{fontSize:13,color:"var(--muted)",marginTop:4}}>Seller: <strong style={{color:"var(--text)"}}>{order.seller_name||"—"}</strong></div>
                  </div>
                  <div className="g2" style={{marginBottom:14}}>
                    <div style={{background:"var(--sf2)",borderRadius:10,padding:12,textAlign:"center"}}><div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Order Value</div><div className="syne" style={{fontWeight:800,fontSize:22}}>₹{order.order_amount}</div></div>
                    <div style={{background:"rgba(14,165,233,.15)",border:"1px solid rgba(14,165,233,.3)",borderRadius:10,padding:12,textAlign:"center"}}><div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Aap Bharenge</div><div className="syne" style={{fontWeight:800,fontSize:22,color:"var(--gold)"}}>₹{order.buyer_pays||order.token_amount}</div></div>
                  </div>
                  <div style={{background:"var(--sf2)",borderRadius:10,padding:12,fontSize:12,marginBottom:14}}>
                    <div style={{fontWeight:600,marginBottom:8,color:"var(--muted)"}}>💰 Breakdown</div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{color:"var(--muted)"}}>Token (Escrow)</span><span>₹{order.token_amount}</span></div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{color:"var(--muted)"}}>Gateway Fee (2%)</span><span style={{color:"var(--muted)"}}>₹{order.gateway_fee}</span></div>
                    <div style={{height:1,background:"var(--border)",margin:"6px 0"}}></div>
                    <div style={{display:"flex",justifyContent:"space-between",fontWeight:700}}><span>Total</span><span style={{color:"var(--gold)"}}>₹{order.buyer_pays||order.token_amount}</span></div>
                  </div>
                  <div style={{background:"rgba(5,150,105,.08)",border:"1px solid rgba(5,150,105,.2)",borderRadius:10,padding:12,marginBottom:14}}>
                    <div style={{fontSize:12,fontWeight:700,color:"var(--green)",marginBottom:6}}>🛡️ EscaraPay Guarantee</div>
                    {["Token seller ko tab tak nahi milega jab tak deliver na ho","Order nahi aaya? Token wapas milega","Delivery ke 7 din mein dispute raise kar sakte ho","Team 24 ghante mein help karegi"].map(tx=>(
                      <div key={tx} style={{display:"flex",gap:7,fontSize:12,color:"var(--muted)",marginBottom:4}}><span style={{color:"var(--green)"}}>✓</span><span>{tx}</span></div>
                    ))}
                  </div>
                  <div style={{marginBottom:14}}>
                    <label className="label">Aapka Naam (optional)</label>
                    <input className="input" placeholder="Rahul Sharma" value={buyerName} onChange={e=>setBuyerName(e.target.value)} style={{marginBottom:10}} />
                    <label className="label">WhatsApp Number (optional)</label>
                    <input className="input" placeholder="9876543210" value={buyerPhone} onChange={e=>setBuyerPhone(e.target.value)} />
                  </div>
                </div>
                {payError && <div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",borderRadius:10,padding:12,marginBottom:12,fontSize:13,color:"var(--red)"}}>❌ {payError}</div>}
                <button className="btn-gold pulse" style={{width:"100%",padding:"16px",fontSize:16,borderRadius:12,marginBottom:12}} onClick={handlePay}>
                  💳 ₹{order.buyer_pays||order.token_amount} Token Pay Karo
                </button>
                <div style={{textAlign:"center",fontSize:12,color:"var(--muted)"}}>🔒 Secured by Razorpay • UPI, Cards, NetBanking</div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════ ORDER MODAL ══════════ */
function OrderModal({ order, isSeller, onClose, onDispatch, onConfirmDelivery, onDispute }) {
  const [tracking, setTracking] = useState(order.tracking_number||"");
  const [disputeReason, setDisputeReason] = useState("");
  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const paymentLink = `${BASE_URL}/pay/${order.id}`;
  const daysLeft = getDaysLeft(order.dispatched_at||order.updated_at);
  const trackingUrl = getTrackingUrl(order.tracking_number);
  const copyLink = () => { navigator.clipboard?.writeText(paymentLink); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  const steps = [
    {label:"Order Created", done:true, icon:"📋"},
    {label:"Token Paid by Buyer", done:order.status!=="pending"&&order.status!=="pending_seller_confirm", icon:"💳"},
    {label:"Dispatched by Seller", done:["dispatched","delivered","disputed"].includes(order.status), icon:"🚚"},
    {label:"Delivered", done:order.status==="delivered", icon:"✅"},
  ];

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
          <div>
            <div style={{fontFamily:"monospace",color:"var(--gold)",fontSize:12,marginBottom:3}}>{order.id}</div>
            <h3 className="syne" style={{fontWeight:800,fontSize:18}}>{order.product_name}</h3>
            <div style={{fontSize:12,color:"var(--muted)",marginTop:3}}>{isSeller?"Buyer":"Seller"}: <strong style={{color:"var(--text)"}}>{order.buyer_name||order.seller_name||"—"}</strong></div>
          </div>
          <Bdg status={order.status} />
        </div>
        <div className="g2" style={{marginBottom:16}}>
          <div style={{background:"var(--sf2)",borderRadius:10,padding:12}}><div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Order Amount</div><div className="syne" style={{fontWeight:800,fontSize:20}}>₹{order.order_amount}</div></div>
          <div style={{background:"rgba(14,165,233,.1)",borderRadius:10,padding:12,border:"1px solid rgba(14,165,233,.2)"}}><div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Token (Escrow)</div><div className="syne" style={{fontWeight:800,fontSize:20,color:"var(--gold)"}}>₹{order.token_amount}</div></div>
        </div>
        {isSeller && (
          <div style={{background:"rgba(14,165,233,.08)",border:"1px solid rgba(14,165,233,.2)",borderRadius:10,padding:12,marginBottom:14}}>
            <div style={{fontSize:11,color:"var(--muted)",marginBottom:6,fontWeight:600}}>🔗 Payment Link</div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <code style={{fontSize:11,color:"var(--gold)",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",background:"var(--sf2)",padding:"6px 10px",borderRadius:6}}>{paymentLink}</code>
              <button className="btn-ghost" style={{padding:"6px 12px",fontSize:12,flexShrink:0,color:copied?"var(--green)":"var(--text)",borderColor:copied?"var(--green)":"var(--border)"}} onClick={copyLink}>{copied?"✅ Copied!":"📋 Copy"}</button>
            </div>
          </div>
        )}
        {steps.map((s,i)=>(
          <div key={i} className="tl">
            <div className="tl-dot" style={{background:s.done?"rgba(5,150,105,.2)":"var(--sf2)",color:s.done?"var(--green)":"var(--muted)"}}>{s.done?"✓":s.icon}</div>
            <div style={{paddingTop:6,fontSize:13,fontWeight:s.done?600:400,color:s.done?"var(--text)":"var(--muted)"}}>{s.label}</div>
          </div>
        ))}
        {order.tracking_number && (
          <div className="tracking-box" style={{marginBottom:12}}>
            <div style={{flex:1}}><div style={{fontSize:11,color:"var(--blue)",fontWeight:600,marginBottom:2}}>📦 Tracking</div><div style={{fontFamily:"monospace",fontWeight:700}}>{order.tracking_number}</div></div>
            {trackingUrl && <a href={trackingUrl} target="_blank" rel="noreferrer" style={{background:"var(--blue)",color:"#fff",padding:"6px 12px",borderRadius:8,fontSize:12,fontWeight:600,textDecoration:"none"}}>Track →</a>}
          </div>
        )}
        {order.status==="dispatched" && <div className="hold-box" style={{marginBottom:12}}><div style={{fontSize:12,color:"#a78bfa",fontWeight:700}}>⏰ Token Hold: {daysLeft>0?`${daysLeft} din aur`:"Release ready!"}</div></div>}
        {isSeller && order.status==="token_paid" && (
          <div style={{marginBottom:12}}>
            <label className="label">Courier Tracking Number *</label>
            <input className="input" placeholder="DTDC123456 / BLUEDART789" value={tracking} onChange={e=>setTracking(e.target.value)} style={{marginBottom:8}} />
            <button className="btn-gold" style={{width:"100%"}} onClick={async()=>{ if(!tracking){setMsg("❌ Tracking number daalo!"); return;} setLoading(true); const r=await dispatchOrder(order.id,tracking); setLoading(false); if(r.success){onDispatch(order.id,tracking);setMsg("✅ Dispatched!");}else setMsg("❌ "+r.error); }} disabled={loading}>{loading?"⏳...":"📦 Mark as Dispatched"}</button>
          </div>
        )}
        {!isSeller && order.status==="dispatched" && (
          <button className="btn-green" style={{width:"100%",padding:"11px",marginBottom:10}} onClick={async()=>{ setLoading(true); const r=await confirmDelivery(order.id); setLoading(false); if(r.success){onConfirmDelivery(order.id);onClose();}else setMsg("❌ "+r.error); }} disabled={loading}>{loading?"⏳...":"✅ Order Mila — Confirm Karo"}</button>
        )}
        {["token_paid","dispatched"].includes(order.status) && !showDisputeForm && (
          <button className="btn-ghost" style={{width:"100%",marginBottom:8,color:"var(--red)",borderColor:"rgba(239,68,68,.3)"}} onClick={()=>setShowDisputeForm(true)}>⚠️ Dispute Raise Karo</button>
        )}
        {showDisputeForm && (
          <div style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",borderRadius:10,padding:12,marginBottom:12}}>
            <select className="select" value={disputeReason} onChange={e=>setDisputeReason(e.target.value)} style={{marginBottom:10}}>
              <option value="">-- Reason Select Karo --</option>
              {isSeller?(<><option value="Buyer not responding">Buyer respond nahi kar raha</option><option value="False claim">Buyer galat bol raha hai</option></>)
               :(<><option value="Item not received">Item nahi mila</option><option value="Wrong item">Galat item mila</option><option value="Damaged">Damaged mila</option><option value="Seller not responding">Seller respond nahi kar raha</option></>)}
            </select>
            <div style={{display:"flex",gap:8}}>
              <button className="btn-ghost" style={{flex:1}} onClick={()=>setShowDisputeForm(false)}>Cancel</button>
              <button className="btn-red" style={{flex:2,padding:"9px"}} onClick={async()=>{ if(!disputeReason){setMsg("❌ Reason select karo!"); return;} setLoading(true); const r=await raiseDispute(order.id,disputeReason,isSeller?"seller":"buyer"); setLoading(false); if(r.success){onDispute&&onDispute(order.id);setMsg("✅ Dispute raise ho gaya!");}else setMsg("❌ "+r.error); }} disabled={loading}>{loading?"⏳...":"Submit"}</button>
            </div>
          </div>
        )}
        {msg && <div style={{padding:10,borderRadius:8,background:"var(--sf2)",fontSize:13,marginBottom:10,color:msg.startsWith("✅")?"var(--green)":"var(--red)"}}>{msg}</div>}
        <button className="btn-ghost" style={{width:"100%"}} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

/* ══════════ LANDING ══════════ */
function Landing({ onEnter, dark, onToggle, lang, onLangToggle }) {
  const t = T[lang] || T.hl;
  const [tab, setTab] = useState("seller");
  return (
    <div style={{minHeight:"100vh"}}>
      <nav className="nav">
        <Logo />
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <LangToggle lang={lang} onToggle={onLangToggle} />
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <button className="btn-ghost" style={{padding:"7px 12px",fontSize:12}} onClick={()=>onEnter("buyer")}>Buyer</button>
          <button className="btn-gold" style={{padding:"7px 12px",fontSize:12}} onClick={()=>onEnter("seller")}>Seller</button>
        </div>
      </nav>
      <div style={{position:"relative",overflow:"hidden",padding:"clamp(40px,8vw,80px) clamp(16px,5vw,40px) clamp(40px,6vw,68px)",textAlign:"center",width:"100%",boxSizing:"border-box"}}>
        <div className="hero-glow" style={{background:dark?"rgba(240,180,41,.07)":"rgba(14,165,233,.09)",top:"-80px",left:"50%",transform:"translateX(-50%)"}} />
        <div style={{marginBottom:14}} className="fu"><span className="badge bo" style={{fontSize:12}}>🛡️ {t.tagline}</span></div>
        <h1 className="syne fu2" style={{fontSize:"clamp(28px,5.5vw,64px)",fontWeight:800,lineHeight:1.1,marginBottom:16}}>
          WhatsApp Deal Ka<br /><span className="shimmer">Sabse Safe Tarika</span>
        </h1>
        <p className="fu3" style={{color:"var(--muted)",fontSize:"clamp(14px,2vw,17px)",maxWidth:520,margin:"0 auto 32px",lineHeight:1.7}}>{t.heroDesc}</p>
        <div className="fu3" style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn-gold pulse" style={{fontSize:15,padding:"13px 34px"}} onClick={()=>onEnter("seller")}>{t.sellerBtn}</button>
          <button className="btn-outline" onClick={()=>onEnter("buyer")}>{t.buyerBtn}</button>
        </div>
      </div>
      <div style={{padding:"52px 40px",background:"var(--surface)"}}>
        <h2 className="syne" style={{textAlign:"center",fontSize:"clamp(22px,3vw,34px)",fontWeight:800,marginBottom:20}}>{t.howWorks}</h2>
        <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:24}}>
          {["seller","buyer"].map(tb=>(
            <button key={tb} onClick={()=>setTab(tb)} style={{padding:"7px 22px",borderRadius:8,cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:13,border:"1px solid var(--border)",background:tab===tb?"var(--gold)":"transparent",color:tab===tb?(dark?"#0a0a0f":"#fff"):"var(--muted)",transition:"all .2s"}}>{tb==="seller"?t.sellerView:t.buyerView}</button>
          ))}
        </div>
        <div style={{maxWidth:640,margin:"0 auto",display:"flex",flexDirection:"column",gap:10}}>
          {(tab==="seller"?[
            ["1","var(--gold)", lang==="en"?"Create Order Link":lang==="hi"?"ऑर्डर लिंक बनाएं":"Order Link Banao", lang==="en"?"Add product — token auto calculated":lang==="hi"?"प्रोडक्ट जोड़ें — टोकन अपने आप":"Product add karo — token auto calculate hoga"],
            ["2","var(--blue)", lang==="en"?"Share on WhatsApp":lang==="hi"?"व्हाट्सऐप पर भेजें":"WhatsApp pe Link Bhejo", lang==="en"?"Buyer clicks → direct payment → no login needed":lang==="hi"?"बायर क्लिक करे → सीधे पेमेंट":"Buyer click karega → seedha payment page"],
            ["3","var(--green)", lang==="en"?"Dispatch Confidently":lang==="hi"?"निश्चिंत होकर भेजें":"Confidently Dispatch Karo", lang==="en"?"Token secured → dispatch with tracking ID":lang==="hi"?"टोकन सुरक्षित → ट्रैकिंग ID के साथ":"Token secured → tracking ID ke saath dispatch karo"],
          ]:[
            ["1","var(--gold)", lang==="en"?"Click Link or Create Deal":lang==="hi"?"लिंक क्लिक करें या डील बनाएं":"Link pe Click Karo — Ya Deal Banao", lang==="en"?"Got seller's link? Click it. Or create your own deal":lang==="hi"?"सेलर का लिंक मिला? क्लिक करें":"Seller ka link aaya → click karo. Ya khud deal banao"],
            ["2","var(--blue)", lang==="en"?"Pay Token":lang==="hi"?"टोकन पेमेंट करें":"Token Pay Karo", lang==="en"?"UPI / Card / NetBanking — locked in escrow":lang==="hi"?"UPI / कार्ड — एस्क्रो में लॉक":"UPI / Card / NetBanking — escrow mein lock"],
            ["3","var(--green)", lang==="en"?"Safe Delivery":lang==="hi"?"सुरक्षित डिलीवरी":"Safe Delivery", lang==="en"?"Got it? Confirm. Didn't get it? Raise dispute":lang==="hi"?"मिला? कन्फर्म करें। नहीं मिला? विवाद":"Order aaya → confirm. Nahi aaya → dispute raise karo."],
          ]).map(([n,c,st,d])=>(
            <div key={n} className="step">
              <div className="step-num" style={{background:`${c}20`,color:c}}>{n}</div>
              <div><div style={{fontWeight:600,marginBottom:3,fontSize:14}}>{st}</div><div style={{fontSize:13,color:"var(--muted)"}}>{d}</div></div>
            </div>
          ))}
        </div>
      </div>
      {/* WHY ESCARAPAY */}
      <div style={{padding:"52px clamp(16px,5vw,40px)",background:"var(--sf2)"}}>
        <h2 className="syne" style={{textAlign:"center",fontSize:"clamp(22px,3vw,34px)",fontWeight:800,marginBottom:8}}>
          {lang==="en"?"Why EscaraPay?":lang==="hi"?"एस्करापे क्यों?":"Why EscaraPay?"}
        </h2>
        <p style={{textAlign:"center",color:"var(--muted)",fontSize:14,marginBottom:32}}>
          {lang==="en"?"The only escrow platform built for Indian social sellers":lang==="hi"?"भारतीय सोशल सेलर्स के लिए बना एकमात्र एस्क्रो प्लेटफॉर्म":"India ke social sellers ke liye banaya gaya pehla escrow platform"}
        </p>
        <div className="g3" style={{maxWidth:900,margin:"0 auto",gap:16}}>
          {[
            {icon:"🛡️",color:"rgba(14,165,233,.15)",bdr:"rgba(14,165,233,.3)",
              en:"Zero Fraud Risk",     hi:"शून्य धोखाधड़ी जोखिम",   hl:"Zero Fraud Risk",
              de:"Token locked in escrow — neither party can cheat", dh:"टोकन एस्क्रो में — कोई धोखा नहीं",dl:"Token escrow mein lock — koi cheating nahi"},
            {icon:"💰",color:"rgba(5,150,105,.15)",bdr:"rgba(5,150,105,.3)",
              en:"RTO Protection",      hi:"RTO सुरक्षा",             hl:"RTO Protection",
              de:"Buyer cancels? Token still goes to seller", dh:"बायर कैंसिल करे? टोकन सेलर को",dl:"Buyer cancel kare? Token fir bhi seller ko"},
            {icon:"⚡",color:"rgba(240,180,41,.15)",bdr:"rgba(240,180,41,.3)",
              en:"2 Min Setup",         hi:"2 मिनट में शुरू",         hl:"2 Min Setup",
              de:"Create order, share link, done. No app needed", dh:"ऑर्डर बनाएं, लिंक भेजें, बस",dl:"Order banao, link bhejo, ho gaya"},
            {icon:"📱",color:"rgba(124,58,237,.15)",bdr:"rgba(124,58,237,.3)",
              en:"WhatsApp Native",     hi:"व्हाट्सऐप नेटिव",        hl:"WhatsApp Native",
              de:"Direct link sharing on WhatsApp & Instagram", dh:"व्हाट्सऐप और इंस्टाग्राम पर डायरेक्ट",dl:"WhatsApp & Instagram pe direct link share"},
            {icon:"🔐",color:"rgba(14,165,233,.15)",bdr:"rgba(14,165,233,.3)",
              en:"Razorpay Secured",    hi:"रेजरपे सुरक्षित",        hl:"Razorpay Secured",
              de:"RBI-compliant payments, UPI/Card/NetBanking", dh:"RBI अनुपालन, UPI/कार्ड/नेटबैंकिंग",dl:"RBI-compliant, UPI/Card/NetBanking"},
            {icon:"⚖️",color:"rgba(239,68,68,.15)",bdr:"rgba(239,68,68,.3)",
              en:"Dispute Resolution",  hi:"विवाद समाधान",            hl:"Dispute Resolution",
              de:"24-hour investigation. Fair decision, always", dh:"24 घंटे में जांच। हमेशा निष्पक्ष",dl:"24 ghante mein investigation. Fair decision"},
          ].map(item=>(
            <div key={item.en} className="card" style={{background:item.color,borderColor:item.bdr,textAlign:"center",padding:20}}>
              <div style={{fontSize:32,marginBottom:10}}>{item.icon}</div>
              <div className="syne" style={{fontWeight:700,fontSize:14,marginBottom:6}}>
                {lang==="en"?item.en:lang==="hi"?item.hi:item.hl}
              </div>
              <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.6}}>
                {lang==="en"?item.de:lang==="hi"?item.dh:item.dl}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOKEN RELEASE */}
      <div style={{padding:"52px 40px"}}>
        <h2 className="syne" style={{textAlign:"center",fontSize:"clamp(20px,3vw,32px)",fontWeight:800,marginBottom:30}}>
          {lang==="en"?"When Does Token Get Released?":lang==="hi"?"टोकन कब और किसे मिलेगा?":"Token Kab Kiske Paas Jayega?"}
        </h2>
        <div className="g3" style={{maxWidth:820,margin:"0 auto"}}>
          {[
            {icon:"✅",bg:"rgba(5,150,105,.1)",bdr:"rgba(5,150,105,.22)",
             en:"Order Delivered",  hi:"ऑर्डर डिलीवर हुआ",  hl:"Order Deliver Hua",
             sub:"Token → Seller",
             de:"Auto-release after 7 days",dh:"7 दिन बाद ऑटो-रिलीज",dl:"7 din baad auto-release"},
            {icon:"❌",bg:"rgba(220,38,38,.1)",bdr:"rgba(220,38,38,.22)",
             en:"Buyer Cancels",   hi:"बायर ने कैंसिल किया",hl:"Buyer ne Cancel Kiya",
             sub:"Token → Seller",
             de:"Seller's shipping cover",dh:"सेलर का शिपिंग कवर",dl:"Seller ka shipping cover"},
            {icon:"🚫",bg:"rgba(14,165,233,.1)",bdr:"rgba(14,165,233,.22)",
             en:"Seller Didn't Ship",hi:"सेलर ने नहीं भेजा", hl:"Seller ne Nahi Bheja",
             sub:"Token → Buyer",
             de:"Full token refunded",dh:"पूरा टोकन वापस",dl:"Poora token wapas"},
          ].map(item=>(
            <div key={item.hl} className="card" style={{background:item.bg,borderColor:item.bdr,textAlign:"center"}}>
              <div style={{fontSize:30,marginBottom:10}}>{item.icon}</div>
              <div className="syne" style={{fontWeight:700,marginBottom:4,fontSize:14}}>
                {lang==="en"?item.en:lang==="hi"?item.hi:item.hl}
              </div>
              <div style={{color:"var(--gold)",fontWeight:700,marginBottom:8,fontSize:13}}>{item.sub}</div>
              <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.6}}>
                {lang==="en"?item.de:lang==="hi"?item.dh:item.dl}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{borderTop:"1px solid var(--border)",padding:"18px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <Logo />
        <div style={{color:"var(--muted)",fontSize:12}}>© 2026 EscaraPay. Secure Token-Based Payments for India.</div>
        <div style={{display:"flex",gap:16}}>
          {[["🏢 About","about"],["🔒 Privacy","privacy"],["📋 Terms","terms"],["📞 Contact","contact"]].map(([l,s])=>(
            <span key={l} style={{color:"var(--muted)",fontSize:12,cursor:"pointer"}} onClick={()=>window._goToPage(s)}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════ AUTH ══════════ */
// ── Validation helpers ──
const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
const validatePhone = (p) => /^\d{10}$/.test(p);
const validatePAN   = (p) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(p);
const validateGST   = (g) => /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1}$/.test(g);
const validatePass  = (p) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/.test(p);

function FieldError({ msg }) {
  if (!msg) return null;
  return <div style={{fontSize:11,color:"var(--red)",marginTop:3}}>⚠️ {msg}</div>;
}

/* ══════════ PROFILE MODAL ══════════ */
function ProfileModal({ user, userId, userType, onClose, onUpdate }) {
  const [form, setForm] = useState({ name: user, email: "", phone: "", password: "", newPass: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Naam zaroori hai";
    if (form.email && !validateEmail(form.email)) e.email = "Valid email daalo";
    if (form.phone && !validatePhone(form.phone)) e.phone = "Phone 10 digits ka hona chahiye";
    if (form.newPass && !validatePass(form.newPass)) e.newPass = "Min 6 chars, 1 capital, 1 small, 1 number, 1 special (!@#$)";
    return e;
  };

  const handleSave = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/users/${userId}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email || undefined, phone: form.phone || undefined, password: form.newPass || undefined }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) { setMsg("✅ Profile update ho gaya!"); onUpdate(form.name); }
      else setMsg("❌ " + data.error);
    } catch(e) { setLoading(false); setMsg("❌ Backend se connect nahi hua!"); }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={{maxWidth:380}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h3 className="syne" style={{fontWeight:800,fontSize:18}}>My Profile</h3>
          <button className="btn-ghost" style={{padding:"4px 10px",fontSize:12}} onClick={onClose}>✕</button>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,padding:12,background:"var(--sf2)",borderRadius:12}}>
          <div className="avatar" style={{width:44,height:44,fontSize:18}}>{user[0]}</div>
          <div><div style={{fontWeight:700,fontSize:15}}>{user}</div><div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>{userType === "seller" ? "🏪 Seller" : "🛍️ Buyer"}</div></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div>
            <label className="label">Full Name *</label>
            <input className="input" value={form.name} onChange={e=>{setForm({...form,name:e.target.value});setErrors({...errors,name:""});}} />
            <FieldError msg={errors.name} />
          </div>
          <div>
            <label className="label">Email (change karo)</label>
            <input className="input" placeholder="naya@email.com" value={form.email} onChange={e=>{setForm({...form,email:e.target.value});setErrors({...errors,email:""});}} />
            <FieldError msg={errors.email} />
          </div>
          <div>
            <label className="label">Phone (change karo)</label>
            <input className="input" placeholder="10 digit number" maxLength={10} value={form.phone} onChange={e=>{setForm({...form,phone:e.target.value.replace(/\D/g,"")});setErrors({...errors,phone:""});}} />
            <FieldError msg={errors.phone} />
          </div>
          <div>
            <label className="label">Naya Password (optional)</label>
            <input className="input" type="password" placeholder="••••••••" value={form.newPass} onChange={e=>{setForm({...form,newPass:e.target.value});setErrors({...errors,newPass:""});}} />
            <FieldError msg={errors.newPass} />
            <div style={{fontSize:11,color:"var(--muted)",marginTop:3}}>Min 6 chars, 1 capital, 1 small, 1 number, 1 special</div>
          </div>
          {msg && <div style={{padding:10,borderRadius:8,background:"var(--sf2)",fontSize:13,color:msg.startsWith("✅")?"var(--green)":"var(--red)"}}>{msg}</div>}
          <button className="btn-gold" style={{width:"100%",padding:12}} onClick={handleSave}>{loading?"⏳ Saving...":"💾 Save Changes"}</button>
        </div>
      </div>
    </div>
  );
}

function Auth({ type, onLogin, onBack, dark, onToggle }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({name:"",email:"",password:"",shop:"",phone:"",pan:"",gst:""});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (mode === "register") {
      if (!form.name.trim()) e.name = "Naam zaroori hai";
      if (!validateEmail(form.email)) e.email = "Valid email daalo (example@gmail.com)";
      if (!validatePhone(form.phone)) e.phone = "Sirf 10 digits — koi alphabet nahi";
      if (!validatePass(form.password)) e.password = "Min 6 chars, 1 capital, 1 small, 1 number, 1 special char (!@#$%)";
      if (type === "seller" && form.pan && !validatePAN(form.pan)) e.pan = "PAN format: ABCDE1234F (5 letters, 4 digits, 1 letter)";
      if (type === "seller" && form.gst && !validateGST(form.gst)) e.gst = "GST 15 characters ka hona chahiye";
      if (type === "seller" && !form.pan && !form.gst) e.pan = "PAN ya GST mein se ek zaroori hai";
    } else {
      if (!validateEmail(form.email)) e.email = "Valid email daalo";
      if (!form.password) e.password = "Password daalo";
    }
    return e;
  };

  const handle = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setLoading(true);
    const result = mode==="register"
      ? await registerUser(form.name,form.email,form.phone,type,form.password,form.shop||"",form.pan||"",form.gst||"")
      : await loginUser(form.email,form.password,type);
    setLoading(false);
    if (result.success) {
      const u = result.data.user;
      onLogin(type, u.name, u.id, u.phone||form.phone||"");
    } else alert("❌ " + result.error);
  };

  const setField = (field, val) => { setForm({...form,[field]:val}); setErrors({...errors,[field]:""}); };

  return (
    <div style={{minHeight:"100vh"}}>
      <nav className="nav"><Logo /><div style={{display:"flex",gap:8,alignItems:"center"}}><ThemeToggle dark={dark} onToggle={onToggle} /><button className="btn-ghost" onClick={onBack}>← Back</button></div></nav>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"calc(100vh - 62px)",padding:20}}>
        <div className="modal" style={{maxWidth:410}}>
          <div style={{textAlign:"center",marginBottom:22}}>
            <img src={LOGO_SRC} alt="EscaraPay" style={{height:52,marginBottom:12,objectFit:"contain"}} onError={e=>e.target.style.display="none"} />
            <h2 className="syne" style={{fontWeight:800,fontSize:21,marginBottom:4}}>{mode==="login"?"Welcome Back!":`${type==="seller"?"Seller":"Buyer"} Register Karo`}</h2>
          </div>
          <div style={{display:"flex",gap:5,marginBottom:20,background:"var(--sf2)",padding:4,borderRadius:10}}>
            {["login","register"].map(m=>(
              <button key={m} onClick={()=>{setMode(m);setErrors({});}} style={{flex:1,padding:"8px",border:"none",borderRadius:8,cursor:"pointer",background:mode===m?"var(--gold)":"transparent",color:mode===m?(dark?"#0a0a0f":"#fff"):"var(--muted)",fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:13,transition:"all .2s"}}>{m==="login"?"Login":"Register"}</button>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {mode==="register" && (
              <div>
                <label className="label">Full Name *</label>
                <input className="input" placeholder="Meena Devi" value={form.name} onChange={e=>setField("name",e.target.value)} />
                <FieldError msg={errors.name} />
              </div>
            )}
            {mode==="register"&&type==="seller" && (
              <div>
                <label className="label">Shop Name</label>
                <input className="input" placeholder="Meena Crafts" value={form.shop} onChange={e=>setField("shop",e.target.value)} />
              </div>
            )}
            <div>
              <label className="label">Email *</label>
              <input className="input" placeholder="aapki@email.com" type="email" value={form.email} onChange={e=>setField("email",e.target.value)} />
              <FieldError msg={errors.email} />
            </div>
            {mode==="register" && (
              <div>
                <label className="label">Phone Number * (10 digits)</label>
                <input className="input" placeholder="9876543210" maxLength={10} value={form.phone} onChange={e=>setField("phone",e.target.value.replace(/\D/g,""))} />
                <FieldError msg={errors.phone} />
              </div>
            )}
            <div>
              <label className="label">Password *</label>
              <input className="input" type="password" placeholder="••••••••" value={form.password} onChange={e=>setField("password",e.target.value)} />
              <FieldError msg={errors.password} />
              {mode==="register" && !errors.password && <div style={{fontSize:11,color:"var(--muted)",marginTop:3}}>Min 6 chars, 1 capital, 1 small, 1 number, 1 special (!@#$%)</div>}
            </div>
            {mode==="register"&&type==="seller" && (
              <div style={{background:"rgba(14,165,233,.08)",border:"1px solid rgba(14,165,233,.2)",borderRadius:10,padding:12}}>
                <div style={{fontSize:12,fontWeight:600,marginBottom:8,color:"var(--gold)"}}>📋 KYC (Dono mein se ek zaroori)</div>
                <div>
                  <label className="label">PAN Card (ABCDE1234F)</label>
                  <input className="input" placeholder="ABCDE1234F" value={form.pan} maxLength={10} onChange={e=>setField("pan",e.target.value.replace(/[^A-Z0-9]/g,"").toUpperCase())} style={{marginBottom:4}} />
                  <FieldError msg={errors.pan} />
                </div>
                <div style={{textAlign:"center",fontSize:12,color:"var(--muted)",margin:"8px 0"}}>— ya —</div>
                <div>
                  <label className="label">GST Number (15 chars)</label>
                  <input className="input" placeholder="27ABCDE1234F1Z5" value={form.gst} maxLength={15} onChange={e=>setField("gst",e.target.value.replace(/[^A-Z0-9]/g,"").toUpperCase())} style={{marginBottom:4}} />
                  <FieldError msg={errors.gst} />
                </div>
              </div>
            )}
            <button className="btn-gold" style={{width:"100%",padding:12}} onClick={handle}>{loading?"⏳ Processing...":mode==="login"?"Login Karo":"Account Banao"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════ SELLER DASHBOARD ══════════ */
function SellerDB({ user, userId, onLogout, dark, onToggle }) {
  const [page, setPage] = useState("dashboard");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [showOrder, setShowOrder] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [userName, setUserName] = useState(user);
  const [newOrder, setNewOrder] = useState({product:"",amount:"",buyer_name:"",buyer_phone:"",token_pct:"10"});
  const [createdLink, setCreatedLink] = useState(null);
  const [creating, setCreating] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(()=>{
    const load = async()=>{ setLoadingOrders(true); const r=await getSellerOrders(userId); if(r.success) setOrders(r.data.orders||[]); setLoadingOrders(false); };
    if(userId) load();
  },[userId]);

  const stats = {
    total: orders.length,
    active: orders.filter(o=>["token_paid","dispatched"].includes(o.status)).length,
    earned: orders.filter(o=>o.status==="delivered").reduce((a,o)=>a+(o.seller_receives||0),0),
    saved: orders.filter(o=>o.status==="cancelled_buyer").reduce((a,o)=>a+(o.seller_receives||0),0),
  };

  const tokenPreview = newOrder.amount ? calcToken(newOrder.amount,newOrder.token_pct) : 0;
  const rawToken = newOrder.amount ? Math.round(Number(newOrder.amount)*Number(newOrder.token_pct)/100) : 0;
  const minApplied = newOrder.amount && rawToken < MIN_TOKEN;
  const filteredOrders = filterStatus==="all" ? orders : orders.filter(o=>o.status===filterStatus);

  const handleCreateOrder = async()=>{
    if(!newOrder.product||!newOrder.amount) return;
    setCreating(true);
    const r = await apiCreateOrder(userId,newOrder.product,Number(newOrder.amount),Number(newOrder.token_pct),newOrder.buyer_name,newOrder.buyer_phone);
    setCreating(false);
    if(r.success){ setOrders([r.data.order,...orders]); setCreatedLink(r.data.paymentLink); setNewOrder({product:"",amount:"",buyer_name:"",buyer_phone:"",token_pct:"10"}); }
    else alert("❌ "+r.error);
  };

  const copyLink = (orderId) => { navigator.clipboard?.writeText(`${BASE_URL}/pay/${orderId}`); setToast("Link copied! WhatsApp pe bhejo 🚀"); };
  const shareWhatsApp = (orderId, productName, tokenAmount) => {
    const link = `${BASE_URL}/pay/${orderId}`;
    const msg = `🛡️ *EscaraPay Secure Payment*\n\nProduct: ${productName}\nToken Amount: ₹${tokenAmount}\n\nSecure link se pay karo:\n${link}\n\n_Powered by EscaraPay_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const nav = [{id:"dashboard",icon:"📊",label:"Dashboard"},{id:"orders",icon:"📦",label:"Orders"},{id:"analytics",icon:"📈",label:"Analytics"},{id:"payments",icon:"💰",label:"Payments"},{id:"settings",icon:"⚙️",label:"Settings"}];

  return (
    <div style={{minHeight:"100vh"}}>
      {toast && <Toast msg={toast} onDone={()=>setToast("")} />}
      {showProfile && <ProfileModal user={userName} userId={userId} userType="seller" onClose={()=>setShowProfile(false)} onUpdate={(n)=>setUserName(n)} />}
      <nav className="nav">
        <Logo />
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <span className="badge bg hide-m">● Live</span>
          <div className="avatar" style={{cursor:"pointer"}} onClick={()=>setShowProfile(true)} title="Profile">{userName[0]}</div>
          <span className="hide-m" style={{fontSize:13,fontWeight:500,cursor:"pointer"}} onClick={()=>setShowProfile(true)}>{userName}</span>
          <button className="btn-ghost" style={{fontSize:12,padding:"6px 12px"}} onClick={onLogout}>Logout</button>
        </div>
      </nav>
      <div className="sidebar">
        <div style={{marginBottom:16,padding:"0 8px"}}><div style={{fontSize:10,color:"var(--muted)",fontWeight:700,textTransform:"uppercase",letterSpacing:".6px"}}>Seller Panel</div></div>
        {nav.map(n=>(<div key={n.id} className={`si ${page===n.id?"active":""}`} onClick={()=>setPage(n.id)}><span>{n.icon}</span><span>{n.label}</span></div>))}
        <div style={{marginTop:"auto",paddingTop:16}}>
          <div className="card" style={{padding:14,background:"rgba(14,165,233,.08)",borderColor:"rgba(14,165,233,.2)"}}>
            <div style={{fontSize:11,color:"var(--gold)",fontWeight:700,marginBottom:4}}>Free Plan</div>
            <div style={{fontSize:12,color:"var(--muted)",marginBottom:10}}>5 orders/month free</div>
            <button className="btn-gold" style={{width:"100%",padding:"8px",fontSize:12}}>Upgrade Pro →</button>
          </div>
        </div>
      </div>
      {/* Mobile Bottom Nav */}
      <div className="mobile-nav">
        {nav.slice(0,4).map(n=>(<div key={n.id} className={`mni ${page===n.id?"active":""}`} onClick={()=>setPage(n.id)}><span>{n.icon}</span><span>{n.label}</span></div>))}
        <div className="mni" onClick={onLogout}><span>🚪</span><span>Logout</span></div>
      </div>
      <div className="main">
        {page==="dashboard" && (
          <div className="fu">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22,flexWrap:"wrap",gap:10}}>
              <div><h1 className="syne" style={{fontSize:"clamp(18px,3vw,26px)",fontWeight:800}}>Namaste, {user}! 👋</h1><p style={{color:"var(--muted)",marginTop:3,fontSize:13}}>Aaj ka overview</p></div>
              <button className="btn-gold" style={{fontSize:13,padding:"9px 16px"}} onClick={()=>setShowCreate(true)}>+ New Order</button>
            </div>
            <div className="g4" style={{marginBottom:18}}>
              {[{label:"Total Orders",value:stats.total,icon:"📦",color:"var(--gold)"},{label:"Active Escrows",value:stats.active,icon:"🔐",color:"var(--blue)"},{label:"Token Earned",value:`₹${stats.earned}`,icon:"💰",color:"var(--green)"},{label:"RTO Saved",value:`₹${stats.saved}`,icon:"🛡️",color:"var(--accent)"}].map(s=>(
                <div key={s.label} className="stat-card">
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div><div style={{fontSize:11,color:"var(--muted)",marginBottom:6}}>{s.label}</div><div className="syne" style={{fontSize:22,fontWeight:800,color:s.color}}>{s.value}</div></div>
                    <span style={{fontSize:20}}>{s.icon}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="card" style={{overflowX:"auto"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <h3 className="syne" style={{fontWeight:700,fontSize:16}}>Recent Orders</h3>
                <button className="btn-ghost" style={{padding:"5px 12px",fontSize:12}} onClick={()=>setPage("orders")}>View All →</button>
              </div>
              {loadingOrders ? <div style={{textAlign:"center",padding:30,color:"var(--muted)"}}>⏳ Loading...</div>
               : orders.length===0 ? <div style={{textAlign:"center",padding:40,color:"var(--muted)"}}><div style={{fontSize:40,marginBottom:10}}>📦</div><div style={{fontWeight:600,marginBottom:6}}>Koi order nahi!</div><button className="btn-gold" style={{marginTop:8}} onClick={()=>setShowCreate(true)}>+ New Order Link</button></div>
               : (
                <table className="tbl">
                  <thead><tr><th>ID</th><th>Buyer</th><th>Product</th><th>Amount</th><th>Token</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {orders.slice(0,5).map(o=>(
                      <tr key={o.id}>
                        <td><span style={{fontFamily:"monospace",color:"var(--gold)",fontSize:12}}>{o.id}</span></td>
                        <td>{o.buyer_name||"—"}</td><td style={{color:"var(--muted)"}}>{o.product_name}</td>
                        <td style={{fontWeight:600}}>₹{o.order_amount}</td><td style={{color:"var(--green)",fontWeight:600}}>₹{o.token_amount}</td>
                        <td><Bdg status={o.status} /></td>
                        <td><div style={{display:"flex",gap:4}}>
                          <button className="btn-ghost" style={{padding:"4px 8px",fontSize:11}} onClick={()=>setShowOrder(o)}>Manage</button>
                          {o.status==="pending" && <button className="btn-whatsapp" style={{padding:"4px 8px",fontSize:11}} onClick={()=>shareWhatsApp(o.id,o.product_name,o.token_amount)}>🟢</button>}
                        </div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {page==="orders" && (
          <div className="fu">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,flexWrap:"wrap",gap:10}}>
              <h1 className="syne" style={{fontSize:"clamp(18px,3vw,26px)",fontWeight:800}}>All Orders</h1>
              <button className="btn-gold" style={{fontSize:13,padding:"9px 16px"}} onClick={()=>setShowCreate(true)}>+ New Order</button>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:18}}>
              <div className={`chip ${filterStatus==="all"?"active":""}`} onClick={()=>setFilterStatus("all")}>All ({orders.length})</div>
              {Object.entries(STATUS_META).map(([key,val])=>{ const count=orders.filter(o=>o.status===key).length; if(!count) return null; return <div key={key} className={`chip ${filterStatus===key?"active":""}`} onClick={()=>setFilterStatus(key)}>{val.icon} {val.label} ({count})</div>; })}
            </div>
            <div className="card" style={{padding:0,overflowX:"auto"}}>
              {loadingOrders ? <div style={{textAlign:"center",padding:30,color:"var(--muted)"}}>⏳ Loading...</div> : (
                <table className="tbl">
                  <thead><tr><th>ID</th><th>Date</th><th>Buyer</th><th>Product</th><th>Amount</th><th>Token</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {filteredOrders.length===0 ? <tr><td colSpan={8} style={{textAlign:"center",color:"var(--muted)",padding:30}}>Koi order nahi</td></tr>
                     : filteredOrders.map(o=>(
                      <tr key={o.id}>
                        <td><span style={{fontFamily:"monospace",color:"var(--gold)",fontSize:11}}>{o.id}</span></td>
                        <td style={{color:"var(--muted)",fontSize:11}}>{(o.created_at||"").split("T")[0]}</td>
                        <td>{o.buyer_name||"—"}</td><td style={{color:"var(--muted)"}}>{o.product_name}</td>
                        <td style={{fontWeight:600}}>₹{o.order_amount}</td><td style={{color:"var(--green)",fontWeight:600}}>₹{o.token_amount}</td>
                        <td><Bdg status={o.status} /></td>
                        <td><div style={{display:"flex",gap:4}}>
                          <button className="btn-ghost" style={{padding:"4px 8px",fontSize:11}} onClick={()=>setShowOrder(o)}>Manage</button>
                          {o.status==="pending" && <button className="btn-ghost" style={{padding:"4px 8px",fontSize:11,color:"var(--gold)"}} onClick={()=>copyLink(o.id)}>📋</button>}
                          {o.status==="pending" && <button className="btn-whatsapp" style={{padding:"4px 8px",fontSize:11}} onClick={()=>shareWhatsApp(o.id,o.product_name,o.token_amount)}>🟢</button>}
                        </div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {page==="analytics" && (
          <div className="fu">
            <h1 className="syne" style={{fontSize:"clamp(18px,3vw,26px)",fontWeight:800,marginBottom:22}}>Analytics</h1>
            <div className="g2">
              <div className="card">
                <h3 className="syne" style={{fontWeight:700,marginBottom:16,fontSize:15}}>Status Breakdown</h3>
                {orders.length===0 ? <div style={{color:"var(--muted)",fontSize:13}}>Koi orders nahi</div> : Object.entries(STATUS_META).map(([key,val])=>{ const count=orders.filter(o=>o.status===key).length; if(!count) return null; const pct=Math.round((count/orders.length)*100); return (<div key={key} style={{marginBottom:13}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12}}>{val.icon} {val.label}</span><span style={{fontSize:12,color:"var(--muted)"}}>{count} ({pct}%)</span></div><div className="pbar"><div className="pfill" style={{width:`${pct}%`}} /></div></div>); })}
              </div>
              <div className="card">
                <h3 className="syne" style={{fontWeight:700,marginBottom:16,fontSize:15}}>Revenue</h3>
                {[["Total Orders",orders.length],["GMV",`₹${orders.reduce((a,o)=>a+(o.order_amount||0),0).toLocaleString()}`],["Token Collected",`₹${orders.reduce((a,o)=>a+(o.token_amount||0),0).toLocaleString()}`],["Commission",`₹${orders.reduce((a,o)=>a+(o.escara_commission||0),0)}`]].map(([l,v])=>(
                  <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid var(--border)"}}><span style={{color:"var(--muted)",fontSize:13}}>{l}</span><span className="syne" style={{fontWeight:700,color:"var(--gold)"}}>{v}</span></div>
                ))}
              </div>
            </div>
          </div>
        )}
        {page==="payments" && (
          <div className="fu">
            <h1 className="syne" style={{fontSize:"clamp(18px,3vw,26px)",fontWeight:800,marginBottom:6}}>Payments & Earnings 💰</h1>
            <p style={{color:"var(--muted)",fontSize:13,marginBottom:22}}>Tumhare saare transactions aur earnings ka overview</p>

            {/* Summary Cards */}
            <div className="g3" style={{marginBottom:20}}>
              {[
                {label:"Total Token Collected",value:`₹${orders.filter(o=>o.status!=="pending").reduce((a,o)=>a+(o.token_amount||0),0).toLocaleString()}`,icon:"💰",color:"var(--gold)"},
                {label:"Earnings Released",value:`₹${orders.filter(o=>o.status==="delivered").reduce((a,o)=>a+(o.seller_receives||0),0).toLocaleString()}`,icon:"✅",color:"var(--green)"},
                {label:"In Escrow (Hold)",value:`₹${orders.filter(o=>["token_paid","dispatched"].includes(o.status)).reduce((a,o)=>a+(o.seller_receives||0),0).toLocaleString()}`,icon:"🔐",color:"var(--blue)"},
              ].map(s=>(
                <div key={s.label} className="stat-card">
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div><div style={{fontSize:11,color:"var(--muted)",marginBottom:6}}>{s.label}</div><div className="syne" style={{fontSize:22,fontWeight:800,color:s.color}}>{s.value}</div></div>
                    <span style={{fontSize:22}}>{s.icon}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Fee Structure */}
            <div className="card" style={{marginBottom:16}}>
              <h3 className="syne" style={{fontWeight:700,fontSize:15,marginBottom:16}}>💡 Fee Structure</h3>
              <div style={{display:"flex",flexDirection:"column",gap:0}}>
                {[
                  {label:"Token Amount (min)", value:"₹200", color:"var(--text)"},
                  {label:"Gateway Fee (Buyer pays)", value:"2%", color:"var(--muted)"},
                  {label:"EscaraPay Commission", value:"5%", color:"var(--red)"},
                  {label:"Seller ko milta hai", value:"95% of token", color:"var(--green)", bold:true},
                  {label:"Buyer Cancel hone par", value:"Token → Seller ✅", color:"var(--green)"},
                  {label:"Seller ship na kare", value:"Token → Buyer ↩️", color:"var(--blue)"},
                ].map(r=>(
                  <div key={r.label} style={{display:"flex",justifyContent:"space-between",padding:"11px 0",borderBottom:"1px solid var(--border)"}}>
                    <span style={{fontSize:13,color:"var(--muted)"}}>{r.label}</span>
                    <span style={{fontSize:13,fontWeight:r.bold?700:600,color:r.color}}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction History */}
            <div className="card" style={{marginBottom:16}}>
              <h3 className="syne" style={{fontWeight:700,fontSize:15,marginBottom:16}}>📋 Order-wise Earnings</h3>
              {orders.length===0 ? (
                <div style={{textAlign:"center",padding:30,color:"var(--muted)"}}>Koi orders nahi abhi</div>
              ) : (
                <div style={{overflowX:"auto"}}>
                  <table className="tbl">
                    <thead><tr><th>Order ID</th><th>Product</th><th>Order Amt</th><th>Token</th><th>Commission</th><th>Tumhe Milega</th><th>Status</th></tr></thead>
                    <tbody>
                      {orders.map(o=>(
                        <tr key={o.id}>
                          <td><span style={{fontFamily:"monospace",color:"var(--gold)",fontSize:11}}>{o.id}</span></td>
                          <td style={{fontSize:12,color:"var(--muted)"}}>{o.product_name}</td>
                          <td style={{fontSize:12}}>₹{o.order_amount}</td>
                          <td style={{color:"var(--blue)",fontWeight:600,fontSize:12}}>₹{o.token_amount}</td>
                          <td style={{color:"var(--red)",fontSize:12}}>-₹{o.escara_commission||0}</td>
                          <td style={{color:"var(--green)",fontWeight:700,fontSize:12}}>₹{o.seller_receives||0}</td>
                          <td><Bdg status={o.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Payout Info */}
            <div style={{background:"rgba(14,165,233,.08)",border:"1px solid rgba(14,165,233,.2)",borderRadius:12,padding:16}}>
              <div className="syne" style={{fontWeight:700,fontSize:14,marginBottom:10}}>🏦 Payout System — Aata Hai Jaldi!</div>
              <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.8}}>
                Abhi test mode mein hain — payments simulate hoti hain. Jab Razorpay KYC complete hoga tab:<br/>
                ✅ Direct bank transfer within 2-3 business days<br/>
                ✅ UPI instant payout<br/>
                ✅ Withdrawal history dashboard<br/>
                ✅ GST invoice generation
              </div>
            </div>
          </div>
        )}
        {page==="settings" && (
          <div className="fu">
            <h1 className="syne" style={{fontSize:"clamp(18px,3vw,26px)",fontWeight:800,marginBottom:22}}>Settings</h1>
            <div className="card" style={{maxWidth:460}}>
              <h3 className="syne" style={{fontWeight:700,marginBottom:16,fontSize:15}}>Profile</h3>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                <div><label className="label">Shop Name</label><input className="input" defaultValue={user} /></div>
                <div><label className="label">Phone</label><input className="input" placeholder="9876543210" /></div>
                <div><label className="label">UPI ID</label><input className="input" placeholder="yourname@upi" /></div>
                <button className="btn-gold">Save Changes</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showCreate && (
        <div className="overlay" onClick={()=>{ if(!createdLink) setShowCreate(false); }}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            {!createdLink ? (
              <>
                <h3 className="syne" style={{fontWeight:800,fontSize:20,marginBottom:4}}>New Escrow Order</h3>
                <p style={{color:"var(--muted)",fontSize:13,marginBottom:20}}>Buyer ke liye secure payment link banao</p>
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  <div><label className="label">Product Name *</label><input className="input" placeholder="Handmade Bag" value={newOrder.product} onChange={e=>setNewOrder({...newOrder,product:e.target.value})} /></div>
                  <div className="g2">
                    <div><label className="label">Order Amount (₹) *</label><input className="input" type="number" placeholder="1500" value={newOrder.amount} onChange={e=>setNewOrder({...newOrder,amount:e.target.value})} /></div>
                    <div><label className="label">Token %</label><select className="select" value={newOrder.token_pct} onChange={e=>setNewOrder({...newOrder,token_pct:e.target.value})}><option value="5">5%</option><option value="10">10%</option><option value="15">15%</option><option value="20">20%</option></select></div>
                  </div>
                  {newOrder.amount && <div style={{background:"rgba(14,165,233,.1)",border:"1px solid rgba(14,165,233,.25)",borderRadius:10,padding:14}}><div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Buyer Bharenga</div><div className="syne" style={{fontSize:24,fontWeight:800,color:"var(--gold)"}}>₹{Math.round(tokenPreview*1.02)}</div>{minApplied&&<div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>Min ₹200 applied</div>}</div>}
                  <div><label className="label">Buyer Name</label><input className="input" placeholder="Rahul Sharma" value={newOrder.buyer_name} onChange={e=>setNewOrder({...newOrder,buyer_name:e.target.value})} /></div>
                  <div><label className="label">Buyer WhatsApp *</label><input className="input" placeholder="9876543210" value={newOrder.buyer_phone} onChange={e=>setNewOrder({...newOrder,buyer_phone:e.target.value})} /></div>
                  <div style={{display:"flex",gap:10}}>
                    <button className="btn-ghost" style={{flex:1}} onClick={()=>setShowCreate(false)}>Cancel</button>
                    <button className="btn-gold" style={{flex:2}} onClick={handleCreateOrder} disabled={!newOrder.product||!newOrder.amount||creating}>{creating?"⏳ Bana raha hai...":"🔗 Generate Link"}</button>
                  </div>
                </div>
              </>
            ) : (
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:46,marginBottom:12}}>🎉</div>
                <h3 className="syne" style={{fontWeight:800,fontSize:21,marginBottom:8}}>Order Link Ready!</h3>
                <div style={{background:"var(--sf2)",borderRadius:10,padding:12,marginBottom:14,border:"1px solid var(--border)",wordBreak:"break-all"}}><code style={{fontSize:12,color:"var(--gold)"}}>{createdLink}</code></div>
                <div style={{display:"flex",gap:8}}>
                  <button className="btn-ghost" style={{flex:1}} onClick={()=>{ navigator.clipboard?.writeText(createdLink); setToast("Link copied!"); }}>📋 Copy</button>
                  <button className="btn-whatsapp" style={{flex:1,justifyContent:"center"}} onClick={()=>{ window.open(`https://wa.me/?text=${encodeURIComponent("🛡️ EscaraPay Payment Link:\n"+createdLink)}`, "_blank"); }}>🟢 WhatsApp</button>
                  <button className="btn-gold" style={{flex:1}} onClick={()=>{ setCreatedLink(null); setShowCreate(false); }}>Done ✅</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {showOrder && <OrderModal order={showOrder} isSeller onClose={()=>setShowOrder(null)} onDispatch={(id,tx)=>{ setOrders(orders.map(o=>o.id===id?{...o,status:"dispatched",tracking_number:tx}:o)); setShowOrder(null); }} onConfirmDelivery={(id)=>setOrders(orders.map(o=>o.id===id?{...o,status:"delivered"}:o))} onDispute={(id)=>setOrders(orders.map(o=>o.id===id?{...o,status:"disputed"}:o))} />}
    </div>
  );
}

/* ══════════ BUYER DASHBOARD ══════════ */
function BuyerDB({ user, userId, userPhone, onLogout, dark, onToggle }) {
  const [page, setPage] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showOrder, setShowOrder] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [userName, setUserName] = useState(user);
  const [payStep, setPayStep] = useState(0);
  const [payError, setPayError] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [linkOrder, setLinkOrder] = useState(null);
  const [linkLoading, setLinkLoading] = useState(false);
  const [linkError, setLinkError] = useState("");
  const [toast, setToast] = useState("");
  const [dealForm, setDealForm] = useState({product:"",amount:"",token_pct:"10",seller_name:"",seller_phone:""});
  const [dealCreating, setDealCreating] = useState(false);
  const [dealLink, setDealLink] = useState(null);

  useEffect(()=>{
    const load=async()=>{ setLoadingOrders(true); if(userPhone&&userPhone.trim()!==""){const r=await getBuyerOrders(userPhone.trim()); if(r.success) setOrders(r.data.orders||[]);} setLoadingOrders(false); };
    load();
  },[userPhone]);

  const loadRazorpay = () => new Promise(resolve=>{
    if(document.getElementById("rzp-script")){resolve(true);return;}
    const s=document.createElement("script"); s.id="rzp-script";
    s.src="https://checkout.razorpay.com/v1/checkout.js";
    s.onload=()=>resolve(true); s.onerror=()=>resolve(false);
    document.body.appendChild(s);
  });

  const handlePay = async(order)=>{
    setPayError(""); setPayStep(1);
    const loaded=await loadRazorpay();
    if(!loaded){setPayError("Razorpay load nahi hua.");setPayStep(0);return;}
    const result=await createPaymentOrder(order.id);
    if(!result.success){setPayError(result.error);setPayStep(0);return;}
    const {razorpayOrderId,amount,keyId}=result.data;
    setPayStep(0);
    new window.Razorpay({
      key:keyId||process.env.REACT_APP_RAZORPAY_KEY_ID, amount, currency:"INR", name:"EscaraPay",
      description:`Token: ${order.product_name}`, order_id:razorpayOrderId,
      handler:async(response)=>{
        setPayStep(2);
        const verify=await verifyPayment(response.razorpay_order_id,response.razorpay_payment_id,response.razorpay_signature,order.id);
        if(verify.success){setPayStep(3);setOrders(prev=>prev.map(o=>o.id===order.id?{...o,status:"token_paid"}:o));setLinkOrder(prev=>prev&&prev.id===order.id?{...prev,status:"token_paid"}:prev);setTimeout(()=>{setPayStep(0);},2500);}
        else{setPayError("Verify failed: "+verify.error);setPayStep(0);}
      },
      prefill:{name:user}, theme:{color:"#f0b429"},
      modal:{ondismiss:()=>setPayStep(0)},
    }).open();
  };

  const fetchLinkOrder=async()=>{
    setLinkError(""); setLinkOrder(null);
    if(!linkInput){setLinkError("Link paste karo!");return;}
    const match=linkInput.match(/EP[A-Z0-9]+/);
    if(!match){setLinkError("Valid EscaraPay link nahi hai!");return;}
    setLinkLoading(true);
    const r=await getOrderById(match[0]);
    setLinkLoading(false);
    if(r.success) setLinkOrder(r.data.order);
    else setLinkError("Order nahi mila: "+r.error);
  };

  const handleCreateDeal = async()=>{
    if(!dealForm.product||!dealForm.amount){alert("❌ Product aur amount zaroori hain!"); return;}
    setDealCreating(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders/buyer-create`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ buyer_id:userId, buyer_name:user, buyer_phone:userPhone, product_name:dealForm.product, order_amount:Number(dealForm.amount), token_pct:Number(dealForm.token_pct), seller_name:dealForm.seller_name, seller_phone:dealForm.seller_phone }),
      });
      const data = await res.json();
      setDealCreating(false);
      if (data.success) { setDealLink(data.dealLink); setDealForm({product:"",amount:"",token_pct:"10",seller_name:"",seller_phone:""}); }
      else alert("❌ "+data.error);
    } catch(e) { setDealCreating(false); alert("❌ Backend se connect nahi hua!"); }
  };

  const tokenPreview2 = dealForm.amount ? calcToken(dealForm.amount, dealForm.token_pct) : 0;
  const filteredOrders = filterStatus==="all" ? orders : orders.filter(o=>o.status===filterStatus);

  const nav = [{id:"orders",icon:"📦",label:"My Orders"},{id:"pay_order",icon:"🔗",label:"Pay via Link"},{id:"create_deal",icon:"🤝",label:"Create Deal"},{id:"help",icon:"❓",label:"Help"}];

  return (
    <div style={{minHeight:"100vh"}}>
      {toast && <Toast msg={toast} onDone={()=>setToast("")} />}
      {showProfile && <ProfileModal user={userName} userId={userId} userType="buyer" onClose={()=>setShowProfile(false)} onUpdate={(n)=>setUserName(n)} />}
      <nav className="nav">
        <Logo />
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <div className="avatar" style={{background:"linear-gradient(135deg,var(--blue),var(--accent))",cursor:"pointer"}} onClick={()=>setShowProfile(true)} title="Profile">{userName[0]}</div>
          <span className="hide-m" style={{fontSize:13,fontWeight:500,cursor:"pointer"}} onClick={()=>setShowProfile(true)}>{userName}</span>
          <button className="btn-ghost" style={{fontSize:12,padding:"6px 12px"}} onClick={onLogout}>Logout</button>
        </div>
      </nav>
      <div className="sidebar">
        <div style={{marginBottom:16,padding:"0 8px"}}><div style={{fontSize:10,color:"var(--muted)",fontWeight:700,textTransform:"uppercase",letterSpacing:".6px"}}>Buyer Panel</div></div>
        {nav.map(n=>(<div key={n.id} className={`si ${page===n.id?"active":""}`} onClick={()=>setPage(n.id)}><span>{n.icon}</span><span>{n.label}</span></div>))}
      </div>
      {/* Mobile Bottom Nav */}
      <div className="mobile-nav">
        {nav.map(n=>(<div key={n.id} className={`mni ${page===n.id?"active":""}`} onClick={()=>setPage(n.id)}><span>{n.icon}</span><span>{n.label}</span></div>))}
        <div className="mni" onClick={onLogout}><span>🚪</span><span>Logout</span></div>
      </div>
      <div className="main">
        {page==="orders" && (
          <div className="fu">
            <h1 className="syne" style={{fontSize:"clamp(18px,3vw,26px)",fontWeight:800,marginBottom:18}}>My Orders</h1>
            {(!userPhone||userPhone.trim()==="") && <div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",borderRadius:10,padding:14,marginBottom:16,fontSize:13}}>⚠️ Phone number nahi mila! Logout karke dobara login karo.</div>}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:18}}>
              <div className={`chip ${filterStatus==="all"?"active":""}`} onClick={()=>setFilterStatus("all")}>All ({orders.length})</div>
              {Object.entries(STATUS_META).map(([key,val])=>{ const count=orders.filter(o=>o.status===key).length; if(!count) return null; return <div key={key} className={`chip ${filterStatus===key?"active":""}`} onClick={()=>setFilterStatus(key)}>{val.icon} {val.label} ({count})</div>; })}
            </div>
            {loadingOrders ? <div style={{textAlign:"center",padding:40,color:"var(--muted)"}}>⏳ Orders load ho rahe hain...</div>
             : orders.length===0 ? (
              <div style={{textAlign:"center",padding:40,color:"var(--muted)"}}>
                <div style={{fontSize:40,marginBottom:10}}>🛍️</div>
                <div style={{fontWeight:600,marginBottom:6}}>Koi orders nahi!</div>
                <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginTop:14}}>
                  <button className="btn-gold" onClick={()=>setPage("pay_order")}>🔗 Pay via Link</button>
                  <button className="btn-outline" onClick={()=>setPage("create_deal")}>🤝 Create Deal</button>
                </div>
              </div>
             ) : (
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {filteredOrders.map(o=>{
                  const daysLeft=o.status==="dispatched"?getDaysLeft(o.dispatched_at||o.updated_at):null;
                  const trackingUrl=getTrackingUrl(o.tracking_number);
                  return (
                    <div key={o.id} className="card" style={{display:"flex",flexDirection:"column",gap:10}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                        <div style={{display:"flex",gap:12,alignItems:"center"}}>
                          <div style={{width:44,height:44,borderRadius:11,background:"var(--sf2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>🛍️</div>
                          <div>
                            <div style={{fontWeight:600,marginBottom:2,fontSize:14}}>{o.product_name}</div>
                            <div style={{fontSize:12,color:"var(--muted)"}}>Seller: {o.seller_name||"—"} • {(o.created_at||"").split("T")[0]}</div>
                            <div style={{fontSize:12,marginTop:2}}>₹{o.order_amount} | Token: <span style={{color:"var(--gold)",fontWeight:600}}>₹{o.token_amount}</span></div>
                          </div>
                        </div>
                        <Bdg status={o.status} />
                      </div>
                      {o.tracking_number && <div className="tracking-box"><div style={{flex:1}}><div style={{fontSize:11,color:"var(--blue)",fontWeight:600,marginBottom:2}}>📦 Tracking</div><div style={{fontFamily:"monospace",fontWeight:700}}>{o.tracking_number}</div></div>{trackingUrl&&<a href={trackingUrl} target="_blank" rel="noreferrer" style={{background:"var(--blue)",color:"#fff",padding:"6px 12px",borderRadius:8,fontSize:12,fontWeight:600,textDecoration:"none"}}>Track →</a>}</div>}
                      {o.status==="dispatched"&&daysLeft!==null&&<div className="hold-box"><div style={{fontSize:12,color:"#a78bfa",fontWeight:600}}>⏰ {daysLeft>0?`Token Hold: ${daysLeft} din aur`:"Auto-release ready!"}</div></div>}
                      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                        {o.status==="pending"&&<button className="btn-gold" style={{padding:"7px 14px",fontSize:13}} onClick={()=>handlePay(o)}>💳 Pay ₹{o.token_amount}</button>}
                        {o.status==="dispatched"&&<button className="btn-green" style={{padding:"7px 14px",fontSize:13}} onClick={()=>confirmDelivery(o.id).then(r=>{if(r.success)setOrders(prev=>prev.map(x=>x.id===o.id?{...x,status:"delivered"}:x));})}>✅ Delivery Confirm</button>}
                        <button className="btn-ghost" style={{padding:"6px 12px",fontSize:12}} onClick={()=>setShowOrder(o)}>View Details</button>
                      </div>
                    </div>
                  );
                })}
              </div>
             )}
          </div>
        )}

        {page==="pay_order" && (
          <div className="fu" style={{maxWidth:500}}>
            <h1 className="syne" style={{fontSize:"clamp(18px,3vw,24px)",fontWeight:800,marginBottom:8}}>Order Link se Pay Karo</h1>
            <p style={{color:"var(--muted)",marginBottom:20,fontSize:13}}>Seller ka link paste karo — details dekho aur pay karo</p>
            <div className="card" style={{marginBottom:14}}>
              <label className="label">EscaraPay Order Link</label>
              <input className="input" placeholder="https://escara-pay.vercel.app/pay/EPXXXXX" value={linkInput} onChange={e=>setLinkInput(e.target.value)} style={{marginBottom:10}} />
              <button className="btn-gold" style={{width:"100%"}} onClick={fetchLinkOrder}>{linkLoading?"⏳ Dhundh raha hai...":"🔍 Order Dekho"}</button>
              {linkError && <div style={{color:"var(--red)",fontSize:12,marginTop:8}}>❌ {linkError}</div>}
            </div>
            {linkOrder && (
              <div className="card" style={{background:"rgba(14,165,233,.06)",borderColor:"rgba(14,165,233,.3)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                  <div><div style={{fontSize:11,color:"var(--muted)",marginBottom:3}}>{linkOrder.id}</div><div className="syne" style={{fontWeight:800,fontSize:18}}>{linkOrder.product_name}</div><div style={{fontSize:13,color:"var(--muted)",marginTop:4}}>Seller: {linkOrder.seller_name||"—"}</div></div>
                  <Bdg status={linkOrder.status} />
                </div>
                <div className="g2" style={{marginBottom:14}}>
                  <div style={{background:"var(--sf2)",borderRadius:10,padding:12,textAlign:"center"}}><div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Order Amount</div><div className="syne" style={{fontWeight:800,fontSize:20}}>₹{linkOrder.order_amount}</div></div>
                  <div style={{background:"rgba(14,165,233,.15)",borderRadius:10,padding:12,textAlign:"center",border:"1px solid rgba(14,165,233,.3)"}}><div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Token (Escrow)</div><div className="syne" style={{fontWeight:800,fontSize:20,color:"var(--gold)"}}>₹{linkOrder.token_amount}</div></div>
                </div>
                {linkOrder.status==="pending" ? (
                  <button className="btn-gold pulse" style={{width:"100%",padding:13,fontSize:15}} onClick={()=>handlePay(linkOrder)}>💳 Pay ₹{linkOrder.buyer_pays||linkOrder.token_amount} Token</button>
                ) : (
                  <div style={{textAlign:"center",padding:12,color:"var(--muted)",fontSize:13}}>Payment already ho chuka hai &nbsp;<Bdg status={linkOrder.status} /></div>
                )}
              </div>
            )}
          </div>
        )}

        {page==="create_deal" && (
          <div className="fu" style={{maxWidth:520}}>
            <h1 className="syne" style={{fontSize:"clamp(18px,3vw,24px)",fontWeight:800,marginBottom:8}}>Deal Banao 🤝</h1>
            <p style={{color:"var(--muted)",marginBottom:16,fontSize:13}}>Seller par trust nahi? Tum khud deal banao — seller confirm karega — phir safely pay karo.</p>
            {!dealLink ? (
              <div className="card">
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  <div><label className="label">Product / Service *</label><input className="input" placeholder="Handmade Saree" value={dealForm.product} onChange={e=>setDealForm({...dealForm,product:e.target.value})} /></div>
                  <div className="g2">
                    <div><label className="label">Order Amount (₹) *</label><input className="input" type="number" placeholder="2000" value={dealForm.amount} onChange={e=>setDealForm({...dealForm,amount:e.target.value})} /></div>
                    <div><label className="label">Token %</label><select className="select" value={dealForm.token_pct} onChange={e=>setDealForm({...dealForm,token_pct:e.target.value})}><option value="5">5%</option><option value="10">10%</option><option value="15">15%</option><option value="20">20%</option></select></div>
                  </div>
                  {dealForm.amount && <div style={{background:"rgba(14,165,233,.1)",border:"1px solid rgba(14,165,233,.25)",borderRadius:10,padding:14}}><div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Aap Token Bharenge</div><div className="syne" style={{fontSize:24,fontWeight:800,color:"var(--gold)"}}>₹{Math.round(tokenPreview2*1.02)}</div></div>}
                  <div><label className="label">Seller Ka Naam (optional)</label><input className="input" placeholder="Meena Crafts" value={dealForm.seller_name} onChange={e=>setDealForm({...dealForm,seller_name:e.target.value})} /></div>
                  <div><label className="label">Seller Ka WhatsApp (optional)</label><input className="input" placeholder="9876543210" value={dealForm.seller_phone} onChange={e=>setDealForm({...dealForm,seller_phone:e.target.value})} /></div>
                  <button className="btn-gold" style={{width:"100%",padding:12}} onClick={handleCreateDeal} disabled={!dealForm.product||!dealForm.amount||dealCreating}>{dealCreating?"⏳ Deal bana raha hai...":"🤝 Deal Link Generate Karo"}</button>
                </div>
              </div>
            ) : (
              <div className="card" style={{textAlign:"center"}}>
                <div style={{fontSize:46,marginBottom:12}}>🎉</div>
                <h3 className="syne" style={{fontWeight:800,fontSize:21,marginBottom:8}}>Deal Link Ready!</h3>
                <div style={{background:"var(--sf2)",borderRadius:10,padding:12,marginBottom:14,border:"1px solid var(--border)",wordBreak:"break-all"}}><code style={{fontSize:12,color:"#a78bfa"}}>{dealLink}</code></div>
                <div style={{display:"flex",gap:8,marginBottom:12}}>
                  <button className="btn-ghost" style={{flex:1}} onClick={()=>{ navigator.clipboard?.writeText(dealLink); setToast("Deal link copied!"); }}>📋 Copy</button>
                  <button className="btn-gold" style={{flex:1}} onClick={()=>setDealLink(null)}>New Deal</button>
                </div>
              </div>
            )}
          </div>
        )}

        {page==="help" && (
          <div className="fu" style={{maxWidth:560}}>
            <h1 className="syne" style={{fontSize:"clamp(18px,3vw,24px)",fontWeight:800,marginBottom:22}}>Help & Safety</h1>
            {[
              {q:"Create Deal aur Pay via Link mein kya fark hai?",a:"Pay via Link: Seller ne order banaya. Create Deal: Tum order banao, seller confirm kare. Dono mein escrow protection same!"},
              {q:"Token kab release hoga seller ko?",a:"Delivery confirm ke baad 7 din hold. Dispute nahi → auto-release."},
              {q:"Order nahi aaya?",a:"'View Details' → 'Dispute Raise Karo'. 24 ghante mein team investigate karegi."},
              {q:"Tracking kaise kare?",a:"Order card mein 'Track →' button click karo."},
            ].map(({q,a})=>(
              <div key={q} className="card" style={{marginBottom:10}}>
                <div style={{fontWeight:600,marginBottom:6,color:"var(--gold)",fontSize:13}}>❓ {q}</div>
                <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.7}}>{a}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showOrder && <OrderModal order={showOrder} isSeller={false} onClose={()=>setShowOrder(null)} onDispatch={()=>{}} onConfirmDelivery={(id)=>setOrders(prev=>prev.map(o=>o.id===id?{...o,status:"delivered"}:o))} onDispute={(id)=>setOrders(prev=>prev.map(o=>o.id===id?{...o,status:"disputed"}:o))} />}

      {(payStep>0||payError) && (
        <div className="overlay">
          <div className="modal" style={{textAlign:"center"}}>
            {payError?(<><div style={{fontSize:40,marginBottom:12}}>❌</div><div className="syne" style={{fontWeight:800,fontSize:18,color:"var(--red)",marginBottom:8}}>Payment Failed</div><div style={{color:"var(--muted)",fontSize:13,marginBottom:16}}>{payError}</div><button className="btn-ghost" style={{width:"100%"}} onClick={()=>{setPayError("");setPayStep(0);}}>Close</button></>)
             :payStep===1?(<><div style={{width:44,height:44,border:"3px solid var(--gold)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}} /><div className="syne" style={{fontWeight:700,fontSize:16}}>Razorpay Load ho raha hai...</div></>)
             :payStep===2?(<><div style={{width:44,height:44,border:"3px solid var(--green)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}} /><div className="syne" style={{fontWeight:700,fontSize:16}}>Verify ho rahi hai...</div></>)
             :payStep===3?(<><div style={{fontSize:52,marginBottom:12}}>🎉</div><div className="syne" style={{fontWeight:800,fontSize:21,color:"var(--green)",marginBottom:8}}>Token Secured!</div><div style={{color:"var(--muted)",fontSize:13}}>Seller ko delivery ke 7 din baad release hoga ✅</div></>)
             :null}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════ DEAL CONFIRM PAGE ══════════ */
function DealPage({ orderId, dark, onToggle, onGoHome }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [toast, setToast] = useState("");

  useEffect(()=>{ getOrderById(orderId).then(r=>{ setLoading(false); if(r.success) setOrder(r.data.order); else setError("Deal nahi mili."); }); },[orderId]);

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders/${orderId}/seller-confirm-deal`, {
        method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({seller_id:0}),
      });
      const data = await res.json();
      setConfirming(false);
      if (data.success) { setConfirmed(true); setPaymentLink(data.paymentLink); }
      else setError(data.error||"Confirm nahi hua");
    } catch(e) { setConfirming(false); setError("Backend se connect nahi hua!"); }
  };

  return (
    <div style={{minHeight:"100vh"}}>
      {toast && <Toast msg={toast} onDone={()=>setToast("")} />}
      <nav className="nav"><Logo onClick={onGoHome} /><div style={{display:"flex",gap:8,alignItems:"center"}}><ThemeToggle dark={dark} onToggle={onToggle} /><button className="btn-ghost" style={{fontSize:12}} onClick={onGoHome}>← Home</button></div></nav>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"calc(100vh - 62px)",padding:20}}>
        <div style={{width:"100%",maxWidth:480}}>
          {loading && <div className="card" style={{textAlign:"center",padding:50}}><div style={{width:44,height:44,border:"3px solid var(--gold)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}} /><div style={{color:"var(--muted)"}}>Deal load ho rahi hai...</div></div>}
          {error && <div className="card" style={{textAlign:"center",padding:40}}><div style={{fontSize:40,marginBottom:12}}>❌</div><div className="syne" style={{fontWeight:800,fontSize:18,marginBottom:8}}>Deal Nahi Mili</div><div style={{color:"var(--muted)",fontSize:13,marginBottom:20}}>{error}</div><button className="btn-ghost" onClick={onGoHome}>← Home</button></div>}
          {order && order.status!=="pending_seller_confirm" && !confirmed && <div className="card" style={{textAlign:"center",padding:40}}><div style={{fontSize:44,marginBottom:12}}>✅</div><div className="syne" style={{fontWeight:800,fontSize:20,marginBottom:8}}>Deal Already Confirmed!</div><Bdg status={order.status} /><div style={{marginTop:14}}><button className="btn-ghost" onClick={onGoHome}>← Home</button></div></div>}
          {confirmed && (
            <div className="card fu" style={{textAlign:"center",padding:40}}>
              <div style={{fontSize:60,marginBottom:16}}>🎉</div>
              <div className="syne" style={{fontWeight:800,fontSize:24,color:"var(--green)",marginBottom:8}}>Deal Confirmed!</div>
              <div style={{color:"var(--muted)",fontSize:14,marginBottom:20}}>Ab buyer ko payment link bhejo</div>
              <div style={{background:"var(--sf2)",borderRadius:8,padding:"10px 12px",marginBottom:10,wordBreak:"break-all"}}><code style={{fontSize:12,color:"var(--gold)"}}>{paymentLink}</code></div>
              <button className="btn-gold" style={{width:"100%"}} onClick={()=>{ navigator.clipboard?.writeText(paymentLink); setToast("Payment link copied!"); }}>📋 Link Copy Karo</button>
            </div>
          )}
          {order && order.status==="pending_seller_confirm" && !confirmed && !loading && (
            <div className="fu">
              <div style={{textAlign:"center",marginBottom:20}}>
                <div className="badge borange" style={{fontSize:13,marginBottom:8}}>🤝 Buyer ne Deal Bheja Hai</div>
                <h2 className="syne" style={{fontWeight:800,fontSize:22}}>Deal Confirm Karo</h2>
              </div>
              <div className="card" style={{marginBottom:14}}>
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:11,color:"var(--muted)",marginBottom:4}}>Deal ID: <span style={{fontFamily:"monospace",color:"var(--gold)"}}>{order.id}</span></div>
                  <div className="syne" style={{fontWeight:800,fontSize:22,marginBottom:4}}>{order.product_name}</div>
                  <div style={{fontSize:13,color:"var(--muted)"}}>Buyer: <strong style={{color:"var(--text)"}}>{order.buyer_name||"Anonymous"}</strong></div>
                </div>
                <div className="g2" style={{marginBottom:16}}>
                  <div style={{background:"var(--sf2)",borderRadius:10,padding:12,textAlign:"center"}}><div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Order Value</div><div className="syne" style={{fontWeight:800,fontSize:22}}>₹{order.order_amount}</div></div>
                  <div style={{background:"rgba(5,150,105,.15)",borderRadius:10,padding:12,textAlign:"center"}}><div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Aapko Milega</div><div className="syne" style={{fontWeight:800,fontSize:22,color:"var(--green)"}}>₹{order.seller_receives}</div></div>
                </div>
                <button className="btn-green" style={{width:"100%",padding:"16px",fontSize:16,borderRadius:12,marginBottom:10}} onClick={handleConfirm} disabled={confirming}>{confirming?"⏳ Confirm ho raha hai...":"✅ Haan! Main Yeh Order Ship Karunga"}</button>
                <button className="btn-ghost" style={{width:"100%"}} onClick={onGoHome}>❌ Decline</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════ ADMIN ══════════ */
const ADMIN_URL = BACKEND_URL;

/* ══════════ USER DETAIL MODAL (Admin) ══════════ */
function UserDetailModal({ user, adminKey, onClose, onUpdate }) {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [warnReason, setWarnReason] = useState("");
  const [banReason, setBanReason] = useState("");
  const [msg, setMsg] = useState("");
  const [tab, setTab] = useState("details");

  const headers = { "Content-Type":"application/json", "x-admin-key": adminKey };

  useEffect(()=>{
    fetch(`${ADMIN_URL}/api/admin/users/${user.id}/orders`, { headers })
      .then(r=>r.json()).then(d=>{ if(d.success) setUserOrders(d.orders||[]); setLoading(false); })
      .catch(()=>setLoading(false));
  },[user.id]);

  const doAction = async (action) => {
    setActionLoading(action);
    const reason = action==="warn" ? warnReason : banReason;
    const url = `${ADMIN_URL}/api/admin/users/${user.id}/${action}`;
    const r = await fetch(url, { method:"POST", headers, body: JSON.stringify({reason}) });
    const d = await r.json();
    setActionLoading("");
    if(d.success) { setMsg(d.message); setTimeout(()=>{ onUpdate(user.id, action); },1200); }
    else setMsg("❌ "+d.error);
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={{maxWidth:520}} onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div className="avatar" style={{width:44,height:44,fontSize:18,background:user.user_status==="banned"?"var(--red)":"linear-gradient(135deg,var(--gold),var(--accent))"}}>{user.name[0]}</div>
            <div>
              <div className="syne" style={{fontWeight:800,fontSize:17}}>{user.name}</div>
              <div style={{fontSize:12,color:"var(--muted)"}}>{user.role} • ID: {user.id}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <span className={`badge ${user.user_status==="banned"?"br":user.warning_count>0?"borange":"bg"}`}>{user.user_status==="banned"?"🚫 Banned":user.warning_count>0?`⚠️ ${user.warning_count} Warning`:"✅ Active"}</span>
            <button className="btn-ghost" style={{padding:"4px 10px",fontSize:12}} onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:4,marginBottom:16,background:"var(--sf2)",padding:4,borderRadius:10}}>
          {[["details","👤 Details"],["orders","📦 Orders"],["actions","⚙️ Actions"]].map(([id,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"7px",border:"none",borderRadius:8,cursor:"pointer",background:tab===id?"var(--gold)":"transparent",color:tab===id?"#fff":"var(--muted)",fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:12,transition:"all .2s"}}>{label}</button>
          ))}
        </div>

        {/* Details Tab */}
        {tab==="details" && (
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {[
              ["Name",    user.name],
              ["Email",   user.email],
              ["Phone",   user.phone],
              ["Role",    user.role],
              ["Password",user.password, "var(--red)"],
              ["PAN",     user.pan_number||"—", user.pan_number?"var(--green)":undefined],
              ["GST",     user.gst_number||"—", user.gst_number?"var(--green)":undefined],
              ["Shop",    user.shop_name||"—"],
              ["Joined",  (user.created_at||"").split("T")[0]],
              ["Warnings",user.warning_count||0, user.warning_count>0?"var(--red)":undefined],
              ["Status",  user.user_status||"active"],
            ].map(([label,val,color])=>(
              <div key={label} style={{display:"flex",justifyContent:"space-between",padding:"9px 12px",background:"var(--sf2)",borderRadius:8}}>
                <span style={{fontSize:12,color:"var(--muted)",fontWeight:500}}>{label}</span>
                <span style={{fontSize:12,fontWeight:600,fontFamily:label==="Password"||label==="PAN"||label==="GST"?"monospace":"inherit",color:color||"var(--text)"}}>{String(val)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Orders Tab */}
        {tab==="orders" && (
          <div>
            {loading ? <div style={{textAlign:"center",padding:30,color:"var(--muted)"}}>⏳ Loading orders...</div>
            : userOrders.length===0 ? <div style={{textAlign:"center",padding:30,color:"var(--muted)"}}>Koi orders nahi</div>
            : <div style={{overflowX:"auto"}}>
                <table className="tbl">
                  <thead><tr><th>ID</th><th>Product</th><th>Amount</th><th>Token</th><th>Status</th><th>Date</th></tr></thead>
                  <tbody>{userOrders.map(o=>(
                    <tr key={o.id}>
                      <td style={{fontFamily:"monospace",color:"var(--gold)",fontSize:11}}>{o.id}</td>
                      <td style={{fontSize:12}}>{o.product_name}</td>
                      <td style={{fontSize:12,fontWeight:600}}>₹{o.order_amount}</td>
                      <td style={{fontSize:12,color:"var(--green)"}}>₹{o.token_amount}</td>
                      <td><Bdg status={o.status} /></td>
                      <td style={{fontSize:11,color:"var(--muted)"}}>{(o.created_at||"").split("T")[0]}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>}
          </div>
        )}

        {/* Actions Tab */}
        {tab==="actions" && (
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {/* Warn */}
            <div style={{background:"rgba(251,146,60,.1)",border:"1px solid rgba(251,146,60,.3)",borderRadius:12,padding:14}}>
              <div style={{fontWeight:700,color:"#fb923c",marginBottom:8,fontSize:13}}>⚠️ Warning Send Karo</div>
              <input className="input" placeholder="Warning reason (e.g. Suspicious activity)" value={warnReason} onChange={e=>setWarnReason(e.target.value)} style={{marginBottom:8}} />
              <button className="btn-ghost" style={{width:"100%",color:"#fb923c",borderColor:"rgba(251,146,60,.4)"}} onClick={()=>doAction("warn")} disabled={actionLoading==="warn"}>
                {actionLoading==="warn"?"⏳ Sending...":"⚠️ Send Warning"}
              </button>
            </div>

            {/* Ban */}
            {user.user_status!=="banned" ? (
              <div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",borderRadius:12,padding:14}}>
                <div style={{fontWeight:700,color:"var(--red)",marginBottom:8,fontSize:13}}>🚫 User Ban Karo</div>
                <input className="input" placeholder="Ban reason (e.g. Fraud, fake orders)" value={banReason} onChange={e=>setBanReason(e.target.value)} style={{marginBottom:8}} />
                <button className="btn-red" style={{width:"100%"}} onClick={()=>doAction("ban")} disabled={actionLoading==="ban"}>
                  {actionLoading==="ban"?"⏳ Banning...":"🚫 Ban This User"}
                </button>
              </div>
            ) : (
              <div style={{background:"rgba(5,150,105,.1)",border:"1px solid rgba(5,150,105,.3)",borderRadius:12,padding:14}}>
                <div style={{fontWeight:700,color:"var(--green)",marginBottom:8,fontSize:13}}>✅ User Unban Karo</div>
                <button className="btn-green" style={{width:"100%"}} onClick={()=>doAction("unban")} disabled={actionLoading==="unban"}>
                  {actionLoading==="unban"?"⏳ Unbanning...":"✅ Unban This User"}
                </button>
              </div>
            )}

            {msg && <div style={{padding:12,borderRadius:8,background:"var(--sf2)",fontSize:13,fontWeight:600,color:msg.startsWith("✅")||msg.startsWith("⚠️")||msg.startsWith("🚫")?"var(--text)":"var(--red)",textAlign:"center"}}>{msg}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

function AdminPanel({ adminKey: propKey, onLogout, dark, onToggle }) {
  const [adminKey] = useState(()=> propKey || localStorage.getItem("adminKey") || "admin123");
  const [page, setPage] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [filterStatus, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [authError, setAuthError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const headers = { "Content-Type":"application/json", "x-admin-key": adminKey };

  const safeFetch = async (url, opts={}) => {
    try {
      const r = await fetch(url, { ...opts, headers: {...headers, ...(opts.headers||{})} });
      if (r.status === 401) { setAuthError(`401 Error — Key mismatch. Using: "${adminKey}"`); return null; }
      setAuthError("");
      return await r.json();
    } catch(e) { setAuthError("Network error: " + e.message); return null; }
  };

  const load = async (p) => {
    setLoading(true);
    // First ping to check auth
    const ping = await safeFetch(`${ADMIN_URL}/api/admin/ping`);
    if (ping && !ping.keyMatch) {
      setAuthError(`Key mismatch! Server pe key alag hai. Logout karke dobara admin123 se login karo.`);
      setLoading(false);
      return;
    }
    if (p==="dashboard") { const d=await safeFetch(`${ADMIN_URL}/api/admin/stats`); if(d?.success) setStats(d.stats); }
    if (p==="orders")    { const d=await safeFetch(`${ADMIN_URL}/api/admin/orders`); if(d?.success) setOrders(d.orders||[]); }
    if (p==="users")     { const d=await safeFetch(`${ADMIN_URL}/api/admin/users`);  if(d?.success) setUsers(d.users||[]); }
    if (p==="disputes")  { const d=await safeFetch(`${ADMIN_URL}/api/admin/disputes`); if(d?.success) setDisputes(d.disputes||[]); }
    setLoading(false);
  };

  useEffect(()=>{ load(page); },[page]);

  const resolveDispute = async (orderId, decision) => {
    const d=await safeFetch(`${ADMIN_URL}/api/admin/disputes/${orderId}/resolve`,{method:"POST",body:JSON.stringify({decision})});
    if(d?.success){ setToast(d.message); setDisputes(disputes.filter(o=>o.id!==orderId)); }
  };

  const filteredOrders = orders.filter(o=>{
    const ms=filterStatus==="all"||o.status===filterStatus;
    const ms2=!search||o.id.includes(search.toUpperCase())||(o.seller_name||"").toLowerCase().includes(search.toLowerCase())||(o.buyer_name||"").toLowerCase().includes(search.toLowerCase());
    return ms&&ms2;
  });

  const nav = [{id:"dashboard",icon:"📊",label:"Dashboard"},{id:"orders",icon:"📦",label:"All Orders"},{id:"users",icon:"👥",label:"Users"},{id:"disputes",icon:"⚠️",label:"Disputes"}];

  return (
    <div style={{minHeight:"100vh"}}>
      {toast && <Toast msg={toast} onDone={()=>setToast("")} />}
      <nav className="nav"><Logo /><div style={{display:"flex",gap:8,alignItems:"center"}}><ThemeToggle dark={dark} onToggle={onToggle} /><span className="badge br" style={{fontSize:11}}>🔐 Admin</span><button className="btn-ghost" style={{fontSize:12}} onClick={onLogout}>Logout</button></div></nav>
      {authError && (
        <div style={{background:"rgba(239,68,68,.15)",border:"1px solid rgba(239,68,68,.4)",padding:"10px 20px",fontSize:13,color:"var(--red)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span>⚠️ {authError}</span>
          <button style={{background:"var(--red)",color:"#fff",border:"none",borderRadius:6,padding:"4px 10px",cursor:"pointer",fontSize:12}} onClick={onLogout}>Re-Login</button>
        </div>
      )}
      <div className="sidebar">
        <div style={{marginBottom:16,padding:"0 8px"}}><div style={{fontSize:10,color:"var(--muted)",fontWeight:700,textTransform:"uppercase",letterSpacing:".6px"}}>Admin Panel</div></div>
        {nav.map(n=>(<div key={n.id} className={`si ${page===n.id?"active":""}`} onClick={()=>setPage(n.id)}><span>{n.icon}</span><span>{n.label}</span>{n.id==="disputes"&&disputes.length>0&&<span style={{marginLeft:"auto",background:"var(--red)",color:"#fff",borderRadius:10,fontSize:11,padding:"1px 7px",fontWeight:700}}>{disputes.length}</span>}</div>))}
      </div>
      <div className="mobile-nav">
        {nav.map(n=>(<div key={n.id} className={`mni ${page===n.id?"active":""}`} onClick={()=>setPage(n.id)}><span>{n.icon}</span><span>{n.label}</span></div>))}
        <div className="mni" onClick={onLogout}><span>🚪</span><span>Logout</span></div>
      </div>
      <div className="main">
        {page==="dashboard" && (
          <div className="fu">
            <h1 className="syne" style={{fontWeight:800,fontSize:"clamp(18px,3vw,26px)",marginBottom:22}}>Admin Dashboard 🛡️</h1>
            {loading ? <div style={{textAlign:"center",padding:40,color:"var(--muted)"}}>⏳ Loading...</div> : stats && (
              <>
                <div className="g4" style={{marginBottom:18}}>
                  {[{label:"Total Orders",value:stats.totalOrders,icon:"📦",color:"var(--gold)"},{label:"Total GMV",value:`₹${(stats.totalGMV||0).toLocaleString()}`,icon:"💰",color:"var(--green)"},{label:"Revenue",value:`₹${(stats.totalRevenue||0).toLocaleString()}`,icon:"🏦",color:"var(--blue)"},{label:"Disputes",value:stats.pendingDisputes,icon:"⚠️",color:"var(--red)"}].map(s=>(
                    <div key={s.label} className="stat-card"><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><div style={{fontSize:11,color:"var(--muted)",marginBottom:6}}>{s.label}</div><div className="syne" style={{fontSize:22,fontWeight:800,color:s.color}}>{s.value}</div></div><span style={{fontSize:20}}>{s.icon}</span></div></div>
                  ))}
                </div>
                {stats.pendingDisputes>0 && <div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",borderRadius:12,padding:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontWeight:700,color:"var(--red)",marginBottom:4}}>⚠️ {stats.pendingDisputes} Pending Dispute(s)</div><div style={{fontSize:12,color:"var(--muted)"}}>24 ghante mein resolve karo</div></div><button className="btn-red" style={{padding:"8px 16px",fontSize:13}} onClick={()=>setPage("disputes")}>Resolve →</button></div>}
              </>
            )}
          </div>
        )}
        {page==="orders" && (
          <div className="fu">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,flexWrap:"wrap",gap:10}}>
              <h1 className="syne" style={{fontWeight:800,fontSize:"clamp(18px,3vw,26px)"}}>All Orders ({orders.length})</h1>
              <input className="input" style={{maxWidth:220,padding:"8px 12px"}} placeholder="🔍 Search..." value={search} onChange={e=>setSearch(e.target.value)} />
            </div>
            {orders.length===0&&!loading&&<div style={{background:"rgba(14,165,233,.1)",border:"1px solid rgba(14,165,233,.3)",borderRadius:10,padding:14,marginBottom:16,fontSize:13}}>ℹ️ Railway pe naya database hai — seller ko Railway backend se register karke order banana hoga.</div>}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
              {["all","pending","token_paid","dispatched","delivered","disputed"].map(s=>(<div key={s} className={`chip ${filterStatus===s?"active":""}`} onClick={()=>setFilter(s)} style={{fontSize:11}}>{s==="all"?`All (${orders.length})`:s.replace("_"," ")}</div>))}
            </div>
            {loading ? <div style={{textAlign:"center",padding:30,color:"var(--muted)"}}>⏳ Loading...</div> : (
              <div className="card" style={{padding:0,overflowX:"auto"}}>
                <table className="tbl">
                  <thead><tr><th>Order ID</th><th>Date</th><th>Seller</th><th>Buyer</th><th>Product</th><th>Amount</th><th>Token</th><th>Commission</th><th>Status</th></tr></thead>
                  <tbody>
                    {filteredOrders.length===0?<tr><td colSpan={9} style={{textAlign:"center",color:"var(--muted)",padding:30}}>Koi order nahi</td></tr>:filteredOrders.map(o=>(
                      <tr key={o.id}><td><span style={{fontFamily:"monospace",color:"var(--gold)",fontSize:11}}>{o.id}</span></td><td style={{fontSize:11,color:"var(--muted)"}}>{(o.created_at||"").split("T")[0]}</td><td style={{fontSize:12}}>{o.seller_name||"—"}</td><td style={{fontSize:12}}>{o.buyer_name||"—"}</td><td style={{fontSize:12,color:"var(--muted)"}}>{o.product_name}</td><td style={{fontWeight:600,fontSize:12}}>₹{o.order_amount}</td><td style={{color:"var(--green)",fontWeight:600,fontSize:12}}>₹{o.token_amount}</td><td style={{color:"var(--blue)",fontSize:12}}>₹{o.escara_commission||0}</td><td><Bdg status={o.status} /></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        {page==="users" && (
          <div className="fu">
            <h1 className="syne" style={{fontWeight:800,fontSize:"clamp(18px,3vw,26px)",marginBottom:18}}>All Users ({users.length})</h1>
            {loading?<div style={{textAlign:"center",padding:30,color:"var(--muted)"}}>⏳ Loading...</div>:(
              <div className="card" style={{padding:0,overflowX:"auto"}}>
                <table className="tbl">
                  <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Password</th><th>Role</th><th>PAN</th><th>GST</th><th>Status</th><th>Joined</th><th>Action</th></tr></thead>
                  <tbody>{users.map(u=>(
                    <tr key={u.id} style={{cursor:"pointer"}} onClick={()=>setSelectedUser(u)}>
                      <td style={{color:"var(--muted)",fontSize:12}}>{u.id}</td>
                      <td style={{fontWeight:600,fontSize:13}}>{u.name}{u.warning_count>0&&<span className="badge borange" style={{fontSize:10,marginLeft:4}}>⚠️ {u.warning_count}</span>}</td>
                      <td style={{fontSize:12,color:"var(--muted)"}}>{u.email}</td>
                      <td style={{fontSize:12}}>{u.phone}</td>
                      <td style={{fontFamily:"monospace",fontSize:11,color:"var(--red)"}}>{u.password||"—"}</td>
                      <td><span className={`badge ${u.role==="seller"?"bg":"bo"}`} style={{fontSize:11}}>{u.role}</span></td>
                      <td style={{fontFamily:"monospace",fontSize:11,color:u.pan_number?"var(--green)":"var(--muted)"}}>{u.pan_number||"—"}</td>
                      <td style={{fontFamily:"monospace",fontSize:11,color:u.gst_number?"var(--green)":"var(--muted)"}}>{u.gst_number||"—"}</td>
                      <td><span className={`badge ${u.user_status==="banned"?"br":u.warning_count>0?"borange":"bg"}`} style={{fontSize:10}}>{u.user_status==="banned"?"🚫 Banned":u.warning_count>0?"⚠️ Warned":"✅ Active"}</span></td>
                      <td style={{fontSize:11,color:"var(--muted)"}}>{(u.created_at||"").split("T")[0]}</td>
                      <td onClick={e=>e.stopPropagation()}><div style={{display:"flex",gap:4}}>
                        <button className="btn-ghost" style={{padding:"3px 8px",fontSize:11}} onClick={()=>setSelectedUser(u)}>View</button>
                      </div></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}
            {selectedUser && <UserDetailModal user={selectedUser} adminKey={adminKey} onClose={()=>setSelectedUser(null)} onUpdate={(uid,action)=>{
              setUsers(users.map(u=>u.id===uid ? {...u, user_status: action==="ban"?"banned":"active", warning_count: action==="warn"?(u.warning_count||0)+1:u.warning_count} : u));
              setSelectedUser(null);
            }} />}
          </div>
        )}
        {page==="disputes" && (
          <div className="fu">
            <h1 className="syne" style={{fontWeight:800,fontSize:"clamp(18px,3vw,26px)",marginBottom:18}}>Disputes {disputes.length>0&&<span className="badge br" style={{fontSize:14}}>🔥 {disputes.length}</span>}</h1>
            {loading?<div style={{textAlign:"center",padding:30,color:"var(--muted)"}}>⏳ Loading...</div>:disputes.length===0?(<div className="card" style={{textAlign:"center",padding:50}}><div style={{fontSize:40,marginBottom:10}}>🎉</div><div className="syne" style={{fontWeight:700,fontSize:18}}>Koi Dispute Nahi!</div></div>):(
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {disputes.map(o=>(
                  <div key={o.id} className="card" style={{borderColor:"rgba(239,68,68,.3)"}}>
                    <div style={{marginBottom:14}}><div style={{fontFamily:"monospace",color:"var(--red)",fontSize:12,marginBottom:3}}>{o.id}</div><div className="syne" style={{fontWeight:700,fontSize:17}}>{o.product_name}</div><div style={{fontSize:13,color:"var(--muted)",marginTop:4}}>Seller: <strong style={{color:"var(--text)"}}>{o.seller_name||"—"}</strong> | Buyer: <strong style={{color:"var(--text)"}}>{o.buyer_name||"—"}</strong></div></div>
                    <div style={{background:"rgba(239,68,68,.08)",borderRadius:10,padding:12,marginBottom:14}}><div style={{fontSize:12,fontWeight:700,color:"var(--red)",marginBottom:4}}>By: {o.dispute_raised_by||"—"} | {(o.dispute_at||"").split("T")[0]}</div><div style={{fontSize:13,color:"var(--muted)"}}>{o.dispute_reason||"No reason"}</div></div>
                    <div style={{display:"flex",gap:10}}>
                      <button className="btn-green" style={{flex:1,padding:"10px"}} onClick={()=>resolveDispute(o.id,"seller")}>✅ Seller Sahi</button>
                      <button className="btn-red" style={{flex:1,padding:"10px"}} onClick={()=>resolveDispute(o.id,"buyer")}>↩️ Buyer Sahi</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function AdminLogin({ onLogin, dark, onToggle }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const LOCAL_PASSWORDS = ["admin123", "escarapay-admin-2026"];

  const handle = async () => {
    if (!password) { setError("❌ Password daalo!"); return; }
    setLoading(true); setError("");
    if (LOCAL_PASSWORDS.includes(password)) { setLoading(false); localStorage.setItem("adminKey",password); onLogin(password); return; }
    try {
      const res=await fetch(`${ADMIN_URL}/api/admin/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password})});
      const data=await res.json(); setLoading(false);
      if(data.success){localStorage.setItem("adminKey",password);onLogin(password);}
      else setError("❌ Wrong password!");
    } catch(e) { setLoading(false); setError("❌ Backend se connect nahi hua!"); }
  };

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div className="modal" style={{maxWidth:360}}>
        <div style={{textAlign:"center",marginBottom:22}}><div style={{fontSize:40,marginBottom:10}}>🔐</div><h2 className="syne" style={{fontWeight:800,fontSize:22,marginBottom:4}}>Admin Access</h2><p style={{color:"var(--muted)",fontSize:13}}>EscaraPay Admin Panel</p></div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div><label className="label">Admin Password</label><input className="input" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handle()} /></div>
          {error && <div style={{color:"var(--red)",fontSize:13}}>{error}</div>}
          <button className="btn-gold" style={{width:"100%",padding:12}} onClick={handle}>{loading?"⏳ Checking...":"Login →"}</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════ PRIVACY / TERMS / CONTACT ══════════ */
function AboutPage({ onBack, dark, onToggle, lang, onLangToggle }) {
  const L = (en,hi,hl) => lang==="en"?en:lang==="hi"?hi:hl;
  return (
    <div style={{minHeight:"100vh"}}>
      <nav className="nav"><Logo /><div style={{display:"flex",gap:8,alignItems:"center"}}><LangToggle lang={lang} onToggle={onLangToggle} /><ThemeToggle dark={dark} onToggle={onToggle} /><button className="btn-ghost" onClick={onBack}>← Back</button></div></nav>
      <div style={{maxWidth:820,margin:"0 auto",padding:"40px 20px"}}>

        {/* Hero */}
        <div style={{textAlign:"center",marginBottom:48}}>
          <img src={LOGO_SRC} alt="EscaraPay" style={{height:64,marginBottom:16,objectFit:"contain"}} onError={e=>e.target.style.display="none"} />
          <h1 className="syne" style={{fontWeight:800,fontSize:"clamp(28px,4vw,42px)",marginBottom:12}}>About <span className="shimmer">EscaraPay</span></h1>
          <p style={{color:"var(--muted)",fontSize:16,maxWidth:560,margin:"0 auto",lineHeight:1.8}}>
            {L("India's first escrow payment platform specifically designed for WhatsApp & Instagram sellers","भारत का पहला एस्क्रो पेमेंट प्लेटफॉर्म, खासतौर पर व्हाट्सऐप और इंस्टाग्राम सेलर्स के लिए","India ka pehla escrow payment platform specifically designed for WhatsApp & Instagram sellers")}
          </p>
        </div>

        {/* Mission */}
        <div className="card" style={{marginBottom:16,background:"rgba(14,165,233,.05)",borderColor:"rgba(14,165,233,.25)"}}>
          <h2 className="syne" style={{fontWeight:800,fontSize:20,marginBottom:12}}>🎯 {L("Our Mission","हमारा मिशन","Hamara Mission")}</h2>
          <p style={{fontSize:14,color:"var(--muted)",lineHeight:1.9}}>
            {L(
              "Millions of sellers do business on WhatsApp and Instagram in India — but they fear RTO losses and buyers fear fraud. EscaraPay solved this with a simple escrow system: token is locked first, released after delivery.",
              "भारत में लाखों सेलर व्हाट्सऐप और इंस्टाग्राम पर बिजनेस करते हैं — लेकिन उन्हें RTO का डर रहता है और बायर को फ्रॉड का। एस्करापे ने यह समस्या एक सरल एस्क्रो सिस्टम से हल की।",
              "India mein lakho sellers WhatsApp aur Instagram pe business karte hain — lekin unhe RTO ka darr rehta hai aur buyers ko fraud ka. EscaraPay ne yeh problem solve ki ek simple escrow system se: token pehle lock hota hai, delivery ke baad release hota hai."
            )}
          </p>
        </div>

        {/* Problem we solve */}
        <div className="g2" style={{marginBottom:16}}>
          <div className="card" style={{background:"rgba(239,68,68,.05)",borderColor:"rgba(239,68,68,.2)"}}>
            <div style={{fontSize:28,marginBottom:10}}>😰</div>
            <h3 className="syne" style={{fontWeight:700,fontSize:15,marginBottom:8,color:"var(--red)"}}>{L("Before EscaraPay","पहले की समस्या","Pehle ki Problem")}</h3>
            <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.8}}>
              ❌ {L("Seller ships, buyer cancels → RTO loss","सेलर भेजे, बायर कैंसिल करे → RTO नुकसान","Seller ship kare, buyer cancel kare → RTO loss")}<br/>
              ❌ {L("Buyer pays, seller doesn't ship → fraud","बायर पे करे, सेलर न भेजे → फ्रॉड","Buyer pay kare, seller ship na kare → fraud")}<br/>
              ❌ {L("No proof, no protection","कोई सुबूत नहीं, कोई सुरक्षा नहीं","Koi proof nahi, koi protection nahi")}<br/>
              ❌ {L("WhatsApp deals completely unsafe","व्हाट्सऐप डील पूरी तरह असुरक्षित","WhatsApp pe deals completely unsafe")}
            </div>
          </div>
          <div className="card" style={{background:"rgba(5,150,105,.05)",borderColor:"rgba(5,150,105,.2)"}}>
            <div style={{fontSize:28,marginBottom:10}}>✅</div>
            <h3 className="syne" style={{fontWeight:700,fontSize:15,marginBottom:8,color:"var(--green)"}}>{L("With EscaraPay","एस्करापे के साथ","EscaraPay ke Saath")}</h3>
            <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.8}}>
              ✅ {L("Token locked in escrow — neither party can cheat","टोकन एस्क्रो में — कोई धोखा नहीं","Token escrow mein lock — kisi ko nahi milta jab tak deal complete na ho")}<br/>
              ✅ {L("Buyer cancels? Token still goes to seller (RTO cover)","बायर कैंसिल करे? टोकन सेलर को (RTO कवर)","Seller cancel kare bhi toh token seller ko milta hai")}<br/>
              ✅ {L("Seller doesn't ship? Full refund to buyer","सेलर न भेजे? बायर को पूरा रिफंड","Seller ship na kare toh buyer ko full refund")}<br/>
              ✅ {L("Dispute system — 24 hour resolution","विवाद सिस्टम — 24 घंटे में समाधान","Dispute system — 24 ghante mein resolution")}
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="card" style={{marginBottom:16}}>
          <h2 className="syne" style={{fontWeight:800,fontSize:18,marginBottom:16}}>⚙️ {L("How It Works","यह कैसे काम करता है","Kaise Kaam Karta Hai")}</h2>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[
              {n:"1",c:"var(--gold)", en:"Seller Creates Order Link", hi:"सेलर ऑर्डर लिंक बनाता है", hl:"Seller Order Link Banata Hai",
               de:"Sets product name, amount, token percentage. Minimum ₹200 token auto-calculated.",
               dh:"प्रोडक्ट नाम, राशि और टोकन प्रतिशत सेट करता है। न्यूनतम ₹200 टोकन।",
               dl:"Product name, amount aur token percentage set karta hai. Minimum ₹200 token auto calculate."},
              {n:"2",c:"var(--blue)", en:"Buyer Pays Token", hi:"बायर टोकन पेमेंट करता है", hl:"Buyer Token Pay Karta Hai",
               de:"Pays via UPI/Card/NetBanking. Token locked in EscaraPay escrow.",
               dh:"UPI/कार्ड से भुगतान करता है। टोकन एस्क्रो में लॉक।",
               dl:"Razorpay ke through UPI/Card/NetBanking se pay. Token EscaraPay escrow mein lock."},
              {n:"3",c:"var(--accent)", en:"Seller Dispatches", hi:"सेलर भेजता है", hl:"Seller Dispatch Karta Hai",
               de:"Token secured → seller ships confidently with tracking ID.",
               dh:"टोकन सुरक्षित → सेलर निश्चिंत होकर ट्रैकिंग ID के साथ भेजता है।",
               dl:"Token secure hone ke baad seller confidently ship karta hai tracking number ke saath."},
              {n:"4",c:"var(--green)", en:"Delivery & Release", hi:"डिलीवरी और रिलीज", hl:"Delivery & Release",
               de:"Buyer confirms → 7 day hold → token released to seller.",
               dh:"बायर कन्फर्म करे → 7 दिन होल्ड → टोकन सेलर को।",
               dl:"Buyer delivery confirm karta hai → 7 din hold → token seller ko release."},
            ].map(s=>(
              <div key={s.n} className="step">
                <div className="step-num" style={{background:`${s.c}20`,color:s.c,width:34,height:34,fontSize:15}}>{s.n}</div>
                <div>
                  <div style={{fontWeight:700,marginBottom:4,fontSize:14}}>{L(s.en,s.hi,s.hl)}</div>
                  <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.7}}>{L(s.de,s.dh,s.dl)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="g3" style={{marginBottom:16}}>
          {[
            {icon:"🚀",en:"Startup Stage",hi:"स्टार्टअप स्टेज",hl:"Startup Stage",de:"Actively building & growing",dh:"सक्रिय रूप से बना रहे हैं",dl:"Actively building & growing"},
            {icon:"🛡️",en:"Escrow Protected",hi:"एस्क्रो सुरक्षित",hl:"Escrow Protected",de:"100% secure token system",dh:"100% सुरक्षित टोकन सिस्टम",dl:"100% secure token system"},
            {icon:"⚡",en:"Instant Setup",hi:"तुरंत शुरू",hl:"Instant Setup",de:"Ready in 5 minutes",dh:"5 मिनट में तैयार",dl:"5 minute mein start karo"},
          ].map(s=>(
            <div key={s.en} className="card" style={{textAlign:"center"}}>
              <div style={{fontSize:32,marginBottom:10}}>{s.icon}</div>
              <div className="syne" style={{fontWeight:700,fontSize:14,marginBottom:6}}>{L(s.en,s.hi,s.hl)}</div>
              <div style={{fontSize:12,color:"var(--muted)"}}>{L(s.de,s.dh,s.dl)}</div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="card" style={{marginBottom:16,background:"rgba(124,58,237,.05)",borderColor:"rgba(124,58,237,.2)"}}>
          <h2 className="syne" style={{fontWeight:800,fontSize:18,marginBottom:16}}>👥 {L("Our Team","हमारी टीम","Hamari Team")}</h2>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <div style={{width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--accent))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:800,color:"#fff",flexShrink:0}}>M</div>
              <div>
                <div className="syne" style={{fontWeight:700,fontSize:16}}>Madhav Gupta</div>
                <div style={{color:"var(--gold)",fontSize:13,marginBottom:4}}>{L("Founder & Developer","संस्थापक और डेवलपर","Founder & Developer")}</div>
                <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.7}}>
                  {L("Saw real problems of WhatsApp sellers and built EscaraPay. Starting small, dreaming big!","व्हाट्सऐप सेलर्स की असली समस्याएं देखीं और एस्करापे बनाया। छोटे से शुरुआत, बड़े सपने!","WhatsApp sellers ki real problems dekhi aur EscaraPay build kiya. Chhote se shuruat, badi khwaish!")}
                </div>
              </div>
            </div>
            <div style={{height:1,background:"var(--border)"}} />
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <div style={{width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,#ec4899,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:800,color:"#fff",flexShrink:0}}>M</div>
              <div>
                <div className="syne" style={{fontWeight:700,fontSize:16}}>Mahima Gupta</div>
                <div style={{color:"#ec4899",fontSize:13,marginBottom:4}}>{L("Head of Marketing","मार्केटिंग हेड","Head of Marketing")}</div>
                <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.7}}>
                  {L("Brand strategy, seller outreach and social media — the voice of EscaraPay!","ब्रांड स्ट्रेटेजी, सेलर आउटरीच और सोशल मीडिया — एस्करापे की आवाज़!","Brand strategy, seller outreach aur social media — EscaraPay ki awaaz! Sellers tak platform pahunchana inki zimmedari hai.")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="card" style={{marginBottom:24}}>
          <h2 className="syne" style={{fontWeight:800,fontSize:18,marginBottom:16}}>💎 {L("Our Values","हमारी मूल्य","Hamari Values")}</h2>
          <div className="g2">
            {[
              {icon:"🔒",en:"Trust First",hi:"विश्वास पहले",hl:"Trust First",
               de:"Full transparency in every transaction. No hidden fees.",dh:"हर ट्रांज़ैक्शन में पारदर्शिता।",dl:"Har transaction mein transparency. Koi hidden fees nahi."},
              {icon:"⚡",en:"Speed",hi:"गति",hl:"Speed",
               de:"Create order, share link, payment secured in 2 minutes.",dh:"ऑर्डर बनाएं, लिंक भेजें, 2 मिनट में।",dl:"Order create karo, link bhejo, 2 minute mein payment secure."},
              {icon:"🛡️",en:"Equal Protection",hi:"समान सुरक्षा",hl:"Equal Protection",
               de:"Fair protection for both buyer and seller.",dh:"बायर और सेलर दोनों के लिए सुरक्षा।",dl:"Buyer aur seller dono ke liye equal protection."},
              {icon:"🇮🇳",en:"Made for India",hi:"भारत के लिए",hl:"Made for India",
               de:"Hinglish support, UPI, built for Indian business.",dh:"हिंग्लिश, UPI, भारतीय बिज़नेस के लिए।",dl:"Hinglish support, UPI integration, Indian business ke liye."},
            ].map(v=>(
              <div key={v.en} style={{display:"flex",gap:12,alignItems:"flex-start",padding:12,background:"var(--sf2)",borderRadius:10}}>
                <span style={{fontSize:22,flexShrink:0}}>{v.icon}</span>
                <div>
                  <div style={{fontWeight:700,fontSize:13,marginBottom:3}}>{L(v.en,v.hi,v.hl)}</div>
                  <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.6}}>{L(v.de,v.dh,v.dl)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{textAlign:"center",marginBottom:12}}>
          <button className="btn-gold" style={{marginRight:10}} onClick={()=>window._goToPage("contact")}>📞 {L("Contact Us","संपर्क करें","Contact Karo")}</button>
          <button className="btn-ghost" onClick={onBack}>← {L("Back to Home","होम पर वापस","Back to Home")}</button>
        </div>
      </div>
    </div>
  );
}

function PrivacyPage({ onBack, dark, onToggle }) {
  return (
    <div style={{minHeight:"100vh"}}>
      <nav className="nav"><Logo /><div style={{display:"flex",gap:8,alignItems:"center"}}><ThemeToggle dark={dark} onToggle={onToggle} /><button className="btn-ghost" onClick={onBack}>← Back</button></div></nav>
      <div style={{maxWidth:760,margin:"0 auto",padding:"40px 20px"}}>
        <h1 className="syne" style={{fontWeight:800,fontSize:"clamp(24px,4vw,36px)",marginBottom:8}}>Privacy Policy</h1>
        <p style={{color:"var(--muted)",fontSize:13,marginBottom:32}}>Last updated: March 2026 | Effective immediately</p>
        {[
          {t:"1. Information We Collect", c:"EscaraPay collects the following information when you register or use our services: Full name, email address, phone number (10 digits), PAN card or GST number (for sellers only), UPI ID (optional, for payouts), transaction history and order details, device information and IP address for security purposes."},
          {t:"2. How We Use Your Information", c:"Your information is used strictly to: process and manage escrow transactions securely, verify your identity to prevent fraud, send transaction notifications and alerts, resolve disputes between buyers and sellers, comply with Indian financial regulations and legal requirements, improve our platform and services."},
          {t:"3. Payment & Financial Data", c:"EscaraPay uses Razorpay as our payment gateway. Razorpay is fully RBI-compliant and PCI-DSS Level 1 certified. We do NOT store your card numbers, CVV, or banking credentials. Token amounts are held in escrow accounts managed through Razorpay's NBFC partner. All financial transactions are encrypted using 256-bit SSL."},
          {t:"4. KYC & Seller Verification", c:"Sellers are required to provide either PAN Card or GST Number for KYC purposes as required by Indian financial regulations. This data is stored securely, encrypted, and is only accessed for payout verification and legal compliance. We never share KYC data for marketing purposes."},
          {t:"5. Data Sharing Policy", c:"We do NOT sell or rent your personal information to any third party. We may share data only with: Razorpay for payment processing, law enforcement agencies when legally required by Indian courts, dispute resolution partners when investigating fraud. We will always notify you (where legally permitted) before sharing your data."},
          {t:"6. Data Security", c:"We implement: SSL/TLS encryption for all data in transit, AES-256 encryption for sensitive data at rest, regular security audits and penetration testing, strict access controls — only authorized personnel can access user data, password hashing using industry-standard algorithms."},
          {t:"7. Your Rights", c:"You have the right to: access all personal data we hold about you, request correction of inaccurate information, request deletion of your account (subject to legal retention requirements), opt out of non-essential communications, raise privacy concerns at privacy@escarapay.in. We respond to all requests within 30 days."},
          {t:"8. Data Retention", c:"Transaction records are retained for 7 years as mandated by Indian financial laws (PMLA 2002). Account data is retained until you request deletion. After deletion, anonymized statistical data may be retained for platform analytics."},
          {t:"9. Contact", c:"Privacy Officer: privacy@escarapay.in | General Support: support@escarapay.in | Website: escara-pay.vercel.app"},
        ].map(s=>(
          <div key={s.t} className="card" style={{marginBottom:14}}>
            <h3 className="syne" style={{fontWeight:700,fontSize:15,marginBottom:10,color:"var(--gold)"}}>{s.t}</h3>
            <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.9}}>{s.c}</p>
          </div>
        ))}
        <div style={{textAlign:"center",marginTop:24}}><button className="btn-ghost" onClick={onBack}>← Back to Home</button></div>
      </div>
    </div>
  );
}

function TermsPage({ onBack, dark, onToggle }) {
  return (
    <div style={{minHeight:"100vh"}}>
      <nav className="nav"><Logo /><div style={{display:"flex",gap:8,alignItems:"center"}}><ThemeToggle dark={dark} onToggle={onToggle} /><button className="btn-ghost" onClick={onBack}>← Back</button></div></nav>
      <div style={{maxWidth:760,margin:"0 auto",padding:"40px 20px"}}>
        <h1 className="syne" style={{fontWeight:800,fontSize:"clamp(24px,4vw,36px)",marginBottom:8}}>Terms & Conditions</h1>
        <p style={{color:"var(--muted)",fontSize:13,marginBottom:32}}>Last updated: March 2026 | Effective immediately upon registration</p>

        {[
          {t:"1. Acceptance of Terms", c:"By registering for or using EscaraPay, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services. These terms apply to both buyers and sellers using the EscaraPay platform on any device or interface."},
          {t:"2. Eligibility", c:"To use EscaraPay you must: be at least 18 years of age, have a valid Indian bank account or UPI ID, provide accurate and truthful registration information including valid PAN/GST (for sellers), not be prohibited from using financial services under any Indian law or court order."},
          {t:"3. Fee Structure", c:"Minimum token amount: ₹200 per transaction. Gateway fee: 2% charged to the buyer (non-refundable in all cases). EscaraPay commission: 5% deducted from token amount. Seller receives: 95% of token amount upon successful delivery. All fees are clearly displayed before any transaction is confirmed."},
          {t:"4. Token Release Conditions", c:"Condition 1 — Order Delivered: Buyer confirms delivery → token held for 7 days → auto-released to seller. Condition 2 — Buyer Cancels Before Dispatch: Token goes to seller as shipping cover compensation. Condition 3 — Seller Fails to Ship: If seller does not dispatch within agreed time, full token is refunded to buyer. Gateway fee and EscaraPay commission are non-refundable in all scenarios."},
        ].map(s=>(
          <div key={s.t} className="card" style={{marginBottom:14}}>
            <h3 className="syne" style={{fontWeight:700,fontSize:15,marginBottom:10,color:"var(--gold)"}}>{s.t}</h3>
            <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.9}}>{s.c}</p>
          </div>
        ))}

        {/* Dispute section highlighted */}
        <div className="card" style={{marginBottom:14,background:"rgba(239,68,68,.05)",borderColor:"rgba(239,68,68,.3)"}}>
          <h3 className="syne" style={{fontWeight:700,fontSize:15,marginBottom:12,color:"var(--red)"}}>5. Dispute Policy (Vistar mein)</h3>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[
              {icon:"⏰",t:"Dispute Window",d:"Buyers must raise a dispute within 48 hours of expected delivery date. After 48 hours, token auto-releases to seller."},
              {icon:"📋",t:"How to Raise Dispute",d:"Open your order → Click 'Dispute Raise Karo' → Select reason → Submit evidence if any. Seller will be notified immediately."},
              {icon:"🔍",t:"Investigation Process",d:"EscaraPay team investigates within 24 business hours. Both buyer and seller must provide evidence (photos, screenshots, tracking info). During investigation, token remains frozen."},
              {icon:"⚖️",t:"Resolution",d:"EscaraPay's decision is final and binding. If buyer is right → full token refunded to buyer. If seller is right → token released to seller. Partial resolutions may be made at EscaraPay's discretion."},
              {icon:"🚫",t:"Invalid Disputes",d:"Disputes raised after 48 hours, disputes without valid reason, or repeated false disputes may result in account suspension."},
              {icon:"📞",t:"Escalation",d:"If unsatisfied with resolution, email legal@escarapay.in with transaction ID. We escalate unresolved cases within 7 business days."},
            ].map(d=>(
              <div key={d.t} style={{display:"flex",gap:12,padding:10,background:"var(--sf2)",borderRadius:10}}>
                <span style={{fontSize:18,flexShrink:0}}>{d.icon}</span>
                <div><div style={{fontWeight:600,fontSize:13,marginBottom:3}}>{d.t}</div><div style={{fontSize:12,color:"var(--muted)",lineHeight:1.7}}>{d.d}</div></div>
              </div>
            ))}
          </div>
        </div>

        {[
          {t:"6. Prohibited Activities", c:"Users may not use EscaraPay for: sale of illegal, counterfeit, or prohibited goods, fraudulent transactions or identity theft, money laundering or financial fraud, creating multiple accounts to abuse the platform, harassment or threatening other users. Violations result in immediate account suspension, fund freeze, and may be reported to law enforcement under IT Act 2000 and IPC."},
          {t:"7. Seller Responsibilities", c:"Sellers must: accurately describe products and their condition, ship within the timeframe mentioned during order creation, provide valid tracking information after dispatch, respond to buyer queries within 24 hours, honor the deal terms agreed upon during order creation. Failure to meet these responsibilities may result in token refund to buyer and account suspension."},
          {t:"8. Buyer Responsibilities", c:"Buyers must: provide accurate delivery address and contact information, respond to delivery confirmation requests within 48 hours, raise disputes only for genuine reasons with evidence, not attempt chargebacks through their bank while EscaraPay dispute is active. False chargeback attempts will result in immediate account suspension."},
          {t:"9. Limitation of Liability", c:"EscaraPay's liability is strictly limited to the token amount held in escrow for that specific transaction. We are not liable for: quality, safety, or legality of products exchanged, indirect or consequential damages, losses due to network failures or payment gateway downtime, disputes arising from incorrect information provided by either party."},
          {t:"10. Governing Law & Jurisdiction", c:"These Terms are governed by the laws of India. All disputes are subject to the exclusive jurisdiction of courts in India. These terms comply with: Information Technology Act 2000, Payment and Settlement Systems Act 2007, Prevention of Money Laundering Act 2002, Applicable RBI guidelines on payment aggregators."},
          {t:"11. Contact for Legal Matters", c:"Legal queries: legal@escarapay.in | Dispute escalation: disputes@escarapay.in | General support: support@escarapay.in"},
        ].map(s=>(
          <div key={s.t} className="card" style={{marginBottom:14}}>
            <h3 className="syne" style={{fontWeight:700,fontSize:15,marginBottom:10,color:"var(--gold)"}}>{s.t}</h3>
            <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.9}}>{s.c}</p>
          </div>
        ))}
        <div style={{textAlign:"center",marginTop:24}}><button className="btn-ghost" onClick={onBack}>← Back to Home</button></div>
      </div>
    </div>
  );
}

function ContactPage({ onBack, dark, onToggle }) {
  const [form, setForm] = useState({name:"",email:"",subject:"",message:""});
  const [sent, setSent] = useState(false);
  return (
    <div style={{minHeight:"100vh"}}>
      <nav className="nav"><Logo /><div style={{display:"flex",gap:8,alignItems:"center"}}><ThemeToggle dark={dark} onToggle={onToggle} /><button className="btn-ghost" onClick={onBack}>← Back</button></div></nav>
      <div style={{maxWidth:680,margin:"0 auto",padding:"40px 20px"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <h1 className="syne" style={{fontWeight:800,fontSize:"clamp(24px,4vw,36px)",marginBottom:8}}>Contact Us</h1>
          <p style={{color:"var(--muted)",fontSize:14}}>24 ghante mein jawaab denge!</p>
        </div>
        <div className="g3" style={{marginBottom:32}}>
          {[{icon:"📧",title:"Support",value:"support@escarapay.in",sub:"General queries"},{icon:"⚖️",title:"Legal / Dispute",value:"legal@escarapay.in",sub:"Legal & escalation"},{icon:"📱",title:"WhatsApp",value:"+91-99999-ESCARA",sub:"Quick support"}].map(c=>(
            <div key={c.title} className="card" style={{textAlign:"center"}}><div style={{fontSize:28,marginBottom:10}}>{c.icon}</div><div className="syne" style={{fontWeight:700,fontSize:13,marginBottom:4}}>{c.title}</div><div style={{fontSize:12,color:"var(--gold)",wordBreak:"break-all",marginBottom:2}}>{c.value}</div><div style={{fontSize:11,color:"var(--muted)"}}>{c.sub}</div></div>
          ))}
        </div>
        {!sent ? (
          <div className="card">
            <h3 className="syne" style={{fontWeight:700,fontSize:18,marginBottom:20}}>Message Bhejo</h3>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div className="g2">
                <div><label className="label">Naam *</label><input className="input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
                <div><label className="label">Email *</label><input className="input" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
              </div>
              <div><label className="label">Subject *</label>
                <select className="select" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}>
                  <option value="">-- Select --</option>
                  <option>Payment Issue</option><option>Dispute Help</option><option>Refund Request</option>
                  <option>Account Problem</option><option>Technical Bug</option><option>Partnership</option><option>Other</option>
                </select>
              </div>
              <div><label className="label">Message *</label><textarea className="input" placeholder="Apni problem ya sawaal yahan likhein..." rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{resize:"vertical"}} /></div>
              <button className="btn-gold" style={{width:"100%",padding:12}} onClick={()=>{ if(form.name&&form.email&&form.subject&&form.message) setSent(true); else alert("Sab fields bharo!"); }}>📨 Message Bhejo</button>
            </div>
          </div>
        ) : (
          <div className="card" style={{textAlign:"center",padding:50}}>
            <div style={{fontSize:52,marginBottom:16}}>✅</div>
            <div className="syne" style={{fontWeight:800,fontSize:22,marginBottom:8}}>Message Mila!</div>
            <div style={{color:"var(--muted)",fontSize:14,marginBottom:24}}>Hum 24 ghante mein jawaab denge.<br/>Reference: <strong style={{color:"var(--gold)"}}>ESC-{Date.now().toString().slice(-6)}</strong></div>
            <button className="btn-ghost" onClick={()=>setSent(false)}>← Wapas Jao</button>
          </div>
        )}
        <div style={{textAlign:"center",marginTop:24}}><button className="btn-ghost" onClick={onBack}>← Back</button></div>
      </div>
    </div>
  );
}

/* ══════════ MAIN APP ══════════ */
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const [userPhone, setUserPhone] = useState("");
  const [dark, setDark] = useState(()=> localStorage.getItem("escara_dark")==="true");
  const toggleDark = () => { const nd=!dark; setDark(nd); localStorage.setItem("escara_dark",nd); };
  const [lang, setLang] = useState(()=> localStorage.getItem("escara_lang")||"hl");
  const toggleLang = (l) => { setLang(l); localStorage.setItem("escara_lang",l); };
  const [payOrderId, setPayOrderId] = useState(null);
  const [dealOrderId, setDealOrderId] = useState(null);
  const [adminKey, setAdminKey] = useState(()=> localStorage.getItem("adminKey") || "");

  useEffect(()=>{ window._goToPage=(s)=>setScreen(s); },[]);
  useEffect(()=>{
    const path=window.location.pathname;
    const pm=path.match(/^\/pay\/([A-Z0-9]+)$/); if(pm){setPayOrderId(pm[1]);setScreen("pay");return;}
    const dm=path.match(/^\/deal\/([A-Z0-9]+)$/); if(dm){setDealOrderId(dm[1]);setScreen("deal");return;}
    if(path==="/admin"){setScreen("admin-login");return;}
  },[]);

  const props = { dark, onToggle:toggleDark, lang, onLangToggle:toggleLang };
  const handleLogin=(t,n,id,phone)=>{setUserType(t);setUserName(n);setUserId(id);setUserPhone(phone||"");setScreen("dashboard");};
  const handleLogout=()=>{setScreen("landing");setUserType(null);setUserId(null);setUserPhone("");setUserName("");};
  const goHome=()=>{window.history.pushState({},"","/");setScreen("landing");setPayOrderId(null);setDealOrderId(null);};

  return (
    <>
      <style>{getStyle(dark)}</style>
      {screen==="pay"         && payOrderId  && <PayPage    orderId={payOrderId}  dark={dark} onToggle={toggleDark} onGoHome={goHome} />}
      {screen==="deal"        && dealOrderId && <DealPage   orderId={dealOrderId} dark={dark} onToggle={toggleDark} onGoHome={goHome} />}
      {screen==="admin-login" && <AdminLogin  onLogin={(k)=>{setAdminKey(k);setScreen("admin");}} dark={dark} onToggle={toggleDark} />}
      {screen==="admin"       && <AdminPanel  adminKey={adminKey} onLogout={()=>{localStorage.removeItem("adminKey");setScreen("landing");}} dark={dark} onToggle={toggleDark} />}
      {screen==="about"       && <AboutPage   onBack={()=>setScreen("landing")} {...props} />}
      {screen==="privacy"     && <PrivacyPage onBack={()=>setScreen("landing")} {...props} />}
      {screen==="terms"       && <TermsPage   onBack={()=>setScreen("landing")} {...props} />}
      {screen==="contact"     && <ContactPage onBack={()=>setScreen("landing")} {...props} />}
      {screen==="landing"     && <Landing     onEnter={t=>{setUserType(t);setScreen("auth");}} {...props} />}
      {screen==="auth"        && <Auth        type={userType} onLogin={handleLogin} onBack={()=>setScreen("landing")} {...props} />}
      {screen==="dashboard"   && userType==="seller" && <SellerDB user={userName||"Seller"} userId={userId} onLogout={handleLogout} {...props} />}
      {screen==="dashboard"   && userType==="buyer"  && <BuyerDB  user={userName||"Buyer"}  userId={userId} userPhone={userPhone} onLogout={handleLogout} {...props} />}
    </>
  );
}