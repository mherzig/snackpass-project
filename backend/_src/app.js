import Koa from 'koa'
import cors from 'koa-cors'

import dbInit from './db'
import api from './api'
import db from './db'

const frontendPort = process.env.FRONTEND_PORT || 1234
const backendPort = process.env.BACKEND_PORT || 3000

export default async () => {
  const app = new Koa()
  dbInit()

  app
    .use(cors())   // should be set to correct origin for the front end domain
    .use(api.routes())

  return app.listen(backendPort, () => {
    console.log(`> Ready on port ${backendPort}`)
  })
}