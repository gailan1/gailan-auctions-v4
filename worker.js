export default {
  async fetch(request) {
    const html = `<!doctype html>
<html lang="ar" dir="rtl"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Gailan Auctions V4</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#f4f6f8;color:#17202a;font-family:Arial,Tahoma,sans-serif}
.hidden{display:none!important}.login{min-height:100vh;display:grid;place-items:center;padding:20px}
.box,.card{background:#fff;border-radius:18px;box-shadow:0 8px 30px #0001}.box{width:100%;max-width:420px;padding:28px}
header{background:#111827;color:#fff;padding:15px}.bar,.container{max-width:1200px;margin:auto}.bar{display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap}
.container{padding:18px}.btn{border:0;border-radius:9px;padding:10px 14px;font-weight:bold;cursor:pointer}
.primary{background:#2563eb;color:#fff}.gray{background:#e5e7eb;color:#111}.danger{background:#fee2e2;color:#991b1b}
input,select,textarea{width:100%;padding:10px;border:1px solid #d1d5db;border-radius:9px}
label{font-size:13px;font-weight:bold;display:block;margin:8px 0 5px}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}.stat{padding:16px}.stat b{display:block;font-size:23px;margin-top:8px}
.tabs{display:flex;gap:7px;margin:16px 0;flex-wrap:wrap}.tab.active{background:#2563eb;color:#fff}
.panel{display:none}.panel.active{display:block}.formgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.table{overflow:auto;margin-top:12px;background:#fff;border-radius:14px}table{width:100%;border-collapse:collapse;min-width:1050px}
th,td{padding:10px;border-bottom:1px solid #eee;font-size:13px;text-align:right}.profit{color:#087f5b;font-weight:bold}.loss{color:#c92a2a;font-weight:bold}.msg{color:#c92a2a}
@media(max-width:750px){.grid{grid-template-columns:1fr 1fr}.formgrid{grid-template-columns:1fr 1fr}}
@media(max-width:500px){.grid,.formgrid{grid-template-columns:1fr}}
</style></head><body>
<div id="login" class="login"><div class="box">
<h1 style="text-align:center">🚗 Gailan Auctions</h1><p style="text-align:center;color:#6b7280">تسجيل الدخول</p>
<form id="loginForm"><label>البريد الإلكتروني</label><input id="email" type="email" required>
<label>كلمة المرور</label><input id="password" type="password" required>
<button class="btn primary" style="width:100%;margin-top:14px">دخول</button><p id="loginMsg" class="msg"></p></form>
</div></div>
<div id="app" class="hidden"><header><div class="bar"><b>🚗 Gailan Auctions V4</b><div>
<span id="who"></span> <a id="contactBtn" class="btn primary" target="_blank" rel="noopener">📞 تواصل معي</a>
<button id="logoutBtn" class="btn gray">خروج</button></div></div></header>
<div class="container">
<div class="grid"><div class="card stat">السيارات<b id="count">0</b></div>
<div class="card stat">التكلفة<b id="cost">$0.00</b></div><div class="card stat">المبيعات<b id="sales">$0.00</b></div>
<div class="card stat">الربح<b id="profit">$0.00</b></div></div>
<div class="tabs"><button class="btn tab active" data-panel="cars">السيارات</button>
<button id="addTab" class="btn tab hidden" data-panel="add">+ إضافة سيارة</button></div>
<section id="cars" class="panel active"><input id="search" placeholder="بحث بالسيارة أو VIN أو رقم المزاد...">
<div class="table"><table><thead><tr><th>السيارة</th><th>VIN</th><th>المزاد</th><th>الشراء</th><th>المصاريف</th><th>الإجمالي</th><th>البيع</th><th>الربح</th><th></th></tr></thead>
<tbody id="tbody"></tbody></table></div></section>
<section id="add" class="panel"><div class="card" style="padding:18px"><h3 id="formTitle">إضافة سيارة</h3>
<form id="carForm" class="formgrid">
<div><label>الماركة</label><input name="make" required></div><div><label>الموديل</label><input name="model" required></div><div><label>السنة</label><input name="year" type="number"></div>
<div><label>VIN</label><input name="vin"></div><div><label>المزاد</label><select name="auction"><option>Copart</option><option>IAA</option><option>Manheim</option><option>أخرى</option></select></div><div><label>رقم المزاد</label><input name="lot"></div>
<div><label>الشراء</label><input name="purchase" type="number" step=".01"></div><div><label>رسوم المزاد</label><input name="auction_fee" type="number" step=".01"></div><div><label>نقل أمريكا</label><input name="us_transport" type="number" step=".01"></div>
<div><label>الشحن</label><input name="shipping" type="number" step=".01"></div><div><label>النقل المحلي</label><input name="local_transport" type="number" step=".01"></div><div><label>الكمرك</label><input name="customs" type="number" step=".01"></div>
<div><label>التصليح</label><input name="repair" type="number" step=".01"></div><div><label>قطع الغيار</label><input name="parts" type="number" step=".01"></div><div><label>أجور العمل</label><input name="labor" type="number" step=".01"></div>
<div><label>أخرى</label><input name="other" type="number" step=".01"></div><div><label>سعر البيع</label><input name="sale" type="number" step=".01"></div><div><label>تاريخ الشراء</label><input name="purchase_date" type="date"></div>
<div><label>ملاحظات</label><textarea name="notes"></textarea></div><div><button class="btn primary">حفظ</button><button type="button" id="cancelBtn" class="btn gray">إلغاء</button></div>
</form></div></section></div></div>
<script>
const SUPABASE_URL="https://flquvvfkfldtectpnzbt.supabase.co";
const SUPABASE_ANON_KEY="sb_publishable_QTTOdtPsvIPQBHW5w7XlEQ_hchFU3gc";
const CONTACT_PHONE="9647700960406";
const CONTACT_TEXT="مرحباً، أريد الاستفسار عن سيارة في Gailan Auctions";
const fields=["purchase","auction_fee","us_transport","shipping","local_transport","customs","repair","parts","labor","other"];
let sb=null,session=null,profile=null,cars=[],editId=null;
const $=id=>document.getElementById(id);
const money=n=>"$"+Number(n||0).toLocaleString("en-US",{minimumFractionDigits:2});
const total=c=>fields.reduce((s,k)=>s+Number(c[k]||0),0);
const esc=v=>String(v??"").replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]));
function showPanel(id){document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));$(id).classList.add("active");const b=document.querySelector('[data-panel="'+id+'"]');if(b)b.classList.add("active")}
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>showPanel(b.dataset.panel));
async function init(){ $("contactBtn").href="https://wa.me/"+CONTACT_PHONE+"?text="+encodeURIComponent(CONTACT_TEXT);
const s=window.supabase; if(!s){$("loginMsg").textContent="تعذر تحميل النظام.";return}
sb=s.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);const r=await sb.auth.getSession();if(r.data.session)await open(r.data.session)}
async function open(s){session=s;const r=await sb.from("profiles").select("*").eq("id",s.user.id).single();if(r.error){$("loginMsg").textContent=r.error.message;return}
profile=r.data;if(profile.active===false){await sb.auth.signOut();alert("الحساب متوقف");return}
$("login").classList.add("hidden");$("app").classList.remove("hidden");$("who").textContent=profile.username||s.user.email||"";
$("addTab").classList.toggle("hidden",profile.role!=="admin");await loadCars()}
$("loginForm").onsubmit=async e=>{e.preventDefault();$("loginMsg").textContent="";const r=await sb.auth.signInWithPassword({email:$("email").value.trim(),password:$("password").value});if(r.error)$("loginMsg").textContent="البريد الإلكتروني أو كلمة المرور غير صحيحة"};
$("logoutBtn").onclick=async()=>{await sb.auth.signOut();location.reload()};
async function loadCars(){let q=sb.from("cars").select("*").order("id",{ascending:false});if(profile.role!=="admin")q=q.eq("user_id",session.user.id);const r=await q;if(r.error){alert(r.error.message);return}cars=r.data||[];render()}
function render(){const term=($("search").value||"").toLowerCase();const list=cars.filter(c=>JSON.stringify(c).toLowerCase().includes(term));
$("tbody").innerHTML=list.map(c=>{const t=total(c),p=Number(c.sale||0)-t;const a=profile.role==="admin"?'<button class="btn" onclick="editCar('+Number(c.id)+')">تعديل</button> <button class="btn danger" onclick="deleteCar('+Number(c.id)+')">حذف</button>':"";
return "<tr><td><b>"+esc(c.make)+" "+esc(c.model)+"</b><br>"+esc(c.year)+"</td><td>"+esc(c.vin||"-")+"</td><td>"+esc(c.auction||"-")+"<br>"+esc(c.lot||"")+"</td><td>"+money(c.purchase)+"</td><td>"+money(t-Number(c.purchase||0))+"</td><td>"+money(t)+"</td><td>"+money(c.sale)+"</td><td class='"+(p>=0?"profit":"loss")+"'>"+money(p)+"</td><td>"+a+"</td></tr>"}).join("")||'<tr><td colspan="9" style="text-align:center">لا توجد سيارات</td></tr>';
const tc=cars.reduce((s,c)=>s+total(c),0),ts=cars.reduce((s,c)=>s+Number(c.sale||0),0);$("count").textContent=cars.length;$("cost").textContent=money(tc);$("sales").textContent=money(ts);$("profit").textContent=money(ts-tc)}
$("search").oninput=render;
$("carForm").onsubmit=async e=>{e.preventDefault();if(profile.role!=="admin"){alert("ليس لديك صلاحية");return}const d=Object.fromEntries(new FormData(e.target));fields.forEach(k=>d[k]=Number(d[k]||0));let r=editId?await sb.from("cars").update(d).eq("id",editId):await sb.from("cars").insert({...d,user_id:session.user.id});if(r.error)alert(r.error.message);else{resetForm();await loadCars();showPanel("cars")}};
function resetForm(){editId=null;$("formTitle").textContent="إضافة سيارة";$("carForm").reset()}
$("cancelBtn").onclick=()=>{resetForm();showPanel("cars")};
window.editCar=id=>{const c=cars.find(x=>Number(x.id)===Number(id));if(!c)return;editId=id;$("formTitle").textContent="تعديل السيارة";Object.keys(c).forEach(k=>{const e=$("carForm").elements[k];if(e)e.value=c[k]??""});showPanel("add")};
window.deleteCar=async id=>{if(!confirm("هل تريد حذف السيارة؟"))return;const r=await sb.from("cars").delete().eq("id",id);if(r.error)alert(r.error.message);else loadCars()};
init();
</script></body></html>`;
    return new Response(html,{headers:{"content-type":"text/html;charset=UTF-8"}});
  }
};
