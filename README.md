# Mollie Nuxt Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt module for integrating with the Mollie payment provider.

## Features

- 🔑 &nbsp;Secure API integration with Mollie
- 👤 &nbsp;Complete Customers API
- 📝 &nbsp;Full Mandates API
- 💳 &nbsp;Subscriptions management
- 🔄 &nbsp;Type-safe composables

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
# Using npm
npm install mollie-module

# Using yarn
yarn add mollie-module

# Using pnpm
pnpm add mollie-module
```

## ⚠️  Warning Implement proper security

This module exposes several API routes that are not protected by default. You should implement your own authentication and authorization mechanisms to secure these routes in a production environment. Anyone with access to these routes could potentially:

- Access customer information
- Create, modify, or delete customer mandates
- Manage subscriptions

Implement proper security measures before deploying to production.

## Configuration

Add the module to your `nuxt.config.ts` and configure it:

```ts
export default defineNuxtConfig({
  modules: ['mollie-module'],
  
  mollie: {
    apiKey: process.env.MOLLIE_API_KEY, // Recommended to use environment variable
    baseUrl: 'https://api.mollie.com/v2' // Default, can be omitted
  }
})
```

### Environment Variables

It's recommended to use environment variables for sensitive information like API keys. Create a `.env` file in your project root:

```bash
# .env
MOLLIE_API_KEY=your_mollie_api_key_here
```

For development, you can use Mollie's test API keys which start with `test_`. For production, use keys that start with `live_`.
```

## Usage

### Client-side

You can use the provided composable in your Vue components:

```vue
<script setup>
const { customers, mandates, subscriptions } = useMollie()

// Create a customer
const createNewCustomer = async () => {
  const response = await customers.create({
    name: 'John Doe',
    email: 'john@example.com'
  })
  
  if (response.success) {
    console.log('Customer created:', response.data)
  }
}

// List customer's mandates
const getCustomerMandates = async (customerId) => {
  const response = await mandates.list(customerId)
  
  if (response.success) {
    return response.data._embedded.mandates
  }
}

// Create a subscription
const createSubscription = async (customerId) => {
  const response = await subscriptions.create(customerId, {
    amount: {
      currency: 'EUR',
      value: '25.00'
    },
    interval: '1 month',
    description: 'Monthly subscription'
  })
  
  if (response.success) {
    console.log('Subscription created:', response.data)
  }
}
</script>
```

### Server-side

You can also use the API directly in server routes or API endpoints:

```ts
// server/api/my-endpoint.ts
import { fetchMollie } from '#mollie/utils'

export default defineEventHandler(async (event) => {
  try {
    // Fetch customers directly from Mollie API
    const customers = await fetchMollie(event, '/customers')
    return customers
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch customers'
    })
  }
})
```

#### Available Server Routes

The module exposes the following server routes:

| Route | Method | Description |
|-------|--------|-------------|
| `/api/mollie/customers` | `GET` | List all customers |
| `/api/mollie/customers` | `POST` | Create a customer |
| `/api/mollie/customers/:id` | `GET` | Get a customer by ID |
| `/api/mollie/customers/:id` | `PATCH` | Update a customer |
| `/api/mollie/customers/:id` | `DELETE` | Delete a customer |
| `/api/mollie/customers/:customerId/mandates` | `GET` | List customer's mandates |
| `/api/mollie/customers/:customerId/mandates` | `POST` | Create a mandate |
| `/api/mollie/customers/:customerId/mandates/:id` | `GET` | Get customer's mandate by ID |
| `/api/mollie/customers/:customerId/mandates/:id` | `DELETE` | Revoke a mandate |
| `/api/mollie/customers/:customerId/subscriptions` | `GET` | List customer's subscriptions |
| `/api/mollie/customers/:customerId/subscriptions` | `POST` | Create a subscription |
| `/api/mollie/customers/:customerId/subscriptions/:id` | `GET` | Get customer's subscription by ID |
| `/api/mollie/customers/:customerId/subscriptions/:id` | `PATCH` | Update a subscription |
| `/api/mollie/customers/:customerId/subscriptions/:id` | `DELETE` | Cancel a subscription |

## Available APIs

### Customers API

- `customers.create(customerData)` - Create a customer
- `customers.get(id)` - Get customer by ID
- `customers.update(id, data)` - Update customer
- `customers.delete(id)` - Delete customer
- `customers.list(params)` - List customers

### Mandates API

- `mandates.create(customerId, mandateData)` - Create a mandate
- `mandates.get(customerId, id)` - Get mandate by ID
- `mandates.revoke(customerId, id)` - Revoke a mandate
- `mandates.list(customerId, params)` - List customer's mandates

### Subscriptions API

- `subscriptions.create(customerId, subscriptionData)` - Create a subscription
- `subscriptions.get(customerId, id)` - Get subscription by ID
- `subscriptions.update(customerId, id, data)` - Update subscription
- `subscriptions.cancel(customerId, id)` - Cancel subscription
- `subscriptions.list(customerId, params)` - List customer's subscriptions

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  pnpm install
  
  # Generate type stubs
  pnpm dev:prepare
  
  # Develop with the playground
  pnpm dev
  
  # Build the playground
  pnpm dev:build
  
  # Run ESLint
  pnpm lint
  
  # Run Vitest
  pnpm test
  pnpm test:watch
  
  # Release new version
  pnpm release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/mollie-module/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/mollie-module

[npm-downloads-src]: https://img.shields.io/npm/dm/mollie-module.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/mollie-module

[license-src]: https://img.shields.io/npm/l/mollie-module.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/mollie-module

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com