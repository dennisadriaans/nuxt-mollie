import { fileURLToPath } from 'node:url'
import { describe, it, expect, vi } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

// Mock global fetch function
vi.stubGlobal('fetch', vi.fn().mockImplementation((url, options) => {
  if (url.includes('/api/mollie/customers')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        id: 'cst_mock1234',
        name: 'Test Customer',
        email: 'test@example.com',
      }),
    })
  }

  if (url.includes('/customers/cst_mock1234/mandates')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        id: 'mdt_mock1234',
        customerId: 'cst_mock1234',
        method: 'creditcard',
      }),
    })
  }

  if (url.includes('/customers/cst_mock1234/subscriptions')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        id: 'sub_mock1234',
        customerId: 'cst_mock1234',
        amount: {
          value: '25.00',
          currency: 'EUR',
        },
        interval: '1 month',
        description: 'Test subscription',
      }),
    })
  }

  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
}))

describe('Mollie Module', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    server: true,
    nuxtConfig: {
      mollie: {
        apiKey: 'test_mock_api_key',
      },
    },
  })

  it('exposes composable', async () => {
    const html = await $fetch('/')
    expect(html).toContain('mollie-module-test')
  })

  it('creates customer via API endpoint', async () => {
    const response = await $fetch('/api/mollie/customers', {
      method: 'POST',
      body: {
        name: 'Test Customer',
        email: 'test@example.com',
      },
    })

    expect(response.success).toBe(true)
    expect(response.data.name).toBe('Test Customer')
    expect(response.data.email).toBe('test@example.com')
  })

  it('creates mandate via API endpoint', async () => {
    const response = await $fetch('/api/mollie/customers/cst_mock1234/mandates', {
      method: 'POST',
      body: {
        method: 'creditcard',
      },
    })

    expect(response.success).toBe(true)
    expect(response.data.customerId).toBe('cst_mock1234')
    expect(response.data.method).toBe('creditcard')
  })

  it('creates subscription via API endpoint', async () => {
    const response = await $fetch('/api/mollie/customers/cst_mock1234/subscriptions', {
      method: 'POST',
      body: {
        amount: {
          value: '25.00',
          currency: 'EUR',
        },
        interval: '1 month',
        description: 'Test subscription',
      },
    })

    expect(response.success).toBe(true)
    expect(response.data.customerId).toBe('cst_mock1234')
    expect(response.data.interval).toBe('1 month')
    expect(response.data.amount.value).toBe('25.00')
  })
})
