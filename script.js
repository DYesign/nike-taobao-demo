const slides = document.querySelector('#slides');
window.setupNikeInstallGate();
const passwordGate = document.querySelector('#passwordGate');
const passwordForm = document.querySelector('#passwordForm');
const passwordInput = document.querySelector('#passwordInput');
const passwordError = document.querySelector('#passwordError');
const scrollHeader = document.querySelector('#scrollHeader');
const hero = document.querySelector('.hero');
const heroNav = document.querySelector('.nav-top-image');
const productDetail = document.querySelector('#productDetail');
const detailSection = document.querySelector('.detail');
const scrollTabs = [...document.querySelectorAll('[data-scroll-target]')];
const pdpBack = document.querySelector('#pdpBack');

const params = new URLSearchParams(location.search);
const product = window.NIKE_PRODUCTS.find((item) => item.id === params.get('product')) || window.NIKE_PRODUCTS[0];
document.title = product.shortTitle;
slides.innerHTML = product.hero.map((src, index) => `<figure class="slide"><img src="${src}" alt="${product.shortTitle} ${index + 1}" /></figure>`).join('');
document.querySelector('#productPrice').innerHTML = `<small>¥</small>${product.price}`;
document.querySelector('#productSold').textContent = product.sold;
document.querySelector('#productTitle').textContent = product.title;
document.querySelector('#detailImage').src = product.detail;
document.querySelector('#detailImage').alt = product.detailAlt;
['#specOne','#specTwo','#specThree','#specFour'].forEach((selector, index) => { document.querySelector(selector).textContent = product.specs[index]; });

pdpBack.addEventListener('click', () => {
  if (window.parent !== window) {
    window.parent.postMessage({ type: 'close-nike-pdp' }, location.origin);
    return;
  }
  window.location.href = 'list.html';
});

async function passwordDigest(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

if (sessionStorage.getItem('nike-demo-access') === 'granted') passwordGate.classList.add('hidden');

passwordForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const digest = await passwordDigest(passwordInput.value);
  if (digest === 'd521104a1c7a8a278a7212edf63856ca447bf3c2b4296c80c7c49afa13ed4cc1') {
    sessionStorage.setItem('nike-demo-access', 'granted');
    passwordGate.classList.add('hidden');
    return;
  }
  passwordError.textContent = '密码不正确，请重新输入';
  passwordInput.select();
});

function updateScrollHeader() {
  const revealAt = Math.max(80, hero.offsetHeight - 150);
  const shouldShow = window.scrollY > revealAt;
  scrollHeader.classList.toggle('visible', shouldShow);
  heroNav.classList.toggle('hidden', shouldShow);

  const detailStart = productDetail.offsetTop - scrollHeader.offsetHeight;
  const recommendStart = detailSection.offsetTop + detailSection.offsetHeight * 0.7;
  const activeTarget = window.scrollY >= recommendStart ? 'recommend' : window.scrollY >= detailStart ? 'detail' : 'top';
  scrollTabs.forEach((button) => {
    const isActive = button.dataset.scrollTarget === activeTarget;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });
}

window.addEventListener('scroll', updateScrollHeader, { passive: true });
updateScrollHeader();

document.querySelectorAll('[data-scroll-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.scrollTarget;
    if (target === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (target === 'detail') {
      productDetail.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.scrollTo({ top: detailSection.offsetTop + detailSection.offsetHeight * 0.7, behavior: 'smooth' });
  });
});
const current = document.querySelector('#current');
const total = document.querySelector('#total');
const count = slides.children.length;
total.textContent = count;

let ticking = false;
slides.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    current.textContent = Math.round(slides.scrollLeft / slides.clientWidth) + 1;
    ticking = false;
  });
}, { passive: true });

const toast = document.querySelector('#toast');
function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove('show'), 1600);
}

document.querySelector('.cart').addEventListener('click', () => notify('已加入购物车'));
document.querySelector('#buyNow').addEventListener('click', () => notify('请选择尺码'));

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js'));
}
