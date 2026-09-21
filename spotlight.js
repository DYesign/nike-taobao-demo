const isStandaloneMode = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
document.documentElement.classList.toggle('browser-mode', !isStandaloneMode);
document.documentElement.classList.toggle('chrome-browser-mode', !isStandaloneMode && /CriOS/.test(navigator.userAgent));

const SPOTLIGHT_PRODUCTS = {
  'hq2592': {
    name: 'Nike Pegasus Premium HQ2592',
    price: '1167',
    sold: '已售 700+',
    title: '耐克顶级飞马男子缓震专业跑步鞋 NIKE PEGASUS PREMIUM HQ2592',
    images: ['assets/products/hq2592/hero/01.jpg','assets/products/hq2592/hero/02.jpg','assets/products/hq2592/hero/11.avif','assets/products/hq2592/hero/03.avif','assets/products/hq2592/hero/04.avif','assets/products/hq2592/hero/05.avif','assets/products/hq2592/hero/06.avif','assets/products/hq2592/hero/07.avif','assets/products/hq2592/hero/08.avif','assets/products/hq2592/hero/09.avif','assets/products/hq2592/hero/10.avif'],
    videos: ['assets/products/hq2592/video/1.mp4','assets/products/hq2592/video/3.mp4','assets/products/hq2592/video/2.mp4'],
    stripImage: 'assets/products/hq2592/strip.jpg',
    strip: {
      gallery: 'assets/products/hq2592/hero/01.jpg',
      videoThumb: 'assets/products/hq2592/video-thumb.jpg',
      styles: [
        { img: 'assets/products/hq2592/hero/03.avif', code: 'HQ2592-017' },
        { img: 'assets/products/hq2592/hero/04.avif', code: 'HQ2592-019' }
      ]
    }
  },
  'hv0950': {
    name: 'Nike Tech HV0950',
    price: '827',
    sold: '已售 100+',
    title: '耐克男子休闲针织卫衣秋冬叠搭舒适拉链口袋连帽衫 NIKE HV0950',
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

document.querySelector('#productPrice').innerHTML = `<small>¥</small>${product.price}`;
document.querySelector('#productSold').textContent = product.sold;
document.querySelector('#productTitle').textContent = product.title;

const strip = document.querySelector('#galleryStrip');
if (product.stripImage) {
  strip.classList.add('static');
  strip.innerHTML = `<img src="${product.stripImage}" alt="图集、视频、搭配和全部款式" />`;
} else if (product.strip) {
  strip.innerHTML = [
    `<div class="gvs-cell"><img src="${product.strip.gallery}" alt="图集" /><span class="gvs-label">图集</span></div>`,
    `<div class="gvs-cell"><img src="${product.strip.videoThumb}" alt="视频" /><span class="gvs-label">视频</span></div>`,
    ...product.strip.styles.map((s) => `<div class="gvs-style"><img src="${s.img}" alt="${s.code || product.name}" />${s.code ? `<span>${s.code}</span>` : ''}</div>`),
    '<span class="gvs-all">全部 ›</span>'
  ].join('');
} else {
  strip.remove();
}

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

const toast = document.querySelector('#toast');
function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove('show'), 1600);
}
document.querySelector('#buyNow').addEventListener('click', () => notify('请选择尺码'));
document.querySelector('#pdpBack').addEventListener('click', () => history.back());
