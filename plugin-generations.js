/// <reference path="./global.d.ts" />
'use strict'

/** @param {import('fastify').FastifyInstance} app */
module.exports = async function (app) {
  app.log.info('plugin loaded')

  app.graphql.extendSchema(`
    extend type Query {
      generations: [Int]
    }
  `)

  app.graphql.defineResolvers({
    Query: {
      generations: async function (source, args, context, info) {
        const sql = app.platformatic.sql('SELECT DISTINCT generation FROM Pokemon ORDER BY generation ASC')
        const generations = await app.platformatic.db.query(sql)
        return generations.map(g => g.generation)
      }
    }
  })
}
