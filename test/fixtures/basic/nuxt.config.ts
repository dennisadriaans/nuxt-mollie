import MollieModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MollieModule,
  ],

  // Set default test config for Mollie
  mollie: {
    apiKey: 'test_api_key_for_testing',
  },
})
