const slides = document.querySelector('#slides');
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
