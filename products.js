window.NIKE_PRODUCTS = [
  {
    id: 'nike-acc-1-backpack',
    title: 'Nike 21L 运动双肩包 ACC 1',
    shortTitle: 'Nike 21L 运动双肩包 ACC 1',
    subtitle: '多隔层收纳 舒适背负',
    price: 499,
    sold: '已售 100+',
    hero: ['assets/products/nike-acc-1/hero-1.png','assets/products/nike-acc-1/hero-2.jpeg','assets/products/nike-acc-1/hero-3.jpeg','assets/products/nike-acc-1/hero-4.jpeg','assets/products/nike-acc-1/hero-5.png'],
    detail: 'assets/products/nike-acc-1/detail.png?v=45',
    detailAlt: 'Nike 21L 运动双肩包 ACC 1 完整商品详情',
    specs: ['双肩包','运动','Nike','通用'],
  },
  {
    id: 'nike-acc-2-backpack',
    title: 'Nike 21L 运动双肩包 ACC 2',
    shortTitle: 'Nike 21L 运动双肩包 ACC 2',
    subtitle: '轻松收纳 稳固贴合',
    price: 499,
    sold: '已售 100+',
    hero: ['assets/products/nike-acc-2/hero-1.png','assets/products/nike-acc-2/hero-2.jpeg','assets/products/nike-acc-2/hero-3.jpeg','assets/products/nike-acc-2/hero-4.jpeg','assets/products/nike-acc-2/hero-5.png'],
    detail: 'assets/products/nike-acc-2/detail.png?v=45',
    detailAlt: 'Nike 21L 运动双肩包 ACC 2 完整商品详情',
    specs: ['双肩包','运动','Nike','通用'],
  },
  {
    id: 'jordan-luka-77-pf',
    title: 'Jordan Luka 77 PF 东契奇男子篮球鞋',
    shortTitle: 'Jordan Luka 77 PF 男子篮球鞋',
    subtitle: 'Air Zoom 缓震 耐穿抓地',
    price: 899,
    sold: '已售 100+',
    hero: ['assets/products/jordan-performance-ftw/hero-1.png','assets/products/jordan-performance-ftw/hero-2.png','assets/products/jordan-performance-ftw/hero-3.jpeg','assets/products/jordan-performance-ftw/hero-4.jpeg','assets/products/jordan-performance-ftw/hero-5.jpeg'],
    detail: 'assets/products/jordan-performance-ftw/detail.png?v=45',
    detailAlt: 'Jordan Luka 77 PF 完整商品详情',
    specs: ['低帮','篮球','Jordan','男子'],
  },
  {
    id: 'pegasus-premium',
    title: 'Nike 男子公路跑步鞋 ZoomX 回弹缓震运动鞋',
    shortTitle: 'Nike Pegasus Premium 男子公路跑步鞋',
    subtitle: 'ZoomX 泡棉 回弹缓震',
    price: 1399,
    sold: '已售 200+',
    hero: ['assets/shoe-head-1.png','assets/shoe-head-2.png','assets/shoe-head-3.jpeg','assets/shoe-head-4.jpeg','assets/shoe-head-5.jpeg'],
    detail: 'assets/shoe-detail-long.jpeg?v=45',
    detailAlt: 'Nike Pegasus Premium 完整商品详情',
    specs: ['低帮','公路跑','Nike','男子'],
  },
  {
    id: 'aeroswift',
    title: 'Nike AeroSwift Dri-FIT ADV 女子速干短款跑步背心',
    shortTitle: 'Nike AeroSwift 女子速干跑步背心',
    subtitle: '轻盈透气 干爽舒适',
    price: 599,
    sold: '已售 400+',
    hero: ['assets/products/performance-app/hero-1.png','assets/products/performance-app/hero-2.jpeg','assets/products/performance-app/hero-3.png','assets/products/performance-app/hero-4.jpeg','assets/products/performance-app/hero-5.png?v=36','assets/products/performance-app/hero-6.png','assets/products/performance-app/hero-7.png'],
    detail: 'assets/products/performance-app/detail.jpeg?v=45',
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
    detail: 'assets/products/lifestyle-ftw/detail.jpeg?v=45',
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
    detail: 'assets/products/lifestyle-app/detail.jpeg?v=45',
    detailAlt: 'Nike Sportswear 男子短袖 T 恤完整商品详情',
    specs: ['短袖','休闲','Nike','男子']
  }
];

window.setupNikeInstallGate = function () {
  const gate = document.querySelector('#installGate');
  if (!gate) return;
  gate.classList.remove('visible');
  document.documentElement.classList.remove('install-required');
  gate.replaceChildren();
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isStandalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  if (!isIOS || isStandalone) return;
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
  gate.innerHTML = isSafari ? `
    <div class="install-card">
      <img class="nike-logo" src="assets/nike-logo.svg" alt="Nike" />
      <h1>添加到手机桌面</h1>
      <div class="install-steps">
        <article><b>1</b><div><strong>共享</strong><span>点击 Safari 的“…”菜单，选择“共享”</span></div><img src="assets/install-share.jpg" alt="Safari 共享菜单中的共享按钮" /></article>
        <article><b>2</b><div><strong>添加到主屏幕</strong><span>在共享菜单中找到并点击这一项</span></div><img src="assets/install-home-screen.jpg" alt="共享菜单中的添加到主屏幕按钮" /></article>
        <article class="compact-step"><b>3</b><div><strong>添加</strong><span>最后点击右上角的“添加”</span></div></article>
      </div>
    </div>` : `
    <div class="install-card">
      <img class="nike-logo" src="assets/nike-logo.svg" alt="Nike" />
      <h1>请使用 Safari 打开</h1>
      <div class="install-steps simple-steps">
        <article><b>1</b><div><strong>复制当前链接</strong></div></article>
        <article><b>2</b><div><strong>在 Safari 中粘贴打开</strong></div></article>
        <article><b>3</b><div><strong>按照提示添加到主屏幕</strong></div></article>
      </div>
      <button type="button" data-copy>复制链接</button>
    </div>`;
  gate.classList.add('visible');
  document.documentElement.classList.add('install-required');
  const copy = gate.querySelector('[data-copy]');
  copy?.addEventListener('click', async () => {
    await navigator.clipboard.writeText(location.href);
    copy.textContent = '链接已复制';
  });
};
