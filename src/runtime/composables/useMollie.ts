import type { MollieCustomer, MollieMandate, MollieSubscription } from '../server/api/mollie/types'

export interface MollieComposable {
  customers: {
    create: (customer: Partial<MollieCustomer>) => Promise<any>
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
  console.log(123)
}
