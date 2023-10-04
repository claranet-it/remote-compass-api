import { vanillaCompass } from '@src/core/generateSVG'
import { FastifyInstance } from 'fastify'

export default async function (app: FastifyInstance): Promise<void> {
  app.get<{ Reply: Buffer }>(
    '/png',
    async (_, reply) => {
      const png = await app.generatePNG(vanillaCompass)
      reply.type('image/png').send(png)
    },
  )
}
