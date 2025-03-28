import { getQuery, getRouterParam, readBody, type H3Event } from 'h3'
import { fetchMollie } from './utils'
import type { ApiResponse, MollieSubscription } from './types'

export async function createSubscription(event: H3Event): Promise<ApiResponse<MollieSubscription>> {
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
    const data = await fetchMollie<MollieSubscription>(event, `/customers/${customerId}/subscriptions`, {
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
        title: 'Failed to create subscription',
        detail: error.message,
      },
    }
  }
}

export async function getSubscription(event: H3Event): Promise<ApiResponse<MollieSubscription>> {
  try {
    const customerId = getRouterParam(event, 'customerId')
    const subscriptionId = getRouterParam(event, 'id')

    if (!customerId || !subscriptionId) {
      return {
        success: false,
        error: {
          status: 400,
          title: 'Missing customer ID or subscription ID',
        },
      }
    }

    const data = await fetchMollie<MollieSubscription>(
      event,
      `/customers/${customerId}/subscriptions/${subscriptionId}`,
    )

    return { success: true, data }
  }
  catch (error) {
    return {
      success: false,
      error: {
        status: error.statusCode || 500,
        title: 'Failed to get subscription',
        detail: error.message,
      },
    }
  }
}

export async function updateSubscription(event: H3Event): Promise<ApiResponse<MollieSubscription>> {
  try {
    const customerId = getRouterParam(event, 'customerId')
    const subscriptionId = getRouterParam(event, 'id')

    if (!customerId || !subscriptionId) {
      return {
        success: false,
        error: {
          status: 400,
          title: 'Missing customer ID or subscription ID',
        },
      }
    }

    const body = await readBody(event)
    const data = await fetchMollie<MollieSubscription>(
      event,
      `/customers/${customerId}/subscriptions/${subscriptionId}`,
      {
        method: 'PATCH',
        body: JSON.stringify(body),
      },
    )

    return { success: true, data }
  }
  catch (error) {
    return {
      success: false,
      error: {
        status: error.statusCode || 500,
        title: 'Failed to update subscription',
        detail: error.message,
      },
    }
  }
}

export async function cancelSubscription(event: H3Event): Promise<ApiResponse<void>> {
  try {
    const customerId = getRouterParam(event, 'customerId')
    const subscriptionId = getRouterParam(event, 'id')

    if (!customerId || !subscriptionId) {
      return {
        success: false,
        error: {
          status: 400,
          title: 'Missing customer ID or subscription ID',
        },
      }
    }

    await fetchMollie(
      event,
      `/customers/${customerId}/subscriptions/${subscriptionId}`,
      {
        method: 'DELETE',
      },
    )

    return { success: true }
  }
  catch (error) {
    return {
      success: false,
      error: {
        status: error.statusCode || 500,
        title: 'Failed to cancel subscription',
        detail: error.message,
      },
    }
  }
}

export async function listSubscriptions(event: H3Event): Promise<ApiResponse<{ count: number, _embedded: { subscriptions: MollieSubscription[] } }>> {
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

    const path = `/customers/${customerId}/subscriptions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    const data = await fetchMollie<{ count: number, _embedded: { subscriptions: MollieSubscription[] } }>(
      event,
      path,
    )

    return { success: true, data }
  }
  catch (error) {
    return {
      success: false,
      error: {
        status: error.statusCode || 500,
        title: 'Failed to list subscriptions',
        detail: error.message,
      },
    }
  }
}
