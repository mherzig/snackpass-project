import Router from 'koa-router'

import getTrendingItems from '../lib/getTrendingItems'
import seedTickets from '../lib/seedTickets'

var router = new Router({
  prefix: '/v1',
})

router.get('/healthcheck', async ctx => {
  ctx.body = 'OK'
})

router.get('/trending', async ctx => {
  const { cursor, offset } = ctx.query

  try {
    const query = await getTrendingItems(cursor, offset)

    // I didn't do it here to save a bit of effort, but it would be a good idea to add an ORM that
    // maps entities to models automatically, so that doesn't have to happen in this API layer code.
    const responseBody = {
      items: query.items.map(item => ({
        uid: item.menu_item_id.toString(),
        name: item.item_name,
        restaurant: item.rest_name,
        quantityPurchased: Number.parseInt(item.quantity),
        lastPurchased: item.last_purchased
      }))
    }

    if (query.cursor && query.offset) {
      responseBody.nextPage = `/v1/trending?cursor=${query.cursor}&offset=${query.offset}`
    }

    ctx.body = responseBody
  } catch (ex) {
    if (ex instanceof RangeError) {
      ctx.status = 400
      ctx.body = ex.message
    } else {
      ctx.status = 500
      // TODO: log error message & stack, don't send to client
      ctx.body = ex.message
    }
  }
})

router.post('/reset', async ctx => {
  try {
    await seedTickets()
    ctx.status = 204
  } catch (err) {
    // should log somewhere
    console.error(err)
    ctx.status = 500
  }  
})

export default router