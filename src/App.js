/* eslint-disable */
import { registerUser, loginUser, createOrder as apiCreateOrder, getSellerOrders, getBuyerOrders, getOrderById, createPaymentOrder, verifyPayment, confirmDelivery, raiseDispute, dispatchOrder, sendOTP, verifyOTP, sendRegisterOTP, verifyRegisterOTP } from './api';
import { useState, useEffect } from "react";
import LOGO_SRC from "./escarapay-logo.jpg";

// ── Inject Google Fonts once into <head> (avoids flash on re-render) ──
(function injectFonts() {
  if (document.getElementById("escara-gfonts")) return;
  const pc1 = document.createElement("link");
  pc1.rel = "preconnect";
  pc1.href = "https://fonts.googleapis.com";
  document.head.appendChild(pc1);
  const pc2 = document.createElement("link");
  pc2.rel = "preconnect";
  pc2.href = "https://fonts.gstatic.com";
  pc2.crossOrigin = "anonymous";
  document.head.appendChild(pc2);
  const link = document.createElement("link");
  link.id = "escara-gfonts";
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;700;800&display=swap";
  document.head.appendChild(link);
})();

const BACKEND_URL = "https://escarapay-backend-production.up.railway.app";

// Language translations
const T = {
  en: {
    tagline: "India's Trusted Payment Protection Platform",
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
    tagline: "भारत का भरोसेमंद पेमेंट प्रोटेक्शन प्लेटफॉर्म",
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
    tagline: "India Ka Trusted Payment Protection Platform",
    hero1: "WhatsApp Deal Ka",
    hero2: "Sabse Safe Tarika",
    heroDesc: "Seller ka RTO loss khatam. Buyer ka fraud ka darr khatam. Minimum ₹200 token se dono ko 100% protection.",
    sellerBtn: "Seller — Start Free",
    buyerBtn: "Buyer — Safe Order Do",
    howWorks: "Kaise Kaam Karta Hai?",
    sellerView: "Seller View",
    buyerView: "Buyer View",
    myOrders: "Mere Orders",
    payViaLink: "Pay via Link",
    createDeal: "Create Deal",
    help: "Help",
    dashboard: "Dashboard",
    allOrders: "Saare Orders",
    analytics: "Analytics",
    payments: "Payments",
    settings: "Settings",
    logout: "Logout",
    login: "Login",
    register: "Register",
    newOrder: "+ Naya Order Link",
    noOrders: "No orders yet!",
    loading: "Load ho raha hai...",
  },
};

function getStyle(dark) {
  return `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root {
    --bg:      ${dark ? "#0B0E14" : "#F8FAFC"};
    --surface: ${dark ? "#131620" : "#FFFFFF"};
    --sf2:     ${dark ? "#1C212D" : "#EBF4FA"};
    --border:  ${dark ? "rgba(255,255,255,0.08)" : "rgba(36,161,226,0.15)"};
    --gold:    #24A1E2;
    --gold2:   ${dark ? "#4BB3E9" : "#1A84C4"};
    --green:   ${dark ? "#10B981" : "#059669"};
    --red:     ${dark ? "#EF4444" : "#DC2626"};
    --blue:    ${dark ? "#38BDF8" : "#0284C7"};
    --text:    ${dark ? "#F1F5F9" : "#1D1C59"};
    --muted:   ${dark ? "#94A3B8" : "#64748B"};
    --accent:  ${dark ? "#8B5CF6" : "#4A1C81"};
  }
  body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;}
  .syne{font-family:'Outfit',sans-serif;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:var(--bg);}
  ::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px;}

  /* ── Keyframes ── */
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideLeft{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
  @keyframes slideRight{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
  @keyframes shimmer{0%{background-position:-300% center}100%{background-position:300% center}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes pulseCyan{0%,100%{box-shadow:0 0 0 0 rgba(36,161,226,.45)}50%{box-shadow:0 0 0 16px rgba(36,161,226,0)}}
  @keyframes glowCyan{0%,100%{box-shadow:0 4px 20px rgba(36,161,226,.25)}50%{box-shadow:0 8px 40px rgba(36,161,226,.5)}}
  @keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
  @keyframes borderGlow{0%,100%{border-color:rgba(36,161,226,.2)}50%{border-color:rgba(36,161,226,.6)}}
  @keyframes dotPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.85)}}
  @keyframes typewriter{from{width:0}to{width:100%}}
  @keyframes blinkCursor{0%,100%{border-color:var(--gold)}50%{border-color:transparent}}
  @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  @keyframes slideUpFade{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
  @keyframes scaleIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
  @keyframes glowPulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}
  @keyframes chipFadeIn{from{opacity:0;transform:translateY(10px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}

  /* ── Utility animation classes ── */
  .fu {animation:fadeUp .6s cubic-bezier(.22,.68,0,1.2) forwards}
  .fu2{animation:fadeUp .6s .14s cubic-bezier(.22,.68,0,1.2) both}
  .fu3{animation:fadeUp .6s .28s cubic-bezier(.22,.68,0,1.2) both}
  .fu4{animation:fadeUp .6s .42s cubic-bezier(.22,.68,0,1.2) both}
  .float{animation:float 3.5s ease-in-out infinite}
  .breathe{animation:breathe 4s ease-in-out infinite}

  /* ── Buttons ── */
  .btn-gold{
    background:linear-gradient(135deg,var(--gold),var(--gold2));
    color:#fff;border:none;padding:11px 26px;border-radius:10px;
    font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;
    cursor:pointer;transition:all .25s cubic-bezier(.4,0,.2,1);white-space:nowrap;
    letter-spacing:.3px;position:relative;overflow:hidden;
  }
  .btn-gold::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.15),transparent);opacity:0;transition:opacity .2s;}
  .btn-gold:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(36,161,226,.4);}
  .btn-gold:hover::after{opacity:1;}
  .btn-gold:active{transform:translateY(0);box-shadow:0 4px 12px rgba(36,161,226,.3);}
  .btn-gold.pulse{animation:pulseCyan 2.2s infinite;}

  .btn-green{background:linear-gradient(135deg,#10B981,#059669);color:#fff;border:none;padding:11px 26px;border-radius:10px;font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:all .25s;white-space:nowrap;}
  .btn-green:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(16,185,129,.35);}
  .btn-red{background:linear-gradient(135deg,#EF4444,#DC2626);color:#fff;border:none;padding:11px 26px;border-radius:10px;font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:all .25s;white-space:nowrap;}
  .btn-red:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(239,68,68,.3);}
  .btn-outline{
    background:transparent;color:var(--gold);border:1.5px solid var(--gold);
    padding:10px 26px;border-radius:10px;font-family:'Outfit',sans-serif;
    font-weight:600;font-size:14px;cursor:pointer;transition:all .25s;white-space:nowrap;
  }
  .btn-outline:hover{background:rgba(36,161,226,.1);transform:translateY(-2px);box-shadow:0 6px 20px rgba(36,161,226,.2);}
  .btn-ghost{
    background:var(--sf2);color:var(--text);border:1px solid var(--border);
    padding:9px 18px;border-radius:8px;font-family:'Inter',sans-serif;
    font-weight:500;font-size:13px;cursor:pointer;transition:all .2s;white-space:nowrap;
  }
  .btn-ghost:hover{border-color:var(--gold);color:var(--gold);background:rgba(36,161,226,.06);}
  .btn-whatsapp{background:linear-gradient(135deg,#25D366,#128C7E);color:#fff;border:none;padding:11px 20px;border-radius:10px;font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:all .25s;display:flex;align-items:center;gap:7px;white-space:nowrap;}
  .btn-whatsapp:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(37,211,102,.35);}

  /* ── Cards ── */
  .card{
    background:var(--surface);border:1px solid var(--border);
    border-radius:16px;padding:22px;
    transition:border-color .3s,box-shadow .3s,transform .25s;
  }
  .card:hover{border-color:rgba(36,161,226,.35);box-shadow:0 8px 32px rgba(36,161,226,.08);}

  /* ── Inputs ── */
  .input{width:100%;background:var(--sf2);border:1.5px solid var(--border);color:var(--text);padding:11px 14px;border-radius:10px;font-family:'Inter',sans-serif;font-size:14px;outline:none;transition:all .2s;}
  .input:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(36,161,226,.12);}
  .input::placeholder{color:var(--muted);}
  .select{width:100%;background:var(--sf2);border:1.5px solid var(--border);color:var(--text);padding:11px 14px;border-radius:10px;font-family:'Inter',sans-serif;font-size:14px;outline:none;cursor:pointer;transition:border-color .2s;}
  .select:focus{border-color:var(--gold);}
  .label{display:block;font-size:12px;color:var(--muted);margin-bottom:5px;font-weight:500;letter-spacing:.3px;}

  /* ── Badges ── */
  .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600;font-family:'Inter',sans-serif;}
  .bg{background:rgba(16,185,129,.15);color:var(--green);}
  .bo{background:rgba(36,161,226,.15);color:var(--gold);}
  .br{background:rgba(239,68,68,.15);color:var(--red);}
  .bb{background:rgba(56,189,248,.15);color:var(--blue);}
  .bm{background:var(--sf2);color:var(--muted);}
  .bpur{background:rgba(139,92,246,.15);color:#A78BFA;}
  .borange{background:rgba(251,146,60,.15);color:#FB923C;}

  /* ── Chips ── */
  .chip{display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;border:1px solid var(--border);background:var(--sf2);color:var(--muted);transition:all .2s;font-family:'Inter',sans-serif;}
  .chip:hover{border-color:var(--gold);color:var(--gold);}
  .chip.active{background:rgba(36,161,226,.12);border-color:var(--gold);color:var(--gold);}

  /* ── Nav ── */
  .nav{
    position:sticky;top:0;z-index:100;
    background:${dark ? "rgba(11,14,20,.92)" : "rgba(248,250,252,.94)"};
    backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
    border-bottom:1px solid var(--border);
    padding:0 20px;height:64px;
    display:flex;align-items:center;justify-content:space-between;gap:8px;
  }
  .logo-img{height:30px;width:auto;object-fit:contain;flex-shrink:0;}
  .logo-wrap{display:flex;align-items:center;gap:7px;cursor:pointer;flex-shrink:0;}
  .logo-name{
    font-family:'Outfit',sans-serif;font-size:17px;font-weight:800;
    background:linear-gradient(135deg,var(--gold),var(--gold2));
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    letter-spacing:-.3px;
  }
  .toggle-btn{display:flex;align-items:center;gap:6px;padding:6px 11px;border-radius:20px;border:1px solid var(--border);background:var(--sf2);cursor:pointer;font-size:12px;color:var(--muted);transition:all .2s;flex-shrink:0;font-family:'Inter',sans-serif;font-weight:500;}
  .toggle-btn:hover{border-color:var(--gold);color:var(--gold);background:rgba(36,161,226,.06);}

  /* ── Sidebar & Dashboard ── */
  .sidebar{width:220px;background:var(--surface);border-right:1px solid var(--border);padding:18px 10px;position:fixed;top:64px;left:0;bottom:0;overflow-y:auto;display:flex;flex-direction:column;}
  .si{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:9px;cursor:pointer;font-size:14px;font-weight:500;color:var(--muted);transition:all .2s;margin-bottom:2px;font-family:'Inter',sans-serif;}
  .si:hover{background:var(--sf2);color:var(--text);}
  .si.active{background:rgba(36,161,226,.1);color:var(--gold);font-weight:600;}
  .main{margin-left:220px;padding:24px;min-height:calc(100vh - 64px);}
  .step{display:flex;align-items:flex-start;gap:12px;padding:14px;border-radius:12px;border:1px solid var(--border);background:var(--surface);}
  .step-num{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;flex-shrink:0;}

  /* ── Grids ── */
  .g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
  .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}

  /* ── Table ── */
  .tbl{width:100%;border-collapse:collapse;}
  .tbl th{text-align:left;padding:11px 13px;font-size:11px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.6px;border-bottom:1px solid var(--border);white-space:nowrap;font-family:'Inter',sans-serif;}
  .tbl td{padding:12px 13px;font-size:13px;border-bottom:1px solid var(--border);font-family:'Inter',sans-serif;}
  .tbl tr:hover td{background:var(--sf2);}
  .tbl tr:last-child td{border-bottom:none;}

  /* ── Overlays & Modals ── */
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,.72);backdrop-filter:blur(6px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:14px;}
  .modal{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:28px;width:100%;max-width:470px;animation:fadeUp .3s cubic-bezier(.22,.68,0,1.2);max-height:88vh;overflow-y:auto;position:relative;z-index:10000;box-shadow:0 24px 60px rgba(0,0,0,.25);}

  /* ── Timeline ── */
  .tl{display:flex;gap:12px;padding-bottom:20px;position:relative;}
  .tl:not(:last-child)::before{content:'';position:absolute;left:14px;top:30px;bottom:0;width:2px;background:var(--border);}
  .tl-dot{width:30px;height:30px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;}

  /* ── Shimmer text ── */
  .shimmer{
    background:linear-gradient(90deg,#29B6F6,#1565C0,#3730A3,#00B4FF,#1565C0,#29B6F6);
    background-size:300% auto;
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    animation:shimmer 4s linear infinite;
  }

  /* ── Misc ── */
  .hero-glow{position:absolute;width:400px;height:400px;border-radius:50%;filter:blur(90px);pointer-events:none;}
  .avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--accent));display:flex;align-items:center;justify-content:center;font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;color:white;flex-shrink:0;}
  .ficon{width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:12px;}
  .stat-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px 20px;}
  .pbar{height:5px;background:var(--sf2);border-radius:3px;overflow:hidden;}
  .pfill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--gold),var(--gold2));transition:width .6s cubic-bezier(.4,0,.2,1);}
  .tracking-box{background:rgba(36,161,226,.08);border:1px solid rgba(36,161,226,.25);border-radius:10px;padding:12px;display:flex;align-items:center;gap:10px;}
  .hold-box{background:rgba(139,92,246,.08);border:1px solid rgba(139,92,246,.25);border-radius:10px;padding:12px;}
  .copy-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--green);color:#fff;padding:10px 22px;border-radius:10px;font-size:13px;font-weight:600;z-index:999;animation:fadeUp .3s ease;font-family:'Inter',sans-serif;}
  .mobile-nav{display:none;position:fixed;bottom:0;left:0;right:0;background:${dark?"rgba(19,22,32,.97)":"rgba(255,255,255,.97)"};backdrop-filter:blur(24px);border-top:1px solid var(--border);z-index:100;padding:8px 0 max(8px,env(safe-area-inset-bottom));}
  .mni{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 16px;cursor:pointer;border-radius:10px;transition:all .2s;color:var(--muted);font-size:10px;font-weight:500;min-width:60px;font-family:'Inter',sans-serif;}
  .mni.active{color:var(--gold);}
  .mni span:first-child{font-size:20px;}

  /* ── Responsive ── */
  @media(max-width:1024px){.g4{grid-template-columns:1fr 1fr;}}
  @media(max-width:800px){.g3{grid-template-columns:1fr 1fr;}}
  @media(max-width:640px){
    .sidebar{display:none;}
    .mobile-nav{display:flex;justify-content:space-around;align-items:center;}
    .main{margin-left:0 !important;padding:14px;padding-bottom:90px;width:100%;max-width:100vw;overflow-x:hidden;}
    .g2,.g3,.g4{grid-template-columns:1fr;}
    .nav{padding:0 10px;height:56px;}
    .hide-m{display:none !important;}
    body{overflow-x:hidden;}
    .card{padding:14px;}
    .tbl{font-size:11px;}
    .tbl th,.tbl td{padding:8px 6px;}
    .copy-toast{bottom:90px;}
    .btn-gold,.btn-outline,.btn-ghost{font-size:12px !important;padding:7px 8px !important;}
    .logo-name{font-size:14px;}
  }
  @media(max-width:380px){
    .nav{padding:0 6px;}
    .toggle-btn{padding:5px 7px;font-size:11px;}
  }
  .hide-d{display:none;}
  @media(max-width:640px){.hide-d{display:flex !important;}}
  *{box-sizing:border-box;}
  html,body{max-width:100vw;overflow-x:hidden;}
  `;
}

const MIN_TOKEN = 200;
const calcToken = (amount, pct) => Math.max(MIN_TOKEN, Math.round(Number(amount)*Number(pct)/100));
const BASE_URL = process.env.REACT_APP_FRONTEND_URL || "https://escarapay.in";

