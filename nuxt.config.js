//const pkg = require('.package');
//const bodyParser = require('body-parser');

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'my_app_nuxt2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/index.js',
    '@/plugins/internal.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {

  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    // please set your icon app
    icon: false,
    manifest: {
      name: 'My Awesome App',
      lang: 'fa',
      useWebmanifestExtension: false
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  /*
  router middleware log
   */
  serverMiddleware: [
    /*bodyParser.json(),
    '~/api'*/
  ],

  generate: {
    /*routes: function() {
      axios.get('');
      return [

      ]
    }*/
  },

  loading: {
    continuous: true
  },

  /*env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:8000/api/'
  }*/
}
