import fastify from 'fastify'
import fastifyCors from '@fastify/cors'

import { registerEndpoints } from './endpoints.js'

const PORT = process.env.PORT ? Number(process.env.PORT) : 7070

const app = fastify({
  logger: true,
})

await app.register(fastifyCors, {
  origin: true,
})

await registerEndpoints(app)

await app.listen({
  host: '0.0.0.0',
  port: PORT,
})
