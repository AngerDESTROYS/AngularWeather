
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/angular-demo-app/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/angular-demo-app"
  },
  {
    "renderMode": 2,
    "redirectTo": "/angular-demo-app",
    "route": "/angular-demo-app/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23612, hash: 'b61079b203e2cc5e9715a18f47997551fb1c81392fc0c19dce10c9c0bc1cb8af', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17186, hash: '3c5d50fa3ef8aea9c637c337c3fa696e23c7e4b9a565fb18b65b46c14d40fb57', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 68941, hash: '42e9f23d31a991ea74ef56a2c77d039d0531bba235316b8e1b42c9adb5b8ed1c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-36AW6TKX.css': {size: 6979, hash: 'vY6tjD/ce7M', text: () => import('./assets-chunks/styles-36AW6TKX_css.mjs').then(m => m.default)}
  },
};
