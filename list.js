const products=window.NIKE_PRODUCTS.map((product,index)=>({...product,image:product.hero[0],index}));
const isStandaloneMode=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
document.documentElement.classList.toggle('browser-mode',!isStandaloneMode);
const grid=document.querySelector('#productGrid');
const catalogHead=document.querySelector('.catalog-head');
let navTicking=false;
addEventListener('scroll',()=>{if(navTicking)return;navTicking=true;requestAnimationFrame(()=>{catalogHead.classList.toggle('compact',scrollY>48);navTicking=false})},{passive:true});
let pdpLayer;
const isIOSWebKit=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
function openPdp(productId,directHref){
  if(pdpLayer)return;
  pdpLayer=document.createElement('div');
  pdpLayer.className='pdp-layer';
  if(!isIOSWebKit)pdpLayer.innerHTML=`<iframe src="index.html?embedded=1&product=${encodeURIComponent(productId)}" title="Nike 商品详情"></iframe>`;
  document.body.appendChild(pdpLayer);
  requestAnimationFrame(()=>requestAnimationFrame(()=>pdpLayer?.classList.add('open')));
  if(isIOSWebKit)setTimeout(()=>location.assign(directHref||`index.html?product=${encodeURIComponent(productId)}&from=list`),300);
}
function closePdp(){
  if(!pdpLayer)return;
  pdpLayer.classList.remove('open');
  const closingLayer=pdpLayer;
  pdpLayer=null;
  setTimeout(()=>closingLayer.remove(),340);
}
addEventListener('message',event=>{if(event.origin===location.origin&&event.data?.type==='close-nike-pdp')closePdp()});
function render(items){grid.innerHTML=items.map((p,index)=>`<a class="product-card" data-product="${p.id}" href="index.html?product=${encodeURIComponent(p.id)}&from=list"><div class="photo"><img src="${p.image}" alt="${p.shortTitle}"></div><div class="product-copy"><h2 class="product-title">${p.shortTitle}</h2><p class="subline">${p.subtitle}</p><div class="price-row">¥<strong>${p.price}</strong><small>补贴后</small><span class="sold">${p.sold}</span></div><div class="meta-shot"><img src="assets/list-meta-${index%2?'right':'left'}.png" alt="限时红包、小黑盒新品和购物车" /></div></div></a>`).join('')}
render(products);
grid.addEventListener('click',event=>{const card=event.target.closest('.product-card');if(!card)return;event.preventDefault();openPdp(card.dataset.product,card.href)});
document.querySelectorAll('[data-sort]').forEach(button=>button.addEventListener('click',()=>{const next=[...products],type=button.dataset.sort;if(type==='price')next.sort((a,b)=>a.price-b.price);if(type==='sales')next.sort((a,b)=>b.index-a.index);if(type==='new')next.reverse();render(next);scrollTo({top:0,behavior:'smooth'})}));
let remaining=1351;setInterval(()=>{remaining=Math.max(0,remaining-1);document.querySelector('#countdown').textContent=`${String(Math.floor(remaining/60)).padStart(2,'0')}:${String(remaining%60).padStart(2,'0')}`},1000);
const gate=document.querySelector('#passwordGate'),form=document.querySelector('#passwordForm'),input=document.querySelector('#passwordInput'),error=document.querySelector('#passwordError');if(sessionStorage.getItem('nike-demo-access')==='granted')gate.classList.add('hidden');async function digest(value){const data=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));return[...new Uint8Array(data)].map(byte=>byte.toString(16).padStart(2,'0')).join('')}form.addEventListener('submit',async event=>{event.preventDefault();if(await digest(input.value)==='d521104a1c7a8a278a7212edf63856ca447bf3c2b4296c80c7c49afa13ed4cc1'){sessionStorage.setItem('nike-demo-access','granted');gate.classList.add('hidden');return}error.textContent='密码不正确，请重新输入';input.select()});if('serviceWorker'in navigator&&location.protocol.startsWith('http'))addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js'));
