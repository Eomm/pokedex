/// <reference path="./global.d.ts" />
'use strict'

const path = require('path')
const fastifyStatic = require('@fastify/static')

/** @param {import('fastify').FastifyInstance} app */
module.exports = async function (app) {
  app.register(fastifyStatic, {
    root: path.join(__dirname, 'pokedex-ui/build'),
    decorateReply: false
  })
}
