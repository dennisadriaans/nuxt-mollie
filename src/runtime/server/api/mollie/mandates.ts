import { getQuery, getRouterParam, readBody, type H3Event } from 'h3'
import { fetchMollie } from './utils'
import type { ApiResponse, MollieMandate } from './types'

export async function createMandate(event: H3Event): Promise<ApiResponse<MollieMandate>> {
  try {
    const customerId = getRouterParam(event, 'customerId')

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
    const data = await fetchMollie<MollieMandate>(event, `/customers/${customerId}/mandates`, {
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
        title: 'Failed to create mandate',
        detail: error.message,
      },
    }
  }
}

export async function getMandate(event: H3Event): Promise<ApiResponse<MollieMandate>> {
  try {
    const customerId = getRouterParam(event, 'customerId')
    const mandateId = getRouterParam(event, 'id')

    if (!customerId || !mandateId) {
      return {
        success: false,
        error: {
          status: 400,
          title: 'Missing customer ID or mandate ID',
        },
      }
    }

    const data = await fetchMollie<MollieMandate>(event, `/customers/${customerId}/mandates/${mandateId}`)

    return { success: true, data }
  }
  catch (error) {
    return {
      success: false,
      error: {
        status: error.statusCode || 500,
        title: 'Failed to get mandate',
        detail: error.message,
      },
    }
  }
}

export async function revokeMandate(event: H3Event): Promise<ApiResponse<void>> {
  try {
    const customerId = getRouterParam(event, 'customerId')
    const mandateId = getRouterParam(event, 'id')

    if (!customerId || !mandateId) {
      return {
        success: false,
        error: {
          status: 400,
          title: 'Missing customer ID or mandate ID',
        },
      }
    }

    await fetchMollie(event, `/customers/${customerId}/mandates/${mandateId}`, {
      method: 'DELETE',
    })

    return { success: true }
  }
  catch (error) {
    return {
      success: false,
      error: {
        status: error.statusCode || 500,
        title: 'Failed to revoke mandate',
        detail: error.message,
      },
    }
  }
}

export async function listMandates(event: H3Event): Promise<ApiResponse<{ count: number, _embedded: { mandates: MollieMandate[] } }>> {
  try {
    const customerId = getRouterParam(event, 'customerId')

    if (!customerId) {
      return {
        success: false,
        error: {
          status: 400,
          title: 'Missing customer ID',
        },
      }
    }

    const query = getQuery(event)
    const queryParams = new URLSearchParams()

    if (query.limit) queryParams.append('limit', query.limit.toString())
    if (query.from) queryParams.append('from', query.from.toString())

    const path = `/customers/${customerId}/mandates${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    const data = await fetchMollie<{ count: number, _embedded: { mandates: MollieMandate[] } }>(event, path)

    return { success: true, data }
  }
  catch (error) {
    return {
      success: false,
      error: {
        status: error.statusCode || 500,
        title: 'Failed to list mandates',
        detail: error.message,
      },
    }
  }
}
