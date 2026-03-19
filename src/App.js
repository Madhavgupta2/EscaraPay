import { registerUser, loginUser, createOrder as apiCreateOrder, getSellerOrders, getBuyerOrders, getOrderById, createPaymentOrder, verifyPayment, confirmDelivery, raiseDispute, dispatchOrder } from './api';
import { useState, useEffect } from "react";
import LOGO_SRC from "./escarapay-logo.jpg";

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
  .nav{position:sticky;top:0;z-index:100;background:${dark?"rgba(10,10,15,.9)":"rgba(240,247,255,.93)"};backdrop-filter:blur(22px);border-bottom:1px solid var(--border);padding:0 22px;height:62px;display:flex;align-items:center;justify-content:space-between;gap:10px;}
  .logo-img{height:36px;width:auto;object-fit:contain;flex-shrink:0;}
  .logo-wrap{display:flex;align-items:center;gap:8px;cursor:pointer;flex-shrink:0;}
  .logo-name{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;background:linear-gradient(135deg,var(--gold),var(--gold2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .toggle-btn{display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:20px;border:1px solid var(--border);background:var(--sf2);cursor:pointer;font-size:13px;color:var(--muted);transition:all .2s;flex-shrink:0;}
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
  .copy-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--green);color:#fff;padding:10px 22px;border-radius:10px;font-size:13px;font-weight:600;z-index:999;animation:fadeUp .3s ease;}
  @media(max-width:1024px){.g4{grid-template-columns:1fr 1fr;}}
  @media(max-width:800px){.g3{grid-template-columns:1fr 1fr;}}
  @media(max-width:640px){.sidebar{display:none;}.main{margin-left:0;padding:14px;}.g2,.g3,.g4{grid-template-columns:1fr;}.nav{padding:0 12px;}.hide-m{display:none;}}
  `;
}

const MIN_TOKEN = 200;
const calcToken = (amount, pct) => Math.max(MIN_TOKEN, Math.round(Number(amount)*Number(pct)/100));
const BASE_URL = "http://localhost:3000";

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

function Bdg({ status }) {
  const s = STATUS_META[status] || STATUS_META.pending;
  return <span className={`badge ${s.cls}`}>{s.icon} {s.label}</span>;
}

/* ══════════ DIRECT PAYMENT PAGE (/pay/ORDERID) ══════════ */
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

          {payStep===3 && <div className="card fu" style={{textAlign:"center",padding:40}}>
            <div style={{fontSize:60,marginBottom:16}}>🎉</div>
            <div className="syne" style={{fontWeight:800,fontSize:24,color:"var(--green)",marginBottom:8}}>Token Secured!</div>
            <div style={{color:"var(--muted)",fontSize:14,marginBottom:6}}>₹{order?.token_amount} escrow mein lock ho gaya</div>
            <div style={{color:"var(--muted)",fontSize:13,marginBottom:20,lineHeight:1.7}}>Seller dispatch karega → tracking ID milega.<br/>Token delivery ke 7 din baad seller ko release hoga.</div>
            <div style={{background:"rgba(14,165,233,.1)",border:"1px solid rgba(14,165,233,.2)",borderRadius:12,padding:14,marginBottom:16}}>
              <div style={{fontSize:11,color:"var(--muted)",marginBottom:4}}>Order ID save karo:</div>
              <div style={{fontFamily:"monospace",fontWeight:700,color:"var(--gold)",fontSize:16}}>{order?.id}</div>
            </div>
            <button className="btn-ghost" onClick={onGoHome}>← Home pe Jao</button>
          </div>}

          {payStep===2 && <div className="card" style={{textAlign:"center",padding:50}}><div style={{width:44,height:44,border:"3px solid var(--green)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}} /><div className="syne" style={{fontWeight:700,fontSize:16}}>Payment Verify ho rahi hai...</div></div>}

          {payStep===1 && <div className="card" style={{textAlign:"center",padding:50}}><div style={{width:44,height:44,border:"3px solid var(--gold)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}} /><div className="syne" style={{fontWeight:700,fontSize:16}}>Payment Gateway Load ho raha hai...</div></div>}

          {order && !loading && payStep===0 && (
            order.status !== "pending" ? (
              <div className="card" style={{textAlign:"center",padding:40}}>
                <div style={{fontSize:44,marginBottom:12}}>{order.status==="token_paid"?"🔐":order.status==="delivered"?"✅":"📦"}</div>
                <div className="syne" style={{fontWeight:800,fontSize:20,marginBottom:10}}>
                  {order.status==="token_paid"?"Token Already Paid!":order.status==="delivered"?"Order Delivered!":"Order Processed"}
                </div>
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
                    <div style={{fontSize:13,color:"var(--muted)",marginTop:4}}>Seller: <strong style={{color:"var(--text)"}}>{order.seller_name||order.seller_name_manual||"—"}</strong></div>
                  </div>

                  <div className="g2" style={{marginBottom:14}}>
                    <div style={{background:"var(--sf2)",borderRadius:10,padding:12,textAlign:"center"}}>
                      <div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Order Value</div>
                      <div className="syne" style={{fontWeight:800,fontSize:22}}>₹{order.order_amount}</div>
                    </div>
                    <div style={{background:"rgba(14,165,233,.15)",border:"1px solid rgba(14,165,233,.3)",borderRadius:10,padding:12,textAlign:"center"}}>
                      <div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Aap Bharenge</div>
                      <div className="syne" style={{fontWeight:800,fontSize:22,color:"var(--gold)"}}>₹{order.buyer_pays||order.token_amount}</div>
                    </div>
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
                    {["Token seller ko tab tak nahi milega jab tak deliver na ho","Order nahi aaya? Token wapas milega","Delivery ke 7 din mein dispute raise kar sakte ho","Team 24 ghante mein help karegi"].map(t=>(
                      <div key={t} style={{display:"flex",gap:7,fontSize:12,color:"var(--muted)",marginBottom:4}}><span style={{color:"var(--green)"}}>✓</span><span>{t}</span></div>
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
    {label:"Order Created",       done:true,                                              icon:"📋"},
    {label:"Token Paid by Buyer", done:order.status!=="pending"&&order.status!=="pending_seller_confirm", icon:"💳"},
    {label:"Dispatched by Seller",done:["dispatched","delivered","disputed"].includes(order.status), icon:"🚚"},
    {label:"Delivered",           done:order.status==="delivered",                         icon:"✅"},
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
          <div style={{background:"var(--sf2)",borderRadius:10,padding:12}}>
            <div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Order Amount</div>
            <div className="syne" style={{fontWeight:800,fontSize:20}}>₹{order.order_amount}</div>
          </div>
          <div style={{background:"rgba(14,165,233,.1)",borderRadius:10,padding:12,border:"1px solid rgba(14,165,233,.2)"}}>
            <div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Token (Escrow)</div>
            <div className="syne" style={{fontWeight:800,fontSize:20,color:"var(--gold)"}}>₹{order.token_amount}</div>
          </div>
        </div>

        {/* Copy Link */}
        {isSeller && (
          <div style={{background:"rgba(14,165,233,.08)",border:"1px solid rgba(14,165,233,.2)",borderRadius:10,padding:12,marginBottom:14}}>
            <div style={{fontSize:11,color:"var(--muted)",marginBottom:6,fontWeight:600}}>🔗 Payment Link</div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <code style={{fontSize:11,color:"var(--gold)",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",background:"var(--sf2)",padding:"6px 10px",borderRadius:6}}>{paymentLink}</code>
              <button className="btn-ghost" style={{padding:"6px 12px",fontSize:12,flexShrink:0,color:copied?"var(--green)":"var(--text)",borderColor:copied?"var(--green)":"var(--border)"}} onClick={copyLink}>{copied?"✅ Copied!":"📋 Copy"}</button>
            </div>
            <div style={{fontSize:11,color:"var(--muted)",marginTop:5}}>Buyer link pe click karega → seedha payment page</div>
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
            <div style={{flex:1}}>
              <div style={{fontSize:11,color:"var(--blue)",fontWeight:600,marginBottom:2}}>📦 Tracking</div>
              <div style={{fontFamily:"monospace",fontWeight:700}}>{order.tracking_number}</div>
            </div>
            {trackingUrl && <a href={trackingUrl} target="_blank" rel="noreferrer" style={{background:"var(--blue)",color:"#fff",padding:"6px 12px",borderRadius:8,fontSize:12,fontWeight:600,textDecoration:"none"}}>Track →</a>}
          </div>
        )}

        {order.status==="dispatched" && <div className="hold-box" style={{marginBottom:12}}><div style={{fontSize:12,color:"#a78bfa",fontWeight:700}}>⏰ Token Hold: {daysLeft>0?`${daysLeft} din aur`:"Release ready!"}</div></div>}

        {isSeller && order.status==="token_paid" && (
          <div style={{marginBottom:12}}>
            <label className="label">Courier Tracking Number *</label>
            <input className="input" placeholder="DTDC123456 / BLUEDART789" value={tracking} onChange={e=>setTracking(e.target.value)} style={{marginBottom:8}} />
            <button className="btn-gold" style={{width:"100%"}} onClick={async()=>{ if(!tracking){setMsg("❌ Tracking number daalo!"); return;} setLoading(true); const r=await dispatchOrder(order.id,tracking); setLoading(false); if(r.success){onDispatch(order.id,tracking);setMsg("✅ Dispatched!");}else setMsg("❌ "+r.error); }} disabled={loading}>
              {loading?"⏳...":"📦 Mark as Dispatched"}
            </button>
          </div>
        )}

        {!isSeller && order.status==="dispatched" && (
          <button className="btn-green" style={{width:"100%",padding:"11px",marginBottom:10}} onClick={async()=>{ setLoading(true); const r=await confirmDelivery(order.id); setLoading(false); if(r.success){onConfirmDelivery(order.id);onClose();}else setMsg("❌ "+r.error); }} disabled={loading}>
            {loading?"⏳...":"✅ Order Mila — Confirm Karo"}
          </button>
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
function Landing({ onEnter, dark, onToggle }) {
  const [tab, setTab] = useState("seller");
  return (
    <div style={{minHeight:"100vh"}}>
      <nav className="nav">
        <Logo />
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <button className="btn-ghost" onClick={()=>onEnter("buyer")}>Buyer Login</button>
          <button className="btn-gold" onClick={()=>onEnter("seller")}>Seller Login</button>
        </div>
      </nav>
      <div className="hero-sec" style={{position:"relative",overflow:"hidden",padding:"80px 40px 68px",textAlign:"center"}}>
        <div className="hero-glow" style={{background:dark?"rgba(240,180,41,.07)":"rgba(14,165,233,.09)",top:"-80px",left:"50%",transform:"translateX(-50%)"}} />
        <div style={{marginBottom:14}} className="fu"><span className="badge bo" style={{fontSize:12}}>🛡️ India Ka Trusted Escrow Platform</span></div>
        <h1 className="syne fu2" style={{fontSize:"clamp(28px,5.5vw,64px)",fontWeight:800,lineHeight:1.1,marginBottom:16}}>
          WhatsApp Deal Ka<br /><span className="shimmer">Sabse Safe Tarika</span>
        </h1>
        <p className="fu3" style={{color:"var(--muted)",fontSize:"clamp(14px,2vw,17px)",maxWidth:520,margin:"0 auto 32px",lineHeight:1.7}}>
          Seller ka RTO loss khatam. Buyer ka fraud ka darr khatam.<br/>
          Minimum <strong style={{color:"var(--gold)"}}>₹200 token</strong> se dono ko 100% protection.
        </p>
        <div className="fu3" style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn-gold pulse" style={{fontSize:15,padding:"13px 34px"}} onClick={()=>onEnter("seller")}>Seller — Free Shuru Karo</button>
          <button className="btn-outline" onClick={()=>onEnter("buyer")}>Buyer — Safe Order Do</button>
        </div>
      </div>
      <div className="sec" style={{padding:"52px 40px",background:"var(--surface)"}}>
        <h2 className="syne" style={{textAlign:"center",fontSize:"clamp(22px,3vw,34px)",fontWeight:800,marginBottom:20}}>Kaise Kaam Karta Hai?</h2>
        <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:24}}>
          {["seller","buyer"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"7px 22px",borderRadius:8,cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:13,border:"1px solid var(--border)",background:tab===t?"var(--gold)":"transparent",color:tab===t?(dark?"#0a0a0f":"#fff"):"var(--muted)",transition:"all .2s"}}>{t==="seller"?"Seller View":"Buyer View"}</button>
          ))}
        </div>
        <div style={{maxWidth:640,margin:"0 auto",display:"flex",flexDirection:"column",gap:10}}>
          {(tab==="seller"?[
            ["1","var(--gold)","Order Link Banao","Product add karo — token auto calculate hoga"],
            ["2","var(--blue)","WhatsApp pe Link Bhejo","Buyer click karega → seedha payment page → no login needed"],
            ["3","var(--green)","Confidently Dispatch Karo","Token secured → tracking ID ke saath dispatch karo"],
          ]:[
            ["1","var(--gold)","Link pe Click Karo — Ya Deal Banao","Seller ka link aaya → click karo. Ya khud deal banao → seller ko bhejo"],
            ["2","var(--blue)","Token Pay Karo","UPI / Card / NetBanking — escrow mein lock"],
            ["3","var(--green)","Safe Delivery","Order aaya → confirm. Nahi aaya → dispute raise karo."],
          ]).map(([n,c,t,d])=>(
            <div key={n} className="step">
              <div className="step-num" style={{background:`${c}20`,color:c}}>{n}</div>
              <div><div style={{fontWeight:600,marginBottom:3,fontSize:14}}>{t}</div><div style={{fontSize:13,color:"var(--muted)"}}>{d}</div></div>
            </div>
          ))}
        </div>
      </div>
      <div className="sec" style={{padding:"52px 40px"}}>
        <h2 className="syne" style={{textAlign:"center",fontSize:"clamp(20px,3vw,32px)",fontWeight:800,marginBottom:30}}>Token Kab Kiske Paas Jayega?</h2>
        <div className="g3" style={{maxWidth:820,margin:"0 auto"}}>
          {[
            {icon:"✅",bg:"rgba(5,150,105,.1)",bdr:"rgba(5,150,105,.22)",title:"Order Deliver Hua",sub:"Token → Seller",desc:"7 din baad auto-release"},
            {icon:"❌",bg:"rgba(220,38,38,.1)",bdr:"rgba(220,38,38,.22)",title:"Buyer ne Cancel Kiya",sub:"Token → Seller",desc:"Seller ka shipping cover"},
            {icon:"🚫",bg:"rgba(14,165,233,.1)",bdr:"rgba(14,165,233,.22)",title:"Seller ne Nahi Bheja",sub:"Token → Buyer",desc:"Poora token wapas"},
          ].map(item=>(
            <div key={item.title} className="card" style={{background:item.bg,borderColor:item.bdr,textAlign:"center"}}>
              <div style={{fontSize:30,marginBottom:10}}>{item.icon}</div>
              <div className="syne" style={{fontWeight:700,marginBottom:4,fontSize:14}}>{item.title}</div>
              <div style={{color:"var(--gold)",fontWeight:700,marginBottom:8,fontSize:13}}>{item.sub}</div>
              <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.6}}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{borderTop:"1px solid var(--border)",padding:"18px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <Logo /><div style={{color:"var(--muted)",fontSize:12}}>© 2026 EscaraPay</div>
      </div>
    </div>
  );
}

/* ══════════ AUTH ══════════ */
function Auth({ type, onLogin, onBack, dark, onToggle }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({name:"",email:"",password:"",shop:"",phone:""});
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (mode==="register"&&!form.phone){alert("❌ Phone number zaroori hai!"); return;}
    setLoading(true);
    const result = mode==="register"
      ? await registerUser(form.name,form.email,form.phone,type,form.password,form.shop||"")
      : await loginUser(form.email,form.password,type);
    setLoading(false);
    if (result.success) {
      const u = result.data.user;
      onLogin(type, u.name, u.id, u.phone||form.phone||"");
    } else alert("❌ " + result.error);
  };

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
              <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"8px",border:"none",borderRadius:8,cursor:"pointer",background:mode===m?"var(--gold)":"transparent",color:mode===m?(dark?"#0a0a0f":"#fff"):"var(--muted)",fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:13,transition:"all .2s"}}>{m==="login"?"Login":"Register"}</button>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {mode==="register" && <div><label className="label">Full Name</label><input className="input" placeholder="Meena Devi" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>}
            {mode==="register"&&type==="seller" && <div><label className="label">Shop Name</label><input className="input" placeholder="Meena Crafts" value={form.shop} onChange={e=>setForm({...form,shop:e.target.value})} /></div>}
            <div><label className="label">Email</label><input className="input" placeholder="aapki@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
            <div><label className="label">Phone Number {type==="buyer"?"(Orders track karne ke liye)":""}</label><input className="input" placeholder="9876543210" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></div>
            <div><label className="label">Password</label><input className="input" type="password" placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /></div>
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

  const copyLink = (orderId)=>{ navigator.clipboard?.writeText(`${BASE_URL}/pay/${orderId}`); setToast("Link copied! WhatsApp pe bhejo 🚀"); };

  const nav = [{id:"dashboard",icon:"📊",label:"Dashboard"},{id:"orders",icon:"📦",label:"Orders"},{id:"analytics",icon:"📈",label:"Analytics"},{id:"payments",icon:"💰",label:"Payments"},{id:"settings",icon:"⚙️",label:"Settings"}];

  return (
    <div style={{minHeight:"100vh"}}>
      {toast && <Toast msg={toast} onDone={()=>setToast("")} />}
      <nav className="nav">
        <Logo />
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <span className="badge bg hide-m">● Live</span>
          <div className="avatar">{user[0]}</div>
          <span className="hide-m" style={{fontSize:13,fontWeight:500}}>{user}</span>
          <button className="btn-ghost" onClick={onLogout}>Logout</button>
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
      <div className="main">

        {page==="dashboard" && (
          <div className="fu">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22,flexWrap:"wrap",gap:10}}>
              <div><h1 className="syne" style={{fontSize:"clamp(20px,3vw,26px)",fontWeight:800}}>Namaste, {user}! 👋</h1><p style={{color:"var(--muted)",marginTop:3,fontSize:13}}>Aaj ka overview</p></div>
              <button className="btn-gold" onClick={()=>setShowCreate(true)}>+ New Order Link</button>
            </div>
            <div className="g4" style={{marginBottom:18}}>
              {[{label:"Total Orders",value:stats.total,icon:"📦",color:"var(--gold)"},{label:"Active Escrows",value:stats.active,icon:"🔐",color:"var(--blue)"},{label:"Token Earned",value:`₹${stats.earned}`,icon:"💰",color:"var(--green)"},{label:"RTO Saved",value:`₹${stats.saved}`,icon:"🛡️",color:"var(--accent)"}].map(s=>(
                <div key={s.label} className="stat-card">
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div><div style={{fontSize:11,color:"var(--muted)",marginBottom:6}}>{s.label}</div><div className="syne" style={{fontSize:24,fontWeight:800,color:s.color}}>{s.value}</div></div>
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
                        <td><div style={{display:"flex",gap:6}}>
                          <button className="btn-ghost" style={{padding:"4px 10px",fontSize:12}} onClick={()=>setShowOrder(o)}>Manage</button>
                          {o.status==="pending" && <button className="btn-ghost" style={{padding:"4px 10px",fontSize:12,color:"var(--gold)",borderColor:"rgba(240,180,41,.3)"}} onClick={()=>copyLink(o.id)}>📋 Link</button>}
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
              <h1 className="syne" style={{fontSize:"clamp(20px,3vw,26px)",fontWeight:800}}>All Orders</h1>
              <button className="btn-gold" onClick={()=>setShowCreate(true)}>+ New Order Link</button>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:18}}>
              <div className={`chip ${filterStatus==="all"?"active":""}`} onClick={()=>setFilterStatus("all")}>All ({orders.length})</div>
              {Object.entries(STATUS_META).map(([key,val])=>{ const count=orders.filter(o=>o.status===key).length; if(!count) return null; return <div key={key} className={`chip ${filterStatus===key?"active":""}`} onClick={()=>setFilterStatus(key)}>{val.icon} {val.label} ({count})</div>; })}
            </div>
            <div className="card" style={{padding:0,overflowX:"auto"}}>
              {loadingOrders ? <div style={{textAlign:"center",padding:30,color:"var(--muted)"}}>⏳ Loading...</div> : (
                <table className="tbl">
                  <thead><tr><th>Order ID</th><th>Date</th><th>Buyer</th><th>Product</th><th>Amount</th><th>Token</th><th>Tracking</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {filteredOrders.length===0 ? <tr><td colSpan={9} style={{textAlign:"center",color:"var(--muted)",padding:30}}>Koi order nahi</td></tr>
                     : filteredOrders.map(o=>(
                      <tr key={o.id}>
                        <td><span style={{fontFamily:"monospace",color:"var(--gold)",fontSize:12}}>{o.id}</span></td>
                        <td style={{color:"var(--muted)",fontSize:12}}>{(o.created_at||"").split("T")[0]}</td>
                        <td>{o.buyer_name||"—"}</td><td style={{color:"var(--muted)"}}>{o.product_name}</td>
                        <td style={{fontWeight:600}}>₹{o.order_amount}</td><td style={{color:"var(--green)",fontWeight:600}}>₹{o.token_amount}</td>
                        <td style={{fontSize:11,fontFamily:"monospace",color:"var(--blue)"}}>{o.tracking_number||"—"}</td>
                        <td><Bdg status={o.status} /></td>
                        <td><div style={{display:"flex",gap:6}}>
                          <button className="btn-ghost" style={{padding:"4px 10px",fontSize:12}} onClick={()=>setShowOrder(o)}>Manage</button>
                          {o.status==="pending" && <button className="btn-ghost" style={{padding:"4px 10px",fontSize:12,color:"var(--gold)",borderColor:"rgba(240,180,41,.3)"}} onClick={()=>copyLink(o.id)}>📋 Link</button>}
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
            <h1 className="syne" style={{fontSize:"clamp(20px,3vw,26px)",fontWeight:800,marginBottom:22}}>Analytics</h1>
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

        {page==="payments" && <div className="fu"><h1 className="syne" style={{fontSize:"clamp(20px,3vw,26px)",fontWeight:800,marginBottom:22}}>Payments</h1><div className="card" style={{textAlign:"center",padding:50}}><div style={{fontSize:48,marginBottom:12}}>🏦</div><div className="syne" style={{fontWeight:700,fontSize:18,marginBottom:8}}>Payout System Coming Soon!</div></div></div>}

        {page==="settings" && (
          <div className="fu">
            <h1 className="syne" style={{fontSize:"clamp(20px,3vw,26px)",fontWeight:800,marginBottom:22}}>Settings</h1>
            <div className="g2">
              <div className="card">
                <h3 className="syne" style={{fontWeight:700,marginBottom:16,fontSize:15}}>Profile</h3>
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  <div><label className="label">Shop Name</label><input className="input" defaultValue={user} /></div>
                  <div><label className="label">Phone</label><input className="input" placeholder="9876543210" /></div>
                  <div><label className="label">UPI ID</label><input className="input" placeholder="yourname@upi" /></div>
                  <button className="btn-gold">Save Changes</button>
                </div>
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
                  {newOrder.amount && <div style={{background:"rgba(14,165,233,.1)",border:"1px solid rgba(14,165,233,.25)",borderRadius:10,padding:14}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Buyer Bharenga</div><div className="syne" style={{fontSize:24,fontWeight:800,color:"var(--gold)"}}>₹{Math.round(tokenPreview*1.02)}</div></div>{minApplied&&<span className="badge bo" style={{fontSize:11}}>⚡ Min ₹200</span>}</div></div>}
                  <div><label className="label">Buyer Name</label><input className="input" placeholder="Rahul Sharma" value={newOrder.buyer_name} onChange={e=>setNewOrder({...newOrder,buyer_name:e.target.value})} /></div>
                  <div><label className="label">Buyer WhatsApp *</label><input className="input" placeholder="9876543210" value={newOrder.buyer_phone} onChange={e=>setNewOrder({...newOrder,buyer_phone:e.target.value})} /><div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>⚠️ Sahi number daalo — buyer ke orders mein isse dikhega</div></div>
                  <div style={{display:"flex",gap:10}}>
                    <button className="btn-ghost" style={{flex:1}} onClick={()=>setShowCreate(false)}>Cancel</button>
                    <button className="btn-gold" style={{flex:2}} onClick={handleCreateOrder} disabled={!newOrder.product||!newOrder.amount||creating}>{creating?"⏳ Bana raha hai...":"🔗 Generate Secure Link"}</button>
                  </div>
                </div>
              </>
            ) : (
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:46,marginBottom:12}}>🎉</div>
                <h3 className="syne" style={{fontWeight:800,fontSize:21,marginBottom:8}}>Order Link Ready!</h3>
                <p style={{color:"var(--muted)",fontSize:13,marginBottom:16}}>Buyer link pe click karega → seedha payment page!</p>
                <div style={{background:"var(--sf2)",borderRadius:10,padding:12,marginBottom:14,border:"1px solid var(--border)",wordBreak:"break-all"}}><code style={{fontSize:12,color:"var(--gold)"}}>{createdLink}</code></div>
                <div style={{display:"flex",gap:8}}>
                  <button className="btn-ghost" style={{flex:1}} onClick={()=>{ navigator.clipboard?.writeText(createdLink); setToast("Link copied!"); }}>📋 Copy</button>
                  <button className="btn-gold" style={{flex:1}} onClick={()=>{ setCreatedLink(null); setShowCreate(false); }}>Done ✓</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showOrder && <OrderModal order={showOrder} isSeller onClose={()=>setShowOrder(null)} onDispatch={(id,t)=>{ setOrders(orders.map(o=>o.id===id?{...o,status:"dispatched",tracking_number:t}:o)); setShowOrder(null); }} onConfirmDelivery={(id)=>setOrders(orders.map(o=>o.id===id?{...o,status:"delivered"}:o))} onDispute={(id)=>setOrders(orders.map(o=>o.id===id?{...o,status:"disputed"}:o))} />}
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
  const [payStep, setPayStep] = useState(0);
  const [payError, setPayError] = useState("");
  const [payingOrder, setPayingOrder] = useState(null);
  const [linkInput, setLinkInput] = useState("");
  const [linkOrder, setLinkOrder] = useState(null);
  const [linkLoading, setLinkLoading] = useState(false);
  const [linkError, setLinkError] = useState("");
  const [toast, setToast] = useState("");

  // ── Create Deal states ──
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
    setPayError(""); setPayingOrder(order); setPayStep(1);
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
        if(verify.success){setPayStep(3);setOrders(prev=>prev.map(o=>o.id===order.id?{...o,status:"token_paid"}:o));setLinkOrder(prev=>prev&&prev.id===order.id?{...prev,status:"token_paid"}:prev);setTimeout(()=>{setPayStep(0);setPayingOrder(null);},2500);}
        else{setPayError("Verify failed: "+verify.error);setPayStep(0);}
      },
      prefill:{name:user}, theme:{color:"#f0b429"},
      modal:{ondismiss:()=>{setPayStep(0);setPayingOrder(null);}},
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

  // ✅ Buyer creates a deal
  const handleCreateDeal = async()=>{
    if(!dealForm.product||!dealForm.amount){alert("❌ Product aur amount zaroori hain!"); return;}
    setDealCreating(true);
    try {
      const res = await fetch("http://localhost:5000/api/orders/buyer-create", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          buyer_id: userId,
          buyer_name: user,
          buyer_phone: userPhone,
          product_name: dealForm.product,
          order_amount: Number(dealForm.amount),
          token_pct: Number(dealForm.token_pct),
          seller_name: dealForm.seller_name,
          seller_phone: dealForm.seller_phone,
        }),
      });
      const data = await res.json();
      setDealCreating(false);
      if (data.success) {
        setDealLink(data.dealLink);
        setDealForm({product:"",amount:"",token_pct:"10",seller_name:"",seller_phone:""});
      } else alert("❌ "+data.error);
    } catch(e) { setDealCreating(false); alert("❌ Backend se connect nahi hua!"); }
  };

  const tokenPreview2 = dealForm.amount ? calcToken(dealForm.amount, dealForm.token_pct) : 0;
  const filteredOrders = filterStatus==="all" ? orders : orders.filter(o=>o.status===filterStatus);

  const nav = [
    {id:"orders",      icon:"📦", label:"My Orders"},
    {id:"pay_order",   icon:"🔗", label:"Pay via Link"},
    {id:"create_deal", icon:"🤝", label:"Create Deal"},
    {id:"help",        icon:"❓", label:"Help"},
  ];

  return (
    <div style={{minHeight:"100vh"}}>
      {toast && <Toast msg={toast} onDone={()=>setToast("")} />}
      <nav className="nav">
        <Logo />
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <div className="avatar" style={{background:"linear-gradient(135deg,var(--blue),var(--accent))"}}>{user[0]}</div>
          <span className="hide-m" style={{fontSize:13,fontWeight:500}}>{user}</span>
          <button className="btn-ghost" onClick={onLogout}>Logout</button>
        </div>
      </nav>
      <div className="sidebar">
        <div style={{marginBottom:16,padding:"0 8px"}}><div style={{fontSize:10,color:"var(--muted)",fontWeight:700,textTransform:"uppercase",letterSpacing:".6px"}}>Buyer Panel</div></div>
        {nav.map(n=>(<div key={n.id} className={`si ${page===n.id?"active":""}`} onClick={()=>setPage(n.id)}><span>{n.icon}</span><span>{n.label}</span></div>))}
      </div>
      <div className="main">

        {/* MY ORDERS */}
        {page==="orders" && (
          <div className="fu">
            <h1 className="syne" style={{fontSize:"clamp(20px,3vw,26px)",fontWeight:800,marginBottom:18}}>My Orders</h1>
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
                      {o.status==="dispatched"&&daysLeft!==null&&<div className="hold-box"><div style={{fontSize:12,color:"#a78bfa",fontWeight:600}}>⏰ Token Hold: {daysLeft>0?`${daysLeft} din aur`:"Auto-release ready!"}</div><div style={{fontSize:11,color:"var(--muted)",marginTop:3}}>{daysLeft>0?`${daysLeft} din baad auto-release`:"7 din complete!"}</div></div>}
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

        {/* PAY VIA LINK */}
        {page==="pay_order" && (
          <div className="fu" style={{maxWidth:500}}>
            <h1 className="syne" style={{fontSize:"clamp(18px,3vw,24px)",fontWeight:800,marginBottom:8}}>Order Link se Pay Karo</h1>
            <p style={{color:"var(--muted)",marginBottom:20,fontSize:13}}>Seller ka link paste karo — details dekho aur pay karo</p>
            <div className="card" style={{marginBottom:14}}>
              <label className="label">EscaraPay Order Link</label>
              <input className="input" placeholder="http://localhost:3000/pay/EPXXXXX" value={linkInput} onChange={e=>setLinkInput(e.target.value)} style={{marginBottom:10}} />
              <button className="btn-gold" style={{width:"100%"}} onClick={fetchLinkOrder}>{linkLoading?"⏳ Dhundh raha hai...":"🔍 Order Dekho"}</button>
              {linkError && <div style={{color:"var(--red)",fontSize:12,marginTop:8}}>❌ {linkError}</div>}
            </div>
            {linkOrder && (
              <div className="card" style={{background:"rgba(14,165,233,.06)",borderColor:"rgba(14,165,233,.3)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                  <div>
                    <div style={{fontSize:11,color:"var(--muted)",marginBottom:3}}>{linkOrder.id}</div>
                    <div className="syne" style={{fontWeight:800,fontSize:18}}>{linkOrder.product_name}</div>
                    <div style={{fontSize:13,color:"var(--muted)",marginTop:4}}>Seller: {linkOrder.seller_name||"—"}</div>
                  </div>
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

        {/* ✅ CREATE DEAL — Buyer initiates */}
        {page==="create_deal" && (
          <div className="fu" style={{maxWidth:520}}>
            <h1 className="syne" style={{fontSize:"clamp(18px,3vw,24px)",fontWeight:800,marginBottom:8}}>Deal Banao 🤝</h1>
            <p style={{color:"var(--muted)",marginBottom:6,fontSize:13}}>Kisi seller par trust nahi? Tum khud deal banao — seller ko link bhejo — woh confirm karega — phir tum safely pay karo.</p>

            <div style={{background:"rgba(124,58,237,.08)",border:"1px solid rgba(124,58,237,.2)",borderRadius:12,padding:14,marginBottom:20}}>
              <div style={{fontSize:13,fontWeight:700,color:"#a78bfa",marginBottom:8}}>🛡️ Buyer-Initiated Deal Kaise Kaam Karta Hai?</div>
              {[
                "Tum product details aur token amount set karo",
                "EscaraPay ek deal link generate karega",
                "Seller ko WhatsApp pe link bhejo — woh confirm karega ki haan main ship karunga",
                "Seller confirm kare → tum safely token pay karo",
                "Token escrow mein lock — seller ko tab milega jab deliver ho",
              ].map((t,i)=>(
                <div key={i} style={{display:"flex",gap:8,fontSize:12,color:"var(--muted)",marginBottom:6}}>
                  <div style={{width:20,height:20,borderRadius:50,background:"rgba(124,58,237,.3)",color:"#a78bfa",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{i+1}</div>
                  <span>{t}</span>
                </div>
              ))}
            </div>

            {!dealLink ? (
              <div className="card">
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  <div><label className="label">Product / Service Name *</label><input className="input" placeholder="Handmade Saree / Custom Jewelry" value={dealForm.product} onChange={e=>setDealForm({...dealForm,product:e.target.value})} /></div>
                  <div className="g2">
                    <div><label className="label">Order Amount (₹) *</label><input className="input" type="number" placeholder="2000" value={dealForm.amount} onChange={e=>setDealForm({...dealForm,amount:e.target.value})} /></div>
                    <div><label className="label">Token %</label><select className="select" value={dealForm.token_pct} onChange={e=>setDealForm({...dealForm,token_pct:e.target.value})}><option value="5">5%</option><option value="10">10%</option><option value="15">15%</option><option value="20">20%</option></select></div>
                  </div>
                  {dealForm.amount && (
                    <div style={{background:"rgba(14,165,233,.1)",border:"1px solid rgba(14,165,233,.25)",borderRadius:10,padding:14}}>
                      <div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Aap Token Bharenge (Escrow)</div>
                      <div className="syne" style={{fontSize:24,fontWeight:800,color:"var(--gold)"}}>₹{Math.round(tokenPreview2*1.02)}</div>
                      <div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>Token escrow mein lock — seller ko deliver karne ke baad milega</div>
                    </div>
                  )}
                  <div style={{height:1,background:"var(--border)"}}></div>
                  <div><label className="label">Seller Ka Naam (optional)</label><input className="input" placeholder="Meena Crafts" value={dealForm.seller_name} onChange={e=>setDealForm({...dealForm,seller_name:e.target.value})} /></div>
                  <div><label className="label">Seller Ka WhatsApp (optional)</label><input className="input" placeholder="9876543210" value={dealForm.seller_phone} onChange={e=>setDealForm({...dealForm,seller_phone:e.target.value})} /></div>
                  <button className="btn-gold" style={{width:"100%",padding:12}} onClick={handleCreateDeal} disabled={!dealForm.product||!dealForm.amount||dealCreating}>
                    {dealCreating?"⏳ Deal bana raha hai...":"🤝 Deal Link Generate Karo"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="card" style={{textAlign:"center"}}>
                <div style={{fontSize:46,marginBottom:12}}>🎉</div>
                <h3 className="syne" style={{fontWeight:800,fontSize:21,marginBottom:8}}>Deal Link Ready!</h3>
                <p style={{color:"var(--muted)",fontSize:13,marginBottom:6}}>Ye link seller ko WhatsApp pe bhejo</p>
                <p style={{color:"var(--muted)",fontSize:12,marginBottom:16}}>Seller link pe click karega → deal details dekhega → confirm karega → phir tum pay kar sakte ho</p>
                <div style={{background:"var(--sf2)",borderRadius:10,padding:12,marginBottom:14,border:"1px solid var(--border)",wordBreak:"break-all"}}>
                  <code style={{fontSize:12,color:"#a78bfa"}}>{dealLink}</code>
                </div>
                <div style={{display:"flex",gap:8,marginBottom:12}}>
                  <button className="btn-ghost" style={{flex:1}} onClick={()=>{ navigator.clipboard?.writeText(dealLink); setToast("Deal link copied! Seller ko bhejo"); }}>📋 Copy Link</button>
                  <button className="btn-gold" style={{flex:1}} onClick={()=>setDealLink(null)}>New Deal</button>
                </div>
                <div style={{fontSize:12,color:"var(--muted)",background:"var(--sf2)",borderRadius:8,padding:10}}>
                  ⏳ Seller confirm karne ke baad aapke "My Orders" mein dikhega — phir pay kar sakte ho
                </div>
              </div>
            )}
          </div>
        )}

        {/* HELP */}
        {page==="help" && (
          <div className="fu" style={{maxWidth:560}}>
            <h1 className="syne" style={{fontSize:"clamp(18px,3vw,24px)",fontWeight:800,marginBottom:22}}>Help & Safety</h1>
            {[
              {q:"Create Deal aur Pay via Link mein kya fark hai?",a:"Pay via Link: Seller ne order banaya, aap pay karo. Create Deal: Aap ne order banaya, seller ko confirm karna hoga phir aap pay karo. Dono mein escrow protection same hai!"},
              {q:"Token kab release hoga seller ko?",a:"Delivery confirm ke baad 7 din hold. Dispute nahi → auto-release."},
              {q:"Order nahi aaya?",a:"'View Details' → 'Dispute Raise Karo'. 24 ghante mein team investigate karegi."},
              {q:"Tracking kaise kare?",a:"Order card mein 'Track →' button pe click karo — courier site pe redirect hoga."},
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
            {payError?(<><div style={{fontSize:40,marginBottom:12}}>❌</div><div className="syne" style={{fontWeight:800,fontSize:18,color:"var(--red)",marginBottom:8}}>Payment Failed</div><div style={{color:"var(--muted)",fontSize:13,marginBottom:16}}>{payError}</div><button className="btn-ghost" style={{width:"100%"}} onClick={()=>{setPayError("");setPayStep(0);setPayingOrder(null);}}>Close</button></>)
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

/* ══════════ DEAL CONFIRM PAGE (/deal/ORDERID) ══════════ */
/* Seller yahan deal confirm karta hai — buyer ne deal create ki thi */
function DealPage({ orderId, dark, onToggle, onGoHome }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [toast, setToast] = useState("");

  useEffect(()=>{
    getOrderById(orderId).then(r=>{
      setLoading(false);
      if (r.success) setOrder(r.data.order);
      else setError("Deal nahi mili. Link check karo.");
    });
  },[orderId]);

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/seller-confirm-deal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seller_id: 0 }), // Guest seller
      });
      const data = await res.json();
      setConfirming(false);
      if (data.success) {
        setConfirmed(true);
        setPaymentLink(data.paymentLink);
      } else {
        setError(data.error || "Confirm nahi hua");
      }
    } catch(e) {
      setConfirming(false);
      setError("Backend se connect nahi hua!");
    }
  };

  const copyPayLink = () => {
    navigator.clipboard?.writeText(paymentLink);
    setToast("Payment link copied! Buyer ko bhejo");
  };

  return (
    <div style={{minHeight:"100vh"}}>
      {toast && <Toast msg={toast} onDone={()=>setToast("")} />}
      <nav className="nav">
        <Logo onClick={onGoHome} />
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <button className="btn-ghost" style={{fontSize:12}} onClick={onGoHome}>← Home</button>
        </div>
      </nav>

      <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"calc(100vh - 62px)",padding:20}}>
        <div style={{width:"100%",maxWidth:480}}>

          {loading && (
            <div className="card" style={{textAlign:"center",padding:50}}>
              <div style={{width:44,height:44,border:"3px solid var(--gold)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 16px"}} />
              <div style={{color:"var(--muted)"}}>Deal load ho rahi hai...</div>
            </div>
          )}

          {error && (
            <div className="card" style={{textAlign:"center",padding:40}}>
              <div style={{fontSize:40,marginBottom:12}}>❌</div>
              <div className="syne" style={{fontWeight:800,fontSize:18,marginBottom:8}}>Deal Nahi Mili</div>
              <div style={{color:"var(--muted)",fontSize:13,marginBottom:20}}>{error}</div>
              <button className="btn-ghost" onClick={onGoHome}>← Home</button>
            </div>
          )}

          {/* Already confirmed */}
          {order && order.status !== "pending_seller_confirm" && !confirmed && (
            <div className="card" style={{textAlign:"center",padding:40}}>
              <div style={{fontSize:44,marginBottom:12}}>✅</div>
              <div className="syne" style={{fontWeight:800,fontSize:20,marginBottom:8}}>Deal Already Confirmed!</div>
              <Bdg status={order.status} />
              <div style={{color:"var(--muted)",fontSize:13,marginTop:14,marginBottom:20}}>Yeh deal already process ho chuki hai.</div>
              <button className="btn-ghost" onClick={onGoHome}>← Home</button>
            </div>
          )}

          {/* Success — confirmed! */}
          {confirmed && (
            <div className="card fu" style={{textAlign:"center",padding:40}}>
              <div style={{fontSize:60,marginBottom:16}}>🎉</div>
              <div className="syne" style={{fontWeight:800,fontSize:24,color:"var(--green)",marginBottom:8}}>Deal Confirmed!</div>
              <div style={{color:"var(--muted)",fontSize:14,marginBottom:20,lineHeight:1.7}}>
                Ab buyer ko yeh payment link bhejo.<br/>
                Buyer pay karega → token escrow mein lock hoga.<br/>
                Phir aap ship karo → delivery ke baad token milega!
              </div>

              <div style={{background:"rgba(14,165,233,.08)",border:"1px solid rgba(14,165,233,.2)",borderRadius:12,padding:16,marginBottom:16,textAlign:"left"}}>
                <div style={{fontSize:11,color:"var(--muted)",marginBottom:6,fontWeight:600}}>💳 Buyer Ka Payment Link</div>
                <div style={{background:"var(--sf2)",borderRadius:8,padding:"10px 12px",marginBottom:10,wordBreak:"break-all"}}>
                  <code style={{fontSize:12,color:"var(--gold)"}}>{paymentLink}</code>
                </div>
                <button className="btn-gold" style={{width:"100%"}} onClick={copyPayLink}>📋 Link Copy Karo — Buyer ko Bhejo</button>
              </div>

              <div style={{background:"rgba(5,150,105,.08)",border:"1px solid rgba(5,150,105,.2)",borderRadius:10,padding:14,textAlign:"left",fontSize:12}}>
                <div style={{fontWeight:700,color:"var(--green)",marginBottom:8}}>📋 Aage Kya Hoga?</div>
                {["Buyer payment link pe click karega → token pay karega","Token escrow mein lock hoga — aapke paas nahi aayega abhi","Aap product ship karo → tracking number add karo","Buyer delivery confirm kare → 7 din baad token aapko milega","Agar buyer ne receive nahi kiya → dispute — EscaraPay investigate karegi"].map((t,i)=>(
                  <div key={i} style={{display:"flex",gap:8,marginBottom:6,color:"var(--muted)"}}>
                    <span style={{color:"var(--green)",fontWeight:700,flexShrink:0}}>{i+1}.</span><span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Deal Card */}
          {order && order.status==="pending_seller_confirm" && !confirmed && !loading && (
            <div className="fu">
              <div style={{textAlign:"center",marginBottom:20}}>
                <img src={LOGO_SRC} alt="EscaraPay" style={{height:44,objectFit:"contain",marginBottom:12}} onError={e=>e.target.style.display="none"} />
                <div className="badge borange" style={{fontSize:13,marginBottom:8}}>🤝 Buyer ne Deal Bheja Hai</div>
                <h2 className="syne" style={{fontWeight:800,fontSize:22}}>Deal Confirm Karo</h2>
                <p style={{color:"var(--muted)",fontSize:13,marginTop:6}}>Ek buyer ne EscaraPay ke through secure deal banai hai — aap confirm karo ki aap yeh order fulfill karoge</p>
              </div>

              <div className="card" style={{marginBottom:14,background:"rgba(14,165,233,.05)",borderColor:"rgba(14,165,233,.25)"}}>
                {/* Order Details */}
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:11,color:"var(--muted)",marginBottom:4}}>Deal ID: <span style={{fontFamily:"monospace",color:"var(--gold)"}}>{order.id}</span></div>
                  <div className="syne" style={{fontWeight:800,fontSize:22,marginBottom:4}}>{order.product_name}</div>
                  <div style={{fontSize:13,color:"var(--muted)"}}>Buyer: <strong style={{color:"var(--text)"}}>{order.buyer_name||"Anonymous"}</strong></div>
                </div>

                <div className="g2" style={{marginBottom:16}}>
                  <div style={{background:"var(--sf2)",borderRadius:10,padding:12,textAlign:"center"}}>
                    <div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Order Value</div>
                    <div className="syne" style={{fontWeight:800,fontSize:22}}>₹{order.order_amount}</div>
                  </div>
                  <div style={{background:"rgba(5,150,105,.15)",borderRadius:10,padding:12,textAlign:"center",border:"1px solid rgba(5,150,105,.2)"}}>
                    <div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>Aapko Milega</div>
                    <div className="syne" style={{fontWeight:800,fontSize:22,color:"var(--green)"}}>₹{order.seller_receives}</div>
                  </div>
                </div>

                {/* Fee breakdown */}
                <div style={{background:"var(--sf2)",borderRadius:10,padding:12,fontSize:12,marginBottom:16}}>
                  <div style={{fontWeight:600,marginBottom:8,color:"var(--muted)"}}>💰 Fee Details</div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{color:"var(--muted)"}}>Buyer Token Pay Karega</span><span>₹{order.buyer_pays||order.token_amount}</span></div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{color:"var(--muted)"}}>EscaraPay Commission (5%)</span><span style={{color:"var(--muted)"}}>-₹{order.escara_commission}</span></div>
                  <div style={{height:1,background:"var(--border)",margin:"6px 0"}}></div>
                  <div style={{display:"flex",justifyContent:"space-between",fontWeight:700}}><span>Aapko Milega (Delivery pe)</span><span style={{color:"var(--green)"}}>₹{order.seller_receives}</span></div>
                </div>

                {/* EscaraPay protection */}
                <div style={{background:"rgba(124,58,237,.08)",border:"1px solid rgba(124,58,237,.2)",borderRadius:10,padding:12,marginBottom:16}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#a78bfa",marginBottom:6}}>🛡️ EscaraPay Protection (Seller ke liye)</div>
                  {["Token aapke account mein tab aayega jab buyer delivery confirm kare","Buyer cancel kare toh bhi token aapko milega (RTO cover)","Dispute aaye toh EscaraPay 24 ghante mein mediate karegi","Galat delivery claim hone par aap evidence de sakte ho"].map(t=>(
                    <div key={t} style={{display:"flex",gap:7,fontSize:12,color:"var(--muted)",marginBottom:4}}><span style={{color:"#a78bfa"}}>✓</span><span>{t}</span></div>
                  ))}
                </div>

                {/* Confirm Button */}
                <button
                  className="btn-green"
                  style={{width:"100%",padding:"16px",fontSize:16,borderRadius:12,marginBottom:10}}
                  onClick={handleConfirm}
                  disabled={confirming}
                >
                  {confirming ? "⏳ Confirm ho raha hai..." : "✅ Haan! Main Yeh Order Ship Karunga"}
                </button>

                <button className="btn-ghost" style={{width:"100%"}} onClick={onGoHome}>
                  ❌ Decline — Mujhe Yeh Order Nahi Karna
                </button>

                <div style={{fontSize:11,color:"var(--muted)",textAlign:"center",marginTop:10}}>
                  Confirm karne ke baad buyer ko payment link milega — woh pay karega tab aapko order ship karna hoga
                </div>
              </div>
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
  const [dark, setDark] = useState(true);
  const [payOrderId, setPayOrderId] = useState(null);
  const [dealOrderId, setDealOrderId] = useState(null);

  useEffect(()=>{
    const path = window.location.pathname;
    // /pay/ORDERID — Direct payment
    const payMatch = path.match(/^\/pay\/([A-Z0-9]+)$/);
    if (payMatch) { setPayOrderId(payMatch[1]); setScreen("pay"); return; }
    // /deal/ORDERID — Seller deal confirm
    const dealMatch = path.match(/^\/deal\/([A-Z0-9]+)$/);
    if (dealMatch) { setDealOrderId(dealMatch[1]); setScreen("deal"); return; }
  },[]);

  const props = { dark, onToggle: ()=>setDark(d=>!d) };

  const handleLogin = (t,n,id,phone)=>{ setUserType(t); setUserName(n); setUserId(id); setUserPhone(phone||""); setScreen("dashboard"); };
  const handleLogout = ()=>{ setScreen("landing"); setUserType(null); setUserId(null); setUserPhone(""); setUserName(""); };
  const goHome = ()=>{ window.history.pushState({},"","/"); setScreen("landing"); setPayOrderId(null); setDealOrderId(null); };

  return (
    <>
      <style>{getStyle(dark)}</style>
      {/* Direct payment page — no login needed */}
      {screen==="pay" && payOrderId && <PayPage orderId={payOrderId} dark={dark} onToggle={()=>setDark(d=>!d)} onGoHome={goHome} />}
      {/* Seller deal confirm page — no login needed */}
      {screen==="deal" && dealOrderId && <DealPage orderId={dealOrderId} dark={dark} onToggle={()=>setDark(d=>!d)} onGoHome={goHome} />}
      {screen==="landing" && <Landing onEnter={t=>{ setUserType(t); setScreen("auth"); }} {...props} />}
      {screen==="auth" && <Auth type={userType} onLogin={handleLogin} onBack={()=>setScreen("landing")} {...props} />}
      {screen==="dashboard" && userType==="seller" && <SellerDB user={userName||"Seller"} userId={userId} onLogout={handleLogout} {...props} />}
      {screen==="dashboard" && userType==="buyer"  && <BuyerDB  user={userName||"Buyer"}  userId={userId} userPhone={userPhone} onLogout={handleLogout} {...props} />}
    </>
  );
}