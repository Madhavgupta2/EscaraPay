



import { useState } from "react";
import LOGO_SRC from "./escarapay-logo.jpg";

function getStyle(dark) {
  return `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

  :root {
    --bg:      ${dark ? "#0a0a0f"                : "#f0f7ff"};
    --surface: ${dark ? "#12121a"                : "#ffffff"};
    --sf2:     ${dark ? "#1a1a26"                : "#e4f1fb"};
    --border:  ${dark ? "rgba(255,255,255,0.07)" : "rgba(14,165,233,0.18)"};
    --gold:    ${dark ? "#f0b429"                : "#0ea5e9"};
    --gold2:   ${dark ? "#f7c948"                : "#38bdf8"};
    --green:   ${dark ? "#22c55e"                : "#059669"};
    --red:     ${dark ? "#ef4444"                : "#dc2626"};
    --blue:    ${dark ? "#60a5fa"                : "#0284c7"};
    --text:    ${dark ? "#f0f0f5"                : "#0c2340"};
    --muted:   ${dark ? "#8888a0"                : "#4a7fa5"};
    --accent:  ${dark ? "#7c3aed"                : "#0369a1"};
  }

  body { background:var(--bg); color:var(--text); font-family:'DM Sans',sans-serif; }
  .syne { font-family:'Syne',sans-serif; }

  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:var(--bg);}
  ::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px;}

  @keyframes fadeUp   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes spin     { to{transform:rotate(360deg)} }
  @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  @keyframes pulseGold{
    0%,100%{box-shadow:0 0 0 0 rgba(240,180,41,.4)}
    50%    {box-shadow:0 0 0 14px rgba(240,180,41,0)}
  }

  .fu  {animation:fadeUp .55s ease forwards}
  .fu2 {animation:fadeUp .55s .13s ease both}
  .fu3 {animation:fadeUp .55s .26s ease both}
  .float {animation:float 3s ease-in-out infinite}

  /* Buttons */
  .btn-gold{background:linear-gradient(135deg,var(--gold),var(--gold2));color:${dark?"#0a0a0f":"#fff"};border:none;padding:11px 26px;border-radius:10px;font-family:'Syne',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:all .2s;white-space:nowrap;}
  .btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(14,165,233,.35);}
  .btn-gold.pulse{animation:pulseGold 2s infinite;}

  .btn-outline{background:transparent;color:var(--gold);border:1.5px solid var(--gold);padding:10px 26px;border-radius:10px;font-family:'Syne',sans-serif;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;white-space:nowrap;}
  .btn-outline:hover{background:rgba(14,165,233,.1);transform:translateY(-2px);}

  .btn-ghost{background:var(--sf2);color:var(--text);border:1px solid var(--border);padding:9px 18px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:500;font-size:13px;cursor:pointer;transition:all .2s;white-space:nowrap;}
  .btn-ghost:hover{border-color:var(--gold);color:var(--gold);}

  /* Cards */
  .card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:22px;transition:border-color .3s;}
  .card:hover{border-color:rgba(14,165,233,.3);}

  /* Form */
  .input{width:100%;background:var(--sf2);border:1px solid var(--border);color:var(--text);padding:11px 14px;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;outline:none;transition:border-color .2s;}
  .input:focus{border-color:var(--gold);}
  .input::placeholder{color:var(--muted);}
  .select{width:100%;background:var(--sf2);border:1px solid var(--border);color:var(--text);padding:11px 14px;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;outline:none;cursor:pointer;}
  .select:focus{border-color:var(--gold);}
  .label{display:block;font-size:12px;color:var(--muted);margin-bottom:5px;font-weight:500;}

  /* Badges */
  .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600;}
  .bg  {background:rgba(5,150,105,.15); color:var(--green);}
  .bo  {background:rgba(14,165,233,.15);color:var(--gold);}
  .br  {background:rgba(220,38,38,.15); color:var(--red);}
  .bb  {background:rgba(2,132,199,.15); color:var(--blue);}
  .bm  {background:var(--sf2);          color:var(--muted);}

  /* Filter chips */
  .chip{display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;border:1px solid var(--border);background:var(--sf2);color:var(--muted);transition:all .2s;}
  .chip:hover{border-color:var(--gold);color:var(--gold);}
  .chip.active{background:rgba(14,165,233,.15);border-color:var(--gold);color:var(--gold);}

  /* Nav */
  .nav{position:sticky;top:0;z-index:100;background:${dark?"rgba(10,10,15,.9)":"rgba(240,247,255,.93)"};backdrop-filter:blur(22px);border-bottom:1px solid var(--border);padding:0 22px;height:62px;display:flex;align-items:center;justify-content:space-between;gap:10px;}

  /* Logo */
  .logo-img{height:36px;width:auto;object-fit:contain;flex-shrink:0;}
  .logo-wrap{display:flex;align-items:center;gap:8px;cursor:pointer;flex-shrink:0;}
  .logo-name{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;background:linear-gradient(135deg,var(--gold),var(--gold2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

  /* Toggle */
  .toggle-btn{display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:20px;border:1px solid var(--border);background:var(--sf2);cursor:pointer;font-size:13px;color:var(--muted);transition:all .2s;flex-shrink:0;}
  .toggle-btn:hover{border-color:var(--gold);color:var(--gold);}

  /* Sidebar */
  .sidebar{width:210px;background:var(--surface);border-right:1px solid var(--border);padding:18px 10px;position:fixed;top:62px;left:0;bottom:0;overflow-y:auto;display:flex;flex-direction:column;}
  .si{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:9px;cursor:pointer;font-size:14px;font-weight:500;color:var(--muted);transition:all .2s;margin-bottom:2px;}
  .si:hover{background:var(--sf2);color:var(--text);}
  .si.active{background:rgba(14,165,233,.12);color:var(--gold);}

  .main{margin-left:210px;padding:24px;min-height:calc(100vh - 62px);}

  /* Step */
  .step{display:flex;align-items:flex-start;gap:12px;padding:14px;border-radius:12px;border:1px solid var(--border);background:var(--surface);}
  .step-num{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:700;font-size:13px;flex-shrink:0;}

  /* Grids */
  .g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
  .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}

  /* Table */
  .tbl{width:100%;border-collapse:collapse;}
  .tbl th{text-align:left;padding:11px 13px;font-size:11px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border);white-space:nowrap;}
  .tbl td{padding:12px 13px;font-size:13px;border-bottom:1px solid var(--border);}
  .tbl tr:hover td{background:var(--sf2);}
  .tbl tr:last-child td{border-bottom:none;}

  /* Modal */
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);backdrop-filter:blur(4px);z-index:200;display:flex;align-items:center;justify-content:center;padding:14px;}
  .modal{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:26px;width:100%;max-width:470px;animation:fadeUp .3s ease;max-height:92vh;overflow-y:auto;}

  /* Timeline */
  .tl{display:flex;gap:12px;padding-bottom:20px;position:relative;}
  .tl:not(:last-child)::before{content:'';position:absolute;left:14px;top:30px;bottom:0;width:2px;background:var(--border);}
  .tl-dot{width:30px;height:30px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;}

  /* Misc */
  .shimmer{background:linear-gradient(90deg,var(--gold),${dark?"#fff":"#0369a1"},var(--gold));background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3s linear infinite;}
  .hero-glow{position:absolute;width:400px;height:400px;border-radius:50%;filter:blur(80px);pointer-events:none;}
  .avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--accent));display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:700;font-size:13px;color:white;flex-shrink:0;}
  .ficon{width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:12px;}
  .stat-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px 20px;}
  .pbar{height:5px;background:var(--sf2);border-radius:3px;overflow:hidden;}
  .pfill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--gold),var(--gold2));transition:width .5s;}
  .divider{height:1px;background:var(--border);margin:16px 0;}

  /* Responsive */
  @media(max-width:1024px){.g4{grid-template-columns:1fr 1fr;}}
  @media(max-width:800px){.g3{grid-template-columns:1fr 1fr;}}
  @media(max-width:640px){
    .sidebar{display:none;}
    .main{margin-left:0;padding:14px;}
    .g2,.g3,.g4{grid-template-columns:1fr;}
    .nav{padding:0 12px;}
    .hide-m{display:none;}
    .hero-sec{padding:50px 16px 40px!important;}
    .sec{padding:36px 16px!important;}
    .tbl-wrap{overflow-x:auto;}
  }
  `;
}

