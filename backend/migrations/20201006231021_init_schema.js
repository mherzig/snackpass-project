
exports.up = knex => {
  return knex.schema
    .createTable('restaurant', table => {
      table.increments('restaurant_id').primary()
      table.string('name', 100).notNullable()
    })
    .createTable('menu_item', table => {
      table.increments('menu_item_id').primary()
      table.integer('restaurant_id').references('restaurant.restaurant_id')
      table.string('name', 100).notNullable()
    })
    .createTable('ticket', table => {
      table.increments('ticket_id').primary()
      table.integer('restaurant_id').references('restaurant.restaurant_id')
      table.datetime('ticket_time').notNullable()
    })
    .createTable('ticket_line_item', table => {
      table.integer('ticket_id').references('ticket.ticket_id')
      table.integer('menu_item_id').references('menu_item.menu_item_id').index()
      table.integer('quantity').notNullable()

      table.primary([ 'ticket_id', 'menu_item_id' ])
    })
}

exports.down = knex => {
  return knex.schema
    .dropTable('ticket_line_item')
    .dropTable('ticket')
    .dropTable('menu_item')
    .dropTable('restaurant')
}
