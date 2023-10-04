import { vanillaCompass } from '@src/core/generateSVG'
import { FastifyInstance } from 'fastify'

export default async function (app: FastifyInstance): Promise<void> {
  app.get<{ Reply: string }>(
    '/svg',
    async (_, reply) => {
      reply.type('image/svg+xml').send(app.generateSVG(vanillaCompass))
    },
  )
}
