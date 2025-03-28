import type { MollieCustomer, MollieMandate, MollieSubscription } from '../server/api/mollie/types'

export interface MollieComposable {
  customers: {
    create: (customer: Partial<MollieCustomer>) => Promise<void>
    get: (id: string) => Promise<any>
    update: (id: string, data: Partial<MollieCustomer>) => Promise<any>
    delete: (id: string) => Promise<any>
    list: (params?: { limit?: number, from?: string }) => Promise<any>
  }
  mandates: {
    create: (customerId: string, mandate: Partial<MollieMandate>) => Promise<any>
    get: (customerId: string, id: string) => Promise<any>
    revoke: (customerId: string, id: string) => Promise<any>
    list: (customerId: string, params?: { limit?: number, from?: string }) => Promise<any>
  }
  subscriptions: {
    create: (customerId: string, subscription: Partial<MollieSubscription>) => Promise<any>
    get: (customerId: string, id: string) => Promise<any>
    update: (customerId: string, id: string, data: Partial<MollieSubscription>) => Promise<any>
    cancel: (customerId: string, id: string) => Promise<any>
    list: (customerId: string, params?: { limit?: number, from?: string }) => Promise<any>
  }
  baseUrl: string
}

export function useMollie(): MollieComposable {
  const baseUrl = '/api/mollie'

  // Customers API
  const customers = {
    // Create a new customer
    create: async (customer: Partial<MollieCustomer>) => {
      return await $fetch(`${baseUrl}/customers`, {
        method: 'POST',
        body: customer,
      })
    },

    // Get a customer by ID
    get: async (id: string) => {
      return await $fetch(`${baseUrl}/customers/${id}`)
    },

    // Update a customer
    update: async (id: string, data: Partial<MollieCustomer>) => {
      return await $fetch(`${baseUrl}/customers/${id}`, {
        method: 'PATCH',
        body: data,
      })
    },

    // Delete a customer
    delete: async (id: string) => {
      return await $fetch(`${baseUrl}/customers/${id}`, {
        method: 'DELETE',
      })
    },

    // List customers
    list: async (params?: { limit?: number, from?: string }) => {
      return await $fetch(`${baseUrl}/customers`, {
        params,
      })
    },
  }

  // Mandates API
  const mandates = {
    // Create a new mandate for a customer
    create: async (customerId: string, mandate: Partial<MollieMandate>) => {
      return await $fetch(`${baseUrl}/customers/${customerId}/mandates`, {
        method: 'POST',
        body: mandate,
      })
    },

    // Get a mandate by ID
    get: async (customerId: string, id: string) => {
      return await $fetch(`${baseUrl}/customers/${customerId}/mandates/${id}`)
    },

    // Revoke a mandate
    revoke: async (customerId: string, id: string) => {
      return await $fetch(`${baseUrl}/customers/${customerId}/mandates/${id}`, {
        method: 'DELETE',
      })
    },

    // List mandates for a customer
    list: async (customerId: string, params?: { limit?: number, from?: string }) => {
      return await $fetch(`${baseUrl}/customers/${customerId}/mandates`, {
        params,
      })
    },
  }

  // Subscriptions API
  const subscriptions = {
    // Create a new subscription for a customer
    create: async (customerId: string, subscription: Partial<MollieSubscription>) => {
      return await $fetch(`${baseUrl}/customers/${customerId}/subscriptions`, {
        method: 'POST',
        body: subscription,
      })
    },

    // Get a subscription by ID
    get: async (customerId: string, id: string) => {
      return await $fetch(`${baseUrl}/customers/${customerId}/subscriptions/${id}`)
    },

    // Update a subscription
    update: async (customerId: string, id: string, data: Partial<MollieSubscription>) => {
      return await $fetch(`${baseUrl}/customers/${customerId}/subscriptions/${id}`, {
        method: 'PATCH',
        body: data,
      })
    },

    // Cancel a subscription
    cancel: async (customerId: string, id: string) => {
      return await $fetch(`${baseUrl}/customers/${customerId}/subscriptions/${id}`, {
        method: 'DELETE',
      })
    },

    // List subscriptions for a customer
    list: async (customerId: string, params?: { limit?: number, from?: string }) => {
      return await $fetch(`${baseUrl}/customers/${customerId}/subscriptions`, {
        params,
      })
    },
  }

  return {
    customers,
    mandates,
    subscriptions,
    baseUrl,
  }
}
