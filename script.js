const slides = document.querySelector('#slides');
const passwordGate = document.querySelector('#passwordGate');
const passwordForm = document.querySelector('#passwordForm');
const passwordInput = document.querySelector('#passwordInput');
const passwordError = document.querySelector('#passwordError');

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