const STATUS_META = {
  pending:                { label:"Awaiting Token",       cls:"bm",     icon:"⏳" },
  pending_seller_confirm: { label:"Awaiting Seller Confirm",  cls:"borange", icon:"🤝" },
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

/* ── Token Receipt Download ── */
function downloadReceipt(order, role) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", { day:"2-digit", month:"long", year:"numeric", timeZone:"Asia/Kolkata" });
  const timeStr = now.toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit", hour12:true, timeZone:"Asia/Kolkata" });
  const receiptNum = "RCP-" + order.id + "-" + Date.now().toString().slice(-4);
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>EscaraPay Token Receipt — ${order.id}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:'Segoe UI',Arial,sans-serif;background:#f0f4f8;display:flex;justify-content:center;padding:30px 10px;}
  .receipt{background:#fff;border-radius:18px;max-width:480px;width:100%;box-shadow:0 4px 24px rgba(0,0,0,.10);overflow:hidden;}
  .header{background:linear-gradient(135deg,#0ea5e9,#1a84c4);padding:28px 28px 20px;color:#fff;text-align:center;}
  .logo{font-size:26px;font-weight:900;letter-spacing:-1px;margin-bottom:4px;}
  .tagline{font-size:11px;opacity:.85;letter-spacing:.5px;}
  .badge{display:inline-block;background:rgba(255,255,255,.25);border:1px solid rgba(255,255,255,.4);padding:4px 14px;border-radius:20px;font-size:11px;font-weight:700;margin-top:10px;letter-spacing:.5px;}
  .body{padding:24px 28px;}
  .title{font-size:15px;font-weight:700;color:#1e293b;margin-bottom:6px;}
  .subtitle{font-size:12px;color:#64748b;margin-bottom:20px;}
  .row{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid #f1f5f9;font-size:13px;}
  .row:last-child{border-bottom:none;}
  .row .lbl{color:#64748b;}
  .row .val{font-weight:600;color:#1e293b;text-align:right;}
  .row .val.big{font-size:16px;font-weight:800;color:#0ea5e9;}
  .row .val.green{color:#059669;}
  .divider{border:none;border-top:2px dashed #e2e8f0;margin:14px 0;}
  .section-title{font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.8px;text-transform:uppercase;margin-bottom:10px;}
  .status-chip{display:inline-flex;align-items:center;gap:6px;background:#dcfce7;color:#166534;padding:5px 14px;border-radius:20px;font-size:12px;font-weight:700;margin:12px 0;}
  .footer{background:#f8fafc;padding:16px 28px;text-align:center;border-top:1px solid #f1f5f9;}
  .footer-text{font-size:11px;color:#94a3b8;line-height:1.8;}
  .watermark{color:#0ea5e9;font-weight:700;font-size:11px;}
  @media print{body{background:#fff;padding:0;}  .receipt{box-shadow:none;border-radius:0;max-width:100%;} .no-print{display:none;}}
</style>
</head>
<body>
<div class="receipt">
  <div class="header">
    <div class="logo">EscaraPay</div>
    <div class="tagline">India's Trusted Payment Protection Platform</div>
    <div class="badge">🔐 TOKEN PAYMENT RECEIPT</div>
  </div>
  <div class="body">
    <div class="title">Payment Confirmation</div>
    <div class="subtitle">Receipt No: ${receiptNum}</div>
    <div class="status-chip">✅ Token Secured Successfully</div>
    <hr class="divider"/>
    <div class="section-title">Order Details</div>
    <div class="row"><span class="lbl">Order ID</span><span class="val">${order.id}</span></div>
    <div class="row"><span class="lbl">Product</span><span class="val">${order.product_name}</span></div>
    <div class="row"><span class="lbl">Seller</span><span class="val">${order.seller_name || order.seller_name_manual || "—"}</span></div>
    <div class="row"><span class="lbl">Buyer</span><span class="val">${order.buyer_name || "—"}</span></div>
    <div class="row"><span class="lbl">Order Value</span><span class="val">₹${Number(order.order_amount).toFixed(2)}</span></div>
    <hr class="divider"/>
    <div class="section-title">Payment Breakdown</div>
    <div class="row"><span class="lbl">Token Amount (${order.token_pct || 10}%)</span><span class="val">₹${Number(order.token_amount).toFixed(2)}</span></div>
    <div class="row"><span class="lbl">Gateway Fee (2%)</span><span class="val">₹${Number(order.gateway_fee).toFixed(2)}</span></div>
    <div class="row"><span class="lbl">Total Paid by Buyer</span><span class="val big">₹${Number(order.buyer_pays).toFixed(2)}</span></div>
    ${role !== "buyer" ? `<hr class="divider"/>
    <div class="section-title">Payout Info (Seller)</div>
    <div class="row"><span class="lbl">Platform Commission (5%)</span><span class="val">₹${Number(order.escara_commission).toFixed(2)}</span></div>
    <div class="row"><span class="lbl">Seller Receives (on delivery)</span><span class="val green">₹${Number(order.seller_receives).toFixed(2)}</span></div>` : ""}
    <hr class="divider"/>
    <div class="section-title">Transaction Info</div>
    <div class="row"><span class="lbl">Payment Gateway</span><span class="val">Cashfree (RBI Authorized)</span></div>
    <div class="row"><span class="lbl">Date</span><span class="val">${dateStr}</span></div>
    <div class="row"><span class="lbl">Time (IST)</span><span class="val">${timeStr}</span></div>
    <div class="row"><span class="lbl">Status</span><span class="val green">Token Paid ✅</span></div>
  </div>
  <div class="footer">
    <div class="footer-text">
      <span class="watermark">EscaraPay (India)</span><br/>
      MSME: UDYAM-UP-23-0036110 | support@escarapay.in<br/>
      Funds are securely held until delivery is confirmed.<br/>
      Track your order at: escarapay.in/track/${order.id}
    </div>
  </div>
</div>
<script>window.onload=()=>{setTimeout(()=>window.print(),400);}</script>
</body>
</html>`;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (!win) {
    const a = document.createElement("a");
    a.href = url; a.download = `EscaraPay-Receipt-${order.id}.html`; a.click();
  }
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

function Logo({ onClick }) {
  return (
    <div className="logo-wrap" onClick={onClick}>
      <img src={LOGO_SRC} alt="EscaraPay" className="logo-img" onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
      <div style={{display:"none",width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#0ea5e9,#38bdf8)",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,color:"#fff",fontFamily:"'Outfit',sans-serif"}}>E₹</div>
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
      else setError("Order not found. Please check the link.");
    });
  },[orderId]);

  const loadCashfree = () => new Promise((resolve, reject) => {
    if (document.getElementById("cashfree-script")) { resolve(); return; }
    const s = document.createElement("script");
    s.id = "cashfree-script";
    s.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    s.onload = resolve; s.onerror = reject;
    document.body.appendChild(s);
  });

  const handlePay = async () => {
    setPayError(""); setPayStep(1);
    try {
      await loadCashfree();
    } catch(e) { setPayError("Payment gateway failed to load. Please try again."); setPayStep(0); return; }
    const result = await createPaymentOrder(order.id);
    if (!result.success) { setPayError(result.error); setPayStep(0); return; }
    const { paymentSessionId } = result.data;
    setPayStep(0);
    const cashfree = window.Cashfree({ mode: "production" });
    cashfree.checkout({ paymentSessionId, redirectTarget: "_modal" }).then(async (res) => {
      if (res.error) { setPayError(res.error.message || "Payment failed"); return; }
      if (res.paymentDetails?.paymentStatus === "FAILED") { setPayError("Payment failed. Please try again."); return; }
      setPayStep(2);
      const verify = await verifyPayment(null, null, null, order.id);
      if (verify.success) { setPayStep(3); setOrder(prev=>({...prev,status:"token_paid"})); }
      else { setPayError("Verify failed: "+verify.error); setPayStep(0); }
    }).catch(e => { setPayError("Payment cancelled or failed."); setPayStep(0); });
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
          {loading && <div className="card" style={{textAlign:"center",padding:50}}><div style={{width:44,height:44,border:"3px solid var(--gold)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}} /><div style={{color:"var(--muted)"}}>Loading order...</div></div>}
          {error && <div className="card" style={{textAlign:"center",padding:40}}><div style={{fontSize:40,marginBottom:12}}>❌</div><div className="syne" style={{fontWeight:800,fontSize:18,marginBottom:8}}>No Order Found</div><div style={{color:"var(--muted)",fontSize:13,marginBottom:20}}>{error}</div><button className="btn-ghost" onClick={onGoHome}>← Home</button></div>}
          {payStep===3 && <div className="card fu" style={{textAlign:"center",padding:40}}><div style={{fontSize:60,marginBottom:16}}>🎉</div><div className="syne" style={{fontWeight:800,fontSize:24,color:"var(--green)",marginBottom:8}}>Token Secured!</div><div style={{color:"var(--muted)",fontSize:14,marginBottom:16}}>₹{order?.token_amount} secured in the protection vault</div><div style={{background:"rgba(14,165,233,.1)",border:"1px solid rgba(14,165,233,.2)",borderRadius:12,padding:14,marginBottom:20}}><div style={{fontSize:11,color:"var(--muted)",marginBottom:4}}>Save your Order ID:</div><div style={{fontFamily:"monospace",fontWeight:700,color:"var(--gold)",fontSize:16}}>{order?.id}</div></div><div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}><button className="btn-gold" style={{fontSize:13,padding:"10px 20px"}} onClick={()=>downloadReceipt(order,"buyer")}>📄 Download Receipt</button><button className="btn-ghost" onClick={onGoHome}>← Go to Home</button></div></div>}
          {payStep===2 && <div className="card" style={{textAlign:"center",padding:50}}><div style={{width:44,height:44,border:"3px solid var(--green)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}} /><div className="syne" style={{fontWeight:700,fontSize:16}}>Payment Verify ho rahi hai...</div></div>}
          {payStep===1 && <div className="card" style={{textAlign:"center",padding:50}}><div style={{width:44,height:44,border:"3px solid var(--gold)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}} /><div className="syne" style={{fontWeight:700,fontSize:16}}>Payment Gateway Load ho raha hai...</div></div>}
          {order && !loading && payStep===0 && (
            order.status !== "pending" ? (
              <div className="card" style={{textAlign:"center",padding:40}}>
                <div style={{fontSize:44,marginBottom:12}}>{order.status==="token_paid"?"🔐":"✅"}</div>
                <div className="syne" style={{fontWeight:800,fontSize:20,marginBottom:10}}>{order.status==="token_paid"?"Token Already Paid!":"Order Processed"}</div>
                <Bdg status={order.status} />
                <div style={{color:"var(--muted)",fontSize:13,marginTop:14,marginBottom:20}}>Payment has already been completed for this order.</div>
                <button className="btn-ghost" onClick={onGoHome}>← Home</button>
              </div>
            ) : (
              <div className="fu">
                <div style={{textAlign:"center",marginBottom:20}}>
                  <img src={LOGO_SRC} alt="EscaraPay" style={{height:44,objectFit:"contain",marginBottom:12}} onError={e=>e.target.style.display="none"} />
                  <div style={{fontSize:12,color:"var(--muted)",marginBottom:4}}>🛡️ Secured by EscaraPay</div>
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
                    <div style={{background:"rgba(14,165,233,.15)",border:"1px solid rgba(14,165,233,.3)",borderRadius:10,padding:12,textAlign:"center"}}><div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>You Pay</div><div className="syne" style={{fontWeight:800,fontSize:22,color:"var(--gold)"}}>₹{order.buyer_pays||order.token_amount}</div></div>
                  </div>
                  <div style={{background:"var(--sf2)",borderRadius:10,padding:12,fontSize:12,marginBottom:14}}>
                    <div style={{fontWeight:600,marginBottom:8,color:"var(--muted)"}}>💰 Breakdown</div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{color:"var(--muted)"}}>Token (Protected)</span><span>₹{order.token_amount}</span></div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{color:"var(--muted)"}}>Gateway Fee (2%)</span><span style={{color:"var(--muted)"}}>₹{order.gateway_fee}</span></div>
                    <div style={{height:1,background:"var(--border)",margin:"6px 0"}}></div>
                    <div style={{display:"flex",justifyContent:"space-between",fontWeight:700}}><span>Total</span><span style={{color:"var(--gold)"}}>₹{order.buyer_pays||order.token_amount}</span></div>
                  </div>
                  <div style={{background:"rgba(5,150,105,.08)",border:"1px solid rgba(5,150,105,.2)",borderRadius:10,padding:12,marginBottom:14}}>
                    <div style={{fontSize:12,fontWeight:700,color:"var(--green)",marginBottom:6}}>🛡️ EscaraPay Guarantee</div>
                    {["Token is held securely until delivery is confirmed","Item not received? Full token refund guaranteed","Raise a dispute within 7 days of delivery","Our team responds within 24 hours"].map(tx=>(
                      <div key={tx} style={{display:"flex",gap:7,fontSize:12,color:"var(--muted)",marginBottom:4}}><span style={{color:"var(--green)"}}>✓</span><span>{tx}</span></div>
                    ))}
                  </div>
                  <div style={{marginBottom:14}}>
                    <label className="label">Your Name (optional)</label>
                    <input className="input" placeholder="Rahul Sharma" value={buyerName} onChange={e=>setBuyerName(e.target.value)} style={{marginBottom:10}} />
                    <label className="label">WhatsApp Number (optional)</label>
                    <input className="input" placeholder="9876543210" value={buyerPhone} onChange={e=>setBuyerPhone(e.target.value)} />
                  </div>
                </div>
                {payError && <div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",borderRadius:10,padding:12,marginBottom:12,fontSize:13,color:"var(--red)"}}>❌ {payError}</div>}
                <button className="btn-gold pulse" style={{width:"100%",padding:"16px",fontSize:16,borderRadius:12,marginBottom:12}} onClick={handlePay}>
                  💳 Pay ₹{order.buyer_pays||order.token_amount} Token
                </button>
                <div style={{textAlign:"center",fontSize:12,color:"var(--muted)"}}>🔒 Secured by Cashfree • UPI, Cards, NetBanking</div>
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
          <div style={{background:"rgba(14,165,233,.1)",borderRadius:10,padding:12,border:"1px solid rgba(14,165,233,.2)"}}><div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Token (Protected)</div><div className="syne" style={{fontWeight:800,fontSize:20,color:"var(--gold)"}}>₹{order.token_amount}</div></div>
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
        {order.status==="dispatched" && <div className="hold-box" style={{marginBottom:12}}><div style={{fontSize:12,color:"#a78bfa",fontWeight:700}}>⏰ Token Hold: {daysLeft>0?`${daysLeft} more day${daysLeft===1?"":"s"}`:"Ready to release!"}</div></div>}
        {order.status==="dispatched" && order.confirm_token && (
          <div style={{background:"rgba(5,150,105,.08)",border:"1px solid rgba(5,150,105,.25)",borderRadius:10,padding:12,marginBottom:12}}>
            <div style={{fontSize:12,fontWeight:700,color:"var(--green)",marginBottom:6}}>🔗 Buyer Confirmation Link</div>
            <div style={{fontSize:11,color:"var(--muted)",marginBottom:8}}>Share with buyer — one tap to confirm, no login needed:</div>
            <div style={{display:"flex",gap:6,marginBottom:8}}>
              <code style={{fontSize:10,color:"var(--gold)",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",background:"var(--sf2)",padding:"6px 8px",borderRadius:6}}>
                {`escarapay.in/confirm/${order.confirm_token.slice(0,16)}...`}
              </code>
              <button className="btn-ghost" style={{padding:"5px 10px",fontSize:11,flexShrink:0}}
                onClick={()=>navigator.clipboard?.writeText(`https://escarapay.in/confirm/${order.confirm_token}`)}>
                📋 Copy
              </button>
            </div>
            <a href={`https://wa.me/${(order.buyer_phone||"").replace(/\D/g,"")}?text=${encodeURIComponent(`Hi! Your order "${order.product_name}" has been dispatched 📦\n\nPlease confirm delivery here — no login needed, just one tap:\n\n✅ https://escarapay.in/confirm/${order.confirm_token}\n\nHave an issue? Use the same link to report it.\n\n— via EscaraPay 🛡️`)}`}
              target="_blank" rel="noreferrer"
              style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"#25D366",color:"#fff",padding:"10px",borderRadius:8,textDecoration:"none",fontWeight:700,fontSize:13,width:"100%"}}>
              <span style={{fontSize:18}}>💬</span> Send via WhatsApp
            </a>
          </div>
        )}
        {isSeller && order.status==="token_paid" && (
          <div style={{marginBottom:12}}>
            <label className="label">Courier Tracking Number *</label>
            <input className="input" placeholder="Courier tracking number (e.g. DTDC123456)" value={tracking} onChange={e=>setTracking(e.target.value)} style={{marginBottom:8}} />
            <button className="btn-gold" style={{width:"100%"}} onClick={async()=>{
              if(!tracking){setMsg("❌ Please enter a tracking number!"); return;}
              setLoading(true);
              const r = await dispatchOrder(order.id, tracking);
              setLoading(false);
              if(r.success){
                onDispatch(order.id, tracking, r.data?.confirmUrl);
                setMsg("✅ Dispatched! Confirmation link sent to buyer via SMS/email.");
              } else setMsg("❌ "+r.error);
            }} disabled={loading}>{loading?"⏳...":"📦 Mark as Dispatched"}</button>
          </div>
        )}
        {!isSeller && order.status==="dispatched" && (
          <button className="btn-green" style={{width:"100%",padding:"11px",marginBottom:10}} onClick={async()=>{ setLoading(true); const r=await confirmDelivery(order.id); setLoading(false); if(r.success){onConfirmDelivery(order.id);onClose();}else setMsg("❌ "+r.error); }} disabled={loading}>{loading?"⏳...":"✅ Confirm Delivery Received"}</button>
        )}
        {["token_paid","dispatched"].includes(order.status) && !showDisputeForm && (
          <button className="btn-ghost" style={{width:"100%",marginBottom:8,color:"var(--red)",borderColor:"rgba(239,68,68,.3)"}} onClick={()=>setShowDisputeForm(true)}>⚠️ Raise a Dispute</button>
        )}
        {showDisputeForm && (
          <div style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",borderRadius:10,padding:12,marginBottom:12}}>
            <select className="select" value={disputeReason} onChange={e=>setDisputeReason(e.target.value)} style={{marginBottom:10}}>
              <option value="">-- Select a Reason --</option>
              {isSeller?(<><option value="Buyer not responding">Buyer is not responding</option><option value="False claim">Buyer is making a false claim</option></>)
               :(<><option value="Item not received">Item not received</option><option value="Wrong item">Wrong item received</option><option value="Damaged">Item received damaged</option><option value="Seller not responding">Seller not responding</option></>)}
            </select>
            <div style={{display:"flex",gap:8}}>
              <button className="btn-ghost" style={{flex:1}} onClick={()=>setShowDisputeForm(false)}>Cancel</button>
              <button className="btn-red" style={{flex:2,padding:"9px"}} onClick={async()=>{ if(!disputeReason){setMsg("❌ Please select a reason!"); return;} setLoading(true); const r=await raiseDispute(order.id,disputeReason,isSeller?"seller":"buyer"); setLoading(false); if(r.success){onDispute&&onDispute(order.id);setMsg("✅ Dispute raised successfully!");}else setMsg("❌ "+r.error); }} disabled={loading}>{loading?"⏳...":"Submit"}</button>
            </div>
          </div>
        )}
        {msg && <div style={{padding:10,borderRadius:8,background:"var(--sf2)",fontSize:13,marginBottom:10,color:msg.startsWith("✅")?"var(--green)":"var(--red)"}}>{msg}</div>}
        {["token_paid","dispatched","delivered"].includes(order.status) && (
          <button className="btn-ghost" style={{width:"100%",marginBottom:8}} onClick={()=>downloadReceipt(order, isSeller?"seller":"buyer")}>📄 Download Token Receipt</button>
        )}
        <button className="btn-ghost" style={{width:"100%"}} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

/* ══════════ STAT COUNT COMPONENT ══════════ */
function StatCount({ target, suffix, label, started }) {
  const val = useCountUp(target, 1800, started);
  return (
    <div style={{textAlign:"center"}}>
      <div className="syne" style={{
        fontSize:"clamp(32px,4vw,52px)",fontWeight:800,color:"#fff",lineHeight:1,marginBottom:6,
        letterSpacing:"-1px"
      }}>
        {val.toLocaleString("en-IN")}{suffix}
      </div>
      <div style={{fontSize:13,color:"rgba(255,255,255,.65)",fontWeight:500}}>{label}</div>
    </div>
  );
}

/* ══════════ SCROLL ANIMATION HOOK ══════════ */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = "opacity .6s ease, transform .6s ease";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

/* ══════════ COUNT UP HOOK ══════════ */
function useCountUp(target, duration = 1800, started = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      setVal(Math.floor(eased * target));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return val;
}

/* ══════════ LANDING ══════════ */
/* ══════════ TYPEWRITER COMPONENT ══════════ */
function TypeWriter({ words, dark }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) { const t = setTimeout(() => setPause(false), 1800); return () => clearTimeout(t); }
    const word = words[idx];
    if (!deleting && displayed === word) { setPause(true); setDeleting(true); return; }
    if (deleting && displayed === "") { setDeleting(false); setIdx((idx + 1) % words.length); return; }
    const speed = deleting ? 40 : 80;
    const t = setTimeout(() => {
      setDisplayed(deleting ? word.slice(0, displayed.length - 1) : word.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, pause, idx, words]);

  return (
    <span style={{
      color: "var(--gold)",
      borderRight: "3px solid var(--gold)",
      paddingRight: 4,
      animation: "blinkCursor 0.8s step-end infinite",
      minWidth: 2,
      display: "inline-block",
    }}>{displayed}</span>
  );
}

function Landing({ onEnter, onTrack, dark, onToggle, lang, onLangToggle }) {
  const t = T[lang] || T.hl;
  const [statsStarted, setStatsStarted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const statsRef = useScrollReveal ? null : null;
  useScrollReveal();

  const LT = {
    en: {
      heroTag: "India's Trusted Payment Protection Platform",
      heroH1a: "Escara Pay",
      heroH1b: "Stop RTO Losses & Scale Your Business with Escara Pay.",
      heroDesc: "Escara Pay ensures secure online transactions by protecting both buyers and sellers. We safeguard payments until the product is delivered, reducing fraud and building trust.",
      ctaSeller: "Login as Seller",
      ctaBuyer: "Login as Buyer",
      howTitle: "How Escara Pay Works?",
      whyTitle: "Why Choose Escara Pay?",
      whySub: "Trade with Confidence & Grow Without Risk",
      tokenTitle: "Token Hold System",
      tokenSub: "Your money is safe. Always.",
      steps: [
        { num:"01", icon:"📝", title:"Register & Agree", desc:"Both parties sign up and agree on price and terms." },
        { num:"02", icon:"🔗", title:"Generate Payment Link", desc:"The Seller creates a secure Escara Pay order link directly from their dashboard." },
        { num:"03", icon:"💬", title:"Share via WhatsApp", desc:"The link is sent instantly to the Buyer via WhatsApp for quick and easy access." },
        { num:"04", icon:"🔐", title:"Secure Deposit", desc:"The Buyer opens the link and pays the funds into Escara Pay's secure protected vault." },
        { num:"05", icon:"🚚", title:"Ship & Track", desc:"The Seller delivers the goods and provides tracking details." },
        { num:"06", icon:"✅", title:"Inspect & Release", desc:"Once the Buyer approves the delivery, Escara Pay releases the payment to the Seller." },
      ],
      benefits: [
        { icon:"🛡️", title:"Zero Fraud Risk", desc:"Eliminate the fear of 'payment-not-received' or 'item-not-shipped' scams.", color:"rgba(14,165,233,.15)", bdr:"rgba(14,165,233,.35)" },
        { icon:"📦", title:"Guaranteed RTO Protection", desc:"Escara Pay discourages casual or fake orders and protects your margins.", color:"rgba(5,150,105,.15)", bdr:"rgba(5,150,105,.35)" },
        { icon:"⚡", title:"2-Minute Rapid Setup", desc:"Our streamlined onboarding process lets you create your first secure payment link in just 2 minutes.", color:"rgba(240,180,41,.15)", bdr:"rgba(240,180,41,.35)" },
        { icon:"💬", title:"WhatsApp-Native Experience", desc:"Create, share, and track your protected orders directly within WhatsApp.", color:"rgba(37,211,102,.15)", bdr:"rgba(37,211,102,.35)" },
        { icon:"🔒", title:"Cashfree-Powered Security", desc:"Cashfree's infrastructure ensures every payment is encrypted and 100% secure.", color:"rgba(124,58,237,.15)", bdr:"rgba(124,58,237,.35)" },
        { icon:"⚖️", title:"Expert Dispute Resolution", desc:"Our mediators review the evidence and provide a fast, fair resolution.", color:"rgba(239,68,68,.15)", bdr:"rgba(239,68,68,.35)" },
      ],
      tokenCards: [
        { icon:"🔒", title:"Funds Securely Held", desc:"All buyer payments are locked in EscaraPay's secure protected vault — inaccessible to either party until conditions are met.", color:"rgba(14,165,233,.12)", bdr:"rgba(14,165,233,.3)" },
        { icon:"✅", title:"Released After Approval", desc:"Payment is only released to the Seller after the Buyer confirms delivery and satisfaction. No disputes, no delays.", color:"rgba(5,150,105,.12)", bdr:"rgba(5,150,105,.3)" },
        { icon:"⚠️", title:"Dispute Protection", desc:"Raise a dispute within 7 days. Our expert mediators review evidence and ensure a fair, fast resolution for both parties.", color:"rgba(240,180,41,.12)", bdr:"rgba(240,180,41,.3)" },
      ],
    },
    hi: {
      heroTag: "भारत का भरोसेमंद पेमेंट प्रोटेक्शन प्लेटफॉर्म",
      heroH1a: "एस्करा पे",
      heroH1b: "RTO नुकसान रोकें और बिज़नेस बढ़ाएं।",
      heroDesc: "Escara Pay आपके हर ऑनलाइन लेनदेन को सुरक्षित बनाता है। हम buyer और seller दोनों के payments तब तक सुरक्षित रखते हैं जब तक delivery verify न हो — fraud मुक्त, भरोसेमंद।",
      ctaSeller: "सेलर लॉगिन",
      ctaBuyer: "बायर लॉगिन",
      howTitle: "एस्करा पे कैसे काम करता है?",
      whyTitle: "एस्करा पे क्यों चुनें?",
      whySub: "विश्वास के साथ व्यापार करें और बिना जोखिम के बढ़ें",
      tokenTitle: "टोकन होल्ड सिस्टम",
      tokenSub: "आपका पैसा हमेशा सुरक्षित है।",
      steps: [
        { num:"01", icon:"📝", title:"रजिस्टर करें और सहमत हों", desc:"दोनों पक्ष साइन अप करते हैं और कीमत व शर्तों पर सहमत होते हैं।" },
        { num:"02", icon:"🔗", title:"पेमेंट लिंक बनाएं", desc:"सेलर अपने डैशबोर्ड से सीधे एक सुरक्षित एस्करा पे ऑर्डर लिंक बनाता है।" },
        { num:"03", icon:"💬", title:"व्हाट्सऐप पर शेयर करें", desc:"लिंक तुरंत व्हाट्सऐप के जरिए बायर को भेजा जाता है।" },
        { num:"04", icon:"🔐", title:"सुरक्षित जमा", desc:"बायर लिंक खोलता है और फंड एस्करा पे के सुरक्षित vault में जमा करता है।" },
        { num:"05", icon:"🚚", title:"भेजें और ट्रैक करें", desc:"सेलर सामान डिलीवर करता है और ट्रैकिंग डिटेल्स देता है।" },
        { num:"06", icon:"✅", title:"जांचें और रिलीज करें", desc:"बायर की मंजूरी के बाद एस्करा पे सेलर को पेमेंट रिलीज करता है।" },
      ],
      benefits: [
        { icon:"🛡️", title:"ज़ीरो फ्रॉड रिस्क", desc:"'पेमेंट नहीं मिली' या 'आइटम नहीं भेजा' जैसे स्कैम का डर खत्म।", color:"rgba(14,165,233,.15)", bdr:"rgba(14,165,233,.35)" },
        { icon:"📦", title:"RTO सुरक्षा गारंटी", desc:"एस्करा पे फर्जी ऑर्डर रोकता है और आपका मार्जिन बचाता है।", color:"rgba(5,150,105,.15)", bdr:"rgba(5,150,105,.35)" },
        { icon:"⚡", title:"2 मिनट में सेटअप", desc:"हमारी streamlined process से सिर्फ 2 मिनट में पहला secure payment link बनाएं।", color:"rgba(240,180,41,.15)", bdr:"rgba(240,180,41,.35)" },
        { icon:"💬", title:"व्हाट्सऐप नेटिव", desc:"व्हाट्सऐप में सीधे ऑर्डर बनाएं, शेयर करें और ट्रैक करें।", color:"rgba(37,211,102,.15)", bdr:"rgba(37,211,102,.35)" },
        { icon:"🔒", title:"रेजरपे पावर्ड सिक्योरिटी", desc:"रेजरपे का इन्फ्रास्ट्रक्चर हर पेमेंट को एन्क्रिप्टेड और 100% सुरक्षित रखता है।", color:"rgba(124,58,237,.15)", bdr:"rgba(124,58,237,.35)" },
        { icon:"⚖️", title:"विशेषज्ञ विवाद समाधान", desc:"हमारे मध्यस्थ सबूत देखकर तेज़ और निष्पक्ष निर्णय देते हैं।", color:"rgba(239,68,68,.15)", bdr:"rgba(239,68,68,.35)" },
      ],
      tokenCards: [
        { icon:"🔒", title:"फंड सुरक्षित रखे जाते हैं", desc:"सभी बायर पेमेंट एस्करा पे के secure vault में lock रहते हैं जब तक शर्तें पूरी न हों।", color:"rgba(14,165,233,.12)", bdr:"rgba(14,165,233,.3)" },
        { icon:"✅", title:"मंजूरी के बाद रिलीज", desc:"बायर की पुष्टि के बाद ही सेलर को पेमेंट जाती है।", color:"rgba(5,150,105,.12)", bdr:"rgba(5,150,105,.3)" },
        { icon:"⚠️", title:"विवाद सुरक्षा", desc:"7 दिनों में विवाद उठाएं। हमारे विशेषज्ञ तेज़ और निष्पक्ष समाधान देते हैं।", color:"rgba(240,180,41,.12)", bdr:"rgba(240,180,41,.3)" },
      ],
    },
    hl: {
      heroTag: "India Ka Trusted Payment Protection Platform",
      heroH1a: "Escara Pay",
      heroH1b: "RTO Losses Rokein & Business Badhao.",
      heroDesc: "Escara Pay aapke har online transaction ko secure banata hai. Hum buyer aur seller dono ke payments tab tak safe rakhte hain jab tak delivery verify na ho — fraud-free, trustworthy.",
      ctaSeller: "Login as Seller",
      ctaBuyer: "Login as Buyer",
      howTitle: "Escara Pay Kaise Kaam Karta Hai?",
      whyTitle: "Escara Pay Kyun Choose Karein?",
      whySub: "Trade with Confidence & Grow Without Risk",
      tokenTitle: "Token Hold System",
      tokenSub: "Aapka paisa hamesha safe hai.",
      steps: [
        { num:"01", icon:"📝", title:"Register & Agree", desc:"Dono parties sign up karti hain aur price aur terms par agree karti hain." },
        { num:"02", icon:"🔗", title:"Generate Payment Link", desc:"Seller apne dashboard se seedha ek secure Escara Pay order link banata hai." },
        { num:"03", icon:"💬", title:"Share via WhatsApp", desc:"Link turant WhatsApp ke zariye Buyer ko bheja jaata hai." },
        { num:"04", icon:"🔐", title:"Secure Deposit", desc:"Buyer link kholkar funds Escara Pay ke secure vault mein pay karta hai." },
        { num:"05", icon:"🚚", title:"Ship & Track", desc:"Seller saamaan deliver karta hai aur tracking details deta hai." },
        { num:"06", icon:"✅", title:"Inspect & Release", desc:"Buyer ki approval ke baad Escara Pay Seller ko payment release karta hai." },
      ],
      benefits: [
        { icon:"🛡️", title:"Zero Fraud Risk", desc:"'Payment nahi mili' ya 'item nahi bheja' jaisi scams ka darr khatam.", color:"rgba(14,165,233,.15)", bdr:"rgba(14,165,233,.35)" },
        { icon:"📦", title:"Guaranteed RTO Protection", desc:"Escara Pay fake orders rokta hai aur aapka margin bachata hai.", color:"rgba(5,150,105,.15)", bdr:"rgba(5,150,105,.35)" },
        { icon:"⚡", title:"2-Minute Rapid Setup", desc:"Hamare streamlined process se sirf 2 minute mein pehla secure payment link banao.", color:"rgba(240,180,41,.15)", bdr:"rgba(240,180,41,.35)" },
        { icon:"💬", title:"WhatsApp-Native Experience", desc:"WhatsApp mein seedha orders banao, share karo aur track karo.", color:"rgba(37,211,102,.15)", bdr:"rgba(37,211,102,.35)" },
        { icon:"🔒", title:"Cashfree-Powered Security", desc:"Cashfree ka infrastructure har payment ko encrypted aur 100% secure rakhta hai.", color:"rgba(124,58,237,.15)", bdr:"rgba(124,58,237,.35)" },
        { icon:"⚖️", title:"Expert Dispute Resolution", desc:"Hamare mediators evidence dekhkar fast aur fair resolution dete hain.", color:"rgba(239,68,68,.15)", bdr:"rgba(239,68,68,.35)" },
      ],
      tokenCards: [
        { icon:"🔒", title:"Funds Securely Held", desc:"Saari buyer payments EscaraPay ke secure protected vault mein lock rehti hain — tab tak jab tak conditions meet na ho.", color:"rgba(14,165,233,.12)", bdr:"rgba(14,165,233,.3)" },
        { icon:"✅", title:"Buyer Approval ke Baad Release", desc:"Payment sirf tab Seller ko milti hai jab Buyer delivery confirm kare. Koi dispute, koi delay nahi.", color:"rgba(5,150,105,.12)", bdr:"rgba(5,150,105,.3)" },
        { icon:"⚠️", title:"Dispute Protection", desc:"7 din mein dispute raise karo. Hamare expert mediators evidence review karke fair aur fast resolution dete hain.", color:"rgba(240,180,41,.12)", bdr:"rgba(240,180,41,.3)" },
      ],
    },
  };

  const lc = LT[lang] || LT.hl;

  // ── Stats IntersectionObserver ──
  useEffect(() => {
    const el = document.getElementById("stats-section");
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStatsStarted(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ── Static content (no translation needed) ──
  const STATS = [
    { val:1200, suffix:"+", label: lang==="hi"?"ऑर्डर प्रोटेक्ट हुए": lang==="en"?"Orders Protected":"Orders Protected" },
    { val:98,   suffix:"%", label: lang==="hi"?"सफल डिलीवरी":lang==="en"?"Successful Deliveries":"Successful Deliveries" },
    { val:4,    suffix:" hr",label:lang==="hi"?"औसत विवाद समाधान":lang==="en"?"Avg Dispute Resolution":"Avg Dispute Resolution" },
    { val:500,  suffix:"K+",label:lang==="hi"?"₹ सुरक्षित रखे":lang==="en"?"₹ Secured":"₹ Secured" },
  ];

  const COMPARE = {
    head: lang==="hi"?["विकल्प","EscaraPay","Direct UPI","Cash on Delivery"]:["Option","EscaraPay","Direct UPI","Cash on Delivery"],
    rows: [
      { f: lang==="hi"?"फ्रॉड से सुरक्षा":lang==="en"?"Fraud Protection":"Fraud Protection",               a:"✅", b:"❌", c:"⚠️" },
      { f: lang==="hi"?"RTO सुरक्षा":lang==="en"?"RTO Protection":"RTO Protection",                         a:"✅", b:"❌", c:"❌" },
      { f: lang==="hi"?"टोकन होल्ड सिस्टम":lang==="en"?"Token Hold System":"Token Hold System",            a:"✅", b:"❌", c:"❌" },
      { f: lang==="hi"?"विवाद समाधान":lang==="en"?"Dispute Resolution":"Dispute Resolution",                a:"✅", b:"❌", c:"⚠️" },
      { f: lang==="hi"?"WhatsApp नेटिव":lang==="en"?"WhatsApp Native":"WhatsApp Native",                   a:"✅", b:"⚠️", c:"❌" },
      { f: lang==="hi"?"2 मिनट सेटअप":lang==="en"?"2-Min Setup":"2-Min Setup",                             a:"✅", b:"✅", c:"❌" },
      { f: lang==="hi"?"पेमेंट एनक्रिप्शन":lang==="en"?"Payment Encryption":"Payment Encryption",          a:"✅", b:"✅", c:"❌" },
    ],
  };

  const FAQS = lang==="hi" ? [
    { q:"EscaraPay पर न्यूनतम टोकन राशि क्या है?", a:"न्यूनतम टोकन ₹200 है। यह ऑर्डर वैल्यू का एक प्रतिशत होता है जो एस्क्रो में सुरक्षित रखा जाता है।" },
    { q:"अगर सेलर ने आइटम नहीं भेजा तो क्या होगा?", a:"अगर सेलर निर्धारित समय में आइटम नहीं भेजता, तो टोकन पूरी तरह बायर को वापस कर दिया जाएगा।" },
    { q:"टोकन का पैसा सेलर को कब मिलेगा?", a:"डिलीवरी की पुष्टि के बाद 7 दिनों में या जब बायर खुद कन्फर्म कर दे, तभी पैसा रिलीज होता है।" },
    { q:"क्या EscaraPay RBI से approved है?", a:"EscaraPay Cashfree के ज़रिए पेमेंट प्रोसेस करता है जो RBI-compliant और PCI DSS certified है।" },
    { q:"विवाद कैसे उठाएं?", a:"डिलीवरी के 7 दिनों के अंदर अपने डैशबोर्ड में जाकर 'Dispute Raise Karo' बटन दबाएं। हमारी टीम 24 घंटे में जवाब देगी।" },
    { q:"क्या कोई hidden charges हैं?", a:"नहीं। केवल 2% Cashfree gateway fee है जो बायर को पेमेंट के समय दिखाई जाती है। कोई छुपी हुई फीस नहीं।" },
  ] : lang==="en" ? [
    { q:"What is the minimum token amount on EscaraPay?", a:"The minimum token is ₹200. It is a percentage of the order value that is held securely in our protected vault until delivery is confirmed." },
    { q:"What if the seller doesn't ship the item?", a:"If the seller fails to ship within the agreed time, the full token amount is automatically refunded to the buyer." },
    { q:"When does the seller receive the token payment?", a:"The payment is released to the seller within 7 days of delivery confirmation, or immediately when the buyer manually confirms receipt." },
    { q:"Is EscaraPay approved by RBI?", a:"EscaraPay processes payments via Cashfree, which is fully RBI-compliant and PCI DSS Level 1 certified, ensuring maximum security." },
    { q:"How do I raise a dispute?", a:"Within 7 days of delivery, go to your dashboard and click 'Raise Dispute'. Our team will investigate and respond within 24 hours." },
    { q:"Are there any hidden charges?", a:"No hidden charges. Only a 2% Cashfree gateway fee is applied, which is shown transparently at the time of payment." },
  ] : [
    { q:"EscaraPay pe minimum token kitna hota hai?", a:"Minimum token ₹200 hai. Yeh order value ka ek percentage hota hai jo delivery confirm hone tak protected vault mein safe rakha jaata hai." },
    { q:"Agar seller ne item nahi bheja toh kya hoga?", a:"Agar seller decided time mein item nahi bhejta, toh poora token amount buyer ko automatically wapas kar diya jaata hai." },
    { q:"Seller ko token payment kab milegi?", a:"Delivery confirmation ke 7 din ke andar, ya jab buyer khud confirm kare — tab payment seller ko release hoti hai." },
    { q:"Kya EscaraPay RBI se approved hai?", a:"EscaraPay Cashfree ke zariye payments process karta hai jo RBI-compliant aur PCI DSS Level 1 certified hai." },
    { q:"Dispute kaise raise karein?", a:"Delivery ke 7 din ke andar dashboard mein jaao aur 'Dispute Raise Karo' button dabao. Hamari team 24 ghante mein jawab degi." },
    { q:"Koi hidden charges hain kya?", a:"Koi hidden charge nahi. Sirf 2% Cashfree gateway fee hai jo payment ke waqt clearly dikhti hai." },
  ];

  return (
    <div style={{minHeight:"100vh"}}>
      {/* ── NAV ── */}
      <nav className="nav">
        <Logo />
        <div style={{display:"flex",gap:5,alignItems:"center",flexShrink:0}}>
          <LangToggle lang={lang} onToggle={onLangToggle} />
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <button className="btn-ghost" style={{padding:"7px 10px",fontSize:12,whiteSpace:"nowrap",color:"var(--muted)"}} onClick={onTrack}>
            📦 <span className="hide-m">Track</span>
          </button>
          {/* Desktop only — hide on mobile since hero CTA buttons are visible */}
          <button className="btn-ghost hide-m" style={{padding:"7px 10px",fontSize:12,whiteSpace:"nowrap"}} onClick={()=>onEnter("buyer")}>
            🛍️ {lc.ctaBuyer}
          </button>
          <button className="btn-gold hide-m" style={{padding:"7px 10px",fontSize:12,whiteSpace:"nowrap"}} onClick={()=>onEnter("seller")}>
            🏪 {lc.ctaSeller}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{
        position:"relative",overflow:"hidden",
        background: dark
          ? "linear-gradient(160deg,#05080f 0%,#091525 40%,#0a0e1a 100%)"
          : "linear-gradient(160deg,#f0f8ff 0%,#e0f0ff 40%,#f5faff 100%)",
        padding:"clamp(70px,12vw,120px) clamp(16px,5vw,40px) clamp(80px,10vw,110px)",
        textAlign:"center"
      }}>
        {/* Animated background grid */}
        <div style={{
          position:"absolute",inset:0,
          backgroundImage: dark
            ? "radial-gradient(circle at 1px 1px, rgba(14,165,233,.08) 1px, transparent 0)"
            : "radial-gradient(circle at 1px 1px, rgba(14,165,233,.06) 1px, transparent 0)",
          backgroundSize:"40px 40px",
          pointerEvents:"none"
        }} />

        {/* Glowing orbs */}
        <div style={{position:"absolute",top:"-80px",left:"5%",width:500,height:500,borderRadius:"50%",background:"rgba(14,165,233,.06)",filter:"blur(90px)",pointerEvents:"none",animation:"glowPulse 6s ease-in-out infinite"}} />
        <div style={{position:"absolute",bottom:"-60px",right:"5%",width:400,height:400,borderRadius:"50%",background:"rgba(56,189,248,.05)",filter:"blur(80px)",pointerEvents:"none",animation:"glowPulse 8s ease-in-out infinite reverse"}} />
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:300,borderRadius:"50%",background:"rgba(14,165,233,.03)",filter:"blur(60px)",pointerEvents:"none"}} />

        {/* Live badge */}
        <div style={{animation:"slideUpFade .6s ease both",marginBottom:20}}>
          <span style={{
            display:"inline-flex",alignItems:"center",gap:8,
            background: dark?"rgba(14,165,233,.1)":"rgba(14,165,233,.08)",
            border:"1px solid rgba(14,165,233,.25)",
            borderRadius:100,padding:"7px 18px",
            fontSize:12,fontWeight:600,color:"var(--gold)",letterSpacing:".5px"
          }}>
            <span style={{
              width:8,height:8,borderRadius:"50%",background:"#22c55e",display:"inline-block",
              boxShadow:"0 0 0 3px rgba(34,197,94,.2)",animation:"dotPulse 1.5s ease-in-out infinite"
            }} />
            {lc.heroTag}
          </span>
        </div>

        {/* H1 with typewriter */}
        <h1 className="syne" style={{
          fontSize:"clamp(38px,6.5vw,80px)",fontWeight:800,lineHeight:1.05,
          marginBottom:16,letterSpacing:"-2px",
          animation:"slideUpFade .7s .1s ease both"
        }}>
          <span className="shimmer">{lc.heroH1a}</span>
        </h1>

        {/* Typewriter subtitle */}
        <h2 className="syne" style={{
          fontSize:"clamp(18px,3vw,32px)",fontWeight:700,lineHeight:1.3,marginBottom:10,
          color: dark?"rgba(255,255,255,.9)":"rgba(12,35,64,.85)",
          animation:"slideUpFade .7s .2s ease both"
        }}>
          {lang==="en" ? (
            <>Stop <TypeWriter words={["RTO Losses","Fake Orders","Payment Fraud","Buyer Disputes"]} dark={dark} /> Forever</>
          ) : lang==="hi" ? (
            <>रोकें <TypeWriter words={["RTO नुकसान","फेक ऑर्डर","पेमेंट फ्रॉड"]} dark={dark} /> हमेशा के लिए</>
          ) : (
            <>Rokein <TypeWriter words={["RTO Loss","Fake Orders","Payment Fraud","Buyer Disputes"]} dark={dark} /> Hamesha</>
          )}
        </h2>

        <p style={{
          color:"var(--muted)",fontSize:"clamp(14px,1.6vw,17px)",
          maxWidth:540,margin:"0 auto 40px",lineHeight:1.8,
          animation:"slideUpFade .7s .3s ease both"
        }}>
          {lc.heroDesc}
        </p>

        {/* CTA Buttons */}
        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:48,animation:"slideUpFade .7s .4s ease both"}}>
          <button
            className="btn-gold"
            style={{
              fontSize:15,padding:"15px 40px",borderRadius:14,letterSpacing:".3px",
              boxShadow:"0 8px 32px rgba(14,165,233,.35)",
              animation:"pulseCyan 2.5s infinite"
            }}
            onClick={()=>onEnter("seller")}
          >
            🏪 {lc.ctaSeller}
          </button>
          <button
            className="btn-outline"
            style={{fontSize:15,padding:"14px 40px",borderRadius:14,letterSpacing:".3px"}}
            onClick={()=>onEnter("buyer")}
          >
            🛍️ {lc.ctaBuyer}
          </button>
        </div>

        {/* Trust chips — staggered animation */}
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          {[
            {icon:"🔒",text:"Cashfree Secured",delay:".5s"},
            {icon:"🛡️",text:"Payment Protected",delay:".6s"},
            {icon:"⚡",text:"RBI Compliant",delay:".7s"},
            {icon:"✅",text:"2-Min Setup",delay:".8s"},
            {icon:"🏆",text:"MSME Registered",delay:".9s"},
          ].map(chip=>(
            <span key={chip.text} style={{
              display:"inline-flex",alignItems:"center",gap:6,
              background: dark?"rgba(255,255,255,.04)":"rgba(14,165,233,.06)",
              border:"1px solid",
              borderColor: dark?"rgba(255,255,255,.08)":"rgba(14,165,233,.15)",
              borderRadius:100,padding:"6px 14px",
              fontSize:11,fontWeight:600,color:"var(--muted)",
              animation:`chipFadeIn .5s ${chip.delay} ease both`,
              backdropFilter:"blur(8px)",
              transition:"all .2s"
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(14,165,233,.4)";e.currentTarget.style.color="var(--gold)";e.currentTarget.style.background=dark?"rgba(14,165,233,.1)":"rgba(14,165,233,.1)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=dark?"rgba(255,255,255,.08)":"rgba(14,165,233,.15)";e.currentTarget.style.color="var(--muted)";e.currentTarget.style.background=dark?"rgba(255,255,255,.04)":"rgba(14,165,233,.06)";}}
            >
              {chip.icon} {chip.text}
            </span>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{padding:"80px clamp(16px,5vw,40px)",background:"var(--surface)"}}>
        <div className="reveal" style={{textAlign:"center",marginBottom:52}}>
          <span style={{
            display:"inline-block",background:"rgba(14,165,233,.1)",
            border:"1px solid rgba(14,165,233,.2)",borderRadius:100,
            padding:"4px 16px",fontSize:11,fontWeight:700,color:"var(--gold)",
            letterSpacing:"2px",textTransform:"uppercase",marginBottom:14
          }}>PROCESS</span>
          <h2 className="syne" style={{fontSize:"clamp(26px,3.5vw,44px)",fontWeight:800,marginBottom:14,letterSpacing:"-0.5px"}}>
            {lc.howTitle}
          </h2>
          <p style={{color:"var(--muted)",fontSize:15,maxWidth:480,margin:"0 auto",lineHeight:1.6}}>
            {lang==="hi"?"सरल, सुरक्षित, और तेज़ — बस 6 स्टेप्स में।":"Simple, secure, and fast — in just 6 steps."}
          </p>
        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
          gap:20,maxWidth:980,margin:"0 auto"
        }}>
          {lc.steps.map((step,i)=>(
            <div key={step.num} className="card" style={{
              padding:"26px 22px",
              background: dark?"var(--surface)":"#fff",
              position:"relative",overflow:"hidden",
              transition:"transform .25s,box-shadow .25s,border-color .25s",
              cursor:"default"
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 16px 40px rgba(14,165,233,.12)";e.currentTarget.style.borderColor="rgba(14,165,233,.35)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor="var(--border)";}}
            >
              {/* Step number accent */}
              <div style={{
                position:"absolute",top:14,right:16,
                fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:32,
                color: dark?"rgba(255,255,255,.04)":"rgba(14,165,233,.06)",
                lineHeight:1,userSelect:"none"
              }}>{step.num}</div>

              <div style={{
                width:46,height:46,borderRadius:12,marginBottom:16,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,
                background: i%2===0
                  ? dark?"rgba(14,165,233,.15)":"rgba(14,165,233,.1)"
                  : dark?"rgba(56,189,248,.12)":"rgba(56,189,248,.1)",
                border:`1px solid ${i%2===0?"rgba(14,165,233,.25)":"rgba(56,189,248,.2)"}`,
              }}>
                {step.icon}
              </div>

              <div style={{
                display:"inline-block",
                background:"rgba(14,165,233,.12)",border:"1px solid rgba(14,165,233,.25)",
                borderRadius:100,padding:"2px 10px",fontSize:10,fontWeight:700,
                color:"var(--gold)",letterSpacing:"1px",textTransform:"uppercase",marginBottom:10
              }}>Step {step.num}</div>

              <h3 className="syne" style={{fontWeight:700,fontSize:16,marginBottom:8,lineHeight:1.3}}>
                {step.title}
              </h3>
              <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.7,margin:0}}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY CHOOSE ── */}
      <div style={{padding:"80px clamp(16px,5vw,40px)",background:"var(--sf2)"}}>
        <div className="reveal" style={{textAlign:"center",marginBottom:52}}>
          <p style={{fontSize:12,fontWeight:700,color:"var(--gold)",letterSpacing:"2px",textTransform:"uppercase",marginBottom:10}}>BENEFITS</p>
          <h2 className="syne" style={{fontSize:"clamp(24px,3.5vw,40px)",fontWeight:800,marginBottom:12,letterSpacing:"-0.5px"}}>
            {lc.whyTitle}
          </h2>
          <p style={{color:"var(--muted)",fontSize:15,maxWidth:460,margin:"0 auto",lineHeight:1.6}}>
            {lc.whySub}
          </p>
        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",
          gap:18,maxWidth:980,margin:"0 auto"
        }}>
          {lc.benefits.map(b=>(
            <div key={b.title} className="card" style={{
              background:b.color,borderColor:b.bdr,
              padding:"26px 22px",
              transition:"transform .25s,box-shadow .25s",cursor:"default"
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 14px 36px rgba(0,0,0,.1)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}
            >
              <div style={{
                width:48,height:48,borderRadius:14,marginBottom:16,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,
                background: dark?"rgba(0,0,0,.2)":"rgba(255,255,255,.6)",
                border:`1px solid ${b.bdr}`,
              }}>
                {b.icon}
              </div>
              <h3 className="syne" style={{fontWeight:700,fontSize:15,marginBottom:8,lineHeight:1.3}}>
                {b.title}
              </h3>
              <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.7,margin:0}}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── TOKEN HOLD SYSTEM ── */}
      <div style={{padding:"70px clamp(16px,5vw,40px)",background:"var(--surface)"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <p style={{fontSize:12,fontWeight:700,color:"var(--gold)",letterSpacing:"2px",textTransform:"uppercase",marginBottom:10}}>SECURITY</p>
          <h2 className="syne" style={{fontSize:"clamp(24px,3.5vw,40px)",fontWeight:800,marginBottom:12,letterSpacing:"-0.5px"}}>
            {lc.tokenTitle}
          </h2>
          <p style={{color:"var(--muted)",fontSize:15,maxWidth:440,margin:"0 auto",lineHeight:1.6}}>
            {lc.tokenSub}
          </p>
        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",
          gap:20,maxWidth:900,margin:"0 auto 44px"
        }}>
          {lc.tokenCards.map(card=>(
            <div key={card.title} className="card" style={{
              background:card.color,borderColor:card.bdr,
              padding:"30px 24px",textAlign:"center",
              transition:"transform .25s,box-shadow .25s"
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 14px 36px rgba(0,0,0,.1)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}
            >
              <div style={{
                width:56,height:56,borderRadius:16,margin:"0 auto 18px",
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,
                background: dark?"rgba(0,0,0,.2)":"rgba(255,255,255,.65)",
                border:`1px solid ${card.bdr}`,
              }}>
                {card.icon}
              </div>
              <h3 className="syne" style={{fontWeight:700,fontSize:16,marginBottom:10,lineHeight:1.3}}>
                {card.title}
              </h3>
              <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.75,margin:0}}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Row inside token section */}
        <div style={{textAlign:"center"}}>
          <div style={{
            display:"inline-flex",flexDirection:"column",alignItems:"center",gap:16,
            background: dark?"rgba(14,165,233,.06)":"rgba(14,165,233,.05)",
            border:"1px solid rgba(14,165,233,.2)",borderRadius:20,
            padding:"32px 40px",maxWidth:480,width:"100%"
          }}>
            <div style={{fontSize:36}}>🚀</div>
            <div className="syne" style={{fontWeight:800,fontSize:20,lineHeight:1.3}}>
              {lang==="hi"?"आज ही शुरू करें!":lang==="en"?"Start for Free Today!":"Aaj Hi Shuru Karo!"}
            </div>
            <p style={{color:"var(--muted)",fontSize:13,lineHeight:1.6,margin:0}}>
              {lang==="hi"?"EscaraPay के साथ हर डील सुरक्षित बनाएं।":lang==="en"?"Make every deal safe with EscaraPay.":"EscaraPay ke saath har deal safe banao."}
            </p>
            <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
              <button className="btn-gold pulse" style={{padding:"12px 28px",fontSize:14}} onClick={()=>onEnter("seller")}>🏪 {lc.ctaSeller}</button>
              <button className="btn-outline" style={{padding:"11px 28px",fontSize:14}} onClick={()=>onEnter("buyer")}>🛍️ {lc.ctaBuyer}</button>
            </div>
          </div>
        </div>
      </div>

      {/* ══ TOKEN RELEASE — 3 CONDITIONS ══ */}
      <div className="reveal" style={{padding:"80px clamp(16px,5vw,40px)",background:"var(--sf2)"}}>
        <div style={{maxWidth:960,margin:"0 auto"}}>
          {/* Header */}
          <div style={{textAlign:"center",marginBottom:56}}>
            <p style={{fontSize:11,fontWeight:700,color:"var(--gold)",letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:12}}>
              {lang==="hi"?"टोकन रिलीज सिस्टम":lang==="en"?"TOKEN RELEASE SYSTEM":"TOKEN RELEASE SYSTEM"}
            </p>
            <h2 className="syne" style={{fontSize:"clamp(26px,3.8vw,44px)",fontWeight:800,marginBottom:14,letterSpacing:"-0.8px",lineHeight:1.15}}>
              {lang==="hi"?"टोकन कब किसे मिलेगा?":lang==="en"?"When & Who Gets the Token?":"Token Kab Kisko Milega?"}
            </h2>
            <p style={{color:"var(--muted)",fontSize:15,maxWidth:480,margin:"0 auto",lineHeight:1.7}}>
              {lang==="hi"?"हर scenario में EscaraPay सही फैसला करता है — ऑटोमेटिक और फेयर।"
               :lang==="en"?"In every scenario, EscaraPay makes the right call — automatic and fair."
               :"Har scenario mein EscaraPay sahi faisla karta hai — automatic aur fair."}
            </p>
          </div>

          {/* 3 Condition Cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24,marginBottom:48}}>

            {/* Card 1 — Successful Delivery → Seller */}
            <div className="reveal" style={{
              borderRadius:20,overflow:"hidden",
              border:`2px solid rgba(16,185,129,.35)`,
              background: dark?"rgba(16,185,129,.06)":"rgba(16,185,129,.05)",
              transition:"transform .3s,box-shadow .3s",cursor:"default"
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 24px 60px rgba(16,185,129,.15)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}
            >
              {/* Top accent bar */}
              <div style={{height:4,background:"linear-gradient(90deg,#10B981,#34D399)"}} />
              <div style={{padding:"28px 26px"}}>
                {/* Icon */}
                <div style={{
                  width:60,height:60,borderRadius:18,marginBottom:20,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,
                  background:"rgba(16,185,129,.15)",border:"1px solid rgba(16,185,129,.3)"
                }}>✅</div>
                {/* Condition label */}
                <div style={{
                  display:"inline-block",background:"rgba(16,185,129,.15)",
                  border:"1px solid rgba(16,185,129,.3)",borderRadius:100,
                  padding:"3px 12px",fontSize:11,fontWeight:700,color:"var(--green)",
                  letterSpacing:"1px",textTransform:"uppercase",marginBottom:14
                }}>
                  {lang==="hi"?"स्थिति 1":lang==="en"?"Condition 1":"Condition 1"}
                </div>
                <h3 className="syne" style={{fontWeight:800,fontSize:18,marginBottom:10,lineHeight:1.25,color:"var(--text)"}}>
                  {lang==="hi"?"डिलीवरी सफल रही":lang==="en"?"Successful Delivery":"Delivery Successful Hui"}
                </h3>
                <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.8,marginBottom:20}}>
                  {lang==="hi"?"बायर ने डिलीवरी कन्फर्म कर दी या 7 दिन बिना विवाद के बीत गए।"
                   :lang==="en"?"Buyer confirms delivery, or 7 days pass without a dispute."
                   :"Buyer ne delivery confirm kar di ya 7 din bina dispute ke beet gaye."}
                </p>
                {/* Result arrow */}
                <div style={{
                  display:"flex",alignItems:"center",gap:12,
                  background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.25)",
                  borderRadius:12,padding:"14px 16px"
                }}>
                  <div style={{fontSize:20}}>🏪</div>
                  <div>
                    <div style={{fontSize:11,color:"var(--muted)",fontWeight:600,letterSpacing:"0.5px",textTransform:"uppercase",marginBottom:2}}>
                      {lang==="hi"?"टोकन जाता है":lang==="en"?"Token Goes To":"Token Jaata Hai"}
                    </div>
                    <div className="syne" style={{fontWeight:800,fontSize:16,color:"var(--green)"}}>
                      {lang==="hi"?"→ सेलर को ✓":lang==="en"?"→ Seller ✓":"→ Seller ko ✓"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 — Fraud Seller / Not Shipped → Buyer */}
            <div className="reveal" style={{
              borderRadius:20,overflow:"hidden",
              border:`2px solid rgba(239,68,68,.35)`,
              background: dark?"rgba(239,68,68,.05)":"rgba(239,68,68,.04)",
              transition:"transform .3s,box-shadow .3s",cursor:"default"
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 24px 60px rgba(239,68,68,.12)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}
            >
              <div style={{height:4,background:"linear-gradient(90deg,#EF4444,#F87171)"}} />
              <div style={{padding:"28px 26px"}}>
                <div style={{
                  width:60,height:60,borderRadius:18,marginBottom:20,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,
                  background:"rgba(239,68,68,.15)",border:"1px solid rgba(239,68,68,.3)"
                }}>🚨</div>
                <div style={{
                  display:"inline-block",background:"rgba(239,68,68,.12)",
                  border:"1px solid rgba(239,68,68,.3)",borderRadius:100,
                  padding:"3px 12px",fontSize:11,fontWeight:700,color:"var(--red)",
                  letterSpacing:"1px",textTransform:"uppercase",marginBottom:14
                }}>
                  {lang==="hi"?"स्थिति 2":lang==="en"?"Condition 2":"Condition 2"}
                </div>
                <h3 className="syne" style={{fontWeight:800,fontSize:18,marginBottom:10,lineHeight:1.25,color:"var(--text)"}}>
                  {lang==="hi"?"सेलर ने डिलीवर नहीं किया":lang==="en"?"Seller Didn't Deliver":"Seller Ne Deliver Nahi Kiya"}
                </h3>
                <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.8,marginBottom:20}}>
                  {lang==="hi"?"सेलर ने आइटम नहीं भेजा, या फ्रॉड सेलर निकला — बायर ने dispute raise किया।"
                   :lang==="en"?"Seller failed to ship, or turned out to be fraudulent — buyer raised a dispute."
                   :"Seller ne item nahi bheja, ya fraud seller nikla — buyer ne dispute raise kiya."}
                </p>
                <div style={{
                  display:"flex",alignItems:"center",gap:12,
                  background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",
                  borderRadius:12,padding:"14px 16px"
                }}>
                  <div style={{fontSize:20}}>🛍️</div>
                  <div>
                    <div style={{fontSize:11,color:"var(--muted)",fontWeight:600,letterSpacing:"0.5px",textTransform:"uppercase",marginBottom:2}}>
                      {lang==="hi"?"टोकन जाता है":lang==="en"?"Token Goes To":"Token Jaata Hai"}
                    </div>
                    <div className="syne" style={{fontWeight:800,fontSize:16,color:"var(--red)"}}>
                      {lang==="hi"?"→ बायर को (Refund) ✓":lang==="en"?"→ Buyer (Full Refund) ✓":"→ Buyer ko (Refund) ✓"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 — Buyer Cancels After Dispatch → Seller (RTO) */}
            <div className="reveal" style={{
              borderRadius:20,overflow:"hidden",
              border:`2px solid rgba(36,161,226,.35)`,
              background: dark?"rgba(36,161,226,.06)":"rgba(36,161,226,.05)",
              transition:"transform .3s,box-shadow .3s",cursor:"default"
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 24px 60px rgba(36,161,226,.12)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}
            >
              <div style={{height:4,background:"linear-gradient(90deg,#24A1E2,#4BB3E9)"}} />
              <div style={{padding:"28px 26px"}}>
                <div style={{
                  width:60,height:60,borderRadius:18,marginBottom:20,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,
                  background:"rgba(36,161,226,.15)",border:"1px solid rgba(36,161,226,.3)"
                }}>📦</div>
                <div style={{
                  display:"inline-block",background:"rgba(36,161,226,.12)",
                  border:"1px solid rgba(36,161,226,.3)",borderRadius:100,
                  padding:"3px 12px",fontSize:11,fontWeight:700,color:"var(--gold)",
                  letterSpacing:"1px",textTransform:"uppercase",marginBottom:14
                }}>
                  {lang==="hi"?"स्थिति 3":lang==="en"?"Condition 3":"Condition 3"}
                </div>
                <h3 className="syne" style={{fontWeight:800,fontSize:18,marginBottom:10,lineHeight:1.25,color:"var(--text)"}}>
                  {lang==="hi"?"बायर ने Dispatch के बाद Cancel किया":lang==="en"?"Buyer Cancels After Dispatch":"Buyer Ne Dispatch Ke Baad Cancel Kiya"}
                </h3>
                <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.8,marginBottom:20}}>
                  {lang==="hi"?"सेलर ने माल भेज दिया, लेकिन बायर ने बीच में cancel कर दिया (RTO)।"
                   :lang==="en"?"Seller already shipped the item, but buyer cancelled mid-way causing an RTO."
                   :"Seller ne maal bhej diya, lekin buyer ne beech mein cancel kar diya — RTO hua."}
                </p>
                <div style={{
                  display:"flex",alignItems:"center",gap:12,
                  background:"rgba(36,161,226,.1)",border:"1px solid rgba(36,161,226,.2)",
                  borderRadius:12,padding:"14px 16px"
                }}>
                  <div style={{fontSize:20}}>🏪</div>
                  <div>
                    <div style={{fontSize:11,color:"var(--muted)",fontWeight:600,letterSpacing:"0.5px",textTransform:"uppercase",marginBottom:2}}>
                      {lang==="hi"?"टोकन जाता है":lang==="en"?"Token Goes To":"Token Jaata Hai"}
                    </div>
                    <div className="syne" style={{fontWeight:800,fontSize:16,color:"var(--gold)"}}>
                      {lang==="hi"?"→ सेलर को (RTO Cover) ✓":lang==="en"?"→ Seller (RTO Cover) ✓":"→ Seller ko (RTO Cover) ✓"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom guarantee strip */}
          <div style={{
            background: dark
              ? "linear-gradient(135deg,rgba(36,161,226,.1),rgba(74,28,129,.1))"
              : "linear-gradient(135deg,rgba(36,161,226,.07),rgba(74,28,129,.06))",
            border:"1px solid rgba(36,161,226,.2)",borderRadius:16,
            padding:"22px 28px",
            display:"flex",alignItems:"center",gap:16,flexWrap:"wrap",justifyContent:"center",
            textAlign:"center"
          }}>
            <span style={{fontSize:28}}>🛡️</span>
            <div>
              <div className="syne" style={{fontWeight:700,fontSize:15,marginBottom:4}}>
                {lang==="hi"?"EscaraPay Guarantee":lang==="en"?"EscaraPay Guarantee":"EscaraPay Guarantee"}
              </div>
              <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.6}}>
                {lang==="hi"?"हमारी टीम हर dispute को 24 घंटे में review करती है और सबूत के आधार पर fair decision देती है।"
                 :lang==="en"?"Our team reviews every dispute within 24 hours and delivers a fair, evidence-based decision."
                 :"Hamari team har dispute ko 24 ghante mein review karti hai aur fair decision deti hai."}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="reveal" style={{padding:"70px clamp(16px,5vw,40px)",background:"var(--sf2)"}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          {/* Top label */}
          <div style={{textAlign:"center",marginBottom:48}}>
            <p style={{fontSize:12,fontWeight:700,color:"var(--gold)",letterSpacing:"2px",textTransform:"uppercase",marginBottom:10}}>EARLY ACCESS</p>
            <h2 className="syne" style={{fontSize:"clamp(24px,3.5vw,40px)",fontWeight:800,marginBottom:14,letterSpacing:"-0.5px"}}>
              {lang==="hi"?"पहले 100 में शामिल हों":lang==="en"?"Join Our First 100 Sellers":"Pehle 100 Sellers Mein Shaamil Ho"}
            </h2>
            <p style={{color:"var(--muted)",fontSize:15,maxWidth:500,margin:"0 auto",lineHeight:1.7}}>
              {lang==="hi"?"EscaraPay अभी launch हो रहा है। पहले 100 sellers को lifetime benefits मिलेंगे।"
               :lang==="en"?"EscaraPay is just launching. Our first 100 sellers get exclusive lifetime benefits."
               :"EscaraPay abhi launch ho raha hai. Pehle 100 sellers ko exclusive lifetime benefits milenge."}
            </p>
          </div>

          {/* Benefits grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:18,marginBottom:44}}>
            {[
              { icon:"🎯", color:"rgba(36,161,226,.15)", bdr:"rgba(36,161,226,.3)",
                title: lang==="hi"?"ज़ीरो प्लेटफॉर्म फीस":lang==="en"?"Zero Platform Fee":"Zero Platform Fee",
                desc: lang==="hi"?"पहले 100 sellers के लिए हमारी platform fee बिल्कुल माफ।":lang==="en"?"Our platform fee is completely waived for the first 100 sellers.":"Pehle 100 sellers ke liye hamaari platform fee bilkul maaf." },
              { icon:"⚡", color:"rgba(74,28,129,.15)", bdr:"rgba(74,28,129,.3)",
                title: lang==="hi"?"प्रायोरिटी सपोर्ट":lang==="en"?"Priority Support":"Priority Support",
                desc: lang==="hi"?"Early sellers को 24/7 dedicated support मिलेगी — कोई भी समस्या तुरंत सुलझेगी।":lang==="en"?"Early sellers get dedicated 24/7 support — every issue resolved instantly.":"Early sellers ko 24/7 dedicated support milegi — koi bhi problem turant suljhegi." },
              { icon:"🔒", color:"rgba(16,185,129,.15)", bdr:"rgba(16,185,129,.3)",
                title: lang==="hi"?"Cashfree सिक्योर पेमेंट":lang==="en"?"Cashfree Secured":"Cashfree Secured",
                desc: lang==="hi"?"हर पेमेंट RBI-compliant Cashfree से secure है — आपका और buyer का पैसा safe.":lang==="en"?"Every payment secured via RBI-compliant Cashfree — your money, always safe.":"Har payment RBI-compliant Cashfree se secure hai — aapka aur buyer ka paisa safe." },
              { icon:"📊", color:"rgba(240,180,41,.12)", bdr:"rgba(240,180,41,.3)",
                title: lang==="hi"?"फीडबैक से प्लेटफॉर्म शेप करें":lang==="en"?"Shape the Platform":"Platform Shape Karo",
                desc: lang==="hi"?"Early users के suggestions से ही हम features बनाएंगे। आपकी आवाज़ सुनी जाएगी।":lang==="en"?"We build features based on early user feedback. Your voice matters here.":"Early users ke suggestions se hi hum features banayenge. Aapki awaaz suni jayegi." },
            ].map((b,i)=>(
              <div key={i} className="card reveal" style={{
                background:b.color,borderColor:b.bdr,padding:"24px 22px",
                transition:"transform .25s,box-shadow .25s",
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 14px 36px rgba(0,0,0,.1)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}
              >
                <div style={{fontSize:28,marginBottom:12}}>{b.icon}</div>
                <h3 className="syne" style={{fontWeight:700,fontSize:15,marginBottom:8}}>{b.title}</h3>
                <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.75,margin:0}}>{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Slots counter */}
          <div style={{
            background: dark?"rgba(36,161,226,.07)":"rgba(36,161,226,.05)",
            border:"1px solid rgba(36,161,226,.2)",
            borderRadius:20,padding:"32px 28px",textAlign:"center"
          }}>
            <div style={{
              display:"inline-flex",alignItems:"center",gap:8,
              background:"rgba(36,161,226,.12)",border:"1px solid rgba(36,161,226,.25)",
              borderRadius:100,padding:"6px 16px",marginBottom:18,
              fontSize:12,fontWeight:700,color:"var(--gold)",letterSpacing:"1px",textTransform:"uppercase"
            }}>
              <span style={{width:7,height:7,borderRadius:"50%",background:"var(--green)",display:"inline-block",animation:"dotPulse 1.5s ease-in-out infinite"}}/>
              {lang==="hi"?"अभी लाइव हो रहा है":lang==="en"?"Now Live":"Abhi Live Ho Raha Hai"}
            </div>
            <h3 className="syne" style={{fontWeight:800,fontSize:"clamp(20px,3vw,30px)",marginBottom:10,letterSpacing:"-0.5px"}}>
              {lang==="hi"?"सीमित Early Access Slots":lang==="en"?"Limited Early Access Slots":"Limited Early Access Slots"}
            </h3>
            <p style={{color:"var(--muted)",fontSize:14,marginBottom:24,lineHeight:1.7,maxWidth:400,margin:"0 auto 24px"}}>
              {lang==="hi"?"अभी register करें और India ke top payment protection platform का हिस्सा बनें।"
               :lang==="en"?"Register now and be part of India's most trusted payment protection platform."
               :"Abhi register karo aur India ke top payment protection platform ka hissa bano."}
            </p>
            <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
              <button className="btn-gold pulse" style={{fontSize:15,padding:"13px 36px",borderRadius:12}} onClick={()=>onEnter("seller")}>
                🏪 {lc.ctaSeller}
              </button>
              <button className="btn-outline" style={{fontSize:15,padding:"12px 36px",borderRadius:12}} onClick={()=>onEnter("buyer")}>
                🛍️ {lc.ctaBuyer}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── COMPARISON TABLE ── */}
      <div className="reveal" style={{padding:"70px clamp(16px,5vw,40px)",background:"var(--surface)"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <p style={{fontSize:12,fontWeight:700,color:"var(--gold)",letterSpacing:"2px",textTransform:"uppercase",marginBottom:10}}>COMPARISON</p>
          <h2 className="syne" style={{fontSize:"clamp(24px,3.5vw,40px)",fontWeight:800,marginBottom:12,letterSpacing:"-0.5px"}}>
            {lang==="hi"?"EscaraPay vs बाकी तरीके":lang==="en"?"EscaraPay vs Other Methods":"EscaraPay vs Baaki Tarike"}
          </h2>
          <p style={{color:"var(--muted)",fontSize:15,maxWidth:440,margin:"0 auto",lineHeight:1.6}}>
            {lang==="hi"?"देखो क्यों EscaraPay सबसे आगे है":lang==="en"?"See why EscaraPay leads the way":"Dekho kyun EscaraPay sabse aage hai"}
          </p>
        </div>
        <div style={{maxWidth:780,margin:"0 auto",overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"separate",borderSpacing:0}}>
            <thead>
              <tr>
                {COMPARE.head.map((h,i)=>(
                  <th key={i} style={{
                    padding:"14px 18px",
                    textAlign: i===0?"left":"center",
                    fontSize:13,fontFamily:"'Outfit',sans-serif",fontWeight:700,
                    background: i===1
                      ? "linear-gradient(135deg,rgba(14,165,233,.2),rgba(56,189,248,.15))"
                      : "var(--sf2)",
                    color: i===1?"var(--gold)":"var(--muted)",
                    borderBottom:"2px solid var(--border)",
                    borderTop:"1px solid var(--border)",
                    borderLeft: i===0?"1px solid var(--border)":"none",
                    borderRight:"1px solid var(--border)",
                    borderRadius: i===0?"12px 0 0 0":i===COMPARE.head.length-1?"0 12px 0 0":"0",
                    position:"relative"
                  }}>
                    {i===1 && (
                      <div style={{position:"absolute",top:-1,left:"50%",transform:"translateX(-50%)",background:"var(--gold)",color:dark?"#000":"#fff",fontSize:9,fontWeight:800,padding:"2px 10px",borderRadius:100,whiteSpace:"nowrap",letterSpacing:"1px"}}>
                        ⭐ BEST
                      </div>
                    )}
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE.rows.map((row,ri)=>(
                <tr key={ri}>
                  <td style={{padding:"13px 18px",fontSize:13,fontWeight:500,background:"var(--sf2)",borderBottom:"1px solid var(--border)",borderLeft:"1px solid var(--border)",borderRight:"1px solid var(--border)",color:"var(--text)"}}>{row.f}</td>
                  <td style={{padding:"13px 18px",textAlign:"center",fontSize:16,background:dark?"rgba(14,165,233,.07)":"rgba(14,165,233,.04)",borderBottom:"1px solid rgba(14,165,233,.15)",borderRight:"1px solid var(--border)"}}>{row.a}</td>
                  <td style={{padding:"13px 18px",textAlign:"center",fontSize:16,background:"var(--surface)",borderBottom:"1px solid var(--border)",borderRight:"1px solid var(--border)"}}>{row.b}</td>
                  <td style={{padding:"13px 18px",textAlign:"center",fontSize:16,background:"var(--surface)",borderBottom:"1px solid var(--border)",borderRight:"1px solid var(--border)"}}>{row.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{marginTop:10,fontSize:11,color:"var(--muted)",textAlign:"center"}}>
            ✅ = {lang==="hi"?"पूरी तरह":lang==="en"?"Fully Supported":"Fully Supported"} &nbsp;⚠️ = {lang==="hi"?"आंशिक":lang==="en"?"Partial":"Partial"} &nbsp;❌ = {lang==="hi"?"नहीं":lang==="en"?"Not Available":"Not Available"}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="reveal" style={{padding:"70px clamp(16px,5vw,40px)",background:"var(--sf2)"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <p style={{fontSize:12,fontWeight:700,color:"var(--gold)",letterSpacing:"2px",textTransform:"uppercase",marginBottom:10}}>FAQ</p>
          <h2 className="syne" style={{fontSize:"clamp(24px,3.5vw,40px)",fontWeight:800,marginBottom:12,letterSpacing:"-0.5px"}}>
            {lang==="hi"?"अक्सर पूछे जाने वाले सवाल":lang==="en"?"Frequently Asked Questions":"Aksar Puche Jaane Waale Sawaal"}
          </h2>
          <p style={{color:"var(--muted)",fontSize:15,maxWidth:420,margin:"0 auto",lineHeight:1.6}}>
            {lang==="hi"?"कोई सवाल? हमारे पास जवाब है।":lang==="en"?"Any questions? We have the answers.":"Koi sawaal? Hamare paas jawab hai."}
          </p>
        </div>
        <div style={{maxWidth:720,margin:"0 auto",display:"flex",flexDirection:"column",gap:10}}>
          {FAQS.map((faq,i)=>(
            <div key={i} className="card" style={{
              padding:0,overflow:"hidden",
              border: openFaq===i?"1px solid rgba(14,165,233,.4)":"1px solid var(--border)",
              transition:"border-color .2s"
            }}>
              <button
                onClick={()=>setOpenFaq(openFaq===i?null:i)}
                style={{
                  width:"100%",padding:"18px 20px",
                  display:"flex",justifyContent:"space-between",alignItems:"center",
                  background:"transparent",border:"none",cursor:"pointer",
                  fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:14,
                  color:"var(--text)",textAlign:"left",gap:12
                }}
              >
                <span>{faq.q}</span>
                <span style={{
                  width:24,height:24,borderRadius:"50%",flexShrink:0,
                  background: openFaq===i?"rgba(14,165,233,.2)":"var(--sf2)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:14,color:"var(--gold)",transition:"all .2s",
                  transform: openFaq===i?"rotate(45deg)":"rotate(0deg)"
                }}>+</span>
              </button>
              {openFaq===i && (
                <div style={{padding:"0 20px 18px",fontSize:13,color:"var(--muted)",lineHeight:1.8,borderTop:"1px solid var(--border)",paddingTop:14}}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:32}}>
          <span style={{fontSize:13,color:"var(--muted)"}}>
            {lang==="hi"?"और सवाल हैं? ":lang==="en"?"More questions? ":"Aur sawaal hain? "}
          </span>
          <span style={{fontSize:13,color:"var(--gold)",fontWeight:600,cursor:"pointer",textDecoration:"underline"}} onClick={()=>window._goToPage("contact")}>
            {lang==="hi"?"हमसे संपर्क करें →":lang==="en"?"Contact Us →":"Contact Karo →"}
          </span>
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <div style={{
        background: dark?"rgba(14,165,233,.07)":"rgba(14,165,233,.06)",
        borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",
        padding:"16px 20px"
      }}>
        <div style={{maxWidth:900,margin:"0 auto",display:"flex",justifyContent:"center",alignItems:"center",gap:"clamp(18px,4vw,52px)",flexWrap:"wrap"}}>
          {[
            {icon:"🔒",text:"Secure Payments"},
            {icon:"🛡️",text:"Payment Protection"},
            {icon:"⚡",text:"Fast & Safe"},
            {icon:"✅",text:"Powered by Cashfree (RBI Compliant)"},
          ].map(b=>(
            <div key={b.text} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,fontWeight:600,color:"var(--gold)",whiteSpace:"nowrap"}}>
              <span>{b.icon}</span><span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{background:dark?"#08080f":"#0c2340",padding:"48px 20px 24px",color:"#fff"}}>
        <div style={{maxWidth:960,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:32,marginBottom:36}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                <img src={LOGO_SRC} alt="EscaraPay" style={{height:28,objectFit:"contain"}} onError={e=>e.target.style.display="none"} />
                <span style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:16,color:"#fff"}}>EscaraPay</span>
              </div>
              <p style={{fontSize:12,color:"rgba(255,255,255,.5)",lineHeight:1.85,marginBottom:12}}>India's trusted payment protection platform for WhatsApp & Instagram sellers.</p>
              <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>MSME Reg: UDYAM-UP-23-0036110<br/>CIN: Applied for Registration</div>
            </div>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:1.2,marginBottom:14}}>Company</div>
              {[["About Us","about"],["Contact Us","contact"],["How It Works","landing"]].map(([l,s])=>(
                <div key={l} style={{fontSize:13,color:"rgba(255,255,255,.65)",marginBottom:9,cursor:"pointer",transition:"color .2s"}}
                  onMouseEnter={e=>e.target.style.color="#fff"}
                  onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.65)"}
                  onClick={()=>window._goToPage(s)}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:1.2,marginBottom:14}}>Legal</div>
              {[["Terms & Conditions","terms"],["Privacy Policy","privacy"],["Refund Policy","refund"],["Dispute Resolution","dispute"]].map(([l,s])=>(
                <div key={l} style={{fontSize:13,color:"rgba(255,255,255,.65)",marginBottom:9,cursor:"pointer",transition:"color .2s"}}
                  onMouseEnter={e=>e.target.style.color="#fff"}
                  onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.65)"}
                  onClick={()=>window._goToPage(s)}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:1.2,marginBottom:14}}>Contact</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,.65)",marginBottom:7}}>📧 support@escarapay.in</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,.65)",marginBottom:7}}>⚖️ legal@escarapay.in</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.35)",marginTop:14,lineHeight:1.8}}>Response time: 24 hours<br/>Mon–Sat, 10AM–6PM IST</div>
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
            <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>© 2026 EscaraPay (India) · MSME Reg: UDYAM-UP-23-0036110. All rights reserved. | Jurisdiction: Uttar Pradesh, India</div>
            <div style={{display:"flex",gap:16}}>
              {[["Terms","terms"],["Privacy","privacy"],["Refund","refund"],["Dispute","dispute"]].map(([l,s])=>(
                <span key={l} style={{fontSize:11,color:"rgba(255,255,255,.35)",cursor:"pointer",transition:"color .2s"}}
                  onMouseEnter={e=>e.target.style.color="rgba(255,255,255,.7)"}
                  onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.35)"}
                  onClick={()=>window._goToPage(s)}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
      {/* ── MOBILE STICKY CTA ── */}
      <div style={{
        position:"fixed",bottom:0,left:0,right:0,zIndex:200,
        background: dark?"rgba(12,12,22,.97)":"rgba(255,255,255,.97)",
        backdropFilter:"blur(20px)",
        borderTop:"1px solid var(--border)",
        padding:"10px 16px max(10px, env(safe-area-inset-bottom))",
        display:"flex",gap:10,alignItems:"center",
        boxShadow:"0 -8px 30px rgba(0,0,0,.12)"
      }} className="hide-d">
        <button className="btn-outline" style={{flex:1,padding:"11px",fontSize:13,borderRadius:10}} onClick={()=>onEnter("buyer")}>
          🛍️ {lc.ctaBuyer}
        </button>
        <button className="btn-gold" style={{flex:1,padding:"12px",fontSize:13,borderRadius:10}} onClick={()=>onEnter("seller")}>
          🏪 {lc.ctaSeller}
        </button>
      </div>
    </div>
  );
}
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
  const [form, setForm] = useState({ name: user, email: "", phone: "", currentPass: "", newPass: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (form.email && !validateEmail(form.email)) e.email = "Enter a valid email";
    if (form.phone && !validatePhone(form.phone)) e.phone = "Please enter a valid 10-digit phone number";
    if (form.newPass && !validatePass(form.newPass)) e.newPass = "Min 6 chars, 1 capital, 1 small, 1 number, 1 special (!@#$)";
    if (form.newPass && !form.currentPass) e.newPass = "Enter your current password to set a new one";
    return e;
  };

  const handleSave = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setLoading(true);
    setMsg("");
    try {
      // Step 1 — Profile update (name, email, phone)
      const res = await fetch(`${BACKEND_URL}/api/users/${userId}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, name: form.name, email: form.email || undefined, phone: form.phone || undefined }),
      });
      const data = await res.json();
      if (!data.success) { setLoading(false); setMsg("❌ " + data.error); return; }

      // Step 2 — Password change (only if new password entered)
      if (form.newPass && form.currentPass) {
        const pr = await fetch(`${BACKEND_URL}/api/auth/change-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, current_password: form.currentPass, new_password: form.newPass }),
        });
        const pd = await pr.json();
        setLoading(false);
        if (!pd.success) { setMsg("❌ Password: " + pd.error); return; }
        setMsg("✅ Profile and password updated successfully!");
      } else {
        setLoading(false);
        setMsg("✅ Profile updated successfully!");
      }
      onUpdate(form.name);
    } catch(err) { setLoading(false); setMsg("❌ Could not connect to server. Please try again."); }
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
            <label className="label">Email Address</label>
            <input className="input" placeholder="new@email.com" value={form.email} onChange={e=>{setForm({...form,email:e.target.value});setErrors({...errors,email:""});}} />
            <FieldError msg={errors.email} />
          </div>
          <div>
            <label className="label">Phone Number</label>
            <input className="input" placeholder="10 digit number" maxLength={10} value={form.phone} onChange={e=>{setForm({...form,phone:e.target.value.replace(/\D/g,"")});setErrors({...errors,phone:""});}} />
            <FieldError msg={errors.phone} />
          </div>
          <div style={{height:1,background:"var(--border)",margin:"4px 0"}} />
          <div style={{fontSize:12,fontWeight:600,color:"var(--muted)"}}>🔑 Change Password <span style={{fontWeight:400}}>(optional — leave blank to keep current)</span></div>
          <div>
            <label className="label">Current Password</label>
            <input className="input" type="password" placeholder="Enter your current password" value={form.currentPass||""} onChange={e=>setForm({...form,currentPass:e.target.value})} />
          </div>
          <div>
            <label className="label">New Password</label>
            <input className="input" type="password" placeholder="Min 6 characters" value={form.newPass} onChange={e=>{setForm({...form,newPass:e.target.value});setErrors({...errors,newPass:""});}} />
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
  const [mode, setMode] = useState("login");        // login | register
  const [loginMethod, setLoginMethod] = useState("password"); // password | otp
  const [form, setForm] = useState({name:"",email:"",password:"",shop:"",phone:"",pan:"",gst:""});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpMsg, setOtpMsg] = useState("");
  // Register OTP states
  const [regOtpSent, setRegOtpSent] = useState(false);
  const [regOtpVerified, setRegOtpVerified] = useState(false);
  const [regOtp, setRegOtp] = useState("");
  const [regOtpMsg, setRegOtpMsg] = useState("");
  // Forgot Password states
  const [forgotMode, setForgotMode] = useState(false); // show forgot password flow
  const [forgotStep, setForgotStep] = useState(1);     // 1=email, 2=otp+newpass
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [forgotNewPass, setForgotNewPass] = useState("");
  const [forgotConfirm, setForgotConfirm] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotTimer, setForgotTimer] = useState(0);

  useEffect(() => {
    if (forgotTimer <= 0) return;
    const t = setTimeout(() => setForgotTimer(forgotTimer - 1), 1000);
    return () => clearTimeout(t);
  }, [forgotTimer]);

  // OTP countdown timer
  useEffect(() => {
    if (otpTimer <= 0) return;
    const t = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    return () => clearTimeout(t);
  }, [otpTimer]);

  const validate = () => {
    const e = {};
    if (mode === "register") {
      if (!form.name.trim()) e.name = "Name is required";
      if (!validateEmail(form.email)) e.email = "Enter a valid email (e.g. example@gmail.com)";
      if (!validatePhone(form.phone)) e.phone = "Enter a valid 10-digit phone number";
      if (!validatePass(form.password)) e.password = "Min 6 chars, 1 capital, 1 small, 1 number, 1 special char (!@#$%)";
      if (type === "seller" && form.pan && !validatePAN(form.pan)) e.pan = "PAN format: ABCDE1234F";
      if (type === "seller" && form.gst && !validateGST(form.gst)) e.gst = "GST number must be 15 characters";
      if (type === "seller" && !form.pan && !form.gst) e.pan = "Either PAN or GST number is required";
    } else {
      if (!validateEmail(form.email)) e.email = "Enter a valid email";
      if (loginMethod === "password" && !form.password) e.password = "Please enter your password";
    }
    return e;
  };

  // Password login / Register
  const handle = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    // Registration requires email verification
    if (mode === "register" && !regOtpVerified) {
      alert("❌ Please verify your email first using the button below.");
      return;
    }
    setLoading(true);
    const result = mode === "register"
      ? await registerUser(form.name,form.email,form.phone,type,form.password,form.shop||"",form.pan||"",form.gst||"")
      : await loginUser(form.email,form.password,type);
    setLoading(false);
    if (result.success) {
      const u = result.data.user;
      onLogin(type, u.name, u.id, u.phone||form.phone||"");
    } else alert("❌ " + result.error);
  };

  // Send Register OTP
  const handleSendRegisterOTP = async () => {
    if (!validateEmail(form.email)) { setErrors({...errors, email:"Enter a valid email"}); return; }
    if (!form.name.trim()) { setErrors({...errors, name:"Please enter your name first"}); return; }
    setLoading(true); setRegOtpMsg("");
    const r = await sendRegisterOTP(form.email, form.name);
    setLoading(false);
    if (r.success) { setRegOtpSent(true); setOtpTimer(60); setRegOtpMsg("✅ " + r.message); }
    else setRegOtpMsg("❌ " + r.error);
  };

  // Verify Register OTP
  const handleVerifyRegisterOTP = async () => {
    if (!regOtp || regOtp.length !== 6) { setRegOtpMsg("❌ Please enter the 6-digit OTP"); return; }
    setLoading(true); setRegOtpMsg("");
    const r = await verifyRegisterOTP(form.email, regOtp);
    setLoading(false);
    if (r.success) { setRegOtpVerified(true); setRegOtpMsg("✅ Email verified! Ab account banao."); }
    else setRegOtpMsg("❌ " + r.error);
  };

  // Send OTP
  const handleSendOTP = async () => {
    if (!validateEmail(form.email)) { setErrors({email:"Enter a valid email"}); return; }
    setLoading(true); setOtpMsg("");
    const r = await sendOTP(form.email, type);
    setLoading(false);
    if (r.success) {
      setOtpSent(true);
      setOtpTimer(60);
      setOtpMsg("✅ " + r.message);
    } else {
      setOtpMsg("❌ " + r.error);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) { setOtpMsg("❌ Please enter the 6-digit OTP"); return; }
    setLoading(true); setOtpMsg("");
    const r = await verifyOTP(form.email, type, otp);
    setLoading(false);
    if (r.success) {
      const u = r.data.user;
      onLogin(type, u.name, u.id, u.phone||"");
    } else {
      setOtpMsg("❌ " + r.error);
    }
  };

  const setField = (field, val) => { setForm({...form,[field]:val}); setErrors({...errors,[field]:""}); };

  // ── Forgot Password handlers ──
  const handleForgotSendOTP = async () => {
    if (!forgotEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      setForgotMsg("❌ Please enter a valid email address"); return;
    }
    setForgotLoading(true); setForgotMsg("");
    try {
      const r = await fetch(`${BACKEND_URL}/api/auth/forgot-password`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ email: forgotEmail, role: type }),
      });
      const d = await r.json();
      setForgotLoading(false);
      if (d.success) { setForgotStep(2); setForgotTimer(60); setForgotMsg("✅ OTP sent! Please check your email inbox."); }
      else setForgotMsg("❌ " + d.error);
    } catch(e) { setForgotLoading(false); setForgotMsg("❌ Could not connect to server. Please try again."); }
  };

  const handleForgotReset = async () => {
    if (!forgotOtp || forgotOtp.length !== 6) { setForgotMsg("❌ Please enter the 6-digit OTP"); return; }
    if (!forgotNewPass || forgotNewPass.length < 6) { setForgotMsg("❌ Password must be at least 6 characters"); return; }
    if (forgotNewPass !== forgotConfirm) { setForgotMsg("❌ Passwords do not match"); return; }
    setForgotLoading(true); setForgotMsg("");
    try {
      const r = await fetch(`${BACKEND_URL}/api/auth/reset-password`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ email: forgotEmail, role: type, otp: forgotOtp, new_password: forgotNewPass }),
      });
      const d = await r.json();
      setForgotLoading(false);
      if (d.success) {
        setForgotMsg("✅ Password reset successful! You can now log in.");
        setTimeout(() => { setForgotMode(false); setForgotStep(1); setForgotEmail(""); setForgotOtp(""); setForgotNewPass(""); setForgotConfirm(""); setForgotMsg(""); }, 2000);
      } else setForgotMsg("❌ " + d.error);
    } catch(e) { setForgotLoading(false); setForgotMsg("❌ Could not connect to server. Please try again."); }
  };

  return (
    <div style={{minHeight:"100vh"}}>
      <nav className="nav"><Logo onClick={onBack} /><div style={{display:"flex",gap:8,alignItems:"center"}}><ThemeToggle dark={dark} onToggle={onToggle} /><button className="btn-ghost" onClick={onBack}>← Back</button></div></nav>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"calc(100vh - 62px)",padding:20}}>
        <div className="modal" style={{maxWidth:410}}>
          <div style={{textAlign:"center",marginBottom:22}}>
            <img src={LOGO_SRC} alt="EscaraPay" style={{height:52,marginBottom:12,objectFit:"contain"}} onError={e=>e.target.style.display="none"} />
            <h2 className="syne" style={{fontWeight:800,fontSize:21,marginBottom:4}}>
              {mode==="login"?"Welcome Back!":`${type==="seller"?"Seller":"Buyer"} Registration`}
            </h2>
          </div>

          {/* Login / Register tabs */}
          <div style={{display:"flex",gap:5,marginBottom:20,background:"var(--sf2)",padding:4,borderRadius:10}}>
            {["login","register"].map(m=>(
              <button key={m} onClick={()=>{setMode(m);setErrors({});setOtpSent(false);setOtp("");setOtpMsg("");setRegOtpSent(false);setRegOtp("");setRegOtpVerified(false);setRegOtpMsg("");}}
                style={{flex:1,padding:"8px",border:"none",borderRadius:8,cursor:"pointer",
                  background:mode===m?"var(--gold)":"transparent",
                  color:mode===m?(dark?"#0a0a0f":"#fff"):"var(--muted)",
                  fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:13,transition:"all .2s"}}>
                {m==="login"?"Login":"Register"}
              </button>
            ))}
          </div>

          {/* Login Method toggle — only on login mode */}
          {mode==="login" && (
            <div style={{display:"flex",gap:5,marginBottom:16,background:"var(--sf2)",padding:3,borderRadius:8}}>
              {[["password","🔑 Password"],["otp","📧 Email OTP"]].map(([m,l])=>(
                <button key={m} onClick={()=>{setLoginMethod(m);setOtpSent(false);setOtp("");setOtpMsg("");setErrors({});}}
                  style={{flex:1,padding:"6px",border:"none",borderRadius:6,cursor:"pointer",fontSize:12,fontWeight:600,
                    background:loginMethod===m?"var(--surface)":"transparent",
                    color:loginMethod===m?"var(--gold)":"var(--muted)",
                    boxShadow:loginMethod===m?"0 1px 4px rgba(0,0,0,.1)":"none",
                    fontFamily:"'DM Sans',sans-serif",transition:"all .2s"}}>
                  {l}
                </button>
              ))}
            </div>
          )}

          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {/* Register fields */}
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

            {/* Email — always show */}
            <div>
              <label className="label">Email *</label>
              <input className="input" placeholder="aapki@email.com" type="email" value={form.email}
                onChange={e=>setField("email",e.target.value)} />
              <FieldError msg={errors.email} />
            </div>

            {/* Email Verification for Register */}
            {mode==="register" && (
              <div style={{background: regOtpVerified?"rgba(5,150,105,.08)":"rgba(14,165,233,.06)", border:`1px solid ${regOtpVerified?"rgba(5,150,105,.3)":"rgba(14,165,233,.2)"}`, borderRadius:10, padding:12}}>
                <div style={{fontSize:12,fontWeight:600,marginBottom:8,color:regOtpVerified?"var(--green)":"var(--gold)"}}>
                  {regOtpVerified ? "✅ Email Verified!" : "📧 Verify Your Email (Required)"}
                </div>
                {!regOtpVerified && (
                  <>
                    {!regOtpSent ? (
                      <button className="btn-ghost" style={{width:"100%",fontSize:13,color:"var(--gold)",borderColor:"rgba(14,165,233,.3)"}}
                        onClick={handleSendRegisterOTP} disabled={loading}>
                        {loading?"⏳ Sending OTP...":"📧 Send Verification OTP"}
                      </button>
                    ) : (
                      <div style={{display:"flex",flexDirection:"column",gap:8}}>
                        <input className="input" placeholder="6-digit OTP" maxLength={6} value={regOtp}
                          onChange={e=>setRegOtp(e.target.value.replace(/\D/g,""))}
                          style={{fontSize:20,letterSpacing:6,textAlign:"center",fontWeight:700}} />
                        <button className="btn-ghost" style={{width:"100%",fontSize:13,color:"var(--green)",borderColor:"rgba(5,150,105,.3)"}}
                          onClick={handleVerifyRegisterOTP} disabled={loading}>
                          {loading?"⏳ Verifying...":"✅ Verify OTP"}
                        </button>
                        <div style={{textAlign:"center"}}>
                          {otpTimer > 0
                            ? <span style={{fontSize:11,color:"var(--muted)"}}>⏰ Resend in {otpTimer}s</span>
                            : <button className="btn-ghost" style={{fontSize:11,padding:"3px 10px"}} onClick={handleSendRegisterOTP}>🔄 Resend</button>}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {regOtpMsg && <div style={{fontSize:12,marginTop:6,color:regOtpMsg.startsWith("✅")?"var(--green)":"var(--red)"}}>{regOtpMsg}</div>}
              </div>
            )}

            {/* Phone — register only */}
            {mode==="register" && (
              <div>
                <label className="label">Phone Number * (10 digits)</label>
                <input className="input" placeholder="9876543210" maxLength={10} value={form.phone}
                  onChange={e=>setField("phone",e.target.value.replace(/\D/g,""))} />
                <FieldError msg={errors.phone} />
              </div>
            )}

            {/* Password login */}
            {(mode==="register" || loginMethod==="password") && (
              <div>
                <label className="label">Password *</label>
                <input className="input" type="password" placeholder="••••••••" value={form.password}
                  onChange={e=>setField("password",e.target.value)} />
                <FieldError msg={errors.password} />
                {mode==="register" && !errors.password && <div style={{fontSize:11,color:"var(--muted)",marginTop:3}}>Min 6 chars, 1 capital, 1 small, 1 number, 1 special (!@#$%)</div>}
                {mode==="login" && loginMethod==="password" && (
                  <div style={{textAlign:"right",marginTop:5}}>
                    <span style={{fontSize:12,color:"var(--gold)",cursor:"pointer",textDecoration:"underline"}}
                      onClick={()=>{ setForgotMode(true); setForgotEmail(form.email||""); setForgotStep(1); setForgotMsg(""); }}>
                      🔑 Forgot Password?
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* ── Forgot Password Inline Flow ── */}
            {forgotMode && mode==="login" && (
              <div style={{background:"rgba(14,165,233,.06)",border:"1px solid rgba(14,165,233,.25)",borderRadius:12,padding:16}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <div style={{fontWeight:700,fontSize:14,color:"var(--gold)"}}>🔑 Password Reset</div>
                  <button className="btn-ghost" style={{padding:"2px 8px",fontSize:11}} onClick={()=>{ setForgotMode(false); setForgotStep(1); setForgotMsg(""); }}>✕</button>
                </div>
                {forgotStep===1 && (
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    <div style={{fontSize:12,color:"var(--muted)"}}>Enter your registered email — we'll send a reset OTP</div>
                    <input className="input" type="email" placeholder="your@email.com"
                      value={forgotEmail} onChange={e=>setForgotEmail(e.target.value.toLowerCase())}
                      onKeyDown={e=>e.key==="Enter"&&handleForgotSendOTP()} />
                    <button className="btn-gold" style={{width:"100%",padding:10,fontSize:13}} onClick={handleForgotSendOTP} disabled={forgotLoading}>
                      {forgotLoading?"⏳ Sending...":"📧 Send Reset OTP"}
                    </button>
                  </div>
                )}
                {forgotStep===2 && (
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    <div style={{background:"rgba(5,150,105,.08)",border:"1px solid rgba(5,150,105,.3)",borderRadius:8,padding:10,fontSize:12,color:"var(--green)"}}>
                      ✅ OTP sent to <strong>{forgotEmail}</strong>
                    </div>
                    <div>
                      <label className="label">6-Digit OTP *</label>
                      <input className="input" placeholder="123456" maxLength={6} value={forgotOtp}
                        onChange={e=>setForgotOtp(e.target.value.replace(/\D/g,""))}
                        style={{fontSize:20,letterSpacing:6,textAlign:"center",fontWeight:700}} />
                    </div>
                    <div>
                      <label className="label">New Password *</label>
                      <input className="input" type="password" placeholder="Min 6 characters"
                        value={forgotNewPass} onChange={e=>setForgotNewPass(e.target.value)} />
                    </div>
                    <div>
                      <label className="label">Confirm New Password *</label>
                      <input className="input" type="password" placeholder="Confirm your new password"
                        value={forgotConfirm} onChange={e=>setForgotConfirm(e.target.value)}
                        onKeyDown={e=>e.key==="Enter"&&handleForgotReset()} />
                    </div>
                    <button className="btn-gold" style={{width:"100%",padding:10,fontSize:13}} onClick={handleForgotReset} disabled={forgotLoading}>
                      {forgotLoading?"⏳ Resetting...":"✅ Reset Password"}
                    </button>
                    <div style={{textAlign:"center",fontSize:12}}>
                      {forgotTimer>0
                        ? <span style={{color:"var(--muted)"}}>⏰ Resend in {forgotTimer}s</span>
                        : <span style={{color:"var(--gold)",cursor:"pointer",textDecoration:"underline"}} onClick={()=>{ setForgotStep(1); setForgotMsg(""); }}>🔄 Request New OTP</span>
                      }
                    </div>
                  </div>
                )}
                {forgotMsg && (
                  <div style={{marginTop:8,padding:"8px 12px",borderRadius:8,background:"var(--sf2)",fontSize:12,
                    color:forgotMsg.startsWith("✅")?"var(--green)":"var(--red)",fontWeight:500}}>
                    {forgotMsg}
                  </div>
                )}
              </div>
            )}

            {/* KYC for seller register */}
            {mode==="register"&&type==="seller" && (
              <div style={{background:"rgba(14,165,233,.08)",border:"1px solid rgba(14,165,233,.2)",borderRadius:10,padding:12}}>
                <div style={{fontSize:12,fontWeight:600,marginBottom:8,color:"var(--gold)"}}>📋 KYC Details (At least one required)</div>
                <div>
                  <label className="label">PAN Card (ABCDE1234F)</label>
                  <input className="input" placeholder="ABCDE1234F" value={form.pan} maxLength={10}
                    onChange={e=>setField("pan",e.target.value.replace(/[^A-Z0-9]/g,"").toUpperCase())} style={{marginBottom:4}} />
                  <FieldError msg={errors.pan} />
                </div>
                <div style={{textAlign:"center",fontSize:12,color:"var(--muted)",margin:"8px 0"}}>— ya —</div>
                <div>
                  <label className="label">GST Number (15 chars)</label>
                  <input className="input" placeholder="27ABCDE1234F1Z5" value={form.gst} maxLength={15}
                    onChange={e=>setField("gst",e.target.value.replace(/[^A-Z0-9]/g,"").toUpperCase())} style={{marginBottom:4}} />
                  <FieldError msg={errors.gst} />
                </div>
              </div>
            )}

            {/* OTP login flow */}
            {mode==="login" && loginMethod==="otp" && (
              <div>
                {!otpSent ? (
                  <button className="btn-gold" style={{width:"100%",padding:12}} onClick={handleSendOTP} disabled={loading}>
                    {loading?"⏳ Sending OTP...":"📧 Send OTP to My Email"}
                  </button>
                ) : (
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    <div style={{background:"rgba(5,150,105,.08)",border:"1px solid rgba(5,150,105,.3)",borderRadius:10,padding:12,fontSize:13,color:"var(--green)"}}>
                      ✅ OTP sent to <strong>{form.email}</strong> — please check your inbox!
                    </div>
                    <div>
                      <label className="label">6-Digit OTP *</label>
                      <input className="input" placeholder="123456" maxLength={6} value={otp}
                        onChange={e=>setOtp(e.target.value.replace(/\D/g,""))}
                        style={{fontSize:22,letterSpacing:6,textAlign:"center",fontWeight:700}}
                        onKeyDown={e=>e.key==="Enter"&&handleVerifyOTP()} />
                    </div>
                    <button className="btn-gold" style={{width:"100%",padding:12}} onClick={handleVerifyOTP} disabled={loading}>
                      {loading?"⏳ Verifying...":"✅ Verify OTP & Login"}
                    </button>
                    <div style={{textAlign:"center"}}>
                      {otpTimer > 0 ? (
                        <span style={{fontSize:12,color:"var(--muted)"}}>⏰ Resend in {otpTimer}s</span>
                      ) : (
                        <button className="btn-ghost" style={{fontSize:12,padding:"4px 12px"}} onClick={handleSendOTP}>
                          🔄 Resend OTP
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Password login button */}
            {(mode==="register" || loginMethod==="password") && (
              <button className="btn-gold" style={{width:"100%",padding:12}} onClick={handle} disabled={loading}>
                {loading?"⏳ Processing...":mode==="login"?"Login":"Create Account"}
              </button>
            )}

            {/* OTP message */}
            {otpMsg && (
              <div style={{padding:10,borderRadius:8,background:"var(--sf2)",fontSize:13,
                color:otpMsg.startsWith("✅")?"var(--green)":"var(--red)",fontWeight:500}}>
                {otpMsg}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


/* ══════════ SELLER SETTINGS COMPONENT ══════════ */
function SellerSettings({ userId, userName, BACKEND_URL }) {
  const [form, setForm] = useState({ shop_name:"", phone:"", upi_id:"" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch(`${BACKEND_URL}/api/users/${userId}/profile`);
        const d = await r.json();
        if (d.success && d.user) {
          setForm({ shop_name: d.user.shop_name||"", phone: d.user.phone||"", upi_id: d.user.upi_id||"" });
        }
      } catch(e) {}
      setLoading(false);
    };
    if (userId) load();
  }, [userId, BACKEND_URL]);

  const handleSave = async () => {
    setSaving(true); setMsg("");
    try {
      const r = await fetch(`${BACKEND_URL}/api/users/${userId}/update-profile`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ ...form, user_id: userId }),
      });
      const d = await r.json();
      setSaving(false);
      if (d.success) setMsg("✅ Profile updated successfully!");
      else setMsg("❌ " + (d.error || "Update failed"));
    } catch(e) { setSaving(false); setMsg("❌ Could not connect to server."); }
  };

  if (loading) return <div style={{padding:40,textAlign:"center",color:"var(--muted)"}}>⏳ Loading...</div>;

  return (
    <div className="fu">
      <h1 className="syne" style={{fontSize:"clamp(18px,3vw,26px)",fontWeight:800,marginBottom:22}}>Settings</h1>
      <div className="card" style={{maxWidth:480}}>
        <h3 className="syne" style={{fontWeight:700,marginBottom:16,fontSize:15}}>Profile & Payment Details</h3>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div>
            <label className="label">Shop Name</label>
            <input className="input" placeholder="Your Shop Name" value={form.shop_name} onChange={e=>setForm({...form,shop_name:e.target.value})} />
          </div>
          <div>
            <label className="label">Phone Number</label>
            <input className="input" placeholder="10-digit phone number" maxLength={10} value={form.phone} onChange={e=>setForm({...form,phone:e.target.value.replace(/[^0-9]/g,"")})} />
          </div>
          <div>
            <label className="label">UPI ID <span style={{color:"var(--green)",fontSize:11,fontWeight:600}}>★ For receiving payments</span></label>
            <input className="input" placeholder="yourname@upi (e.g. 9876543210@ybl)" value={form.upi_id} onChange={e=>setForm({...form,upi_id:e.target.value})} />
            <div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>EscaraPay will send your earnings to this UPI ID after delivery confirmation.</div>
          </div>
          {msg && <div style={{padding:10,borderRadius:8,fontSize:13,fontWeight:600,background:msg.startsWith("✅")?"rgba(5,150,105,.1)":"rgba(239,68,68,.1)",color:msg.startsWith("✅")?"var(--green)":"var(--red)"}}>{msg}</div>}
          <button className="btn-gold" style={{padding:"12px"}} onClick={handleSave} disabled={saving}>{saving?"⏳ Saving...":"💾 Save Changes"}</button>
        </div>
        <div style={{marginTop:20,padding:14,background:"rgba(14,165,233,.06)",border:"1px solid rgba(14,165,233,.2)",borderRadius:10}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:6}}>💡 Why add UPI ID?</div>
          <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.7}}>When a buyer confirms delivery, EscaraPay sends your 95% token amount to this UPI ID. Your UPI ID is kept private from buyers.</div>
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

  const copyLink = (orderId) => { navigator.clipboard?.writeText(`${BASE_URL}/pay/${orderId}`); setToast("Link copied! Share on WhatsApp 🚀"); };
  const shareWhatsApp = (orderId, productName, tokenAmount) => {
    const link = `${BASE_URL}/pay/${orderId}`;
    const msg = `🛡️ *EscaraPay Secure Payment*\n\nProduct: ${productName}\nToken Amount: ₹${tokenAmount}\n\nPay securely via this link:\n${link}\n\n_Powered by EscaraPay_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const nav = [{id:"dashboard",icon:"📊",label:"Dashboard"},{id:"orders",icon:"📦",label:"Orders"},{id:"analytics",icon:"📈",label:"Analytics"},{id:"payments",icon:"💰",label:"Payments"},{id:"payouts",icon:"🏦",label:"Payouts"},{id:"settings",icon:"⚙️",label:"Settings"}];

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
              <div><h1 className="syne" style={{fontSize:"clamp(18px,3vw,26px)",fontWeight:800}}>Welcome back, {user}! 👋</h1><p style={{color:"var(--muted)",marginTop:3,fontSize:13}}>Today's overview</p></div>
              <button className="btn-gold" style={{fontSize:13,padding:"9px 16px"}} onClick={()=>setShowCreate(true)}>+ New Order</button>
            </div>
            <div className="g4" style={{marginBottom:18}}>
              {[{label:"Total Orders",value:stats.total,icon:"📦",color:"var(--gold)"},{label:"Active Orders",value:stats.active,icon:"🔐",color:"var(--blue)"},{label:"Token Earned",value:`₹${stats.earned}`,icon:"💰",color:"var(--green)"},{label:"RTO Saved",value:`₹${stats.saved}`,icon:"🛡️",color:"var(--accent)"}].map(s=>(
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
               : orders.length===0 ? <div style={{textAlign:"center",padding:40,color:"var(--muted)"}}><div style={{fontSize:40,marginBottom:10}}>📦</div><div style={{fontWeight:600,marginBottom:6}}>No orders yet!</div><button className="btn-gold" style={{marginTop:8}} onClick={()=>setShowCreate(true)}>+ New Order Link</button></div>
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
                    {filteredOrders.length===0 ? <tr><td colSpan={8} style={{textAlign:"center",color:"var(--muted)",padding:30}}>No orders found</td></tr>
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
                {orders.length===0 ? <div style={{color:"var(--muted)",fontSize:13}}>No orders found</div> : Object.entries(STATUS_META).map(([key,val])=>{ const count=orders.filter(o=>o.status===key).length; if(!count) return null; const pct=Math.round((count/orders.length)*100); return (<div key={key} style={{marginBottom:13}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12}}>{val.icon} {val.label}</span><span style={{fontSize:12,color:"var(--muted)"}}>{count} ({pct}%)</span></div><div className="pbar"><div className="pfill" style={{width:`${pct}%`}} /></div></div>); })}
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
            <p style={{color:"var(--muted)",fontSize:13,marginBottom:22}}>An overview of all your transactions and earnings</p>

            {/* Summary Cards */}
            <div className="g3" style={{marginBottom:20}}>
              {[
                {label:"Total Token Collected",value:`₹${orders.filter(o=>o.status!=="pending").reduce((a,o)=>a+(o.token_amount||0),0).toLocaleString()}`,icon:"💰",color:"var(--gold)"},
                {label:"Earnings Released",value:`₹${orders.filter(o=>o.status==="delivered").reduce((a,o)=>a+(o.seller_receives||0),0).toLocaleString()}`,icon:"✅",color:"var(--green)"},
                {label:"In Hold",value:`₹${orders.filter(o=>["token_paid","dispatched"].includes(o.status)).reduce((a,o)=>a+(o.seller_receives||0),0).toLocaleString()}`,icon:"🔐",color:"var(--blue)"},
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
                  {label:"Seller Receives", value:"95% of token", color:"var(--green)", bold:true},
                  {label:"Buyer Cancels", value:"Token → Seller ✅", color:"var(--green)"},
                  {label:"Seller Doesn't Ship", value:"Token → Buyer ↩️", color:"var(--blue)"},
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
                <div style={{textAlign:"center",padding:30,color:"var(--muted)"}}>No orders yet</div>
              ) : (
                <div style={{overflowX:"auto"}}>
                  <table className="tbl">
                    <thead><tr><th>Order ID</th><th>Product</th><th>Order Amt</th><th>Token</th><th>Commission</th><th>You Receive</th><th>Status</th></tr></thead>
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
              <div className="syne" style={{fontWeight:700,fontSize:14,marginBottom:10}}>🏦 Payout System — Coming Soon!</div>
              <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.8}}>
                Cashfree Live mode active. Bank transfers processed after delivery:<br/>
                ✅ Direct bank transfer within 2-3 business days<br/>
                ✅ UPI instant payout<br/>
                ✅ Withdrawal history dashboard<br/>
                ✅ GST invoice generation
              </div>
            </div>
          </div>
        )}
        {page==="payouts" && (
          <div className="fu">
            <h1 className="syne" style={{fontSize:"clamp(18px,3vw,26px)",fontWeight:800,marginBottom:6}}>Payout History 🏦</h1>
            <p style={{color:"var(--muted)",fontSize:13,marginBottom:22}}>Sirf released/delivered orders — tumhe jo paisa mila</p>

            {/* Summary */}
            {(() => {
              const released = orders.filter(o => ["delivered","cancelled_buyer"].includes(o.status));
              const totalPaid = released.reduce((a,o)=>a+(o.seller_receives||0),0);
              const thisMonth = released.filter(o => {
                const d = new Date(o.released_at || o.updated_at || o.created_at);
                const now = new Date();
                return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
              }).reduce((a,o)=>a+(o.seller_receives||0),0);
              const pending = orders.filter(o=>["token_paid","dispatched"].includes(o.status)).reduce((a,o)=>a+(o.seller_receives||0),0);
              return (
                <div className="g3" style={{marginBottom:20}}>
                  {[
                    {label:"Total Released",value:`₹${totalPaid.toLocaleString("en-IN")}`,icon:"✅",color:"var(--green)"},
                    {label:"This Month",value:`₹${thisMonth.toLocaleString("en-IN")}`,icon:"📅",color:"var(--gold)"},
                    {label:"In Escrow (Hold)",value:`₹${pending.toLocaleString("en-IN")}`,icon:"🔐",color:"var(--blue)"},
                  ].map(s=>(
                    <div key={s.label} className="stat-card">
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                        <div><div style={{fontSize:11,color:"var(--muted)",marginBottom:6}}>{s.label}</div><div className="syne" style={{fontSize:22,fontWeight:800,color:s.color}}>{s.value}</div></div>
                        <span style={{fontSize:22}}>{s.icon}</span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Released Payouts Table */}
            <div className="card" style={{marginBottom:16}}>
              <h3 className="syne" style={{fontWeight:700,fontSize:15,marginBottom:4}}>✅ Released Payouts</h3>
              <p style={{color:"var(--muted)",fontSize:12,marginBottom:16}}>Delivered + Buyer Cancel orders (token tumhare paas)</p>
              {orders.filter(o=>["delivered","cancelled_buyer"].includes(o.status)).length === 0 ? (
                <div style={{textAlign:"center",padding:30,color:"var(--muted)"}}>
                  <div style={{fontSize:36,marginBottom:8}}>💸</div>
                  <div>No payouts released yet</div>
                </div>
              ) : (
                <div style={{overflowX:"auto"}}>
                  <table className="tbl">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Product</th>
                        <th>Order Amt</th>
                        <th>Token</th>
                        <th>Commission (-5%)</th>
                        <th style={{color:"var(--green)"}}>You Received</th>
                        <th>Type</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.filter(o=>["delivered","cancelled_buyer"].includes(o.status)).map(o=>(
                        <tr key={o.id}>
                          <td><span style={{fontFamily:"monospace",color:"var(--gold)",fontSize:11}}>{o.id}</span></td>
                          <td style={{fontSize:12,maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{o.product_name}</td>
                          <td style={{fontSize:12}}>₹{o.order_amount}</td>
                          <td style={{fontSize:12,color:"var(--blue)"}}>₹{o.token_amount}</td>
                          <td style={{fontSize:12,color:"var(--red)"}}>-₹{o.escara_commission||0}</td>
                          <td style={{fontSize:13,fontWeight:800,color:"var(--green)"}}>₹{o.seller_receives||0}</td>
                          <td>
                            {o.status==="delivered"
                              ? <span className="badge bg">✅ Delivered</span>
                              : <span className="badge bo">🛡️ Buyer Cancel</span>}
                          </td>
                          <td style={{fontSize:11,color:"var(--muted)",whiteSpace:"nowrap"}}>
                            {o.released_at ? new Date(o.released_at).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})
                              : o.updated_at ? new Date(o.updated_at).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Total row */}
                  <div style={{background:"rgba(16,185,129,.06)",border:"1px solid rgba(16,185,129,.15)",borderRadius:"0 0 12px 12px",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontWeight:700,fontSize:13}}>Total Earnings</span>
                    <span className="syne" style={{fontWeight:800,fontSize:18,color:"var(--green)"}}>
                      ₹{orders.filter(o=>["delivered","cancelled_buyer"].includes(o.status)).reduce((a,o)=>a+(o.seller_receives||0),0).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Escrow Hold */}
            {orders.filter(o=>["token_paid","dispatched"].includes(o.status)).length > 0 && (
              <div className="card" style={{marginBottom:16,borderColor:"rgba(56,189,248,.25)"}}>
                <h3 className="syne" style={{fontWeight:700,fontSize:15,marginBottom:4}}>🔐 In Escrow (Pending Release)</h3>
                <p style={{color:"var(--muted)",fontSize:12,marginBottom:14}}>These orders will be paid out once delivered</p>
                <div style={{overflowX:"auto"}}>
                  <table className="tbl">
                    <thead><tr><th>Order ID</th><th>Product</th><th>Token</th><th>Expected Payout</th><th>Status</th></tr></thead>
                    <tbody>
                      {orders.filter(o=>["token_paid","dispatched"].includes(o.status)).map(o=>(
                        <tr key={o.id}>
                          <td><span style={{fontFamily:"monospace",color:"var(--gold)",fontSize:11}}>{o.id}</span></td>
                          <td style={{fontSize:12}}>{o.product_name}</td>
                          <td style={{fontSize:12,color:"var(--blue)"}}>₹{o.token_amount}</td>
                          <td style={{fontSize:13,fontWeight:700,color:"var(--green)"}}>₹{o.seller_receives||0}</td>
                          <td><Bdg status={o.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

                        {/* Payout Status — Live */}
            {orders.filter(o=>["delivered","cancelled_buyer"].includes(o.status)).map(o=>(
              <div key={o.id} style={{
                background: o.payout_status==="paid"?"rgba(16,185,129,.06)":"rgba(251,146,60,.06)",
                border:`1px solid ${o.payout_status==="paid"?"rgba(16,185,129,.25)":"rgba(251,146,60,.25)"}`,
                borderRadius:12,padding:14,marginBottom:10
              }}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                  <div>
                    <div style={{fontFamily:"monospace",color:"var(--gold)",fontSize:11,marginBottom:2}}>{o.id}</div>
                    <div style={{fontWeight:600,fontSize:14}}>{o.product_name}</div>
                    <div style={{fontSize:13,color:"var(--muted)",marginTop:3}}>
                      Token: ₹{o.token_amount} → <strong style={{color:"var(--green)"}}>Aapko: ₹{o.seller_receives}</strong>
                    </div>
                  </div>
                  <div>{o.payout_status==="paid"?<span className="badge bg">✅ Payment Received</span>:<span className="badge borange">⏳ Payment Pending</span>}</div>
                </div>
                {o.payout_status==="paid" && (
                  <div style={{marginTop:10,padding:10,background:"rgba(16,185,129,.1)",borderRadius:8,fontSize:12}}>
                    <div style={{fontWeight:700,color:"var(--green)",marginBottom:6}}>💰 Payment Details:</div>
                    <div style={{display:"flex",flexDirection:"column",gap:4,color:"var(--muted)"}}>
                      {o.payout_method && <div>Method: <strong style={{color:"var(--text)"}}>{o.payout_method?.toUpperCase()}</strong></div>}
                      {o.payout_upi && <div>UPI ID: <strong style={{color:"var(--text)",fontFamily:"monospace"}}>{o.payout_upi}</strong></div>}
                      {o.payout_bank && <div>Bank: <strong style={{color:"var(--text)",fontFamily:"monospace"}}>{o.payout_bank}</strong></div>}
                      {o.payout_ref && <div>UTR/Ref No: <strong style={{color:"var(--gold)",fontFamily:"monospace",fontSize:13}}>{o.payout_ref}</strong></div>}
                      {o.payout_amount && <div>Amount: <strong style={{color:"var(--green)",fontSize:14}}>₹{o.payout_amount}</strong></div>}
                      {o.payout_at && <div>Date: <strong style={{color:"var(--text)"}}>{new Date(o.payout_at).toLocaleString("en-IN")}</strong></div>}
                      {o.payout_note && <div>Note: <strong style={{color:"var(--text)"}}>{o.payout_note}</strong></div>}
                    </div>
                  </div>
                )}
                {(!o.payout_status || o.payout_status==="pending") && (
                  <div style={{marginTop:8,fontSize:12,color:"var(--muted)",padding:"8px 10px",background:"rgba(251,146,60,.08)",borderRadius:8}}>
                    ⏳ Payment will be transferred to your UPI/Bank shortly. Queries? support@escarapay.in
                  </div>
                )}
              </div>
            ))}
            {orders.filter(o=>["delivered","cancelled_buyer"].includes(o.status)).length===0 && (
              <div style={{textAlign:"center",padding:24,color:"var(--muted)",background:"var(--sf2)",borderRadius:12}}>
                <div style={{fontSize:36,marginBottom:8}}>💸</div>
                <div style={{fontSize:13}}>No completed orders yet. Deliver orders to receive payment.</div>
              </div>
            )}
            <div style={{background:"rgba(14,165,233,.08)",border:"1px solid rgba(14,165,233,.2)",borderRadius:12,padding:14,marginTop:4}}>
              <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>📞 Payment Query?</div>
              <div style={{fontSize:12,color:"var(--muted)"}}>support@escarapay.in | 24 hours mein reply</div>
            </div>
          </div>
        )}
        {page==="settings" && (
          <SellerSettings userId={userId} userName={user} BACKEND_URL={BACKEND_URL} />
        )}
      </div>

      {showCreate && (
        <div className="overlay" onClick={()=>{ if(!createdLink) setShowCreate(false); }}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            {!createdLink ? (
              <>
                <h3 className="syne" style={{fontWeight:800,fontSize:20,marginBottom:4}}>New Protected Order</h3>
                <p style={{color:"var(--muted)",fontSize:13,marginBottom:20}}>Create a secure payment link for your buyer</p>
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  <div><label className="label">Product Name *</label><input className="input" placeholder="Handmade Bag" value={newOrder.product} onChange={e=>setNewOrder({...newOrder,product:e.target.value})} /></div>
                  <div className="g2">
                    <div><label className="label">Order Amount (₹) *</label><input className="input" type="number" placeholder="1500" value={newOrder.amount} onChange={e=>setNewOrder({...newOrder,amount:e.target.value})} /></div>
                    <div><label className="label">Token %</label><select className="select" value={newOrder.token_pct} onChange={e=>setNewOrder({...newOrder,token_pct:e.target.value})}><option value="5">5%</option><option value="10">10%</option><option value="15">15%</option><option value="20">20%</option></select></div>
                  </div>
                  {newOrder.amount && <div style={{background:"rgba(14,165,233,.1)",border:"1px solid rgba(14,165,233,.25)",borderRadius:10,padding:14}}><div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Buyer Bharenga</div><div className="syne" style={{fontSize:24,fontWeight:800,color:"var(--gold)"}}>₹{Math.round(tokenPreview*1.02)}</div>{minApplied&&<div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>Minimum token ₹200 applied</div>}</div>}
                  <div><label className="label">Buyer Name</label><input className="input" placeholder="Rahul Sharma" value={newOrder.buyer_name} onChange={e=>setNewOrder({...newOrder,buyer_name:e.target.value})} /></div>
                  <div><label className="label">Buyer WhatsApp *</label><input className="input" placeholder="9876543210" value={newOrder.buyer_phone} onChange={e=>setNewOrder({...newOrder,buyer_phone:e.target.value})} /></div>
                  <div style={{display:"flex",gap:10}}>
                    <button className="btn-ghost" style={{flex:1}} onClick={()=>setShowCreate(false)}>Cancel</button>
                    <button className="btn-gold" style={{flex:2}} onClick={handleCreateOrder} disabled={!newOrder.product||!newOrder.amount||creating}>{creating?"⏳ Creating...":"🔗 Generate Link"}</button>
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
      {showOrder && <OrderModal order={showOrder} isSeller onClose={()=>setShowOrder(null)} onDispatch={(id,tx,confirmUrl)=>{ setOrders(orders.map(o=>o.id===id?{...o,status:"dispatched",tracking_number:tx,confirm_token:confirmUrl?confirmUrl.split("/confirm/")[1]:o.confirm_token}:o)); setShowOrder(null); }} onConfirmDelivery={(id)=>setOrders(orders.map(o=>o.id===id?{...o,status:"delivered"}:o))} onDispute={(id)=>setOrders(orders.map(o=>o.id===id?{...o,status:"disputed"}:o))} />}
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

  const loadCashfree = () => new Promise((resolve, reject) => {
    if (document.getElementById("cashfree-script")) { resolve(); return; }
    const s = document.createElement("script");
    s.id = "cashfree-script";
    s.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    s.onload = resolve; s.onerror = reject;
    document.body.appendChild(s);
  });

  const handlePay = async(order)=>{
    setPayError(""); setPayStep(1);
    try { await loadCashfree(); }
    catch(e) { setPayError("Payment gateway failed to load. Please try again."); setPayStep(0); return; }
    const result=await createPaymentOrder(order.id);
    if(!result.success){setPayError(result.error);setPayStep(0);return;}
    const { paymentSessionId } = result.data;
    setPayStep(0);
    const cashfree = window.Cashfree({ mode: "production" });
    cashfree.checkout({ paymentSessionId, redirectTarget: "_modal" }).then(async(res) => {
      if (res.error) { setPayError(res.error.message || "Payment failed"); return; }
      if (res.paymentDetails?.paymentStatus === "FAILED") { setPayError("Payment failed. Please try again."); return; }
      setPayStep(2);
      const verify=await verifyPayment(null,null,null,order.id);
      if(verify.success){
        setPayStep(3);
        setOrders(prev=>prev.map(o=>o.id===order.id?{...o,status:"token_paid"}:o));
        setLinkOrder(prev=>prev&&prev.id===order.id?{...prev,status:"token_paid"}:prev);
        setTimeout(()=>{setPayStep(0);},2500);
      } else { setPayError("Verify failed: "+verify.error); setPayStep(0); }
    }).catch(e => { setPayError("Payment cancelled or failed."); setPayStep(0); });
  };

  const fetchLinkOrder=async()=>{
    setLinkError(""); setLinkOrder(null);
    if(!linkInput){setLinkError("Please paste the payment link!");return;}
    const match=linkInput.match(/EP[A-Z0-9]+/);
    if(!match){setLinkError("Invalid EscaraPay link!");return;}
    setLinkLoading(true);
    const r=await getOrderById(match[0]);
    setLinkLoading(false);
    if(r.success) setLinkOrder(r.data.order);
    else setLinkError("Order not found: "+r.error);
  };

  const handleCreateDeal = async()=>{
    if(!dealForm.product||!dealForm.amount){alert("❌ Product name and amount are required!"); return;}
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
    } catch(e) { setDealCreating(false); alert("❌ Could not connect to server. Please try again."); }
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
            {(!userPhone||userPhone.trim()==="") && <div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",borderRadius:10,padding:14,marginBottom:16,fontSize:13}}>⚠️ Phone number not found. Please logout and login again.</div>}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:18}}>
              <div className={`chip ${filterStatus==="all"?"active":""}`} onClick={()=>setFilterStatus("all")}>All ({orders.length})</div>
              {Object.entries(STATUS_META).map(([key,val])=>{ const count=orders.filter(o=>o.status===key).length; if(!count) return null; return <div key={key} className={`chip ${filterStatus===key?"active":""}`} onClick={()=>setFilterStatus(key)}>{val.icon} {val.label} ({count})</div>; })}
            </div>
            {loadingOrders ? <div style={{textAlign:"center",padding:40,color:"var(--muted)"}}>⏳ Loading orders...</div>
             : orders.length===0 ? (
              <div style={{textAlign:"center",padding:40,color:"var(--muted)"}}>
                <div style={{fontSize:40,marginBottom:10}}>🛍️</div>
                <div style={{fontWeight:600,marginBottom:6}}>No orders yet!</div>
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
                      {o.status==="dispatched"&&daysLeft!==null&&<div className="hold-box"><div style={{fontSize:12,color:"#a78bfa",fontWeight:600}}>⏰ {daysLeft>0?`Token Hold: ${daysLeft} day${daysLeft===1?"":"s"} remaining`:"Auto-release ready!"}</div></div>}
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
            <h1 className="syne" style={{fontSize:"clamp(18px,3vw,24px)",fontWeight:800,marginBottom:8}}>Pay via Order Link</h1>
            <p style={{color:"var(--muted)",marginBottom:20,fontSize:13}}>Paste the seller's payment link to view details and pay securely</p>
            <div className="card" style={{marginBottom:14}}>
              <label className="label">EscaraPay Order Link</label>
              <input className="input" placeholder="https://escarapay.in/pay/ORDER-ID" value={linkInput} onChange={e=>setLinkInput(e.target.value)} style={{marginBottom:10}} />
              <button className="btn-gold" style={{width:"100%"}} onClick={fetchLinkOrder}>{linkLoading?"⏳ Looking up order...":"🔍 Find Order"}</button>
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
                  <div style={{background:"rgba(14,165,233,.15)",borderRadius:10,padding:12,textAlign:"center",border:"1px solid rgba(14,165,233,.3)"}}><div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Token (Protected)</div><div className="syne" style={{fontWeight:800,fontSize:20,color:"var(--gold)"}}>₹{linkOrder.token_amount}</div></div>
                </div>
                {linkOrder.status==="pending" ? (
                  <button className="btn-gold pulse" style={{width:"100%",padding:13,fontSize:15}} onClick={()=>handlePay(linkOrder)}>💳 Pay ₹{linkOrder.buyer_pays||linkOrder.token_amount} Token</button>
                ) : (
                  <div style={{textAlign:"center",padding:12,color:"var(--muted)",fontSize:13}}>Payment already completed &nbsp;<Bdg status={linkOrder.status} /></div>
                )}
              </div>
            )}
          </div>
        )}

        {page==="create_deal" && (
          <div className="fu" style={{maxWidth:520}}>
            <h1 className="syne" style={{fontSize:"clamp(18px,3vw,24px)",fontWeight:800,marginBottom:8}}>Create a Deal 🤝</h1>
            <p style={{color:"var(--muted)",marginBottom:16,fontSize:13}}>Want extra security? Create the deal yourself — the seller will confirm, then you pay safely.</p>
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
                  <button className="btn-gold" style={{width:"100%",padding:12}} onClick={handleCreateDeal} disabled={!dealForm.product||!dealForm.amount||dealCreating}>{dealCreating?"⏳ Creating deal...":"🤝 Generate Deal Link"}</button>
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
              {q:"What is the difference between Create Deal and Pay via Link?",a:"Pay via Link: Seller created the order. Create Deal: You create the order, seller confirms. Both offer the same protection!"},
              {q:"When does the seller receive the token?",a:"Token is held for 7 days after delivery confirmation. No dispute → auto-released to seller."},
              {q:"Item not received?",a:"Go to 'View Details' → 'Raise Dispute'. Our team investigates within 24 hours."},
              {q:"How do I track my order?",a:"Click the 'Track →' button on your order card."},
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
             :payStep===1?(<><div style={{width:44,height:44,border:"3px solid var(--gold)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}} /><div className="syne" style={{fontWeight:700,fontSize:16}}>Loading payment gateway...</div></>)
             :payStep===2?(<><div style={{width:44,height:44,border:"3px solid var(--green)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}} /><div className="syne" style={{fontWeight:700,fontSize:16}}>Verifying payment...</div></>)
             :payStep===3?(<><div style={{fontSize:52,marginBottom:12}}>🎉</div><div className="syne" style={{fontWeight:800,fontSize:21,color:"var(--green)",marginBottom:8}}>Token Secured!</div><div style={{color:"var(--muted)",fontSize:13}}>Funds will be released to seller after delivery confirmation ✅</div></>)
             :null}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════ ORDER TRACKING PAGE ══════════ */
function TrackPage({ orderId: initId, dark, onToggle, onGoHome }) {
  const [inputId, setInputId] = useState(initId || "");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initId) doSearch(initId);
  }, [initId]);

  const doSearch = async (id) => {
    const tid = (id || inputId).trim().toUpperCase();
    if (!tid) return;
    setLoading(true); setError(""); setOrder(null); setSearched(true);
    const r = await getOrderById(tid);
    setLoading(false);
    if (r.success) setOrder(r.data.order);
    else setError("No order found. Please double-check your Order ID.");
  };

  const trackingUrl = order ? getTrackingUrl(order.tracking_number) : null;
  const daysLeft = order ? getDaysLeft(order.dispatched_at || order.updated_at) : 7;

  const steps = [
    { label: "Order Created",       done: true,                                                                icon: "📋", color: "#10B981" },
    { label: "Token Paid",          done: order && order.status !== "pending" && order.status !== "pending_seller_confirm", icon: "💳", color: "#0ea5e9" },
    { label: "Dispatched by Seller",done: order && ["dispatched","delivered","disputed"].includes(order.status), icon: "🚚", color: "#8B5CF6" },
    { label: "Delivered",           done: order && order.status === "delivered",                               icon: "✅", color: "#10B981" },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      <nav className="nav">
        <Logo onClick={onGoHome} />
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <button className="btn-ghost" style={{ fontSize: 12 }} onClick={onGoHome}>← Home</button>
        </div>
      </nav>

      <div style={{ maxWidth: 540, margin: "0 auto", padding: "clamp(20px,5vw,50px) 16px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>📦</div>
          <h1 className="syne" style={{ fontWeight: 800, fontSize: "clamp(22px,4vw,30px)", marginBottom: 6 }}>Track Your Order</h1>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>Enter your Order ID to check status without logging in</p>
        </div>

        {/* Search Box */}
        <div className="card" style={{ marginBottom: 20 }}>
          <label className="label">Order ID</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              className="input"
              placeholder="ESC-XXXXXXXX"
              value={inputId}
              onChange={e => setInputId(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === "Enter" && doSearch()}
              style={{ fontFamily: "monospace", fontWeight: 700, letterSpacing: 1 }}
            />
            <button className="btn-gold" style={{ flexShrink: 0, padding: "11px 20px" }} onClick={() => doSearch()} disabled={loading}>
              {loading ? "⏳" : "🔍 Track"}
            </button>
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 8 }}>
            💡 Your Order ID was shared by the seller or buyer on WhatsApp (e.g. ESC-A1B2C3D4)
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="card" style={{ textAlign: "center", padding: 40 }}>
            <div style={{ width: 40, height: 40, border: "3px solid var(--gold)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin .8s linear infinite", margin: "0 auto 12px" }} />
            <div style={{ color: "var(--muted)" }}>Looking up your order...</div>
          </div>
        )}

        {/* Error */}
        {!loading && searched && error && (
          <div className="card" style={{ textAlign: "center", padding: 32 }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>
            <div className="syne" style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>No Order Found</div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>{error}</div>
          </div>
        )}

        {/* Order Found */}
        {!loading && order && (
          <div className="fu">
            {/* Status Banner */}
            <div style={{
              background: order.status === "delivered" ? "rgba(16,185,129,.1)" : order.status === "disputed" ? "rgba(139,92,246,.1)" : order.status === "dispatched" ? "rgba(56,189,248,.1)" : "rgba(14,165,233,.1)",
              border: `1px solid ${order.status === "delivered" ? "rgba(16,185,129,.3)" : order.status === "disputed" ? "rgba(139,92,246,.3)" : order.status === "dispatched" ? "rgba(56,189,248,.3)" : "rgba(14,165,233,.3)"}`,
              borderRadius: 14, padding: "16px 20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 14
            }}>
              <div style={{ fontSize: 32 }}>{(STATUS_META[order.status] || STATUS_META.pending).icon}</div>
              <div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 2 }}>Current Status</div>
                <div className="syne" style={{ fontWeight: 800, fontSize: 18 }}>{(STATUS_META[order.status] || STATUS_META.pending).label}</div>
              </div>
            </div>

            {/* Order Info */}
            <div className="card" style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontFamily: "monospace", color: "var(--gold)", fontSize: 12, marginBottom: 3 }}>{order.id}</div>
                  <div className="syne" style={{ fontWeight: 800, fontSize: 18 }}>{order.product_name}</div>
                </div>
                <Bdg status={order.status} />
              </div>
              <div className="g2" style={{ marginBottom: 12 }}>
                <div style={{ background: "var(--sf2)", borderRadius: 10, padding: 12 }}>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 2 }}>Order Value</div>
                  <div className="syne" style={{ fontWeight: 800, fontSize: 20 }}>₹{order.order_amount}</div>
                </div>
                <div style={{ background: "rgba(14,165,233,.1)", border: "1px solid rgba(14,165,233,.2)", borderRadius: 10, padding: 12 }}>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 2 }}>Token Protected</div>
                  <div className="syne" style={{ fontWeight: 800, fontSize: 20, color: "var(--gold)" }}>₹{order.token_amount}</div>
                </div>
              </div>
              {order.seller_name && (
                <div style={{ fontSize: 13, color: "var(--muted)" }}>Seller: <strong style={{ color: "var(--text)" }}>{order.seller_name}</strong></div>
              )}
              {order.created_at && (
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Order Date: {new Date(order.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</div>
              )}
            </div>

            {/* Timeline */}
            <div className="card" style={{ marginBottom: 14 }}>
              <div className="syne" style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>🗓️ Order Timeline</div>
              {steps.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 12, paddingBottom: i < steps.length - 1 ? 16 : 0, position: "relative" }}>
                  {i < steps.length - 1 && <div style={{ position: "absolute", left: 14, top: 30, bottom: 0, width: 2, background: s.done ? "rgba(16,185,129,.3)" : "var(--border)" }} />}
                  <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, background: s.done ? `${s.color}22` : "var(--sf2)", border: `2px solid ${s.done ? s.color : "var(--border)"}`, color: s.done ? s.color : "var(--muted)" }}>
                    {s.done ? "✓" : s.icon}
                  </div>
                  <div style={{ paddingTop: 4, fontSize: 14, fontWeight: s.done ? 600 : 400, color: s.done ? "var(--text)" : "var(--muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Tracking Info */}
            {order.tracking_number && (
              <div className="card" style={{ marginBottom: 14, background: "rgba(56,189,248,.06)", borderColor: "rgba(56,189,248,.2)" }}>
                <div style={{ fontSize: 11, color: "var(--blue)", fontWeight: 700, marginBottom: 6 }}>📦 Courier Tracking</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <code style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{order.tracking_number}</code>
                  {trackingUrl && (
                    <a href={trackingUrl} target="_blank" rel="noreferrer" style={{ background: "var(--blue)", color: "#fff", padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
                      Track on Courier →
                    </a>
                  )}
                </div>
                {order.dispatched_at && (
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
                    Dispatched: {new Date(order.dispatched_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </div>
                )}
              </div>
            )}

            {/* 7-day hold info */}
            {order.status === "dispatched" && (
              <div style={{ background: "rgba(139,92,246,.08)", border: "1px solid rgba(139,92,246,.2)", borderRadius: 12, padding: 14, marginBottom: 14 }}>
                <div style={{ fontSize: 13, color: "#A78BFA", fontWeight: 700, marginBottom: 4 }}>⏰ Auto-Release Countdown</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>
                  The escrow amount will be auto-released to the seller {daysLeft > 0 ? `in ${daysLeft} day${daysLeft===1?"":"s"}` : "today"} if the buyer does not confirm delivery.
                </div>
              </div>
            )}

            {/* Dispute info */}
            {order.status === "disputed" && order.dispute_reason && (
              <div style={{ background: "rgba(139,92,246,.08)", border: "1px solid rgba(139,92,246,.2)", borderRadius: 12, padding: 14, marginBottom: 14 }}>
                <div style={{ fontSize: 13, color: "#A78BFA", fontWeight: 700, marginBottom: 4 }}>⚠️ Dispute Active</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>Reason: {order.dispute_reason}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Our team will reach out within 24 business hours.</div>
              </div>
            )}

            {/* EscaraPay guarantee */}
            <div style={{ background: "rgba(16,185,129,.06)", border: "1px solid rgba(16,185,129,.15)", borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--green)", marginBottom: 6 }}>🛡️ EscaraPay Guarantee</div>
              <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>Your payment is held securely in escrow. Need help? Contact us at support@escarapay.in</div>
            </div>
          </div>
        )}

        {/* Bottom buttons */}
        <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "center" }}>
          <button className="btn-ghost" onClick={onGoHome}>← Home</button>
          {order && (
            <button className="btn-ghost" style={{ color: "var(--muted)" }} onClick={() => { setOrder(null); setInputId(""); setSearched(false); }}>🔄 New Search</button>
          )}
        </div>
      </div>
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

  useEffect(()=>{ getOrderById(orderId).then(r=>{ setLoading(false); if(r.success) setOrder(r.data.order); else setError("Deal not found."); }); },[orderId]);

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders/${orderId}/seller-confirm-deal`, {
        method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({seller_id:0}),
      });
      const data = await res.json();
      setConfirming(false);
      if (data.success) { setConfirmed(true); setPaymentLink(data.paymentLink); }
      else setError(data.error||"Confirmation failed");
    } catch(e) { setConfirming(false); setError("Could not connect to server. Please try again."); }
  };

  return (
    <div style={{minHeight:"100vh"}}>
      {toast && <Toast msg={toast} onDone={()=>setToast("")} />}
      <nav className="nav"><Logo onClick={onGoHome} /><div style={{display:"flex",gap:8,alignItems:"center"}}><ThemeToggle dark={dark} onToggle={onToggle} /><button className="btn-ghost" style={{fontSize:12}} onClick={onGoHome}>← Home</button></div></nav>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"calc(100vh - 62px)",padding:20}}>
        <div style={{width:"100%",maxWidth:480}}>
          {loading && <div className="card" style={{textAlign:"center",padding:50}}><div style={{width:44,height:44,border:"3px solid var(--gold)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}} /><div style={{color:"var(--muted)"}}>Deal load ho rahi hai...</div></div>}
          {error && <div className="card" style={{textAlign:"center",padding:40}}><div style={{fontSize:40,marginBottom:12}}>❌</div><div className="syne" style={{fontWeight:800,fontSize:18,marginBottom:8}}>Deal Not Found</div><div style={{color:"var(--muted)",fontSize:13,marginBottom:20}}>{error}</div><button className="btn-ghost" onClick={onGoHome}>← Home</button></div>}
          {order && order.status!=="pending_seller_confirm" && !confirmed && <div className="card" style={{textAlign:"center",padding:40}}><div style={{fontSize:44,marginBottom:12}}>✅</div><div className="syne" style={{fontWeight:800,fontSize:20,marginBottom:8}}>Deal Already Confirmed!</div><Bdg status={order.status} /><div style={{marginTop:14}}><button className="btn-ghost" onClick={onGoHome}>← Home</button></div></div>}
          {confirmed && (
            <div className="card fu" style={{textAlign:"center",padding:40}}>
              <div style={{fontSize:60,marginBottom:16}}>🎉</div>
              <div className="syne" style={{fontWeight:800,fontSize:24,color:"var(--green)",marginBottom:8}}>Deal Confirmed!</div>
              <div style={{color:"var(--muted)",fontSize:14,marginBottom:20}}>Now share the payment link with the buyer</div>
              <div style={{background:"var(--sf2)",borderRadius:8,padding:"10px 12px",marginBottom:10,wordBreak:"break-all"}}><code style={{fontSize:12,color:"var(--gold)"}}>{paymentLink}</code></div>
              <button className="btn-gold" style={{width:"100%"}} onClick={()=>{ navigator.clipboard?.writeText(paymentLink); setToast("Payment link copied!"); }}>📋 Copy Link</button>
            </div>
          )}
          {order && order.status==="pending_seller_confirm" && !confirmed && !loading && (
            <div className="fu">
              <div style={{textAlign:"center",marginBottom:20}}>
                <div className="badge borange" style={{fontSize:13,marginBottom:8}}>🤝 Buyer ne Deal Bheja Hai</div>
                <h2 className="syne" style={{fontWeight:800,fontSize:22}}>Confirm This Deal</h2>
              </div>
              <div className="card" style={{marginBottom:14}}>
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:11,color:"var(--muted)",marginBottom:4}}>Deal ID: <span style={{fontFamily:"monospace",color:"var(--gold)"}}>{order.id}</span></div>
                  <div className="syne" style={{fontWeight:800,fontSize:22,marginBottom:4}}>{order.product_name}</div>
                  <div style={{fontSize:13,color:"var(--muted)"}}>Buyer: <strong style={{color:"var(--text)"}}>{order.buyer_name||"Anonymous"}</strong></div>
                </div>
                <div className="g2" style={{marginBottom:16}}>
                  <div style={{background:"var(--sf2)",borderRadius:10,padding:12,textAlign:"center"}}><div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Order Value</div><div className="syne" style={{fontWeight:800,fontSize:22}}>₹{order.order_amount}</div></div>
                  <div style={{background:"rgba(5,150,105,.15)",borderRadius:10,padding:12,textAlign:"center"}}><div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>You Will Receive</div><div className="syne" style={{fontWeight:800,fontSize:22,color:"var(--green)"}}>₹{order.seller_receives}</div></div>
                </div>
                <button className="btn-green" style={{width:"100%",padding:"16px",fontSize:16,borderRadius:12,marginBottom:10}} onClick={handleConfirm} disabled={confirming}>{confirming?"⏳ Confirming...":"✅ Yes! I Will Ship This Order"}</button>
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
  const [tab, setTab] = useState("actions");
  // Payout state
  const [payoutOrder, setPayoutOrder] = useState(null);
  const [payoutForm, setPayoutForm] = useState({ payout_to:"seller", payout_method:"upi", payout_ref:"", payout_upi:"", payout_bank:"", payout_amount:"", payout_note:"" });
  const [payoutLoading, setPayoutLoading] = useState(false);
  const [payoutMsg, setPayoutMsg] = useState("");

  // Auto-fill UPI from seller's saved profile when order selected
  const selectPayoutOrder = (o) => {
    setPayoutOrder(o);
    setPayoutMsg("");
    setPayoutForm(prev => ({
      ...prev,
      payout_amount: o.seller_receives || "",
      payout_to: "seller",
      payout_upi: user.upi_id || prev.payout_upi || "",
    }));
  };

  const hdrs = { "Content-Type":"application/json", "x-admin-key": adminKey };

  useEffect(()=>{
    const fetchOrders = async () => {
      try {
        const r = await fetch(`${ADMIN_URL}/api/admin/users/${user.id}/orders`, { headers: hdrs });
        const d = await r.json();
        if(d.success) setUserOrders(d.orders||[]);
      } catch(e) {}
      setLoading(false);
    };
    fetchOrders();
  },[]); // eslint-disable-line

  const doAction = async (action) => {
    setActionLoading(action);
    const reason = action==="warn" ? warnReason : banReason;
    try {
      const r = await fetch(`${ADMIN_URL}/api/admin/users/${user.id}/${action}`, {
        method:"POST", headers: hdrs, body: JSON.stringify({reason})
      });
      const d = await r.json();
      setActionLoading("");
      if(d.success) { setMsg(d.message); setTimeout(()=>{ onUpdate(user.id, action); }, 1500); }
      else setMsg("❌ "+d.error);
    } catch(e) { setActionLoading(""); setMsg("❌ Network error!"); }
  };

  const doManualPayout = async () => {
    if (!payoutOrder) { setPayoutMsg("❌ Please select an order first"); return; }
    if (!payoutForm.payout_ref) { setPayoutMsg("❌ Transaction reference / UTR is required"); return; }
    if (payoutForm.payout_method === "upi" && !payoutForm.payout_upi) { setPayoutMsg("❌ Please enter UPI ID"); return; }
    if (payoutForm.payout_method === "bank" && !payoutForm.payout_bank) { setPayoutMsg("❌ Please enter bank details"); return; }
    setPayoutLoading(true); setPayoutMsg("");
    try {
      const r = await fetch(`${ADMIN_URL}/api/admin/orders/${payoutOrder.id}/manual-payout`, {
        method:"POST", headers: hdrs,
        body: JSON.stringify({ ...payoutForm, payout_amount: payoutForm.payout_amount || payoutOrder.seller_receives, admin_name:"Admin" })
      });
      const d = await r.json();
      setPayoutLoading(false);
      if (d.success) {
        setPayoutMsg("✅ " + d.message);
        setUserOrders(prev => prev.map(o => o.id === payoutOrder.id ? { ...o, payout_status:"paid", payout_ref: payoutForm.payout_ref } : o));
        setPayoutOrder(null);
        setPayoutForm({ payout_to:"seller", payout_method:"upi", payout_ref:"", payout_upi:"", payout_bank:"", payout_amount:"", payout_note:"" });
      } else setPayoutMsg("❌ " + d.error);
    } catch(e) { setPayoutLoading(false); setPayoutMsg("❌ Network error!"); }
  };

  const isBanned = user.user_status === "banned";
  const warnCount = user.warning_count || 0;
  const deliveredOrders = userOrders.filter(o => ["delivered","cancelled_buyer"].includes(o.status));
  const pendingPayouts = deliveredOrders.filter(o => !o.payout_status || o.payout_status === "pending");
  const donePayouts = deliveredOrders.filter(o => o.payout_status === "paid");

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={{maxWidth:560}} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div className="avatar" style={{width:44,height:44,fontSize:18,background:isBanned?"var(--red)":"linear-gradient(135deg,var(--gold),var(--accent))"}}>{user.name[0]}</div>
            <div>
              <div className="syne" style={{fontWeight:800,fontSize:17}}>{user.name}</div>
              <div style={{fontSize:12,color:"var(--muted)"}}>{user.role} • ID: {user.id}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <span className={`badge ${isBanned?"br":warnCount>0?"borange":"bg"}`}>
              {isBanned?"🚫 Banned":warnCount>0?`⚠️ ${warnCount} Warning`:"✅ Active"}
            </span>
            {pendingPayouts.length > 0 && <span className="badge borange">💸 {pendingPayouts.length} Payout Pending</span>}
            <button className="btn-ghost" style={{padding:"4px 10px",fontSize:12}} onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:4,marginBottom:16,background:"var(--sf2)",padding:4,borderRadius:10}}>
          {[["details","👤 Details"],["orders","📦 Orders"],["payouts","💸 Payouts"],["actions","⚙️ Actions"]].map(([id,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"7px",border:"none",borderRadius:8,cursor:"pointer",background:tab===id?"var(--gold)":"transparent",color:tab===id?"#fff":"var(--muted)",fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:11,transition:"all .2s",position:"relative"}}>
              {label}
              {id==="payouts" && pendingPayouts.length>0 && <span style={{position:"absolute",top:-4,right:-2,background:"var(--red)",color:"#fff",borderRadius:"50%",width:14,height:14,fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{pendingPayouts.length}</span>}
            </button>
          ))}
        </div>

        {/* Details Tab */}
        {tab==="details" && (
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {[
              ["Name", user.name, undefined],
              ["Email", user.email, undefined],
              ["Phone", user.phone, undefined],
              ["Role", user.role, undefined],
              ["PAN", user.pan_number||"—", user.pan_number?"var(--green)":undefined],
              ["GST", user.gst_number||"—", user.gst_number?"var(--green)":undefined],
              ["Shop", user.shop_name||"—", undefined],
              ["UPI ID", user.upi_id||"—", user.upi_id?"var(--green)":undefined],
              ["Joined", (user.created_at||"").split("T")[0], undefined],
              ["Warnings", String(warnCount), warnCount>0?"var(--red)":undefined],
              ["Status", isBanned?"Banned":"Active", isBanned?"var(--red)":"var(--green)"],
            ].map(([label,val,color])=>(
              <div key={label} style={{display:"flex",justifyContent:"space-between",padding:"9px 12px",background:"var(--sf2)",borderRadius:8}}>
                <span style={{fontSize:12,color:"var(--muted)",fontWeight:500}}>{label}</span>
                <span style={{fontSize:12,fontWeight:600,fontFamily:label==="PAN"||label==="GST"?"monospace":"inherit",color:color||"var(--text)"}}>{val}</span>
              </div>
            ))}
          </div>
        )}

        {/* Orders Tab */}
        {tab==="orders" && (
          <div>
            {loading
              ? <div style={{textAlign:"center",padding:30,color:"var(--muted)"}}>⏳ Loading orders...</div>
              : userOrders.length===0
                ? <div style={{textAlign:"center",padding:30,color:"var(--muted)"}}>No orders found</div>
                : <div style={{overflowX:"auto"}}>
                    <table className="tbl">
                      <thead><tr><th>ID</th><th>Product</th><th>Amount</th><th>Token</th><th>Status</th><th>Payout</th><th>Date</th></tr></thead>
                      <tbody>{userOrders.map(o=>(
                        <tr key={o.id}>
                          <td style={{fontFamily:"monospace",color:"var(--gold)",fontSize:11}}>{o.id}</td>
                          <td style={{fontSize:12}}>{o.product_name}</td>
                          <td style={{fontSize:12,fontWeight:600}}>₹{o.order_amount}</td>
                          <td style={{fontSize:12,color:"var(--green)"}}>₹{o.token_amount}</td>
                          <td><Bdg status={o.status} /></td>
                          <td>
                            {["delivered","cancelled_buyer"].includes(o.status) ? (
                              o.payout_status === "paid"
                                ? <span className="badge bg" style={{fontSize:10}}>✅ Paid</span>
                                : <span className="badge borange" style={{fontSize:10}}>⏳ Pending</span>
                            ) : "—"}
                          </td>
                          <td style={{fontSize:11,color:"var(--muted)"}}>{(o.created_at||"").split("T")[0]}</td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </div>
            }
          </div>
        )}

        {/* PAYOUTS TAB */}
        {tab==="payouts" && (
          <div style={{display:"flex",flexDirection:"column",gap:12}}>

            {/* Pending Payouts */}
            <div>
              <div style={{fontSize:12,fontWeight:700,color:"var(--muted)",marginBottom:8,textTransform:"uppercase",letterSpacing:"1px"}}>⏳ Pending Payouts ({pendingPayouts.length})</div>
              {pendingPayouts.length === 0
                ? <div style={{textAlign:"center",padding:16,color:"var(--muted)",fontSize:13,background:"var(--sf2)",borderRadius:10}}>✅ Sab payouts complete!</div>
                : pendingPayouts.map(o => (
                  <div key={o.id} style={{background: payoutOrder?.id===o.id?"rgba(14,165,233,.1)":"var(--sf2)",border:`1px solid ${payoutOrder?.id===o.id?"rgba(14,165,233,.4)":"var(--border)"}`,borderRadius:10,padding:12,marginBottom:8,cursor:"pointer"}}
                    onClick={()=>selectPayoutOrder(o)}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <div style={{fontFamily:"monospace",color:"var(--gold)",fontSize:11}}>{o.id}</div>
                        <div style={{fontWeight:600,fontSize:13}}>{o.product_name}</div>
                        <div style={{fontSize:12,color:"var(--muted)"}}>Token: ₹{o.token_amount} | <span style={{color:"var(--green)",fontWeight:700}}>Pay: ₹{o.seller_receives}</span></div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <Bdg status={o.status} />
                        {payoutOrder?.id===o.id && <div style={{fontSize:11,color:"var(--gold)",marginTop:4}}>✏️ Selected</div>}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>

            {/* Payout Form */}
            {payoutOrder && (
              <div style={{background:"rgba(14,165,233,.06)",border:"1px solid rgba(14,165,233,.25)",borderRadius:12,padding:14}}>
                <div style={{fontWeight:700,fontSize:14,color:"var(--gold)",marginBottom:12}}>💸 Manual Payout — {payoutOrder.id}</div>

                <div style={{display:"flex",gap:8,marginBottom:10}}>
                  <div style={{flex:1}}>
                    <label className="label">Payout To *</label>
                    <select className="select" value={payoutForm.payout_to} onChange={e=>setPayoutForm({...payoutForm,payout_to:e.target.value})}>
                      <option value="seller">Seller (95%)</option>
                      <option value="buyer">Buyer (Refund)</option>
                    </select>
                  </div>
                  <div style={{flex:1}}>
                    <label className="label">Method *</label>
                    <select className="select" value={payoutForm.payout_method} onChange={e=>setPayoutForm({...payoutForm,payout_method:e.target.value})}>
                      <option value="upi">UPI</option>
                      <option value="bank">Bank Transfer</option>
                      <option value="cash">Cash</option>
                    </select>
                  </div>
                </div>

                {payoutForm.payout_method === "upi" && (
                  <div style={{marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                      <label className="label" style={{marginBottom:0}}>UPI ID *</label>
                      {user.upi_id && <span style={{fontSize:11,color:"var(--green)",cursor:"pointer",fontWeight:600}} onClick={()=>setPayoutForm({...payoutForm,payout_upi:user.upi_id})}>✅ Use saved: {user.upi_id}</span>}
                    </div>
                    <input className="input" placeholder={user.upi_id || "seller@upi"} value={payoutForm.payout_upi} onChange={e=>setPayoutForm({...payoutForm,payout_upi:e.target.value})} />
                  </div>
                )}
                {payoutForm.payout_method === "bank" && (
                  <div style={{marginBottom:10}}>
                    <label className="label">Bank Details (Acc No / IFSC) *</label>
                    <input className="input" placeholder="50100XXXXXX / HDFC0001234" value={payoutForm.payout_bank} onChange={e=>setPayoutForm({...payoutForm,payout_bank:e.target.value})} />
                  </div>
                )}

                <div style={{display:"flex",gap:8,marginBottom:10}}>
                  <div style={{flex:1}}>
                    <label className="label">Amount (₹) *</label>
                    <input className="input" type="number" placeholder={payoutOrder.seller_receives} value={payoutForm.payout_amount} onChange={e=>setPayoutForm({...payoutForm,payout_amount:e.target.value})} />
                  </div>
                  <div style={{flex:1}}>
                    <label className="label">UTR / Ref No *</label>
                    <input className="input" placeholder="UTR123456789" value={payoutForm.payout_ref} onChange={e=>setPayoutForm({...payoutForm,payout_ref:e.target.value})} />
                  </div>
                </div>

                <div style={{marginBottom:10}}>
                  <label className="label">Note (optional)</label>
                  <input className="input" placeholder="e.g. HDFC se bheja" value={payoutForm.payout_note} onChange={e=>setPayoutForm({...payoutForm,payout_note:e.target.value})} />
                </div>

                {payoutMsg && <div style={{padding:10,borderRadius:8,background:"var(--sf2)",fontSize:13,marginBottom:8,color:payoutMsg.startsWith("✅")?"var(--green)":"var(--red)"}}>{payoutMsg}</div>}

                <div style={{display:"flex",gap:8}}>
                  <button className="btn-ghost" style={{flex:1}} onClick={()=>{setPayoutOrder(null);setPayoutMsg("");}}>Cancel</button>
                  <button className="btn-green" style={{flex:2}} onClick={doManualPayout} disabled={payoutLoading}>
                    {payoutLoading?"⏳ Marking...":"✅ Mark as Paid & Notify"}
                  </button>
                </div>
              </div>
            )}

            {/* Done Payouts */}
            {donePayouts.length > 0 && (
              <div>
                <div style={{fontSize:12,fontWeight:700,color:"var(--muted)",marginBottom:8,textTransform:"uppercase",letterSpacing:"1px"}}>✅ Completed Payouts ({donePayouts.length})</div>
                {donePayouts.map(o=>(
                  <div key={o.id} style={{background:"rgba(16,185,129,.06)",border:"1px solid rgba(16,185,129,.2)",borderRadius:10,padding:12,marginBottom:8}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                      <div>
                        <div style={{fontFamily:"monospace",color:"var(--gold)",fontSize:11}}>{o.id}</div>
                        <div style={{fontWeight:600,fontSize:13}}>{o.product_name}</div>
                        <div style={{fontSize:12,color:"var(--muted)",marginTop:3}}>
                          Amount: <strong style={{color:"var(--green)"}}>₹{o.payout_amount || o.seller_receives}</strong>
                          {o.payout_method && <> • {o.payout_method?.toUpperCase()}</>}
                          {o.payout_upi && <> • {o.payout_upi}</>}
                          {o.payout_bank && <> • {o.payout_bank}</>}
                        </div>
                        {o.payout_ref && <div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>UTR: <strong style={{fontFamily:"monospace"}}>{o.payout_ref}</strong></div>}
                        {o.payout_at && <div style={{fontSize:11,color:"var(--muted)"}}>{new Date(o.payout_at).toLocaleString("en-IN")}</div>}
                      </div>
                      <span className="badge bg" style={{fontSize:10}}>✅ Paid</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions Tab */}
        {tab==="actions" && (
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {/* Warn */}
            <div style={{background:"rgba(251,146,60,.1)",border:"1px solid rgba(251,146,60,.3)",borderRadius:12,padding:14}}>
              <div style={{fontWeight:700,color:"#fb923c",marginBottom:8,fontSize:13}}>⚠️ Send Warning</div>
              <input className="input" placeholder="Warning reason (e.g. Suspicious activity)" value={warnReason} onChange={e=>setWarnReason(e.target.value)} style={{marginBottom:8}} />
              <button className="btn-ghost" style={{width:"100%",color:"#fb923c",borderColor:"rgba(251,146,60,.4)"}} onClick={()=>doAction("warn")} disabled={!!actionLoading}>
                {actionLoading==="warn"?"⏳ Sending...":"⚠️ Send Warning"}
              </button>
            </div>
            {/* Ban / Unban */}
            {!isBanned ? (
              <div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",borderRadius:12,padding:14}}>
                <div style={{fontWeight:700,color:"var(--red)",marginBottom:8,fontSize:13}}>🚫 Ban This User</div>
                <input className="input" placeholder="Ban reason (e.g. Fraud, fake orders)" value={banReason} onChange={e=>setBanReason(e.target.value)} style={{marginBottom:8}} />
                <button className="btn-red" style={{width:"100%"}} onClick={()=>doAction("ban")} disabled={!!actionLoading}>
                  {actionLoading==="ban"?"⏳ Banning...":"🚫 Ban This User"}
                </button>
              </div>
            ) : (
              <div style={{background:"rgba(5,150,105,.1)",border:"1px solid rgba(5,150,105,.3)",borderRadius:12,padding:14}}>
                <div style={{fontWeight:700,color:"var(--green)",marginBottom:8,fontSize:13}}>✅ Unban This User</div>
                <button className="btn-green" style={{width:"100%"}} onClick={()=>doAction("unban")} disabled={!!actionLoading}>
                  {actionLoading==="unban"?"⏳ Unbanning...":"✅ Unban This User"}
                </button>
              </div>
            )}
            {msg && (
              <div style={{padding:12,borderRadius:8,background:"var(--sf2)",fontSize:13,fontWeight:600,textAlign:"center",
                color:msg.startsWith("✅")?"var(--green)":msg.startsWith("⚠️")?"#fb923c":"var(--red)"}}>
                {msg}
              </div>
            )}
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
                {stats.pendingDisputes>0 && <div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",borderRadius:12,padding:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontWeight:700,color:"var(--red)",marginBottom:4}}>⚠️ {stats.pendingDisputes} Pending Dispute(s)</div><div style={{fontSize:12,color:"var(--muted)"}}>Resolve within 24 hours</div></div><button className="btn-red" style={{padding:"8px 16px",fontSize:13}} onClick={()=>setPage("disputes")}>Resolve →</button></div>}
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
            {orders.length===0&&!loading&&<div style={{background:"rgba(14,165,233,.1)",border:"1px solid rgba(14,165,233,.3)",borderRadius:10,padding:14,marginBottom:16,fontSize:13}}>ℹ️ No orders found. Sellers need to register and create orders to appear here.</div>}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
              {["all","pending","token_paid","dispatched","delivered","disputed"].map(s=>(<div key={s} className={`chip ${filterStatus===s?"active":""}`} onClick={()=>setFilter(s)} style={{fontSize:11}}>{s==="all"?`All (${orders.length})`:s.replace("_"," ")}</div>))}
            </div>
            {loading ? <div style={{textAlign:"center",padding:30,color:"var(--muted)"}}>⏳ Loading...</div> : (
              <div className="card" style={{padding:0,overflowX:"auto"}}>
                <table className="tbl">
                  <thead><tr><th>Order ID</th><th>Date</th><th>Seller</th><th>Buyer</th><th>Product</th><th>Amount</th><th>Token</th><th>Commission</th><th>Status</th><th>Receipt</th></tr></thead>
                  <tbody>
                    {filteredOrders.length===0?<tr><td colSpan={10} style={{textAlign:"center",color:"var(--muted)",padding:30}}>No orders found</td></tr>:filteredOrders.map(o=>(
                      <tr key={o.id}><td><span style={{fontFamily:"monospace",color:"var(--gold)",fontSize:11}}>{o.id}</span></td><td style={{fontSize:11,color:"var(--muted)"}}>{(o.created_at||"").split("T")[0]}</td><td style={{fontSize:12}}>{o.seller_name||"—"}</td><td style={{fontSize:12}}>{o.buyer_name||"—"}</td><td style={{fontSize:12,color:"var(--muted)"}}>{o.product_name}</td><td style={{fontWeight:600,fontSize:12}}>₹{o.order_amount}</td><td style={{color:"var(--green)",fontWeight:600,fontSize:12}}>₹{o.token_amount}</td><td style={{color:"var(--blue)",fontSize:12}}>₹{o.escara_commission||0}</td><td><Bdg status={o.status} /></td><td>{["token_paid","dispatched","delivered"].includes(o.status)&&<button className="btn-ghost" style={{padding:"3px 8px",fontSize:11}} onClick={()=>downloadReceipt(o,"admin")}>📄</button>}</td></tr>
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
                  <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>PAN</th><th>GST</th><th>Status</th><th>Joined</th><th>Action</th></tr></thead>
                  <tbody>{users.map(u=>(
                    <tr key={u.id} style={{cursor:"pointer"}} onClick={()=>setSelectedUser(u)}>
                      <td style={{color:"var(--muted)",fontSize:12}}>{u.id}</td>
                      <td style={{fontWeight:600,fontSize:13}}>{u.name}{u.warning_count>0&&<span className="badge borange" style={{fontSize:10,marginLeft:4}}>⚠️ {u.warning_count}</span>}</td>
                      <td style={{fontSize:12,color:"var(--muted)"}}>{u.email}</td>
                      <td style={{fontSize:12}}>{u.phone}</td>
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
            {loading?<div style={{textAlign:"center",padding:30,color:"var(--muted)"}}>⏳ Loading...</div>:disputes.length===0?(<div className="card" style={{textAlign:"center",padding:50}}><div style={{fontSize:40,marginBottom:10}}>🎉</div><div className="syne" style={{fontWeight:700,fontSize:18}}>No Active Disputes!</div></div>):(
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
    if (!password) { setError("❌ Please enter the password!"); return; }
    setLoading(true); setError("");
    if (LOCAL_PASSWORDS.includes(password)) { setLoading(false); localStorage.setItem("adminKey",password); onLogin(password); return; }
    try {
      const res=await fetch(`${ADMIN_URL}/api/admin/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password})});
      const data=await res.json(); setLoading(false);
      if(data.success){localStorage.setItem("adminKey",password);onLogin(password);}
      else setError("❌ Wrong password!");
    } catch(e) { setLoading(false); setError("❌ Could not connect to server. Please try again."); }
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
      <nav className="nav"><Logo onClick={onBack} /><div style={{display:"flex",gap:8,alignItems:"center"}}><LangToggle lang={lang} onToggle={onLangToggle} /><ThemeToggle dark={dark} onToggle={onToggle} /><button className="btn-ghost" onClick={onBack}>← Back</button></div></nav>
      <div style={{maxWidth:820,margin:"0 auto",padding:"40px 20px"}}>

        {/* Hero */}
        <div style={{textAlign:"center",marginBottom:48}}>
          <img src={LOGO_SRC} alt="EscaraPay" style={{height:64,marginBottom:16,objectFit:"contain"}} onError={e=>e.target.style.display="none"} />
          <h1 className="syne" style={{fontWeight:800,fontSize:"clamp(28px,4vw,42px)",marginBottom:12}}>About <span className="shimmer">EscaraPay</span></h1>
          <p style={{color:"var(--muted)",fontSize:16,maxWidth:560,margin:"0 auto",lineHeight:1.8}}>
            {L("India's first payment protection platform specifically designed for WhatsApp & Instagram sellers","भारत का पहला पेमेंट प्रोटेक्शन प्लेटफॉर्म, खासतौर पर व्हाट्सऐप और इंस्टाग्राम सेलर्स के लिए","India ka pehla payment protection platform specifically designed for WhatsApp & Instagram sellers")}
          </p>
        </div>

        {/* Mission */}
        <div className="card" style={{marginBottom:16,background:"rgba(14,165,233,.05)",borderColor:"rgba(14,165,233,.25)"}}>
          <h2 className="syne" style={{fontWeight:800,fontSize:20,marginBottom:12}}>🎯 {L("Our Mission","हमारा मिशन","Hamara Mission")}</h2>
          <p style={{fontSize:14,color:"var(--muted)",lineHeight:1.9}}>
            {L(
              "Millions of sellers do business on WhatsApp and Instagram in India — but they fear RTO losses and buyers fear fraud. EscaraPay solved this with a simple payment protection system: token is locked first, released after delivery.",
              "भारत में लाखों सेलर व्हाट्सऐप और इंस्टाग्राम पर बिजनेस करते हैं — लेकिन उन्हें RTO का डर रहता है और बायर को फ्रॉड का। एस्करापे ने यह समस्या एक सरल एस्क्रो सिस्टम से हल की।",
              "India mein lakho sellers WhatsApp aur Instagram pe business karte hain — lekin unhe RTO ka darr rehta hai aur buyers ko fraud ka. EscaraPay ne yeh problem solve ki ek simple payment protection system se: token pehle lock hota hai, delivery ke baad release hota hai."
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
              ✅ {L("Token safely held — neither party can cheat","टोकन एस्क्रो में — कोई धोखा नहीं","Token safely held — kisi ko nahi milta jab tak deal complete na ho")}<br/>
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
               de:"Pays via UPI/Card/NetBanking. Token locked in EscaraPay protected vault.",
               dh:"UPI/कार्ड से भुगतान करता है। टोकन एस्क्रो में लॉक।",
               dl:"Cashfree ke through UPI/Card/NetBanking se pay. Token EscaraPay protected vault mein lock."},
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
            {icon:"🛡️",en:"Payment Protected",hi:"पेमेंट प्रोटेक्टेड",hl:"Payment Protected",de:"100% secure token system",dh:"100% सुरक्षित टोकन सिस्टम",dl:"100% secure token system"},
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

/* ══════════ LEGAL NAV ══════════ */
function LegalNav({ active, onNav, dark, onToggle }) {
  const links = [
    ["home","🏠 Home"],
    ["about","About"],
    ["terms","Terms"],
    ["privacy","Privacy"],
    ["refund","Refund"],
    ["dispute","Dispute"],
    ["contact","Contact"],
  ];
  return (
    <nav className="nav" style={{gap:0}}>
      <Logo onClick={()=>onNav("landing")} />
      <div style={{display:"flex",gap:4,alignItems:"center",flexWrap:"nowrap",overflow:"auto"}}>
        <div className="hide-m" style={{display:"flex",gap:2}}>
          {links.map(([s,l])=>(
            <button key={s} onClick={()=>onNav(s==="home"?"landing":s)}
              style={{background:active===s?"var(--gold)":"transparent",color:active===s?(dark?"#0a0a0f":"#fff"):"var(--muted)",
                border:"none",borderRadius:7,padding:"5px 10px",cursor:"pointer",fontSize:12,fontWeight:600,whiteSpace:"nowrap",fontFamily:"'DM Sans',sans-serif",transition:"all .2s"}}>
              {l}
            </button>
          ))}
        </div>
        <ThemeToggle dark={dark} onToggle={onToggle} />
      </div>
    </nav>
  );
}

/* ══════════ REFUND POLICY PAGE ══════════ */
function RefundPage({ onBack, dark, onToggle }) {
  const nav = (s) => { window._goToPage(s); };
  return (
    <div style={{minHeight:"100vh"}}>
      <LegalNav active="refund" onNav={nav} dark={dark} onToggle={onToggle} />
      <div style={{maxWidth:760,margin:"0 auto",padding:"40px 20px"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontSize:48,marginBottom:12}}>↩️</div>
          <h1 className="syne" style={{fontWeight:800,fontSize:"clamp(24px,4vw,36px)",marginBottom:8}}>Refund Policy</h1>
          <p style={{color:"var(--muted)",fontSize:13}}>EscaraPay (India) | Last updated: March 2026</p>
        </div>

        <div style={{background:"rgba(5,150,105,.08)",border:"1px solid rgba(5,150,105,.3)",borderRadius:14,padding:20,marginBottom:24}}>
          <div style={{fontWeight:700,fontSize:15,color:"var(--green)",marginBottom:8}}>✅ Our Refund Promise</div>
          <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.8}}>EscaraPay is a payment protection platform. We hold your payment securely and release it only after delivery is confirmed. If delivery does not happen, your money comes back. Simple.</p>
        </div>

        {[
          {t:"1. When You Get a Refund",icon:"✅",color:"var(--green)",sections:[
            {head:"Non-Delivery by Seller",body:"If the seller does not dispatch your order within the agreed time, 100% of your token amount is refunded to your original payment method. Processing time: 5–7 business days."},
            {head:"Seller Cancellation",body:"If the seller cancels the order before dispatch, your full token is refunded. The 2% gateway fee is non-refundable as it is charged by Cashfree directly."},
            {head:"Successful Dispute Resolution (Buyer)",body:"If EscaraPay's dispute team determines the seller is at fault (e.g., item not received, wrong item, damaged goods), the token amount is refunded to you within 5–7 business days."},
          ]},
          {t:"2. When You Do NOT Get a Refund",icon:"❌",color:"var(--red)",sections:[
            {head:"Delivery Confirmed by Buyer",body:"Once you confirm delivery, the payment is permanently released to the seller. This action cannot be reversed."},
            {head:"Auto-Release After 7 Days",body:"If you do not raise a dispute within 48 hours of expected delivery, the token auto-releases to the seller after 7 days. No refund after auto-release."},
            {head:"Gateway Fee (2%)",body:"The 2% payment gateway fee charged by Cashfree is non-refundable in all cases, as it is collected by Cashfree, not by EscaraPay."},
            {head:"EscaraPay Commission (5%)",body:"EscaraPay's 5% service commission is non-refundable once a transaction is initiated, as it covers platform infrastructure and dispute resolution services."},
          ]},
          {t:"3. Refund Timeline",icon:"⏱️",color:"var(--blue)",sections:[
            {head:"Standard Refunds",body:"5–7 business days from approval date to original payment method (UPI/Card/NetBanking)."},
            {head:"Dispute-Based Refunds",body:"Up to 10 business days — includes 24-hour investigation period plus 5–7 days processing."},
            {head:"Bank Processing",body:"Once EscaraPay initiates the refund, your bank may take additional 2–3 business days to reflect in your account."},
          ]},
          {t:"4. How to Request a Refund",icon:"📋",color:"var(--accent)",sections:[
            {head:"Step 1 — Raise a Dispute",body:"Open your order in the EscaraPay app → Click 'Dispute Raise Karo' → Provide reason and evidence."},
            {head:"Step 2 — Investigation",body:"Our team investigates within 24 business hours. We may contact both buyer and seller for clarification."},
            {head:"Step 3 — Resolution",body:"If resolved in your favor, refund is initiated within 2 business days. You'll receive a confirmation email."},
            {head:"Step 4 — Contact Support",body:"For any refund queries: support@escarapay.in | Response time: within 24 hours."},
          ]},
          {t:"5. EscaraPay's Role",icon:"🛡️",color:"var(--muted)",sections:[
            {head:"Facilitator Only",body:"EscaraPay is a payment protection facilitator. We do not manufacture, sell, or ship any products. We are responsible only for holding and releasing the protected token amount as per our policy."},
            {head:"Payments via Cashfree",body:"All payments are processed through Cashfree, an RBI-authorized payment aggregator. EscaraPay does not directly hold or process payment card data."},
          ]},
        ].map(section=>(
          <div key={section.t} className="card" style={{marginBottom:16}}>
            <h2 className="syne" style={{fontWeight:700,fontSize:16,marginBottom:14,color:section.color}}>{section.icon} {section.t}</h2>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {section.sections.map(s=>(
                <div key={s.head} style={{padding:"12px 14px",background:"var(--sf2)",borderRadius:10}}>
                  <div style={{fontWeight:600,fontSize:13,marginBottom:4}}>{s.head}</div>
                  <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.8}}>{s.body}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="card" style={{background:"rgba(14,165,233,.06)",borderColor:"rgba(14,165,233,.3)",textAlign:"center",marginBottom:24}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:6}}>📧 Refund Queries</div>
          <div style={{fontSize:13,color:"var(--muted)"}}>Email: <strong>support@escarapay.in</strong> | Response within 24 hours</div>
          <div style={{fontSize:12,color:"var(--muted)",marginTop:4}}>EscaraPay (India) | Jurisdiction: Uttar Pradesh, India</div>
        </div>
        <div style={{textAlign:"center"}}><button className="btn-ghost" onClick={onBack}>← Back to Home</button></div>
      </div>
    </div>
  );
}

/* ══════════ DISPUTE RESOLUTION PAGE ══════════ */
function DisputePage({ onBack, dark, onToggle }) {
  const nav = (s) => { window._goToPage(s); };
  return (
    <div style={{minHeight:"100vh"}}>
      <LegalNav active="dispute" onNav={nav} dark={dark} onToggle={onToggle} />
      <div style={{maxWidth:760,margin:"0 auto",padding:"40px 20px"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontSize:48,marginBottom:12}}>⚖️</div>
          <h1 className="syne" style={{fontWeight:800,fontSize:"clamp(24px,4vw,36px)",marginBottom:8}}>Dispute Resolution Policy</h1>
          <p style={{color:"var(--muted)",fontSize:13}}>EscaraPay (India) | Last updated: March 2026</p>
        </div>

        <div style={{background:"rgba(124,58,237,.08)",border:"1px solid rgba(124,58,237,.3)",borderRadius:14,padding:20,marginBottom:24}}>
          <div style={{fontWeight:700,fontSize:15,color:"#a78bfa",marginBottom:8}}>🛡️ Fair. Transparent. Final.</div>
          <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.8}}>EscaraPay is committed to fair dispute resolution. Our team reviews all evidence objectively and makes a binding decision within 24 business hours. Both buyer and seller are heard before any decision is made.</p>
        </div>

        {/* Timeline */}
        <div className="card" style={{marginBottom:16}}>
          <h2 className="syne" style={{fontWeight:700,fontSize:16,marginBottom:16}}>📋 Dispute Process Step by Step</h2>
          {[
            {n:"1",c:"var(--gold)",   t:"Raise Dispute",       d:"Open your order → Click 'Dispute Raise Karo' → Select reason → Add any evidence (photos, screenshots). Must be raised within 48 hours of expected delivery."},
            {n:"2",c:"var(--blue)",   t:"Notification",         d:"Both buyer and seller are notified immediately. The protected token is frozen — no one can access it during investigation."},
            {n:"3",c:"var(--accent)", t:"Evidence Collection",  d:"Both parties must submit evidence within 24 hours: photos of item received, tracking screenshots, chat screenshots, any proof of delivery or non-delivery."},
            {n:"4",c:"var(--red)",    t:"Investigation",        d:"EscaraPay's dispute team reviews all evidence. We may contact courier partners for tracking verification. Investigation completes within 24 business hours."},
            {n:"5",c:"var(--green)",  t:"Decision & Release",   d:"EscaraPay makes a final, binding decision. Token is released to the winning party within 2 business days. Both parties are notified via email."},
          ].map(s=>(
            <div key={s.n} className="step" style={{marginBottom:10}}>
              <div className="step-num" style={{background:`${s.c}20`,color:s.c,width:34,height:34,fontSize:15,flexShrink:0}}>{s.n}</div>
              <div><div style={{fontWeight:700,fontSize:14,marginBottom:3}}>{s.t}</div><div style={{fontSize:13,color:"var(--muted)",lineHeight:1.7}}>{s.d}</div></div>
            </div>
          ))}
        </div>

        {[
          {t:"1. Eligibility to Raise Dispute",icon:"⏰",color:"var(--gold)",c:"A dispute can only be raised within 48 hours of the expected delivery date. After 48 hours, the token automatically releases to the seller. Disputes raised after this window will not be considered. Emergency cases (e.g., seller fraud) may be escalated to legal@escarapay.in."},
          {t:"2. Valid Grounds for Dispute",icon:"📋",color:"var(--blue)",c:"Valid reasons include: Item not received despite tracking showing delivered, Wrong item received (different from description), Item received in damaged condition, Counterfeit or fake product received, Seller has not dispatched within agreed time. Invalid reasons: Change of mind, Item meets description but buyer doesn't like it, Buyer provided wrong delivery address."},
          {t:"3. Evidence Requirements",icon:"📸",color:"var(--accent)",c:"Buyers must provide: Photos/video of the item received (or proof of non-receipt), Screenshot of tracking showing non-delivery or wrong delivery, Original order confirmation from EscaraPay. Sellers must provide: Proof of dispatch (courier receipt, tracking ID), Photos of item packed and shipped, Any communication with buyer confirming order details."},
          {t:"4. EscaraPay's Decision — Final & Binding",icon:"⚖️",color:"var(--red)",c:"EscaraPay's dispute team makes the final decision based on evidence. This decision is binding on both parties and cannot be appealed within the platform. Possible outcomes: (a) Full refund to buyer, (b) Full token release to seller, (c) Partial resolution at EscaraPay's discretion. EscaraPay acts as a neutral facilitator — we are not liable for product quality, authenticity, or any loss beyond the protected token amount."},
          {t:"5. Escalation",icon:"📞",color:"var(--muted)",c:"If you believe the decision was unfair due to procedural error, you may escalate within 7 days by emailing legal@escarapay.in with: Your Order ID, Evidence not previously submitted, Reason for escalation. Escalated cases are reviewed by senior team within 7 business days. EscaraPay's escalation decision is final."},
          {t:"6. Anti-Abuse Policy",icon:"🚫",color:"var(--red)",c:"Repeated false disputes, submission of fake evidence, or attempts to manipulate the dispute process will result in: Immediate account suspension, Permanent ban from the platform, Reporting to relevant law enforcement under IPC Section 420 (Cheating) and IT Act 2000. EscaraPay reserves the right to charge a dispute processing fee of ₹99 for disputes found to be frivolous."},
          {t:"7. Governing Law",icon:"🇮🇳",color:"var(--green)",c:"All disputes and their resolution are subject to Indian law. In case of legal proceedings, jurisdiction lies exclusively with courts in Uttar Pradesh, India. Users agree to resolve disputes through EscaraPay's internal process before approaching courts."},
        ].map(s=>(
          <div key={s.t} className="card" style={{marginBottom:14}}>
            <h3 className="syne" style={{fontWeight:700,fontSize:15,marginBottom:10,color:s.color}}>{s.icon} {s.t}</h3>
            <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.9}}>{s.c}</p>
          </div>
        ))}

        <div className="card" style={{background:"rgba(14,165,233,.06)",borderColor:"rgba(14,165,233,.3)",textAlign:"center",marginBottom:24}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:8}}>📞 Contact Dispute Team</div>
          <div style={{fontSize:13,color:"var(--muted)",marginBottom:4}}>General: <strong>support@escarapay.in</strong></div>
          <div style={{fontSize:13,color:"var(--muted)",marginBottom:4}}>Legal Escalation: <strong>legal@escarapay.in</strong></div>
          <div style={{fontSize:12,color:"var(--muted)",marginTop:8}}>EscaraPay (India) | Uttar Pradesh, India | Response: 24 hours</div>
        </div>
        <div style={{textAlign:"center"}}><button className="btn-ghost" onClick={onBack}>← Back to Home</button></div>
      </div>
    </div>
  );
}

function PrivacyPage({ onBack, dark, onToggle }) {
  const nav = (s) => { window._goToPage(s); };
  return (
    <div style={{minHeight:"100vh"}}>
      <LegalNav active="privacy" onNav={nav} dark={dark} onToggle={onToggle} />
      <div style={{maxWidth:760,margin:"0 auto",padding:"40px 20px"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontSize:48,marginBottom:12}}>🔒</div>
          <h1 className="syne" style={{fontWeight:800,fontSize:"clamp(24px,4vw,36px)",marginBottom:8}}>Privacy Policy</h1>
          <p style={{color:"var(--muted)",fontSize:13}}>EscaraPay (India) | Last updated: March 2026 | Effective immediately</p>
        </div>
        {[
          {t:"1. Information We Collect", c:"EscaraPay collects the following when you register or transact: Full name, email address, phone number (10 digits), PAN card or GST number (sellers only, for KYC), UPI ID (optional, for payouts), transaction history and order details, device information and IP address for security and fraud prevention."},
          {t:"2. How We Use Your Information", c:"Your data is used strictly to: process and manage protected payment transactions securely, verify identity to prevent fraud and unauthorized access, send transaction notifications, alerts, and OTPs, resolve disputes between buyers and sellers, comply with Indian financial regulations (IT Act 2000, PMLA 2002, RBI guidelines), improve platform performance and user experience."},
          {t:"3. Payment Data & Cashfree", c:"EscaraPay uses Cashfree as our payment gateway — an RBI-authorized and PCI-DSS Level 1 certified payment aggregator. EscaraPay does NOT store card numbers, CVV, or banking credentials. Token amounts are held in secure trust accounts. All transactions are encrypted using 256-bit SSL/TLS."},
          {t:"4. KYC & Seller Data", c:"Sellers must provide PAN Card or GST Number for KYC as required by Indian financial laws. This data is encrypted at rest (AES-256), accessible only by authorized compliance personnel, never shared for marketing, and retained for 7 years as per PMLA 2002 requirements."},
          {t:"5. Data Sharing", c:"We do NOT sell, rent, or trade your personal data. Data is shared only with: Cashfree (payment processing), law enforcement agencies when legally required by Indian courts or regulators, dispute resolution partners during fraud investigations. We notify you where legally permissible before sharing."},
          {t:"6. Data Security", c:"Our security measures include: SSL/TLS encryption in transit, AES-256 encryption at rest, strict role-based access controls, regular third-party security audits, industry-standard password hashing (bcrypt). However, no method of internet transmission is 100% secure."},
          {t:"7. Your Rights", c:"Under Indian data protection principles, you have the right to: access all personal data we hold about you, request correction of inaccurate information, request account deletion (subject to legal retention requirements), withdraw consent for non-essential data use, raise concerns at privacy@escarapay.in. We respond to all requests within 30 days."},
          {t:"8. Data Retention", c:"Transaction records are retained for 7 years as mandated by PMLA 2002. Account data is retained as long as your account is active. On deletion request, personal data is anonymized — anonymized statistical data may be retained for analytics."},
          {t:"9. Cookies", c:"EscaraPay uses only essential cookies for session management and security. We do not use tracking, advertising, or third-party analytics cookies."},
          {t:"10. Contact — Privacy Officer", c:"Email: privacy@escarapay.in | General Support: support@escarapay.in | EscaraPay (India), Uttar Pradesh, India"},
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
  const nav = (s) => { window._goToPage(s); };
  return (
    <div style={{minHeight:"100vh"}}>
      <LegalNav active="terms" onNav={nav} dark={dark} onToggle={onToggle} />
      <div style={{maxWidth:760,margin:"0 auto",padding:"40px 20px"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontSize:48,marginBottom:12}}>📋</div>
          <h1 className="syne" style={{fontWeight:800,fontSize:"clamp(24px,4vw,36px)",marginBottom:8}}>Terms & Conditions</h1>
          <p style={{color:"var(--muted)",fontSize:13}}>EscaraPay (India) | Last updated: March 2026 | Effective immediately upon registration</p>
        </div>

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
          <h3 className="syne" style={{fontWeight:700,fontSize:15,marginBottom:12,color:"var(--red)"}}>5. Dispute Policy (In Detail)</h3>
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
          {t:"9. Limitation of Liability", c:"EscaraPay's liability is strictly limited to the token amount held in safe pay protection for that specific transaction. We are not liable for: quality, safety, or legality of products exchanged, indirect or consequential damages, losses due to network failures or payment gateway downtime, disputes arising from incorrect information provided by either party."},
          {t:"10. Governing Law & Jurisdiction", c:"These Terms are governed by the laws of India. All disputes arising from use of EscaraPay are subject to the exclusive jurisdiction of courts in Uttar Pradesh, India. EscaraPay (India) is a facilitator only — not a party to any transaction between buyers and sellers. These terms comply with: Information Technology Act 2000, Payment and Settlement Systems Act 2007, Prevention of Money Laundering Act 2002, Consumer Protection Act 2019, and applicable RBI guidelines on payment aggregators."},
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
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const nav = (s) => { window._goToPage(s); };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      setSendError("Please fill in all fields."); return;
    }
    setSending(true); setSendError("");
    try {
      const res = await fetch("https://escarapay-backend-production.up.railway.app/api/contact", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) setSent(true);
      else setSendError(data.error || "Failed to send. Please email us directly.");
    } catch(e) {
      setSendError("Could not connect. Please email us at support@escarapay.in");
    }
    setSending(false);
  };

  return (
    <div style={{minHeight:"100vh"}}>
      <LegalNav active="contact" onNav={nav} dark={dark} onToggle={onToggle} />
      <div style={{maxWidth:720,margin:"0 auto",padding:"40px 20px"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontSize:48,marginBottom:12}}>📞</div>
          <h1 className="syne" style={{fontWeight:800,fontSize:"clamp(24px,4vw,36px)",marginBottom:8}}>Contact Us</h1>
          <p style={{color:"var(--muted)",fontSize:14}}>EscaraPay (India) · We respond within 24 hours · Mon–Sat, 10AM–6PM IST</p>
        </div>

        <div style={{background:"rgba(5,150,105,.08)",border:"1px solid rgba(5,150,105,.3)",borderRadius:12,padding:14,marginBottom:24,textAlign:"center"}}>
          <span style={{fontSize:13,fontWeight:600,color:"var(--green)"}}>⚡ Average response time: under 4 hours during business hours</span>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14,marginBottom:32}}>
          {[
            {icon:"📧",title:"General Support",value:"support@escarapay.in",sub:"Orders, accounts, general queries"},
            {icon:"⚖️",title:"Legal & Disputes",value:"legal@escarapay.in",sub:"Dispute escalation, legal matters"},
            {icon:"🔒",title:"Privacy Officer",value:"privacy@escarapay.in",sub:"Data requests, privacy concerns"},
          ].map(c=>(
            <div key={c.title} className="card" style={{textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:10}}>{c.icon}</div>
              <div className="syne" style={{fontWeight:700,fontSize:13,marginBottom:4}}>{c.title}</div>
              <a href={`mailto:${c.value}`} style={{fontSize:12,color:"var(--gold)",wordBreak:"break-all",marginBottom:4,display:"block",textDecoration:"none"}}>{c.value}</a>
              <div style={{fontSize:11,color:"var(--muted)"}}>{c.sub}</div>
            </div>
          ))}
        </div>

        {!sent ? (
          <div className="card">
            <h3 className="syne" style={{fontWeight:700,fontSize:18,marginBottom:4}}>Send Us a Message</h3>
            <p style={{color:"var(--muted)",fontSize:13,marginBottom:20}}>We'll get back to you within 24 hours.</p>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div className="g2">
                <div><label className="label">Your Name *</label><input className="input" placeholder="Rahul Sharma" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
                <div><label className="label">Email Address *</label><input className="input" type="email" placeholder="you@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
              </div>
              <div><label className="label">Subject *</label>
                <select className="select" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}>
                  <option value="">-- Select a topic --</option>
                  <option>Payment Issue</option>
                  <option>Dispute Help</option>
                  <option>Refund Request</option>
                  <option>Account Problem</option>
                  <option>Technical Bug</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>
              <div><label className="label">Message *</label>
                <textarea className="input" placeholder="Describe your issue or question in detail..." rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{resize:"vertical"}} />
              </div>
              {sendError && <div style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",borderRadius:8,padding:10,fontSize:13,color:"var(--red)"}}>❌ {sendError}</div>}
              <button className="btn-gold" style={{width:"100%",padding:12}} onClick={handleSubmit} disabled={sending}>
                {sending ? "⏳ Sending..." : "📨 Send Message"}
              </button>
            </div>
          </div>
        ) : (
          <div className="card" style={{textAlign:"center",padding:50}}>
            <div style={{fontSize:52,marginBottom:16}}>✅</div>
            <div className="syne" style={{fontWeight:800,fontSize:22,marginBottom:8}}>Message Sent!</div>
            <div style={{color:"var(--muted)",fontSize:14,marginBottom:8}}>Thank you, <strong>{form.name}</strong>. We have received your message.</div>
            <div style={{color:"var(--muted)",fontSize:13,marginBottom:24}}>We'll respond to <strong style={{color:"var(--gold)"}}>{form.email}</strong> within 24 hours.<br/>
              Reference: <strong style={{color:"var(--gold)"}}>ESC-{Date.now().toString().slice(-6)}</strong>
            </div>
            <button className="btn-ghost" onClick={()=>{setSent(false);setForm({name:"",email:"",subject:"",message:""});}}>← Send Another</button>
          </div>
        )}
        <div style={{textAlign:"center",marginTop:24}}><button className="btn-ghost" onClick={onBack}>← Back to Home</button></div>
      </div>
    </div>
  );
}

/* ══════════ BUYER ONE-CLICK CONFIRM PAGE ══════════ */
function ConfirmPage({ token, dark, onToggle, onGoHome }) {
  const [order, setOrder]         = useState(null);
  const [step, setStep]           = useState("loading"); // loading|confirm|issue|done|error|already_done|already_disputed
  const [issueText, setIssueText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg]             = useState("");

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/confirm/${token}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setOrder(d.order);
          if (d.order.status === "delivered")  setStep("already_done");
          else if (d.order.status === "disputed") setStep("already_disputed");
          else setStep("confirm");
        } else setStep("error");
      })
      .catch(() => setStep("error"));
  }, [token]);

  const handleReceived = async () => {
    setSubmitting(true);
    const r = await fetch(`${BACKEND_URL}/api/confirm/${token}/received`, { method:"POST", headers:{"Content-Type":"application/json"} });
    const d = await r.json();
    setSubmitting(false);
    if (d.success) { setStep("done"); setMsg("✅ Thank you! Token has been released to the seller."); }
    else setMsg("❌ " + d.error);
  };

  const handleIssue = async () => {
    if (!issueText.trim()) { setMsg("❌ Please describe the issue"); return; }
    setSubmitting(true);
    const r = await fetch(`${BACKEND_URL}/api/confirm/${token}/issue`, {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ reason: issueText }),
    });
    const d = await r.json();
    setSubmitting(false);
    if (d.success) { setStep("done"); setMsg("⚠️ Issue reported. Our team will review within 24 hours."); }
    else setMsg("❌ " + d.error);
  };

  return (
    <div style={{minHeight:"100vh"}}>
      <nav className="nav">
        <Logo onClick={onGoHome} />
        <ThemeToggle dark={dark} onToggle={onToggle} />
      </nav>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"calc(100vh - 64px)",padding:20}}>
        <div style={{width:"100%",maxWidth:420}}>

          {step==="loading" && <div className="card" style={{textAlign:"center",padding:50}}><div style={{width:44,height:44,border:"3px solid var(--gold)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}}/><div style={{color:"var(--muted)"}}>Loading order details...</div></div>}

          {step==="error" && <div className="card" style={{textAlign:"center",padding:40}}><div style={{fontSize:52,marginBottom:12}}>❌</div><div className="syne" style={{fontWeight:800,fontSize:20,marginBottom:8}}>Invalid Link</div><div style={{color:"var(--muted)",fontSize:13,marginBottom:20}}>This confirmation link is invalid or has expired.</div><button className="btn-ghost" onClick={onGoHome}>← Go Home</button></div>}

          {step==="already_done" && <div className="card" style={{textAlign:"center",padding:40}}><div style={{fontSize:52,marginBottom:12}}>✅</div><div className="syne" style={{fontWeight:800,fontSize:20,marginBottom:8}}>Already Confirmed</div><div style={{color:"var(--muted)",fontSize:13}}>This delivery was already confirmed. Thank you!</div></div>}

          {step==="already_disputed" && <div className="card" style={{textAlign:"center",padding:40}}><div style={{fontSize:52,marginBottom:12}}>⚠️</div><div className="syne" style={{fontWeight:800,fontSize:20,marginBottom:8}}>Dispute In Progress</div><div style={{color:"var(--muted)",fontSize:13}}>A dispute has been raised for this order. Our team is reviewing it.</div></div>}

          {step==="confirm" && order && (
            <div className="fu">
              <div style={{textAlign:"center",marginBottom:20}}>
                <div style={{fontSize:48,marginBottom:8}}>📦</div>
                <h2 className="syne" style={{fontWeight:800,fontSize:22}}>Did you receive your order?</h2>
                <p style={{color:"var(--muted)",fontSize:13,marginTop:6}}>No account needed — just tap the button below</p>
              </div>
              <div className="card" style={{marginBottom:16,background:"rgba(14,165,233,.05)",borderColor:"rgba(14,165,233,.25)"}}>
                <div style={{fontSize:11,color:"var(--muted)",marginBottom:3}}>Order ID: <span style={{fontFamily:"monospace",color:"var(--gold)"}}>{order.id}</span></div>
                <div className="syne" style={{fontWeight:800,fontSize:20,marginBottom:4}}>{order.product_name}</div>
                <div style={{fontSize:13,color:"var(--muted)"}}>Seller: <strong style={{color:"var(--text)"}}>{order.seller_name||"—"}</strong></div>
                <div style={{fontSize:13,color:"var(--muted)",marginTop:2}}>Token Amount: <strong style={{color:"var(--gold)"}}>₹{order.token_amount}</strong></div>
                {order.tracking_number && <div style={{marginTop:8,background:"var(--sf2)",borderRadius:8,padding:"8px 10px",fontSize:12}}>📦 Tracking: <strong style={{fontFamily:"monospace"}}>{order.tracking_number}</strong></div>}
              </div>
              {msg && <div style={{padding:10,borderRadius:8,background:"var(--sf2)",fontSize:13,marginBottom:12,color:msg.startsWith("✅")?"var(--green)":"var(--red)"}}>{msg}</div>}
              <button className="btn-green" style={{width:"100%",padding:14,fontSize:15,borderRadius:12,marginBottom:10}} onClick={handleReceived} disabled={submitting}>
                {submitting?"⏳ Processing...":"✅ Yes, I Received My Order"}
              </button>
              <button className="btn-ghost" style={{width:"100%",padding:12,color:"var(--red)",borderColor:"rgba(239,68,68,.3)"}} onClick={()=>setStep("issue")}>
                ❌ No — I Have an Issue
              </button>
              <div style={{textAlign:"center",marginTop:12,fontSize:11,color:"var(--muted)"}}>🔒 Secured by EscaraPay · Funds held safely until you confirm</div>
            </div>
          )}

          {step==="issue" && order && (
            <div className="fu">
              <div style={{textAlign:"center",marginBottom:20}}>
                <div style={{fontSize:48,marginBottom:8}}>⚠️</div>
                <h2 className="syne" style={{fontWeight:800,fontSize:20}}>Report an Issue</h2>
                <p style={{color:"var(--muted)",fontSize:13,marginTop:6}}>Our team will review within 24 hours</p>
              </div>
              <div className="card" style={{marginBottom:14}}>
                <div style={{fontSize:13,fontWeight:600,marginBottom:10}}>What is the issue?</div>
                {["Item not received","Wrong item received","Item received damaged","Item does not match description"].map(opt=>(
                  <div key={opt} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:"1px solid var(--border)",cursor:"pointer"}} onClick={()=>setIssueText(opt)}>
                    <div style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${issueText===opt?"var(--gold)":"var(--border)"}`,background:issueText===opt?"var(--gold)":"transparent",flexShrink:0}}/>
                    <span style={{fontSize:13}}>{opt}</span>
                  </div>
                ))}
                <div style={{marginTop:10}}>
                  <label className="label">Additional details (optional)</label>
                  <textarea className="input" rows={3} placeholder="Describe the issue in detail..."
                    value={["Item not received","Wrong item received","Item received damaged","Item does not match description"].includes(issueText)?"":issueText}
                    onChange={e=>setIssueText(e.target.value)} style={{resize:"none"}}/>
                </div>
              </div>
              <div style={{background:"rgba(14,165,233,.08)",border:"1px solid rgba(14,165,233,.2)",borderRadius:10,padding:12,marginBottom:14,fontSize:12,color:"var(--muted)"}}>
                ℹ️ Your token of <strong style={{color:"var(--gold)"}}>₹{order?.token_amount}</strong> remains held until the dispute is resolved.
              </div>
              {msg && <div style={{padding:10,borderRadius:8,background:"var(--sf2)",fontSize:13,marginBottom:12,color:"var(--red)"}}>{msg}</div>}
              <button className="btn-red" style={{width:"100%",padding:12,marginBottom:8}} onClick={handleIssue} disabled={submitting||!issueText.trim()}>
                {submitting?"⏳ Submitting...":"⚠️ Submit Issue Report"}
              </button>
              <button className="btn-ghost" style={{width:"100%"}} onClick={()=>{setStep("confirm");setMsg("");}}>← Back</button>
            </div>
          )}

          {step==="done" && (
            <div className="card fu" style={{textAlign:"center",padding:40}}>
              <div style={{fontSize:60,marginBottom:16}}>{msg.startsWith("✅")?"🎉":"⚠️"}</div>
              <div className="syne" style={{fontWeight:800,fontSize:22,marginBottom:12}}>{msg.startsWith("✅")?"Thank You!":"Issue Reported"}</div>
              <div style={{color:"var(--muted)",fontSize:14,marginBottom:16}}>{msg}</div>
              <div style={{fontSize:12,color:"var(--muted)"}}>{msg.startsWith("✅")?"The seller will be notified and payment will be processed shortly.":"Our team will review all evidence within 24 hours and contact both parties via email."}</div>
            </div>
          )}
        </div>
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
  const [payOrderId, setPayOrderId]     = useState(null);
  const [dealOrderId, setDealOrderId]   = useState(null);
  const [trackOrderId, setTrackOrderId] = useState(null);
  const [confirmToken, setConfirmToken] = useState(null);
  const [adminKey, setAdminKey] = useState(()=> localStorage.getItem("adminKey") || "");

  useEffect(()=>{ window._goToPage=(s)=>{ const urls={about:"/about",privacy:"/privacy",terms:"/terms",refund:"/refund",dispute:"/dispute",contact:"/contact",landing:"/",track:"/track",admin:"/admin"}; window.history.pushState({},"",urls[s]||"/"+s); setScreen(s); }; },[]);
  useEffect(()=>{
    document.title = "Escara Pay | India's Trusted Payment Protection Platform";
  },[]);
  useEffect(()=>{
    const path=window.location.pathname;
    const pm=path.match(/^\/pay\/([A-Z0-9]+)$/);      if(pm){setPayOrderId(pm[1]);setScreen("pay");return;}
    const dm=path.match(/^\/deal\/([A-Z0-9]+)$/);     if(dm){setDealOrderId(dm[1]);setScreen("deal");return;}
    const tm=path.match(/^\/track\/([A-Z0-9-]+)$/i);  if(tm){setTrackOrderId(tm[1].toUpperCase());setScreen("track");return;}
    const cm=path.match(/^\/confirm\/([a-f0-9]{48})$/i); if(cm){setConfirmToken(cm[1]);setScreen("confirm");return;}
    if(path==="/track"){setScreen("track");return;}
    if(path==="/admin"){setScreen("admin-login");return;}
    if(path==="/about"){setScreen("about");return;}
    if(path==="/privacy"){setScreen("privacy");return;}
    if(path==="/terms"){setScreen("terms");return;}
    if(path==="/refund"){setScreen("refund");return;}
    if(path==="/dispute"){setScreen("dispute");return;}
    if(path==="/contact"){setScreen("contact");return;}
    if(path==="/login"){setScreen("auth");return;}
  },[]);

  const props = { dark, onToggle:toggleDark, lang, onLangToggle:toggleLang };
  const handleLogin=(t,n,id,phone)=>{setUserType(t);setUserName(n);setUserId(id);setUserPhone(phone||"");setScreen("dashboard");};
  const handleLogout=()=>{setScreen("landing");setUserType(null);setUserId(null);setUserPhone("");setUserName("");};
  const goHome=()=>{window.history.pushState({},"","/");setScreen("landing");setPayOrderId(null);setDealOrderId(null);setTrackOrderId(null);setConfirmToken(null);};
  const goToScreen=(s,url)=>{window.history.pushState({},"",(url||"/"));setScreen(s);};

  return (
    <>
      <style>{getStyle(dark)}</style>
      {screen==="pay"         && payOrderId   && <PayPage     orderId={payOrderId}   dark={dark} onToggle={toggleDark} onGoHome={goHome} />}
      {screen==="deal"        && dealOrderId  && <DealPage    orderId={dealOrderId}  dark={dark} onToggle={toggleDark} onGoHome={goHome} />}
      {screen==="track"                       && <TrackPage   orderId={trackOrderId} dark={dark} onToggle={toggleDark} onGoHome={goHome} />}
      {screen==="confirm"     && confirmToken && <ConfirmPage token={confirmToken}   dark={dark} onToggle={toggleDark} onGoHome={goHome} />}
      {screen==="admin-login" && <AdminLogin  onLogin={(k)=>{setAdminKey(k);setScreen("admin");}} dark={dark} onToggle={toggleDark} />}
      {screen==="admin"       && <AdminPanel  adminKey={adminKey} onLogout={()=>{localStorage.removeItem("adminKey");setScreen("landing");}} dark={dark} onToggle={toggleDark} />}
      {screen==="about"       && <AboutPage   onBack={goHome} {...props} />}
      {screen==="privacy"     && <PrivacyPage onBack={goHome} {...props} />}
      {screen==="terms"       && <TermsPage   onBack={goHome} {...props} />}
      {screen==="refund"      && <RefundPage  onBack={goHome} {...props} />}
      {screen==="dispute"     && <DisputePage onBack={goHome} {...props} />}
      {screen==="contact"     && <ContactPage onBack={goHome} {...props} />}
      {screen==="landing"     && <Landing     onEnter={t=>{setUserType(t);goToScreen("auth","/login");}} onTrack={()=>{window.history.pushState({},"","/track");setScreen("track");setTrackOrderId(null);}} {...props} />}
      {screen==="auth"        && <Auth        type={userType} onLogin={handleLogin} onBack={goHome} {...props} />}
      {screen==="dashboard"   && userType==="seller" && <SellerDB user={userName||"Seller"} userId={userId} onLogout={handleLogout} {...props} />}
      {screen==="dashboard"   && userType==="buyer"  && <BuyerDB  user={userName||"Buyer"}  userId={userId} userPhone={userPhone} onLogout={handleLogout} {...props} />}
    </>
  );
}