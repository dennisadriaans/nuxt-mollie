export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },

  // Optional: Add tailwind for the demo UI
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-03-28',
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Mollie module configuration
  mollie: {
    apiKey: process.env.MOLLIE_API_KEY || '', // For development, replace with your test API key
  },
})
