import { getItemsFromIDs, getTrendingItemIDs } from '../../data/trending'

const PAGE_SIZE = 20

// *NOTE:* this isn't the best way to handle this, but it works for a simple situation
// like this. Normally, we should pick the correct storage to use (SQL, NoSQL, Redis, etc.)
// and create the proper interface in the data layer, and then mock that interface to
// do unit tests. Without setting all of that up right now, this needs to be exported
// so we can do tests.
export const cachedLists = {}

/**
 * Gets menu item info for a query given an optional cached list and/or offset.
 * @param {String} [cursor] Cursor ID for a saved list
 * @param {Number} [offset = 0] Offset to start query at
 * @returns {Array<{items: Array<{rest_name: String, item_name: String}>, cursor: String|null, offset: Number|null}>}
 */
const getTrendingItems = async (cursor, offset = 0) => {
  offset = Number.parseInt(offset)
  if (Number.isNaN(offset) || offset < 0) {
    throw new RangeError('offset must be a non-negative integer')
  }

  let storedList

  // single equals is intended; set `storedList` to the cached list if it exists
  if (!cursor || !(storedList = cachedLists[cursor])) {
    cursor = Date.now().toString()
    storedList = await getTrendingItemIDs()
    cachedLists[cursor] = storedList
  }

  const itemIDs = storedList.slice(offset, offset + PAGE_SIZE)
  const items = await getItemsFromIDs(itemIDs)

  offset += items.length

  return {
    items,
    cursor: offset < storedList.length ? cursor : null,
    offset: offset < storedList.length ? offset : null,
  }
}

export default getTrendingItems