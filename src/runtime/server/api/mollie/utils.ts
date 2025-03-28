import { createError, type H3Event } from 'h3'
import type { MollieApiOptions } from './types'

export function getMollieConfig(event: H3Event): MollieApiOptions {
  const config = useRuntimeConfig(event)

  if (!config.mollie?.apiKey) {
    throw new Error('Mollie API key is not configured')
  }

  return {
    apiKey: config.mollie.apiKey,
    baseUrl: config.mollie.baseUrl || 'https://api.mollie.com/v2',
  }
}

export async function fetchMollie<T>(event: H3Event, path: string, options: RequestInit = {}): Promise<T> {
  const config = getMollieConfig(event)

  const headers = new Headers(options.headers)
  headers.set('Authorization', `Bearer ${config.apiKey}`)
  headers.set('Content-Type', 'application/json')

  const response = await fetch(`${config.baseUrl}${path}`, {
    ...options,
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: response.statusText,
      data,
    })
  }

  return data as T
}
