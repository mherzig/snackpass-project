import { knex } from '../db'

/**
 * Gets the trending items from the database.
 * @returns {Array<Number>} Array of menu item IDs that are trending, in trending order
 */
export const getTrendingItemIDs = async () => {
  const result = await knex.raw(`
WITH cte7 AS (
    SELECT menu_item_id,
           SUM(quantity) / 168.0 AS avg_quantity
    FROM ticket_line_item tli
        JOIN ticket t USING (ticket_id)
    WHERE ticket_time > CURRENT_TIMESTAMP - INTERVAL '7 DAYS'
    GROUP BY menu_item_id
), cte2 AS (
    SELECT menu_item_id,
           SUM(quantity) / 48.0 AS avg_quantity
    FROM ticket_line_item tli
        JOIN ticket t USING (ticket_id)
    WHERE ticket_time > CURRENT_TIMESTAMP - INTERVAL '2 DAYS'
    GROUP BY menu_item_id
)
SELECT cte7.menu_item_id
FROM cte7
JOIN cte2 USING (menu_item_id)
WHERE cte2.avg_quantity / cte7.avg_quantity > 1
ORDER BY cte2.avg_quantity / cte7.avg_quantity DESC;
    `)

  return result.rows.map(row => row.menu_item_id)
}

/**
 * Gets extended information about selected menu items.
 * @param {Array<Number>} itemIDs Array of menu item IDs to get info for
 * @returns {Array<{rest_name: String, item_name: String}>} Array of menu items
 */
export const getItemsFromIDs = async itemIDs => {
  const packedIDs = `{${itemIDs.join(',')}}`

  const result = await knex.raw(`
SELECT
  mi.menu_item_id,
  mi.name AS item_name,
  r.name AS rest_name,
  SUM(tli.quantity) AS quantity,
  MAX(t.ticket_time) AS last_purchased
FROM menu_item mi
JOIN restaurant r USING (restaurant_id)
JOIN ticket_line_item tli USING (menu_item_id)
JOIN ticket t USING (ticket_id)
JOIN UNNEST(?::int[])
WITH ORDINALITY _ (menu_item_id, ord) USING (menu_item_id)
GROUP BY mi.menu_item_id, r.name, _.ord
ORDER BY _.ord;
  `, packedIDs)

  return result.rows
}