/* ── Helpers ── */
const MIN_TOKEN = 200;
const calcToken = (amount, pct) => Math.max(MIN_TOKEN, Math.round(Number(amount) * Number(pct) / 100));

const STATUS_META = {
  pending:          { label:"Awaiting Token",    cls:"bm", icon:"⏳" },
  token_paid:       { label:"Token Paid",        cls:"bo", icon:"🔐" },
  dispatched:       { label:"Dispatched",        cls:"bb", icon:"📦" },
  delivered:        { label:"Delivered",         cls:"bg", icon:"✅" },
  cancelled_buyer:  { label:"Cancelled (Buyer)", cls:"br", icon:"❌" },
  cancelled_seller: { label:"Cancelled (Seller)",cls:"br", icon:"❌" },
  refunded:         { label:"Refunded",          cls:"bb", icon:"↩️" },
};

const SELLER_ORDERS = [
  { id:"EP001", buyer:"Rahul Sharma",  product:"Handmade Bag",      amount:1200, token:200, status:"token_paid",      date:"2024-01-15", tracking:"DTDC123456" },
  { id:"EP002", buyer:"Priya Patel",   product:"Custom Jewelry",    amount:3500, token:350, status:"delivered",       date:"2024-01-12", tracking:"BLUEDART789" },
  { id:"EP003", buyer:"Amit Kumar",    product:"Handwoven Saree",   amount:2800, token:300, status:"dispatched",      date:"2024-01-14", tracking:"ECOMM456" },
  { id:"EP004", buyer:"Sneha Gupta",   product:"Art Print",         amount:800,  token:200, status:"cancelled_buyer", date:"2024-01-10", tracking:"" },
  { id:"EP005", buyer:"Raj Mehta",     product:"Leather Wallet",    amount:1500, token:200, status:"pending",         date:"2024-01-16", tracking:"" },
  { id:"EP006", buyer:"Divya Singh",   product:"Block Print Kurta", amount:2200, token:220, status:"dispatched",      date:"2024-01-17", tracking:"EKART321" },
];
const BUYER_ORDERS = [
  { id:"EP007", seller:"CraftsByMeena",  product:"Terracotta Vase",     amount:650,  token:200, status:"dispatched", date:"2024-01-15", tracking:"SHIP789012" },
  { id:"EP008", seller:"HandicraftHub",  product:"Wooden Toy Set",      amount:1200, token:200, status:"pending",    date:"2024-01-16", tracking:"" },
  { id:"EP009", seller:"ZareenKhans",    product:"Embroidered Dupatta", amount:890,  token:200, status:"delivered",  date:"2024-01-11", tracking:"" },
];

