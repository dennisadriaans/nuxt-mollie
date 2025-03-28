import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Composable to interact with Mollie APIs
  const useMollie = () => {
    // Customers API
    const customers = {
      // Create a new customer
      create: async (customer: any) => {
        return await $fetch('/api/mollie/customers', {
          method: 'POST',
          body: customer,
        })
      },

      // Get a customer by ID
      get: async (id: string) => {
        return await $fetch(`/api/mollie/customers/${id}`)
      },

      // Update a customer
      update: async (id: string, data: any) => {
        return await $fetch(`/api/mollie/customers/${id}`, {
          method: 'PATCH',
          body: data,
        })
      },

      // Delete a customer
      delete: async (id: string) => {
        return await $fetch(`/api/mollie/customers/${id}`, {
          method: 'DELETE',
        })
      },

      // List customers
      list: async (params?: { limit?: number, from?: string }) => {
        return await $fetch('/api/mollie/customers', {
          params,
        })
      },
    }

    // Mandates API
    const mandates = {
      // Create a new mandate for a customer
      create: async (customerId: string, mandate: any) => {
        return await $fetch(`/api/mollie/customers/${customerId}/mandates`, {
          method: 'POST',
          body: mandate,
        })
      },

      // Get a mandate by ID
      get: async (customerId: string, id: string) => {
        return await $fetch(`/api/mollie/customers/${customerId}/mandates/${id}`)
      },

      // Revoke a mandate
      revoke: async (customerId: string, id: string) => {
        return await $fetch(`/api/mollie/customers/${customerId}/mandates/${id}`, {
          method: 'DELETE',
        })
      },

      // List mandates for a customer
      list: async (customerId: string, params?: { limit?: number, from?: string }) => {
        return await $fetch(`/api/mollie/customers/${customerId}/mandates`, {
          params,
        })
      },
    }

    // Subscriptions API
    const subscriptions = {
      // Create a new subscription for a customer
      create: async (customerId: string, subscription: any) => {
        return await $fetch(`/api/mollie/customers/${customerId}/subscriptions`, {
          method: 'POST',
          body: subscription,
        })
      },

      // Get a subscription by ID
      get: async (customerId: string, id: string) => {
        return await $fetch(`/api/mollie/customers/${customerId}/subscriptions/${id}`)
      },

      // Update a subscription
      update: async (customerId: string, id: string, data: any) => {
        return await $fetch(`/api/mollie/customers/${customerId}/subscriptions/${id}`, {
          method: 'PATCH',
          body: data,
        })
      },

      // Cancel a subscription
      cancel: async (customerId: string, id: string) => {
        return await $fetch(`/api/mollie/customers/${customerId}/subscriptions/${id}`, {
          method: 'DELETE',
        })
      },

      // List subscriptions for a customer
      list: async (customerId: string, params?: { limit?: number, from?: string }) => {
        return await $fetch(`/api/mollie/customers/${customerId}/subscriptions`, {
          params,
        })
      },
    }

    return {
      customers,
      mandates,
      subscriptions,
    }
  }

  // Provide the composable
  nuxtApp.provide('mollie', useMollie())
})
