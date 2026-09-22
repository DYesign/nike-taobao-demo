const isStandaloneMode = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
document.documentElement.classList.toggle('browser-mode', !isStandaloneMode);
document.documentElement.classList.toggle('chrome-browser-mode', !isStandaloneMode && /CriOS/.test(navigator.userAgent));

const SPOTLIGHT_PRODUCTS = {
  'hq2592': {
    name: 'Nike Pegasus Premium HQ2592',
    price: '1167',
    sold: '已售 700+',
    title: '耐克顶级飞马男子缓震专业跑步鞋 NIKE PEGASUS PREMIUM HQ2592',
    images: ['assets/products/hq2592/hero/11.avif','assets/products/hq2592/hero/03.avif','assets/products/hq2592/hero/04.avif','assets/products/hq2592/hero/05.avif','assets/products/hq2592/hero/06.avif'],
    videos: ['assets/products/hq2592/video/1.mp4','assets/products/hq2592/video/3.mp4','assets/products/hq2592/video/2.mp4'],
    strip: {
      gallery: 'assets/products/hq2592/hero/11.avif',
      videoThumb: 'assets/products/hq2592/video-thumb.jpg',
      extraCells: [{ img: 'assets/products/hq2592/hero/03.avif', label: '搭配' }],
      styles: [
        { img: 'assets/products/hq2592/hero/04.avif', code: '017 薄雾\n灰/暗蓝黑' },
        { img: 'assets/products/hq2592/hero/05.avif' }
      ]
    }
  },
  'hv0950': {
    name: 'Nike Tech HV0950',
    price: '827',
    sold: '已售 100+',
    title: '耐克男子休闲针织卫衣秋冬叠搭舒适拉链口袋连帽衫 NIKE HV0950',
    images: ['assets/products/hv0950/hero/01.jpg','assets/products/hv0950/hero/02.jpg','assets/products/hv0950/hero/03.avif','assets/products/hv0950/hero/04.avif','assets/products/hv0950/hero/05.avif'],
    videos: ['assets/products/hv0950/video/1.mp4','assets/products/hv0950/video/2.mp4'],
    strip: {
      gallery: 'assets/products/hv0950/hero/01.jpg',
      videoThumb: 'assets/products/hv0950/video-thumb.jpg',
      extraCells: [],
      styles: [
        { img: 'assets/products/hv0950/hero/04.avif' },
        { img: 'assets/products/hv0950/hero/05.avif' }
      ]
    }
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
strip.innerHTML = [
  `<button type="button" class="gvs-cell active" data-goto="gallery" aria-label="查看图集"><img src="${product.strip.gallery}" alt="图集" /><span class="gvs-label">图集</span></button>`,
  `<button type="button" class="gvs-cell" data-goto="video" aria-label="查看视频"><img src="${product.strip.videoThumb}" alt="视频" /><span class="gvs-label">视频</span></button>`,
  ...(product.strip.extraCells || []).map((c) => `<div class="gvs-cell"><img src="${c.img}" alt="${c.label}" /><span class="gvs-label">${c.label}</span></div>`),
  ...product.strip.styles.map((s) => `<div class="gvs-style${s.code ? ' has-code' : ''}"><img src="${s.img}" alt="${s.code || product.name}" />${s.code ? `<span>${s.code}</span>` : ''}</div>`),
  '<span class="gvs-all">全部 ›</span>'
].join('');

const galleryBtn = strip.querySelector('[data-goto="gallery"]');
const videoBtn = strip.querySelector('[data-goto="video"]');
galleryBtn.addEventListener('click', () => slides.scrollTo({ left: 0, behavior: 'auto' }));
videoBtn.addEventListener('click', () => slides.scrollTo({ left: product.images.length * slides.clientWidth, behavior: 'auto' }));

const current = document.querySelector('#current');
document.querySelector('#total').textContent = media.length;

let ticking = false;
function activeIndex() {
  return Math.round(slides.scrollLeft / slides.clientWidth);
}
function syncPlayback() {
  const active = activeIndex();
  current.textContent = active + 1;
  const onVideo = active >= product.images.length;
  galleryBtn.classList.toggle('active', !onVideo);
  videoBtn.classList.toggle('active', onVideo);
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
