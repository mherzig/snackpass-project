import { knex } from '../db'
import choose from '../utils/choose'

// avg one ticket every 17 seconds so just going with somewhere between immediate and 34 seconds
const MAX_TIME_BETWEEN_TICKETS = 34000

// seed tickets from the last week
const ONE_WEEK_IN_MS =  1000 * 60 * 60 * 24 * 7

/**
 * Clears current tickets and seeds a bunch of new ones dated within the last 48 hours.
 */
export const resetAndSeedTickets = async () => {
    // first, wipe out all ticket info
    await knex.raw('TRUNCATE ticket_line_item, ticket RESTART IDENTITY')

    // next, create new tickets for the last 48 hours
    const restaurants = await knex.select().from('restaurant')
    const menuItems = await knex.select().from('menu_item')
    const now = Date.now()
    let ticketTime = now - ONE_WEEK_IN_MS

    const tickets = []
    const ticketLineItems = []
    let newTickets = []

    while (ticketTime < now) {
      const restaurantId = restaurants[~~(Math.random() * restaurants.length)].restaurant_id
      tickets.push({
        restaurant_id: restaurantId,
        ticket_time: new Date(ticketTime),
      })

      ticketTime += ~~(Math.random() * MAX_TIME_BETWEEN_TICKETS)
    }

    while (tickets.length) {
      newTickets = newTickets.concat(
        await knex('ticket')
          .insert(tickets.splice(0, 10000), [ 'ticket_id', 'restaurant_id' ])
      )
    }

    newTickets.forEach(ticket => {
      const ticketItems = choose(
        menuItems.filter(item => item.restaurant_id == ticket.restaurant_id),
        ~~(Math.random() * 4 + 1)   // pick between 1 and 5 items
      )
      
      ticketItems.forEach(item => {
        ticketLineItems.push({
          ticket_id: ticket.ticket_id,
          menu_item_id: item.menu_item_id,
          quantity: ~~(Math.random() * 5 + 1)
        })
      }) 
    })

    while (ticketLineItems.length) {
      await knex('ticket_line_item')
        .insert(ticketLineItems.splice(0, 10000))
    }
}