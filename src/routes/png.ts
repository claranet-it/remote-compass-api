import { Compass } from '@src/core/generateSVG'
import { FastifyInstance } from 'fastify'

export default async function (app: FastifyInstance): Promise<void> {
  app.get<{ 
    Querystring: Compass,
    Reply: Buffer 
  }>(
    '/png',
    async (request, reply) => {
      const png = await app.generatePNG(request.query)
      reply.type('image/png').send(png)
    },
  )
}
