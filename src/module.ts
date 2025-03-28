import { defineNuxtModule, addPlugin, createResolver, addServerHandler, addImportsDir } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  apiKey?: string
  baseUrl?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'mollie-module',
    configKey: 'mollie',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    baseUrl: 'https://api.mollie.com/v2',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Add runtime config for server-side
    nuxt.options.runtimeConfig.mollie = {
      apiKey: process.env.MOLLIE_API_KEY || options.apiKey,
      baseUrl: options.baseUrl,
    }

    // Add runtime config for client-side (only expose what's safe)
    nuxt.options.runtimeConfig.public.mollie = {
      baseUrl: options.baseUrl,
    }

    // Register server API routes
    addServerHandler({
      route: '/api/mollie/**',
      handler: resolver.resolve('./runtime/server/routes/api/mollie'),
    })

    // Add composables directory for auto-imports
    addImportsDir(resolver.resolve('./runtime/composables'))

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
