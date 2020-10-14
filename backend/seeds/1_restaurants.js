const adjectives = [
  'Delicious', 'Yummy', 'Tempting',  
  'Orange', 'Green', 'Blue', 'Purple',
  'Happy', 'Joyous', 'Masterful', 'Amazing', 'Superb',
  'Flying', 'Folded', 'Lone', 'Twin', 'Uptown', 'Downtown',
  '1st Ave', '2nd Street', '3rd Place', '4th Floor',
  'Mama\'s', 'Papa\'s', 'Granny\'s'
]

const foods = [
  'Breakfast', 'Lunch', 'Dinner',
  'Taco', 'Crepe', 'Pizza', 'Thai', 'Chinese', 'Sushi', 'Indian',
]

const buildings = [
  'Diner', 'Restaurant', 'Place', 'Bistro', 'Truck', 'Steakhouse',
]

const restaurantNames = []
for (let i = 0; i < 50; i++) {
  restaurantNames.push(
    adjectives[~~(Math.random() * adjectives.length)] + ' ' +
    foods[~~(Math.random() * foods.length)] + ' ' +
    buildings[~~(Math.random() * buildings.length)]
  )
}

exports.seed = knex => {
  // need to delete `menu_item` table first as it has a FK to the `restaurant` table
  return knex
    .raw('TRUNCATE ticket_line_item, ticket, menu_item, restaurant RESTART IDENTITY')
    .then(() => {
      return knex('restaurant').insert(
        restaurantNames.map(name => ({ name }))
      )
    })
}