/* ── Shared Components ── */
function Logo() {
  return (
    <div className="logo-wrap">
      <img src={LOGO_SRC} alt="EscaraPay" className="logo-img"
        onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
      <div style={{ display:"none", width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#0ea5e9,#38bdf8)", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:900, color:"#fff", fontFamily:"'Syne',sans-serif" }}>E₹</div>
      <span className="logo-name">EscaraPay</span>
    </div>
  );
}

function ThemeToggle({ dark, onToggle }) {
  return (
    <div className="toggle-btn" onClick={onToggle}>
      <span>{dark ? "🌙" : "☀️"}</span>
      <span className="hide-m">{dark ? "Dark" : "Light"}</span>
    </div>
  );
}

function Bdg({ status }) {
  const s = STATUS_META[status] || STATUS_META.pending;
  return <span className={`badge ${s.cls}`}>{s.icon} {s.label}</span>;
}

/* ── Order Detail Modal ── */
function OrderModal({ order, isSeller, onClose, onDispatch, dark }) {
  const [tracking, setTracking] = useState(order.tracking || "");
  const steps = [
    { label:"Order Created",        done:true,                                               icon:"📋" },
    { label:"Token Paid by Buyer",  done:order.status !== "pending",                         icon:"💳" },
    { label:"Dispatched by Seller", done:["dispatched","delivered"].includes(order.status),  icon:"🚚" },
    { label:"Delivered",            done:order.status === "delivered",                        icon:"✅" },
  ];
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
          <div>
            <div style={{ fontFamily:"monospace", color:"var(--gold)", fontSize:12, marginBottom:3 }}>{order.id}</div>
            <h3 className="syne" style={{ fontWeight:800, fontSize:18 }}>{order.product}</h3>
          </div>
          <Bdg status={order.status} />
        </div>

        <div className="g2" style={{ marginBottom:16 }}>
          <div style={{ background:"var(--sf2)", borderRadius:10, padding:12 }}>
            <div style={{ fontSize:11, color:"var(--muted)", marginBottom:2 }}>Order Amount</div>
            <div className="syne" style={{ fontWeight:800, fontSize:20 }}>₹{order.amount}</div>
          </div>
          <div style={{ background:"rgba(14,165,233,.1)", borderRadius:10, padding:12, border:"1px solid rgba(14,165,233,.2)" }}>
            <div style={{ fontSize:11, color:"var(--muted)", marginBottom:2 }}>Token (Escrow)</div>
            <div className="syne" style={{ fontWeight:800, fontSize:20, color:"var(--gold)" }}>₹{order.token}</div>
          </div>
        </div>

        <div style={{ fontSize:13, color:"var(--muted)", marginBottom:14 }}>
          {isSeller ? "Buyer" : "Seller"}: <strong style={{ color:"var(--text)" }}>{order.buyer || order.seller}</strong>
        </div>

        {steps.map((s, i) => (
          <div key={i} className="tl">
            <div className="tl-dot" style={{ background:s.done?"rgba(5,150,105,.2)":"var(--sf2)", color:s.done?"var(--green)":"var(--muted)" }}>
              {s.done ? "✓" : s.icon}
            </div>
            <div style={{ paddingTop:6, fontSize:13, fontWeight:s.done?600:400, color:s.done?"var(--text)":"var(--muted)" }}>{s.label}</div>
          </div>
        ))}

        {order.tracking && (
          <div style={{ background:"rgba(14,165,233,.1)", border:"1px solid rgba(14,165,233,.2)", borderRadius:10, padding:12, marginBottom:12 }}>
            <div style={{ fontSize:11, color:"var(--blue)", marginBottom:3 }}>Tracking Number</div>
            <div style={{ fontFamily:"monospace", fontWeight:600, fontSize:13 }}>{order.tracking}</div>
          </div>
        )}

        {isSeller && order.status === "token_paid" && (
          <div style={{ marginBottom:12 }}>
            <label className="label">Enter Courier Tracking Number</label>
            <input className="input" placeholder="DTDC123456789" value={tracking} onChange={e => setTracking(e.target.value)} style={{ marginBottom:10 }} />
            <button className="btn-gold" style={{ width:"100%" }} onClick={() => onDispatch(order.id, tracking)}>
              📦 Mark as Dispatched
            </button>
          </div>
        )}
        <button className="btn-ghost" style={{ width:"100%" }} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

/* ══════════ LANDING PAGE ══════════ */
function Landing({ onEnter, dark, onToggle }) {
  const [tab, setTab] = useState("seller");
  return (
    <div style={{ minHeight:"100vh" }}>
      <nav className="nav">
        <Logo />
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <button className="btn-ghost" onClick={() => onEnter("buyer")}>Buyer</button>
          <button className="btn-gold"  onClick={() => onEnter("seller")}>Seller Login</button>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero-sec" style={{ position:"relative", overflow:"hidden", padding:"80px 40px 68px", textAlign:"center" }}>
        <div className="hero-glow" style={{ background:dark?"rgba(240,180,41,.07)":"rgba(14,165,233,.09)", top:"-80px", left:"50%", transform:"translateX(-50%)" }} />
        <div style={{ marginBottom:14 }} className="fu">
          <span className="badge bo" style={{ fontSize:12 }}>🛡️ India Ka Trusted Escrow Platform</span>
        </div>
        <h1 className="syne fu2" style={{ fontSize:"clamp(28px,5.5vw,64px)", fontWeight:800, lineHeight:1.1, marginBottom:16 }}>
          WhatsApp Deal Ka<br /><span className="shimmer">Sabse Safe Tarika</span>
        </h1>
        <p className="fu3" style={{ color:"var(--muted)", fontSize:"clamp(14px,2vw,17px)", maxWidth:520, margin:"0 auto 32px", lineHeight:1.7 }}>
          Seller ka RTO loss khatam. Buyer ka fraud ka darr khatam.<br />
          Minimum <strong style={{ color:"var(--gold)" }}>₹200 token</strong> se dono ko 100% protection.
        </p>
        <div className="fu3" style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
          <button className="btn-gold pulse" style={{ fontSize:15, padding:"13px 34px" }} onClick={() => onEnter("seller")}>
            Seller — Free Shuru Karo
          </button>
          <button className="btn-outline" onClick={() => onEnter("buyer")}>Buyer — Safe Order Do</button>
        </div>
        <div style={{ marginTop:40, display:"flex", justifyContent:"center", gap:"clamp(18px,4vw,52px)", flexWrap:"wrap" }}>
          {[["10,000+","Active Sellers"],["₹2Cr+","Protected Volume"],["98%","Disputes Resolved"]].map(([n,l]) => (
            <div key={l} style={{ textAlign:"center" }}>
              <div className="syne" style={{ fontSize:"clamp(20px,3vw,30px)", fontWeight:800, color:"var(--gold)" }}>{n}</div>
              <div style={{ fontSize:12, color:"var(--muted)", marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="sec" style={{ padding:"52px 40px", background:"var(--surface)" }}>
        <h2 className="syne" style={{ textAlign:"center", fontSize:"clamp(22px,3vw,34px)", fontWeight:800, marginBottom:6 }}>Kaise Kaam Karta Hai?</h2>
        <p style={{ textAlign:"center", color:"var(--muted)", marginBottom:28, fontSize:14 }}>3 simple steps — dono ke liye fair</p>
        <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:24 }}>
          {["seller","buyer"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding:"7px 22px", borderRadius:8, cursor:"pointer",
              fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:13,
              border:"1px solid var(--border)",
              background: tab===t?"var(--gold)":"transparent",
              color: tab===t?(dark?"#0a0a0f":"#fff"):"var(--muted)",
              transition:"all .2s"
            }}>{t==="seller"?"Seller View":"Buyer View"}</button>
          ))}
        </div>
        <div style={{ maxWidth:640, margin:"0 auto", display:"flex", flexDirection:"column", gap:10 }}>
          {(tab==="seller"?[
            ["1","var(--gold)","Order Link Banao","Product add karo — minimum ₹200 token auto calculate hoga"],
            ["2","var(--blue)","Buyer Token Pay Kare","Buyer minimum ₹200 token pay karega — escrow mein lock rahega"],
            ["3","var(--green)","Confidently Dispatch Karo","Token locked? Ab bina darr ke order bhejo!"],
          ]:[
            ["1","var(--gold)","Sirf ₹200 Minimum Token","Token pay karo — seller ke paas nahi jayega jab tak deliver na ho"],
            ["2","var(--blue)","Real-time Track Karo","Dispatch hua ya nahi — live status dekho"],
            ["3","var(--green)","Safe Delivery Guaranteed","Mila → seller ko token. Nahi mila → aapko wapas."],
          ]).map(([n,c,t,d]) => (
            <div key={n} className="step">
              <div className="step-num" style={{ background:`${c}20`, color:c }}>{n}</div>
              <div>
                <div style={{ fontWeight:600, marginBottom:3, fontSize:14 }}>{t}</div>
                <div style={{ fontSize:13, color:"var(--muted)" }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Token Logic */}
      <div className="sec" style={{ padding:"52px 40px" }}>
        <h2 className="syne" style={{ textAlign:"center", fontSize:"clamp(20px,3vw,32px)", fontWeight:800, marginBottom:30 }}>Token Kab Kiske Paas Jayega?</h2>
        <div className="g3" style={{ maxWidth:820, margin:"0 auto 22px" }}>
          {[
            { icon:"✅", bg:"rgba(5,150,105,.1)",  bdr:"rgba(5,150,105,.22)", title:"Order Deliver Hua",    sub:"Token → Seller", desc:"Buyer ne confirm kiya — token seller ko release" },
            { icon:"❌", bg:"rgba(220,38,38,.1)",  bdr:"rgba(220,38,38,.22)", title:"Buyer ne Cancel Kiya", sub:"Token → Seller", desc:"Buyer cancel kare — seller ka shipping cover" },
            { icon:"🚫", bg:"rgba(14,165,233,.1)", bdr:"rgba(14,165,233,.22)",title:"Seller ne Nahi Bheja",  sub:"Token → Buyer",  desc:"Seller ki galti — buyer ka poora token wapas" },
          ].map(item => (
            <div key={item.title} className="card" style={{ background:item.bg, borderColor:item.bdr, textAlign:"center" }}>
              <div style={{ fontSize:30, marginBottom:10 }}>{item.icon}</div>
              <div className="syne" style={{ fontWeight:700, marginBottom:4, fontSize:14 }}>{item.title}</div>
              <div style={{ color:"var(--gold)", fontWeight:700, marginBottom:8, fontSize:13 }}>{item.sub}</div>
              <div style={{ fontSize:13, color:"var(--muted)", lineHeight:1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth:580, margin:"0 auto", background:"rgba(14,165,233,.08)", border:"1.5px solid rgba(14,165,233,.22)", borderRadius:14, padding:20, textAlign:"center" }}>
          <div className="syne" style={{ fontWeight:800, fontSize:16, marginBottom:6 }}>💡 Minimum Token: ₹200 Hamesha</div>
          <div style={{ color:"var(--muted)", fontSize:13, lineHeight:1.7 }}>
            5% / 10% / 15% / 20% mein se jo bhi choose karo — agar calculated amount ₹200 se kam ho,
            toh buyer <strong style={{ color:"var(--gold)" }}>minimum ₹200</strong> hi bharenga.
            Seller ka shipping charge hamesha safe.
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="sec" style={{ padding:"52px 40px", background:"var(--surface)" }}>
        <h2 className="syne" style={{ textAlign:"center", fontSize:"clamp(20px,3vw,32px)", fontWeight:800, marginBottom:30 }}>Kyun EscaraPay?</h2>
        <div className="g3" style={{ maxWidth:820, margin:"0 auto" }}>
          {[
            { icon:"🔐", bg:"rgba(14,165,233,.1)", title:"RBI Compliant Escrow", desc:"Razorpay-powered. Paisa NBFC account mein — 100% safe." },
            { icon:"⚡", bg:"rgba(124,58,237,.1)", title:"Instant UPI Token",    desc:"GPay, PhonePe, Paytm — 10 second mein token pay." },
            { icon:"📱", bg:"rgba(14,165,233,.1)", title:"WhatsApp Share",       desc:"Link directly WhatsApp par — no app download needed." },
            { icon:"🏆", bg:"rgba(5,150,105,.1)",  title:"Dispute Resolution",  desc:"Disagreement? 24-hr mein team mediate karegi fairly." },
            { icon:"📊", bg:"rgba(14,165,233,.1)", title:"Seller Analytics",    desc:"RTO rate, revenue, conversion — sab ek dashboard pe." },
            { icon:"💸", bg:"rgba(220,38,38,.1)",  title:"Sirf 1.5% Fee",       desc:"Per transaction only. No monthly, no hidden charges." },
          ].map(f => (
            <div key={f.title} className="card float" style={{ animationDelay:`${Math.random()*.5}s` }}>
              <div className="ficon" style={{ background:f.bg }}>{f.icon}</div>
              <div className="syne" style={{ fontWeight:700, marginBottom:6, fontSize:14 }}>{f.title}</div>
              <div style={{ fontSize:13, color:"var(--muted)", lineHeight:1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="sec" style={{ padding:"68px 40px", textAlign:"center" }}>
        <img src={LOGO_SRC} alt="EscaraPay" style={{ height:56, marginBottom:20, objectFit:"contain" }}
          onError={e => e.target.style.display="none"} />
        <h2 className="syne" style={{ fontSize:"clamp(22px,4vw,38px)", fontWeight:800, marginBottom:12 }}>Ready to Build Trust?</h2>
        <p style={{ color:"var(--muted)", marginBottom:26, fontSize:15 }}>Free mein start karo — koi credit card nahi chahiye</p>
        <button className="btn-gold pulse" style={{ fontSize:15, padding:"13px 40px" }} onClick={() => onEnter("seller")}>
          Abhi Register Karo — Free Hai!
        </button>
      </div>

      {/* Footer */}
      <div style={{ borderTop:"1px solid var(--border)", padding:"18px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
        <Logo />
        <div style={{ color:"var(--muted)", fontSize:12 }}>© 2026 EscaraPay. Secure Token-Based Payments for India.</div>
        <div style={{ display:"flex", gap:16 }}>
          {["Privacy","Terms","Support"].map(l => <span key={l} style={{ color:"var(--muted)", fontSize:12, cursor:"pointer" }}>{l}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ══════════ AUTH ══════════ */
function Auth({ type, onLogin, onBack, dark, onToggle }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name:"", email:"", password:"", shop:"" });
  const [loading, setLoading] = useState(false);
  const handle = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    onLogin(type, form.name || (type==="seller" ? "Meena Crafts" : "Rahul Sharma"));
  };
  return (
    <div style={{ minHeight:"100vh" }}>
      <nav className="nav">
        <Logo />
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <button className="btn-ghost" onClick={onBack}>← Back</button>
        </div>
      </nav>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"calc(100vh - 62px)", padding:20 }}>
        <div className="modal" style={{ maxWidth:410 }}>
          <div style={{ textAlign:"center", marginBottom:22 }}>
            <img src={LOGO_SRC} alt="EscaraPay" style={{ height:52, marginBottom:12, objectFit:"contain" }}
              onError={e => e.target.style.display="none"} />
            <h2 className="syne" style={{ fontWeight:800, fontSize:21, marginBottom:4 }}>
              {mode==="login" ? "Welcome Back!" : `${type==="seller"?"Seller":"Buyer"} Register Karo`}
            </h2>
            <p style={{ color:"var(--muted)", fontSize:13 }}>
              {type==="seller" ? "Orders ko secure karo" : "Bina risk ke shopping karo"}
            </p>
          </div>
          <div style={{ display:"flex", gap:5, marginBottom:20, background:"var(--sf2)", padding:4, borderRadius:10 }}>
            {["login","register"].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex:1, padding:"8px", border:"none", borderRadius:8, cursor:"pointer",
                background: mode===m ? "var(--gold)" : "transparent",
                color: mode===m ? (dark?"#0a0a0f":"#fff") : "var(--muted)",
                fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:13, transition:"all .2s"
              }}>{m==="login"?"Login":"Register"}</button>
            ))}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {mode==="register" && <div><label className="label">Full Name</label><input className="input" placeholder="Meena Devi" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>}
            {mode==="register"&&type==="seller" && <div><label className="label">Shop / Brand Name</label><input className="input" placeholder="Meena Crafts" value={form.shop} onChange={e=>setForm({...form,shop:e.target.value})} /></div>}
            <div><label className="label">Mobile / Email</label><input className="input" placeholder="9876543210" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
            <div><label className="label">Password</label><input className="input" type="password" placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /></div>
            {mode==="register" && <div><label className="label">UPI ID (payouts ke liye)</label><input className="input" placeholder="yourname@upi" /></div>}
            <button className="btn-gold" style={{ width:"100%", padding:12 }} onClick={handle}>
              {loading ? "⏳ Processing..." : mode==="login" ? "Login Karo" : "Account Banao"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════ SELLER DASHBOARD ══════════ */
function SellerDB({ user, onLogout, dark, onToggle }) {
  const [page, setPage] = useState("dashboard");
  const [orders, setOrders] = useState(SELLER_ORDERS);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [showOrder, setShowOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({ product:"", amount:"", buyer_name:"", buyer_phone:"", token_pct:"10" });
  const [createdLink, setCreatedLink] = useState(null);

  const stats = {
    total:  orders.length,
    active: orders.filter(o => ["token_paid","dispatched"].includes(o.status)).length,
    earned: orders.filter(o => o.status==="delivered").reduce((a,o) => a+o.token, 0),
    saved:  orders.filter(o => o.status==="cancelled_buyer").reduce((a,o) => a+o.token, 0),
  };

  const tokenPreview = newOrder.amount ? calcToken(newOrder.amount, newOrder.token_pct) : 0;
  const rawToken     = newOrder.amount ? Math.round(Number(newOrder.amount)*Number(newOrder.token_pct)/100) : 0;
  const minApplied   = newOrder.amount && rawToken < MIN_TOKEN;

  const filteredOrders = filterStatus === "all" ? orders : orders.filter(o => o.status === filterStatus);

  const createOrder = () => {
    const token = calcToken(newOrder.amount, newOrder.token_pct);
    const id = `EP${Math.floor(Math.random()*900)+100}`;
    const o = { id, buyer:newOrder.buyer_name||"Buyer", product:newOrder.product, amount:Number(newOrder.amount), token, status:"pending", date:new Date().toISOString().split("T")[0], tracking:"" };
    setOrders([o, ...orders]);
    setCreatedLink(`https://escarapay.in/pay/${id}?token=${token}`);
    setNewOrder({ product:"", amount:"", buyer_name:"", buyer_phone:"", token_pct:"10" });
  };

  const markDispatched = (id, tracking) => {
    setOrders(orders.map(o => o.id===id ? {...o, status:"dispatched", tracking} : o));
    setShowOrder(null);
  };

  const nav = [
    { id:"dashboard", icon:"📊", label:"Dashboard" },
    { id:"orders",    icon:"📦", label:"Orders" },
    { id:"analytics", icon:"📈", label:"Analytics" },
    { id:"payments",  icon:"💰", label:"Payments" },
    { id:"settings",  icon:"⚙️", label:"Settings" },
  ];

  return (
    <div style={{ minHeight:"100vh" }}>
      <nav className="nav">
        <Logo />
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <span className="badge bg hide-m">● Live</span>
          <div className="avatar">{user[0]}</div>
          <span className="hide-m" style={{ fontSize:13, fontWeight:500 }}>{user}</span>
          <button className="btn-ghost" onClick={onLogout}>Logout</button>
        </div>
      </nav>

      <div className="sidebar">
        <div style={{ marginBottom:16, padding:"0 8px" }}>
          <div style={{ fontSize:10, color:"var(--muted)", fontWeight:700, textTransform:"uppercase", letterSpacing:".6px" }}>Seller Panel</div>
        </div>
        {nav.map(n => (
          <div key={n.id} className={`si ${page===n.id?"active":""}`} onClick={() => setPage(n.id)}>
            <span>{n.icon}</span><span>{n.label}</span>
          </div>
        ))}
        <div style={{ marginTop:"auto", paddingTop:16 }}>
          <div className="card" style={{ padding:14, background:"rgba(14,165,233,.08)", borderColor:"rgba(14,165,233,.2)" }}>
            <div style={{ fontSize:11, color:"var(--gold)", fontWeight:700, marginBottom:4 }}>Free Plan</div>
            <div style={{ fontSize:12, color:"var(--muted)", marginBottom:10 }}>5 orders/month free</div>
            <button className="btn-gold" style={{ width:"100%", padding:"8px", fontSize:12 }}>Upgrade Pro →</button>
          </div>
        </div>
      </div>

      <div className="main">

        {/* ── DASHBOARD ── */}
        {page==="dashboard" && (
          <div className="fu">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22, flexWrap:"wrap", gap:10 }}>
              <div>
                <h1 className="syne" style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:800 }}>Namaste, {user}! 👋</h1>
                <p style={{ color:"var(--muted)", marginTop:3, fontSize:13 }}>Aaj ka overview</p>
              </div>
              <button className="btn-gold" onClick={() => setShowCreate(true)}>+ New Order Link</button>
            </div>

            <div className="g4" style={{ marginBottom:18 }}>
              {[
                { label:"Total Orders",   value:stats.total,        icon:"📦", color:"var(--gold)"   },
                { label:"Active Escrows", value:stats.active,       icon:"🔐", color:"var(--blue)"   },
                { label:"Token Earned",   value:`₹${stats.earned}`, icon:"💰", color:"var(--green)"  },
                { label:"RTO Saved",      value:`₹${stats.saved}`,  icon:"🛡️", color:"var(--accent)" },
              ].map(s => (
                <div key={s.label} className="stat-card">
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div>
                      <div style={{ fontSize:11, color:"var(--muted)", marginBottom:6 }}>{s.label}</div>
                      <div className="syne" style={{ fontSize:24, fontWeight:800, color:s.color }}>{s.value}</div>
                    </div>
                    <span style={{ fontSize:20 }}>{s.icon}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ overflowX:"auto" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <h3 className="syne" style={{ fontWeight:700, fontSize:16 }}>Recent Orders</h3>
                <button className="btn-ghost" style={{ padding:"5px 12px", fontSize:12 }} onClick={() => setPage("orders")}>View All →</button>
              </div>
              <table className="tbl">
                <thead><tr><th>ID</th><th>Buyer</th><th>Product</th><th>Amount</th><th>Token</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {orders.slice(0,5).map(o => (
                    <tr key={o.id}>
                      <td><span style={{ fontFamily:"monospace", color:"var(--gold)", fontSize:12 }}>{o.id}</span></td>
                      <td>{o.buyer}</td>
                      <td style={{ color:"var(--muted)" }}>{o.product}</td>
                      <td style={{ fontWeight:600 }}>₹{o.amount}</td>
                      <td style={{ color:"var(--green)", fontWeight:600 }}>₹{o.token}</td>
                      <td><Bdg status={o.status} /></td>
                      <td><button className="btn-ghost" style={{ padding:"4px 10px", fontSize:12 }} onClick={() => setShowOrder(o)}>Manage</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ORDERS ── */}
        {page==="orders" && (
          <div className="fu">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18, flexWrap:"wrap", gap:10 }}>
              <h1 className="syne" style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:800 }}>All Orders</h1>
              <button className="btn-gold" onClick={() => setShowCreate(true)}>+ New Order Link</button>
            </div>

            {/* Status filter chips */}
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:18 }}>
              <div className={`chip ${filterStatus==="all"?"active":""}`} onClick={() => setFilterStatus("all")}>
                All ({orders.length})
              </div>
              {Object.entries(STATUS_META).map(([key, val]) => {
                const count = orders.filter(o => o.status===key).length;
                if (!count) return null;
                return (
                  <div key={key} className={`chip ${filterStatus===key?"active":""}`} onClick={() => setFilterStatus(key)}>
                    {val.icon} {val.label} ({count})
                  </div>
                );
              })}
            </div>

            <div className="card" style={{ padding:0, overflowX:"auto" }}>
              <table className="tbl">
                <thead><tr><th>Order ID</th><th>Date</th><th>Buyer</th><th>Product</th><th>Amount</th><th>Token</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr><td colSpan={8} style={{ textAlign:"center", color:"var(--muted)", padding:30 }}>Is status mein koi order nahi hai</td></tr>
                  ) : filteredOrders.map(o => (
                    <tr key={o.id}>
                      <td><span style={{ fontFamily:"monospace", color:"var(--gold)", fontSize:12 }}>{o.id}</span></td>
                      <td style={{ color:"var(--muted)", fontSize:12 }}>{o.date}</td>
                      <td>{o.buyer}</td>
                      <td style={{ color:"var(--muted)" }}>{o.product}</td>
                      <td style={{ fontWeight:600 }}>₹{o.amount}</td>
                      <td style={{ color:"var(--green)", fontWeight:600 }}>₹{o.token}</td>
                      <td><Bdg status={o.status} /></td>
                      <td><button className="btn-ghost" style={{ padding:"4px 10px", fontSize:12 }} onClick={() => setShowOrder(o)}>Manage</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ANALYTICS ── */}
        {page==="analytics" && (
          <div className="fu">
            <h1 className="syne" style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:800, marginBottom:22 }}>Analytics</h1>
            <div className="g2" style={{ marginBottom:18 }}>
              <div className="card">
                <h3 className="syne" style={{ fontWeight:700, marginBottom:16, fontSize:15 }}>Order Status Breakdown</h3>
                {Object.entries(STATUS_META).map(([key, val]) => {
                  const count = orders.filter(o => o.status===key).length;
                  const pct   = Math.round((count/orders.length)*100);
                  if (!count) return null;
                  return (
                    <div key={key} style={{ marginBottom:13 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                        <span style={{ fontSize:12 }}>{val.icon} {val.label}</span>
                        <span style={{ fontSize:12, color:"var(--muted)" }}>{count} ({pct}%)</span>
                      </div>
                      <div className="pbar"><div className="pfill" style={{ width:`${pct}%` }} /></div>
                    </div>
                  );
                })}
              </div>
              <div className="card">
                <h3 className="syne" style={{ fontWeight:700, marginBottom:16, fontSize:15 }}>Revenue Summary</h3>
                {[
                  ["Total GMV",             `₹${orders.reduce((a,o)=>a+o.amount,0).toLocaleString()}`],
                  ["Token Collected",       `₹${orders.reduce((a,o)=>a+o.token,0).toLocaleString()}`],
                  ["Shipping Loss Saved",   `₹${orders.filter(o=>o.status==="cancelled_buyer").reduce((a,o)=>a+o.token,0)}`],
                  ["EscaraPay Fee (1.5%)",  `₹${Math.round(orders.reduce((a,o)=>a+o.amount,0)*0.015)}`],
                  ["Net Delivered Revenue", `₹${orders.filter(o=>o.status==="delivered").reduce((a,o)=>a+o.amount,0).toLocaleString()}`],
                ].map(([l,v]) => (
                  <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid var(--border)" }}>
                    <span style={{ color:"var(--muted)", fontSize:13 }}>{l}</span>
                    <span className="syne" style={{ fontWeight:700, color:"var(--gold)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h3 className="syne" style={{ fontWeight:700, marginBottom:14, fontSize:15 }}>RTO Rate — Before vs After EscaraPay</h3>
              <div className="g3">
                {[
                  { label:"Industry Avg RTO", value:"35%", color:"var(--red)"   },
                  { label:"Aapka RTO Rate",   value:"8%",  color:"var(--green)" },
                  { label:"RTO Reduction",    value:"-77%",color:"var(--gold)"  },
                ].map(i => (
                  <div key={i.label} style={{ textAlign:"center", padding:18, background:"var(--sf2)", borderRadius:12 }}>
                    <div className="syne" style={{ fontSize:30, fontWeight:800, color:i.color }}>{i.value}</div>
                    <div style={{ fontSize:12, color:"var(--muted)", marginTop:5 }}>{i.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PAYMENTS ── */}
        {page==="payments" && (
          <div className="fu">
            <h1 className="syne" style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:800, marginBottom:22 }}>Payments & Payouts</h1>
            <div className="g2" style={{ marginBottom:18 }}>
              <div className="card" style={{ background:"rgba(5,150,105,.05)", borderColor:"rgba(5,150,105,.22)" }}>
                <div style={{ fontSize:12, color:"var(--muted)", marginBottom:5 }}>Available Balance</div>
                <div className="syne" style={{ fontSize:34, fontWeight:800, color:"var(--green)" }}>₹2,840</div>
                <div style={{ fontSize:12, color:"var(--muted)", marginTop:4, marginBottom:14 }}>Next payout: Tomorrow</div>
                <button className="btn-gold" style={{ width:"100%" }}>Withdraw to Bank</button>
              </div>
              <div className="card">
                <div style={{ fontSize:12, color:"var(--muted)", marginBottom:5 }}>Linked Account</div>
                <div style={{ fontWeight:600, marginBottom:4 }}>HDFC Bank ****4521</div>
                <div style={{ fontSize:13, color:"var(--muted)" }}>meena@upi &nbsp;•&nbsp; Verified ✅</div>
                <div className="divider" />
                <div style={{ fontSize:12, color:"var(--muted)", marginBottom:4 }}>In Escrow (locked)</div>
                <div className="syne" style={{ fontWeight:800, fontSize:20, color:"var(--gold)" }}>₹650</div>
                <button className="btn-ghost" style={{ marginTop:12 }}>Change Account</button>
              </div>
            </div>
            <div className="card" style={{ overflowX:"auto" }}>
              <h3 className="syne" style={{ fontWeight:700, marginBottom:16, fontSize:15 }}>Transaction History</h3>
              <table className="tbl">
                <thead><tr><th>Order</th><th>Type</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>
                  {[
                    { id:"EP002",type:"Token Released",    amt:350, status:"Credited",date:"Jan 12" },
                    { id:"EP004",type:"Cancellation Token",amt:200, status:"Credited",date:"Jan 10" },
                    { id:"EP001",type:"Token Held",        amt:200, status:"Escrow",  date:"Jan 15" },
                    { id:"EP003",type:"Token Held",        amt:300, status:"Escrow",  date:"Jan 14" },
                    { id:"EP006",type:"Token Held",        amt:220, status:"Escrow",  date:"Jan 17" },
                  ].map(t => (
                    <tr key={`${t.id}-${t.type}`}>
                      <td style={{ fontFamily:"monospace", color:"var(--gold)", fontSize:12 }}>{t.id}</td>
                      <td style={{ fontSize:13 }}>{t.type}</td>
                      <td style={{ color:t.status==="Credited"?"var(--green)":"var(--gold)", fontWeight:600 }}>
                        {t.status==="Credited" ? "+" : "⏳ "}₹{t.amt}
                      </td>
                      <td><span className={`badge ${t.status==="Credited"?"bg":"bo"}`}>{t.status}</span></td>
                      <td style={{ color:"var(--muted)", fontSize:12 }}>{t.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── SETTINGS ── */}
        {page==="settings" && (
          <div className="fu">
            <h1 className="syne" style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:800, marginBottom:22 }}>Settings</h1>
            <div className="g2">
              <div className="card">
                <h3 className="syne" style={{ fontWeight:700, marginBottom:16, fontSize:15 }}>Profile</h3>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  <div><label className="label">Shop / Brand Name</label><input className="input" defaultValue={user} /></div>
                  <div><label className="label">Phone Number</label><input className="input" defaultValue="9876543210" /></div>
                  <div><label className="label">UPI ID (for payouts)</label><input className="input" defaultValue="meena@paytm" /></div>
                  <div>
                    <label className="label">Default Token % (minimum ₹200 hamesha lagu)</label>
                    <select className="select">
                      <option value="5">5% (min ₹200)</option>
                      <option value="10" selected>10% (min ₹200)</option>
                      <option value="15">15% (min ₹200)</option>
                      <option value="20">20% (min ₹200)</option>
                    </select>
                  </div>
                  <button className="btn-gold">Save Changes</button>
                </div>
              </div>
              <div className="card">
                <h3 className="syne" style={{ fontWeight:700, marginBottom:16, fontSize:15 }}>Notifications</h3>
                {["WhatsApp Alert on Token Pay","SMS on Dispute Raised","Email on Payout","Daily Summary Report","New Order Notification"].map(n => (
                  <div key={n} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 0", borderBottom:"1px solid var(--border)" }}>
                    <span style={{ fontSize:13 }}>{n}</span>
                    <div style={{ width:38, height:20, borderRadius:10, background:"var(--gold)", cursor:"pointer", position:"relative" }}>
                      <div style={{ width:16, height:16, borderRadius:8, background:"white", position:"absolute", top:2, right:2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CREATE ORDER MODAL */}
      {showCreate && (
        <div className="overlay" onClick={() => { if (!createdLink) setShowCreate(false); }}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            {!createdLink ? (
              <>
                <h3 className="syne" style={{ fontWeight:800, fontSize:20, marginBottom:4 }}>New Escrow Order</h3>
                <p style={{ color:"var(--muted)", fontSize:13, marginBottom:20 }}>Buyer ke liye secure payment link banao</p>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  <div>
                    <label className="label">Product Name *</label>
                    <input className="input" placeholder="Handmade Bag" value={newOrder.product} onChange={e=>setNewOrder({...newOrder,product:e.target.value})} />
                  </div>
                  <div className="g2">
                    <div>
                      <label className="label">Order Amount (₹) *</label>
                      <input className="input" type="number" placeholder="1500" value={newOrder.amount} onChange={e=>setNewOrder({...newOrder,amount:e.target.value})} />
                    </div>
                    <div>
                      <label className="label">Token %</label>
                      <select className="select" value={newOrder.token_pct} onChange={e=>setNewOrder({...newOrder,token_pct:e.target.value})}>
                        <option value="5">5%</option>
                        <option value="10">10%</option>
                        <option value="15">15%</option>
                        <option value="20">20%</option>
                      </select>
                    </div>
                  </div>

                  {newOrder.amount && (
                    <div style={{ background:"rgba(14,165,233,.1)", border:"1px solid rgba(14,165,233,.25)", borderRadius:10, padding:14 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:minApplied?6:0 }}>
                        <div>
                          <div style={{ fontSize:11, color:"var(--muted)", marginBottom:2 }}>Buyer Bharenga (Token)</div>
                          <div className="syne" style={{ fontSize:24, fontWeight:800, color:"var(--gold)" }}>₹{tokenPreview}</div>
                        </div>
                        {minApplied && <span className="badge bo" style={{ fontSize:11 }}>⚡ Min ₹200 Applied</span>}
                      </div>
                      {minApplied && (
                        <div style={{ fontSize:11, color:"var(--muted)" }}>
                          {newOrder.token_pct}% of ₹{newOrder.amount} = ₹{rawToken} → Minimum ₹200 lagu hoga
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="label">Buyer Name</label>
                    <input className="input" placeholder="Rahul Sharma" value={newOrder.buyer_name} onChange={e=>setNewOrder({...newOrder,buyer_name:e.target.value})} />
                  </div>
                  <div>
                    <label className="label">Buyer WhatsApp Number</label>
                    <input className="input" placeholder="9876543210" value={newOrder.buyer_phone} onChange={e=>setNewOrder({...newOrder,buyer_phone:e.target.value})} />
                  </div>
                  <div style={{ display:"flex", gap:10 }}>
                    <button className="btn-ghost" style={{ flex:1 }} onClick={() => setShowCreate(false)}>Cancel</button>
                    <button className="btn-gold" style={{ flex:2 }} onClick={createOrder} disabled={!newOrder.product||!newOrder.amount}>
                      🔗 Generate Secure Link
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:46, marginBottom:12 }}>🎉</div>
                <h3 className="syne" style={{ fontWeight:800, fontSize:21, marginBottom:8 }}>Order Link Ready!</h3>
                <p style={{ color:"var(--muted)", fontSize:13, marginBottom:16 }}>Ye link buyer ko WhatsApp par bhejo</p>
                <div style={{ background:"var(--sf2)", borderRadius:10, padding:12, marginBottom:14, border:"1px solid var(--border)", wordBreak:"break-all" }}>
                  <code style={{ fontSize:12, color:"var(--gold)" }}>{createdLink}</code>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button className="btn-ghost" style={{ flex:1 }} onClick={() => navigator.clipboard?.writeText(createdLink)}>📋 Copy Link</button>
                  <button className="btn-gold" style={{ flex:1 }} onClick={() => { setCreatedLink(null); setShowCreate(false); }}>Done ✓</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showOrder && <OrderModal order={showOrder} isSeller onClose={() => setShowOrder(null)} onDispatch={markDispatched} dark={dark} />}
    </div>
  );
}

/* ══════════ BUYER DASHBOARD ══════════ */
function BuyerDB({ user, onLogout, dark, onToggle }) {
  const [page, setPage] = useState("orders");
  const [orders] = useState(BUYER_ORDERS);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showOrder, setShowOrder] = useState(null);
  const [showPay, setShowPay] = useState(null);
  const [paidOrders, setPaidOrders] = useState([]);
  const [payStep, setPayStep] = useState(0);

  const handlePay = async (order) => {
    setPayStep(1); await new Promise(r => setTimeout(r, 1800));
    setPayStep(2); await new Promise(r => setTimeout(r, 1400));
    setPayStep(3); setPaidOrders(p => [...p, order.id]);
    await new Promise(r => setTimeout(r, 1600));
    setShowPay(null); setPayStep(0);
  };

  const effectiveOrders = orders.map(o => ({
    ...o,
    status: paidOrders.includes(o.id) ? "token_paid" : o.status
  }));
  const filteredOrders = filterStatus === "all" ? effectiveOrders : effectiveOrders.filter(o => o.status === filterStatus);

  const nav = [
    { id:"orders",    icon:"📦", label:"My Orders" },
    { id:"pay_order", icon:"🔗", label:"Pay via Link" },
    { id:"help",      icon:"❓", label:"Help & Safety" },
  ];

  return (
    <div style={{ minHeight:"100vh" }}>
      <nav className="nav">
        <Logo />
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <div className="avatar" style={{ background:"linear-gradient(135deg,var(--blue),var(--accent))" }}>{user[0]}</div>
          <span className="hide-m" style={{ fontSize:13, fontWeight:500 }}>{user}</span>
          <button className="btn-ghost" onClick={onLogout}>Logout</button>
        </div>
      </nav>

      <div className="sidebar">
        <div style={{ marginBottom:16, padding:"0 8px" }}>
          <div style={{ fontSize:10, color:"var(--muted)", fontWeight:700, textTransform:"uppercase", letterSpacing:".6px" }}>Buyer Panel</div>
        </div>
        {nav.map(n => (
          <div key={n.id} className={`si ${page===n.id?"active":""}`} onClick={() => setPage(n.id)}>
            <span>{n.icon}</span><span>{n.label}</span>
          </div>
        ))}
      </div>

      <div className="main">

        {/* ORDERS */}
        {page==="orders" && (
          <div className="fu">
            <h1 className="syne" style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:800, marginBottom:18 }}>My Orders</h1>

            {/* Filter chips */}
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:18 }}>
              <div className={`chip ${filterStatus==="all"?"active":""}`} onClick={() => setFilterStatus("all")}>
                All ({effectiveOrders.length})
              </div>
              {Object.entries(STATUS_META).map(([key, val]) => {
                const count = effectiveOrders.filter(o => o.status===key).length;
                if (!count) return null;
                return (
                  <div key={key} className={`chip ${filterStatus===key?"active":""}`} onClick={() => setFilterStatus(key)}>
                    {val.icon} {val.label} ({count})
                  </div>
                );
              })}
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {filteredOrders.map(o => (
                <div key={o.id} className="card" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
                  <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                    <div style={{ width:44, height:44, borderRadius:11, background:"var(--sf2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>🛍️</div>
                    <div>
                      <div style={{ fontWeight:600, marginBottom:2, fontSize:14 }}>{o.product}</div>
                      <div style={{ fontSize:12, color:"var(--muted)" }}>Seller: {o.seller} &nbsp;•&nbsp; {o.date}</div>
                      <div style={{ fontSize:12, marginTop:2 }}>₹{o.amount} &nbsp;|&nbsp; Token: <span style={{ color:"var(--gold)", fontWeight:600 }}>₹{o.token}</span></div>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
                    <Bdg status={o.status} />
                    {o.status==="pending" && (
                      <button className="btn-gold" style={{ padding:"7px 14px", fontSize:13 }} onClick={() => setShowPay(orders.find(x=>x.id===o.id))}>
                        💳 Pay ₹{o.token}
                      </button>
                    )}
                    <button className="btn-ghost" style={{ padding:"6px 12px", fontSize:12 }} onClick={() => setShowOrder(o)}>View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAY VIA LINK */}
        {page==="pay_order" && (
          <div className="fu" style={{ maxWidth:480 }}>
            <h1 className="syne" style={{ fontSize:"clamp(18px,3vw,24px)", fontWeight:800, marginBottom:8 }}>Order Link se Pay Karo</h1>
            <p style={{ color:"var(--muted)", marginBottom:20, fontSize:13 }}>Seller ne jo link WhatsApp pe bheja hai, woh paste karo</p>
            <div className="card">
              <label className="label">Order Link Paste Karo</label>
              <input className="input" placeholder="https://escarapay.in/pay/EP..." style={{ marginBottom:12 }} />
              <button className="btn-gold" style={{ width:"100%" }}>🔍 Order Details Dekho</button>
            </div>
            <div className="card" style={{ marginTop:12 }}>
              <h4 style={{ fontWeight:600, marginBottom:10, fontSize:14 }}>🛡️ Safety Guarantee</h4>
              {[
                "Token tab tak seller ko nahi milega jab tak dispatch nahi hoga",
                "Order nahi aaya? Poora ₹200+ token wapas milega",
                "Fraud? Hum 24 ghante mein investigate karenge",
                "Galat product mila? 48 hours mein dispute raise karo",
              ].map(t => (
                <div key={t} style={{ display:"flex", gap:8, fontSize:13, color:"var(--muted)", marginBottom:7 }}>
                  <span style={{ color:"var(--green)", flexShrink:0 }}>✓</span><span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HELP */}
        {page==="help" && (
          <div className="fu" style={{ maxWidth:560 }}>
            <h1 className="syne" style={{ fontSize:"clamp(18px,3vw,24px)", fontWeight:800, marginBottom:22 }}>Help & Safety</h1>
            {[
              { q:"Minimum ₹200 token kyu bharna padta hai?",  a:"₹200 token seller ke courier/shipping charge cover karta hai. Agar aap cancel karo toh seller ka shipping loss nahi hoga — fair deal dono ke liye." },
              { q:"Token pay karna safe hai kya?",             a:"Haan! Aapka token EscaraPay ke escrow account mein safe rehta hai — seller ke account mein kabhi nahi jata jab tak delivery confirm na ho." },
              { q:"Seller ne dispatch nahi kiya toh?",         a:"Delivery date ke baad 'Raise Dispute' button press karo. Hamari team 24 ghante mein investigate karegi aur token fully refund kar degi." },
              { q:"Seller ne galat product bheja?",            a:"Delivery ke baad 48 hours ke andar dispute raise karo. Photo/video proof ke saath — hum fairly mediate karenge." },
              { q:"Token release kab hoga seller ko?",         a:"Sirf tab jab aap 'Delivery Confirm' karo ya delivery date ke 5 din baad auto-release hoga (agar aap response nahi karte)." },
            ].map(({ q, a }) => (
              <div key={q} className="card" style={{ marginBottom:10 }}>
                <div style={{ fontWeight:600, marginBottom:6, color:"var(--gold)", fontSize:13 }}>❓ {q}</div>
                <div style={{ fontSize:13, color:"var(--muted)", lineHeight:1.7 }}>{a}</div>
              </div>
            ))}
            <div className="card" style={{ background:"rgba(5,150,105,.08)", borderColor:"rgba(5,150,105,.2)", textAlign:"center" }}>
              <img src={LOGO_SRC} alt="EscaraPay" style={{ height:36, marginBottom:10, objectFit:"contain" }} onError={e=>e.target.style.display="none"} />
              <div style={{ fontWeight:600, marginBottom:5, fontSize:14 }}>Support Chahiye?</div>
              <div style={{ color:"var(--muted)", fontSize:13, marginBottom:12 }}>
                📧 support@escarapay.in<br />📱 WhatsApp: +91-90000-ESCARA
              </div>
              <button className="btn-gold">WhatsApp par Contact Karo</button>
            </div>
          </div>
        )}
      </div>

      {showOrder && <OrderModal order={showOrder} isSeller={false} onClose={() => setShowOrder(null)} dark={dark} />}

      {/* PAYMENT MODAL */}
      {showPay && (
        <div className="overlay">
          <div className="modal" style={{ textAlign:"center" }}>
            {payStep===0 && (
              <>
                <img src={LOGO_SRC} alt="" style={{ height:44, marginBottom:12, objectFit:"contain" }} onError={e=>e.target.style.display="none"} />
                <h3 className="syne" style={{ fontWeight:800, fontSize:20, marginBottom:8 }}>Secure Token Payment</h3>
                <p style={{ color:"var(--muted)", marginBottom:16, fontSize:13 }}>Ye amount escrow mein lock hoga — seller ko tab tak nahi milega jab tak deliver na ho</p>
                <div style={{ background:"rgba(14,165,233,.1)", border:"1px solid rgba(14,165,233,.3)", borderRadius:12, padding:18, marginBottom:18 }}>
                  <div style={{ fontSize:12, color:"var(--muted)", marginBottom:3 }}>{showPay.product}</div>
                  <div className="syne" style={{ fontSize:34, fontWeight:800, color:"var(--gold)" }}>₹{showPay.token}</div>
                  <div style={{ fontSize:11, color:"var(--muted)", marginTop:3 }}>Minimum ₹200 Token — Escrow Protected 🔐</div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:12 }}>
                  {[
                    { label:"⚡ UPI (GPay / PhonePe / Paytm)", recommended:true },
                    { label:"💳 Debit / Credit Card" },
                    { label:"🏦 Net Banking" },
                  ].map(m => (
                    <div key={m.label} onClick={() => handlePay(showPay)}
                      style={{ padding:12, background:"var(--sf2)", borderRadius:10, border:`1px solid ${m.recommended?"var(--gold)":"var(--border)"}`, cursor:"pointer", fontSize:13, fontWeight:500, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <span>{m.label}</span>
                      {m.recommended && <span className="badge bo" style={{ fontSize:10 }}>Recommended</span>}
                    </div>
                  ))}
                </div>
                <button className="btn-ghost" style={{ width:"100%" }} onClick={() => setShowPay(null)}>Cancel</button>
              </>
            )}
            {payStep===1 && (
              <>
                <div style={{ width:44, height:44, border:"3px solid var(--gold)", borderTopColor:"transparent", borderRadius:"50%", animation:"spin .8s linear infinite", margin:"0 auto 16px" }} />
                <div className="syne" style={{ fontWeight:700, fontSize:16 }}>Payment Processing...</div>
                <div style={{ color:"var(--muted)", marginTop:5, fontSize:13 }}>Razorpay secure gateway se connect ho raha hai</div>
              </>
            )}
            {payStep===2 && (
              <>
                <div style={{ width:44, height:44, border:"3px solid var(--green)", borderTopColor:"transparent", borderRadius:"50%", animation:"spin .8s linear infinite", margin:"0 auto 16px" }} />
                <div className="syne" style={{ fontWeight:700, fontSize:16 }}>Escrow mein Lock ho raha hai...</div>
                <div style={{ color:"var(--muted)", marginTop:5, fontSize:13 }}>Secure vault mein transfer</div>
              </>
            )}
            {payStep===3 && (
              <>
                <div style={{ fontSize:52, marginBottom:12 }}>🎉</div>
                <div className="syne" style={{ fontWeight:800, fontSize:21, color:"var(--green)", marginBottom:8 }}>Token Secured!</div>
                <div style={{ color:"var(--muted)", fontSize:13 }}>Seller ko sirf dispatch ke baad release hoga ✅</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════ MAIN APP ══════════ */
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState("");
  const [dark, setDark] = useState(true);

  const props = { dark, onToggle: () => setDark(d => !d) };

  return (
    <>
      <style>{getStyle(dark)}</style>
      {screen==="landing"                        && <Landing  onEnter={t => { setUserType(t); setScreen("auth"); }} {...props} />}
      {screen==="auth"                           && <Auth     type={userType} onLogin={(t,n) => { setUserType(t); setUserName(n); setScreen("dashboard"); }} onBack={() => setScreen("landing")} {...props} />}
      {screen==="dashboard" && userType==="seller" && <SellerDB user={userName||"Meena Crafts"} onLogout={() => { setScreen("landing"); setUserType(null); }} {...props} />}
      {screen==="dashboard" && userType==="buyer"  && <BuyerDB  user={userName||"Rahul Sharma"}  onLogout={() => { setScreen("landing"); setUserType(null); }} {...props} />}
    </>
  );
}   