export interface MollieApiOptions {
  apiKey: string
  baseUrl?: string
}

export interface MollieCustomer {
  id?: string
  name?: string
  email?: string
  locale?: string
  metadata?: Record<string, any>
}

export interface MollieMandate {
  id?: string
  customerId: string
  method: 'directdebit' | 'creditcard' | string
  consumerName?: string
  consumerAccount?: string
  consumerBic?: string
  signatureDate?: string
  mandateReference?: string
  paypalBillingAgreementId?: string
}

export interface MollieSubscription {
  id?: string
  customerId: string
  amount: {
    currency: string
    value: string
  }
  times?: number
  interval: string // e.g., "1 month", "1 week", etc.
  description: string
  webhookUrl?: string
  startDate?: string
  metadata?: Record<string, any>
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    status: number
    title: string
    detail?: string
  }
}
