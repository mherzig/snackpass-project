const adjectives = [
  'Steamed', 'Fried', 'Boiled', 'Grilled', 'Blackend',
  'Sweet', 'Sour', 'Savory', 'Spicy',
  'Crispy', 'Soggy', 'Mushy', 'Mashed', 'Poached',
]

const foods = [
  'Apple', 'Brisket', 'Chocolate', 'Danish', 'Egg', 'Fries',
  'Gum', 'Halibut', 'Ice Cream', 'Jerky', 'Kale', 'Lasagna',
  'Melon', 'Naan', 'Octopus', 'Pancake', 'Quail', 'Radish',
  'Sandwich', 'Tuna', 'Udon', 'Veal', 'Waffle', 'Xiaolongbao',
  'Yogurt', 'Ziti',
]

const beverages = [
  'Water', 'Milk', 'Soda', 'Beer',
]

const menuItems = []

exports.seed = knex => {
  return knex
    .raw('TRUNCATE ticket_line_item, ticket, menu_item RESTART IDENTITY')
    .then(async () => {      
      const restaurant_ids = (await knex.select('restaurant_id').from('restaurant'))
        .map(row => row.restaurant_id)

      restaurant_ids.forEach(restaurant_id => {
        // add some food
        for (let i = 0; i < 7; i++) {
          menuItems.push({
            restaurant_id,
            name: adjectives[~~(Math.random() * adjectives.length)] + ' ' +
                  foods[~~(Math.random() * foods.length)],
          })
        }
        
        // every restaurant needs beverages!
        beverages.forEach(beverage => {
          menuItems.push({
            restaurant_id,
            name: beverage,
          })
        })
      })

      return knex('menu_item').insert(menuItems)
    })
}
