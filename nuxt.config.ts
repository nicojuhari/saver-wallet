// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
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
          title: 'Saver Wallet',
          titleTemplate: '%s',
          link: [
              { rel: 'icon', type:'image/x-icon', href: '/favicon.ico' },
              { rel: 'icon', type:'image/svg+xml', href: '/favicon.svg' },
              { rel: 'shortcut icon', type:'image/png', sizes:"48x48", href:"/favicon-48x48.png" },
              { rel: 'apple-touch-icon', sizes:"180x180", href:"/apple-touch-icon.png" },
              { rel: 'manifest', href:"/site.webmanifest" }
          ],
          meta: [
              { name: 'apple-mobile-web-app-title', content: 'Saver Wallet' },
          ],
      },
  },
})
