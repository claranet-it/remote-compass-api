import { Compass } from '@src/core/generateSVG'
import { FastifyInstance } from 'fastify'

export default async function (app: FastifyInstance): Promise<void> {
  app.get<{
    Querystring: Compass;
    Reply: string
  }>(
    '/svg',
    async (request, reply) => {
      reply.type('image/svg+xml').send(app.generateSVG(request.query))
    },
  )
}
