import { getQuery, getRouterParam, readBody, type H3Event } from 'h3'
import { fetchMollie } from './utils'
import type { ApiResponse, MollieCustomer } from './types'

export async function createCustomer(event: H3Event): Promise<ApiResponse<MollieCustomer>> {
  try {
    const body = await readBody(event)
    const data = await fetchMollie<MollieCustomer>(event, '/customers', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    return { success: true, data }
  }
  catch (error) {
    return {
      success: false,
      error: {
        status: error.statusCode || 500,
        title: 'Failed to create customer',
        detail: error.message,
      },
    }
  }
}

export async function getCustomer(event: H3Event): Promise<ApiResponse<MollieCustomer>> {
  try {
    const customerId = getRouterParam(event, 'id')

    if (!customerId) {
      return {
        success: false,
        error: {
          status: 400,
          title: 'Missing customer ID',
        },
      }
    }

    const data = await fetchMollie<MollieCustomer>(event, `/customers/${customerId}`)

    return { success: true, data }
  }
  catch (error) {
    return {
      success: false,
      error: {
        status: error.statusCode || 500,
        title: 'Failed to get customer',
        detail: error.message,
      },
    }
  }
}

export async function updateCustomer(event: H3Event): Promise<ApiResponse<MollieCustomer>> {
  try {
    const customerId = getRouterParam(event, 'id')

    if (!customerId) {
      return {
        success: false,
        error: {
          status: 400,
          title: 'Missing customer ID',
        },
      }
    }

    const body = await readBody(event)
    const data = await fetchMollie<MollieCustomer>(event, `/customers/${customerId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    })

    return { success: true, data }
  }
  catch (error) {
    return {
      success: false,
      error: {
        status: error.statusCode || 500,
        title: 'Failed to update customer',
        detail: error.message,
      },
    }
  }
}

export async function deleteCustomer(event: H3Event): Promise<ApiResponse<void>> {
  try {
    const customerId = getRouterParam(event, 'id')

    if (!customerId) {
      return {
        success: false,
        error: {
          status: 400,
          title: 'Missing customer ID',
        },
      }
    }

    await fetchMollie(event, `/customers/${customerId}`, {
      method: 'DELETE',
    })

    return { success: true }
  }
  catch (error) {
    return {
      success: false,
      error: {
        status: error.statusCode || 500,
        title: 'Failed to delete customer',
        detail: error.message,
      },
    }
  }
}

export async function listCustomers(event: H3Event): Promise<ApiResponse<{ count: number, _embedded: { customers: MollieCustomer[] } }>> {
  try {
    const query = getQuery(event)
    const queryParams = new URLSearchParams()

    if (query.limit) queryParams.append('limit', query.limit.toString())
    if (query.from) queryParams.append('from', query.from.toString())

    const path = `/customers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    const data = await fetchMollie<{ count: number, _embedded: { customers: MollieCustomer[] } }>(event, path)

    return { success: true, data }
  }
  catch (error) {
    return {
      success: false,
      error: {
        status: error.statusCode || 500,
        title: 'Failed to list customers',
        detail: error.message,
      },
    }
  }
}
