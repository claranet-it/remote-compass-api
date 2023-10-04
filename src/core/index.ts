import { FastifyInstance } from 'fastify'
import generateSVG from './generateSVG'
import generatePNGFactory from './generatePNG'


const decorateCore = (app: FastifyInstance) : Promise<void> => {
    app.decorate('generateSVG', generateSVG)
    app.decorate('generatePNG', generatePNGFactory(generateSVG))
    return Promise.resolve()
}

export default decorateCore