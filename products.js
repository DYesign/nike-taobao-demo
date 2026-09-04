window.NIKE_PRODUCTS = [
  {
    id: 'pegasus-premium',
    title: 'Nike 男子公路跑步鞋 ZoomX 回弹缓震运动鞋',
    shortTitle: 'Nike Pegasus Premium 男子公路跑步鞋',
    subtitle: 'ZoomX 泡棉 回弹缓震',
    price: 1399,
    sold: '已售 200+',
    hero: ['assets/shoe-head-1.png','assets/shoe-head-2.png','assets/shoe-head-3.jpeg','assets/shoe-head-4.jpeg','assets/shoe-head-5.jpeg'],
    detail: 'assets/shoe-detail-long.jpeg',
    detailAlt: 'Nike Pegasus Premium 完整商品详情',
    specs: ['低帮','公路跑','Nike','男子'],
    legacyDetail: true
  },
  {
    id: 'aeroswift',
    title: 'Nike AeroSwift Dri-FIT ADV 女子速干短款跑步背心',
    shortTitle: 'Nike AeroSwift 女子速干跑步背心',
    subtitle: '轻盈透气 干爽舒适',
    price: 599,
    sold: '已售 400+',
    hero: ['assets/products/performance-app/hero-1.png','assets/products/performance-app/hero-2.jpeg','assets/products/performance-app/hero-3.png','assets/products/performance-app/hero-4.jpeg','assets/products/performance-app/hero-5.png','assets/products/performance-app/hero-6.png','assets/products/performance-app/hero-7.png'],
    detail: 'assets/products/performance-app/detail.jpeg?v=26',
    detailAlt: 'Nike AeroSwift 完整商品详情',
    specs: ['短款','跑步','Nike','女子']
  },
  {
    id: 'zoom-skylon-11',
    title: 'Nike Zoom Skylon 11 耐克大白牙女子运动鞋',
    shortTitle: 'Nike Zoom Skylon 11 女子运动鞋',
    subtitle: 'Y2K 复古风格 Air Zoom 缓震',
    price: 719,
    sold: '已售 100+',
    hero: ['assets/products/lifestyle-ftw/hero-1.png','assets/products/lifestyle-ftw/hero-2.jpeg','assets/products/lifestyle-ftw/hero-3.png','assets/products/lifestyle-ftw/hero-4.jpeg','assets/products/lifestyle-ftw/hero-5.png'],
    detail: 'assets/products/lifestyle-ftw/detail.jpeg?v=26',
    detailAlt: 'Nike Zoom Skylon 11 完整商品详情',
    specs: ['低帮','休闲','Nike','女子']
  },
  {
    id: 'sportswear-tee',
    title: 'Nike Sportswear 男子宽松短袖 T 恤',
    shortTitle: 'Nike Sportswear 男子短袖 T 恤',
    subtitle: '顺滑舒适 宽松版型',
    price: 299,
    sold: '已售 300+',
    hero: ['assets/products/lifestyle-app/hero-1.png','assets/products/lifestyle-app/hero-2.png','assets/products/lifestyle-app/hero-3.png','assets/products/lifestyle-app/hero-4.jpeg','assets/products/lifestyle-app/hero-5.png','assets/products/lifestyle-app/hero-6.png'],
    detail: 'assets/products/lifestyle-app/detail.jpeg?v=26',
    detailAlt: 'Nike Sportswear 男子短袖 T 恤完整商品详情',
    specs: ['短袖','休闲','Nike','男子']
  }
];

window.setupNikeInstallGate = function () {
  const gate = document.querySelector('#installGate');
  if (!gate) return;
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isStandalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  if (!isIOS || isStandalone) return;
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
  gate.classList.add('visible');
  document.documentElement.classList.add('install-required');
  gate.querySelector('[data-safari]').hidden = !isSafari;
  gate.querySelector('[data-other]').hidden = isSafari;
  const copy = gate.querySelector('[data-copy]');
  copy?.addEventListener('click', async () => {
    await navigator.clipboard.writeText(location.href);
    copy.textContent = '链接已复制';
  });
};
