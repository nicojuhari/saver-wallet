// https://nuxt.com/docs/api/configuration/nuxt-config
const siteDescription = 'Never forget your loyalty, discount, or membership cards again! Easily add and share your cards online, and start saving together with friends and family.'

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  modules: ['@nuxt/icon', 'radix-vue/nuxt'],
  icon: {
    serverBundle: {
      collections: ['ph'] // <!--- this
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
      head: { 
          htmlAttrs: {
            lang: 'en'
          },
          title: 'Saver Wallet - for Loyalty, Discount, and Membership Cards',
    
          titleTemplate: '%s',
          link: [
              { rel: 'icon', type:'image/x-icon', href: '/favicon.ico' },
              { rel: 'icon', type:'image/svg+xml', href: '/favicon.svg' },
              { rel: 'shortcut icon', type:'image/png', sizes:"48x48", href:"/favicon-48x48.png" },
              { rel: 'apple-touch-icon', sizes:"180x180", href:"/apple-touch-icon.png" },
              { rel: 'manifest', href:"/site.webmanifest" }
          ],
          meta: [
              { name: 'description', content: siteDescription },
              { name: 'apple-mobile-web-app-title', content: 'Saver Wallet' },
          ],
          script: [
            { src:"https://cdn.splitbee.io/sb.js", async: ''}
          ]
      },
  }
})