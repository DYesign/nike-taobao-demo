const SPOTLIGHT_PRODUCTS = {
  'hq2592': {
    name: 'Nike Pegasus Premium HQ2592',
    badge: '新风潮 · 超级爆款',
    price: '1167',
    originalPrice: '优惠前 ¥1289',
    coupon: '会员券满900减90',
    deadline: '9月27日 24点结束',
    sold: '已售 700+',
    title: '耐克顶级飞马男子缓震专业跑步鞋 NIKE PEGASUS PREMIUM HQ2592',
    chips: ['店铺一年回头客 200万+', '超 4 千人加购', '榜单 · 耐克跑步鞋热销榜'],
    images: ['assets/products/hq2592/hero/01.jpg','assets/products/hq2592/hero/02.jpg','assets/products/hq2592/hero/03.avif','assets/products/hq2592/hero/04.avif','assets/products/hq2592/hero/05.avif','assets/products/hq2592/hero/06.avif','assets/products/hq2592/hero/07.avif','assets/products/hq2592/hero/08.avif','assets/products/hq2592/hero/09.avif','assets/products/hq2592/hero/10.avif','assets/products/hq2592/hero/11.avif'],
    videos: ['assets/products/hq2592/video/1.mp4','assets/products/hq2592/video/2.mp4']
  },
  'hv0950': {
    name: 'Nike Tech HV0950',
    badge: '新风潮 · 热销爆款',
    price: '827',
    originalPrice: '优惠前 ¥899',
    coupon: '券满500减40',
    deadline: '9月27日 24点结束',
    sold: '已售 100+',
    title: '耐克男子休闲针织卫衣秋冬叠搭舒适拉链口袋连帽衫 NIKE HV0950',
    chips: ['店铺一年回头客 200万+', '近 7 天 1000+ 人逛过'],
    images: ['assets/products/hv0950/hero/01.jpg','assets/products/hv0950/hero/02.jpg','assets/products/hv0950/hero/03.avif','assets/products/hv0950/hero/04.avif','assets/products/hv0950/hero/05.avif','assets/products/hv0950/hero/06.avif','assets/products/hv0950/hero/07.avif','assets/products/hv0950/hero/08.avif','assets/products/hv0950/hero/09.avif','assets/products/hv0950/hero/10.avif','assets/products/hv0950/hero/11.avif','assets/products/hv0950/hero/12.avif'],
    videos: ['assets/products/hv0950/video/1.mp4','assets/products/hv0950/video/2.mp4']
  }
};

const product = SPOTLIGHT_PRODUCTS[new URLSearchParams(location.search).get('p')] || Object.values(SPOTLIGHT_PRODUCTS)[0];
document.title = product.name;

const slides = document.querySelector('#slides');
const media = [
  ...product.images.map((src) => ({ type: 'img', src })),
  ...product.videos.map((src) => ({ type: 'video', src }))
];
slides.innerHTML = media.map((item, index) => item.type === 'img'
  ? `<figure class="slide"><img src="${item.src}" alt="${product.name} ${index + 1}" loading="${index < 2 ? 'eager' : 'lazy'}" decoding="async" ${index === 0 ? 'fetchpriority="high"' : ''} /></figure>`
  : `<figure class="slide"><video src="${item.src}" muted loop playsinline preload="metadata"></video></figure>`
).join('');

document.querySelector('#price').textContent = product.price;
document.querySelector('#origPrice').textContent = product.originalPrice;
document.querySelector('#coupon').textContent = product.coupon;
document.querySelector('#badge').textContent = product.badge;
document.querySelector('#deadline').textContent = product.deadline;
document.querySelector('#sold').textContent = product.sold;
document.querySelector('#title').textContent = product.title;
document.querySelector('#chips').innerHTML = product.chips.map((chip) => `<span>${chip}</span>`).join('');

const current = document.querySelector('#current');
document.querySelector('#total').textContent = media.length;

let ticking = false;
function activeIndex() {
  return Math.round(slides.scrollLeft / slides.clientWidth);
}
function syncPlayback() {
  const active = activeIndex();
  current.textContent = active + 1;
  slides.querySelectorAll('video').forEach((video) => {
    const slideIndex = [...slides.children].indexOf(video.closest('.slide'));
    if (slideIndex === active) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
}
slides.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { syncPlayback(); ticking = false; });
}, { passive: true });
syncPlayback();
