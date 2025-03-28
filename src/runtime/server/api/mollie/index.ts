import { createRouter, defineEventHandler } from 'h3'

import {
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  listCustomers,
} from './customers'

import {
  createMandate,
  getMandate,
  revokeMandate,
  listMandates,
} from './mandates'

import {
  createSubscription,
  getSubscription,
  updateSubscription,
  cancelSubscription,
  listSubscriptions,
} from './subscriptions'

const router = createRouter()

// Customers API endpoints
router.post('/customers', defineEventHandler(createCustomer))
router.get('/customers', defineEventHandler(listCustomers))
router.get('/customers/:id', defineEventHandler(getCustomer))
router.patch('/customers/:id', defineEventHandler(updateCustomer))
router.delete('/customers/:id', defineEventHandler(deleteCustomer))

// Mandates API endpoints
router.post('/customers/:customerId/mandates', defineEventHandler(createMandate))
router.get('/customers/:customerId/mandates', defineEventHandler(listMandates))
router.get('/customers/:customerId/mandates/:id', defineEventHandler(getMandate))
router.delete('/customers/:customerId/mandates/:id', defineEventHandler(revokeMandate))

// Subscriptions API endpoints
router.post('/customers/:customerId/subscriptions', defineEventHandler(createSubscription))
router.get('/customers/:customerId/subscriptions', defineEventHandler(listSubscriptions))
router.get('/customers/:customerId/subscriptions/:id', defineEventHandler(getSubscription))
router.patch('/customers/:customerId/subscriptions/:id', defineEventHandler(updateSubscription))
router.delete('/customers/:customerId/subscriptions/:id', defineEventHandler(cancelSubscription))

export default router
