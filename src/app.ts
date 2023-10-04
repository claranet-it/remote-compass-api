import 'module-alias/register'
import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import autoload from '@fastify/autoload'
import { join } from 'path'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import { Compass } from './core/generateSVG'
import decorateCore from './core'

declare module "fastify" {
  export interface FastifyInstance {
    generateSVG: (compass: Compass) => string,
    generatePNG: (compass: Compass) => Promise<Buffer>,
  }
}

export default function createApp(
  opts?: FastifyServerOptions,
): FastifyInstance {
  const defaultOptions = {
    logger: true,
  }

  const app = fastify({ ...defaultOptions, ...opts })

  app.register(swagger, {
    swagger: {
      info: {
        title: 'Remote Compass',
        description: 'Remote Compass API',
        version: '0.1.0',
      },
      // securityDefinitions: {
      //   apiKey: {
      //     type: 'apiKey',
      //     name: 'Authorization',
      //     in: 'header',
      //   },
      // },
    },
  })

  app.register(swaggerUI)

  decorateCore(app)

  //
  // app.register(autoload, {
  //   dir: join(__dirname, 'features'),
  // })

  app.register(autoload, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api' },
  })

  return app
}
