import { defineEventHandler, useBase } from 'h3'
import mollieRouter from '../../api/mollie'

export default defineEventHandler((event) => {
  return useBase('/api/mollie', mollieRouter.handler)(event)
})
