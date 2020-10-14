import getTrendingItems, { cachedLists } from '.'

let cursor

const menuItemInfo = [
  { menu_item_id: '123', rest_name: 'Restaurant A', item_name: 'Item A', quantity: 123, last_purchased: '2020-01-01 02:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant A', item_name: 'Item B', quantity: 234, last_purchased: '2020-01-02 10:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant A', item_name: 'Item C', quantity: 789, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant A', item_name: 'Item D', quantity: 123, last_purchased: '2020-01-01 02:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant A', item_name: 'Item E', quantity: 789, last_purchased: '2020-01-02 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant A', item_name: 'Item F', quantity: 123, last_purchased: '2020-01-02 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant A', item_name: 'Item G', quantity: 123, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant B', item_name: 'Item A', quantity: 123, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant B', item_name: 'Item B', quantity: 345, last_purchased: '2020-01-01 09:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant B', item_name: 'Item C', quantity: 123, last_purchased: '2020-01-01 09:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant B', item_name: 'Item D', quantity: 123, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant B', item_name: 'Item E', quantity: 123, last_purchased: '2020-01-02 06:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant B', item_name: 'Item F', quantity: 234, last_purchased: '2020-01-01 05:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant B', item_name: 'Item G', quantity: 456, last_purchased: '2020-01-02 05:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant C', item_name: 'Item A', quantity: 123, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant C', item_name: 'Item B', quantity: 567, last_purchased: '2020-01-01 04:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant C', item_name: 'Item C', quantity: 123, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant C', item_name: 'Item D', quantity: 123, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant C', item_name: 'Item E', quantity: 123, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant C', item_name: 'Item F', quantity: 123, last_purchased: '2020-01-02 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant C', item_name: 'Item G', quantity: 234, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant D', item_name: 'Item A', quantity: 345, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant D', item_name: 'Item B', quantity: 123, last_purchased: '2020-01-01 08:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant D', item_name: 'Item C', quantity: 123, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant D', item_name: 'Item D', quantity: 123, last_purchased: '2020-01-02 06:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant D', item_name: 'Item E', quantity: 456, last_purchased: '2020-01-01 03:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant D', item_name: 'Item F', quantity: 123, last_purchased: '2020-01-02 07:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant D', item_name: 'Item G', quantity: 123, last_purchased: '2020-01-02 04:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant E', item_name: 'Item A', quantity: 567, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant E', item_name: 'Item B', quantity: 567, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant E', item_name: 'Item C', quantity: 123, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant E', item_name: 'Item D', quantity: 123, last_purchased: '2020-01-02 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant E', item_name: 'Item E', quantity: 789, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant E', item_name: 'Item F', quantity: 234, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant E', item_name: 'Item G', quantity: 123, last_purchased: '2020-01-02 06:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant F', item_name: 'Item A', quantity: 345, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant F', item_name: 'Item B', quantity: 123, last_purchased: '2020-01-01 03:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant F', item_name: 'Item C', quantity: 123, last_purchased: '2020-01-02 10:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant F', item_name: 'Item D', quantity: 123, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant F', item_name: 'Item E', quantity: 123, last_purchased: '2020-01-02 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant F', item_name: 'Item F', quantity: 234, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant F', item_name: 'Item G', quantity: 123, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant G', item_name: 'Item A', quantity: 456, last_purchased: '2020-01-02 04:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant G', item_name: 'Item B', quantity: 123, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant G', item_name: 'Item C', quantity: 567, last_purchased: '2020-01-02 07:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant G', item_name: 'Item D', quantity: 123, last_purchased: '2020-01-01 03:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant G', item_name: 'Item E', quantity: 567, last_purchased: '2020-01-02 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant G', item_name: 'Item F', quantity: 890, last_purchased: '2020-01-01 01:23:45.678' },
  { menu_item_id: '123', rest_name: 'Restaurant G', item_name: 'Item G', quantity: 890, last_purchased: '2020-01-01 08:23:45.678' },
]

const trendingIDs = [
  0, 10, 20, 30, 40, 1, 11, 21, 31, 41, 2, 12, 22, 32, 42, 3, 13, 23, 33, 43,
  4, 14, 24, 34, 44, 5, 15, 25, 35, 45, 6, 16, 26, 36, 46, 7, 17, 27, 37, 47,
  8, 18, 28, 38, 48, 9, 19, 29, 39,
]

jest.mock('../../data/trending')
const trendingMocks = require('../../data/trending')

trendingMocks.getTrendingItemIDs.mockImplementation(async () => Promise.resolve(trendingIDs))

trendingMocks.getItemsFromIDs.mockImplementation(async itemIDs => Promise.resolve(
  itemIDs.map(id => menuItemInfo[id])
))

beforeAll(() => { cursor = null })

describe('get trending items', () => {
  test('should set the cursor and a cached list', async () => {
    const exptectedItems = [
      menuItemInfo[0],
      menuItemInfo[10],
      menuItemInfo[20],
      menuItemInfo[30],
      menuItemInfo[40],
      menuItemInfo[1],
      menuItemInfo[11],
      menuItemInfo[21],
      menuItemInfo[31],
      menuItemInfo[41],
      menuItemInfo[2],
      menuItemInfo[12],
      menuItemInfo[22],
      menuItemInfo[32],
      menuItemInfo[42],
      menuItemInfo[3],
      menuItemInfo[13],
      menuItemInfo[23],
      menuItemInfo[33],
      menuItemInfo[43],
    ]

    const retVal = await getTrendingItems()
    cursor = retVal.cursor

    expect(retVal.cursor).not.toBeNull()
    expect(retVal.offset).toBe(20)
    expect(retVal.items).toEqual(exptectedItems)
    
    // make sure the caching layer has the list
    expect(cachedLists[cursor]).toEqual(trendingIDs)
  })

  test('should correctly get the offset list', async () => {
    const exptectedItems = [
      menuItemInfo[4],
      menuItemInfo[14],
      menuItemInfo[24],
      menuItemInfo[34],
      menuItemInfo[44],
      menuItemInfo[5],
      menuItemInfo[15],
      menuItemInfo[25],
      menuItemInfo[35],
      menuItemInfo[45],
      menuItemInfo[6],
      menuItemInfo[16],
      menuItemInfo[26],
      menuItemInfo[36],
      menuItemInfo[46],
      menuItemInfo[7],
      menuItemInfo[17],
      menuItemInfo[27],
      menuItemInfo[37],
      menuItemInfo[47],
    ]

    const retVal = await getTrendingItems(cursor, 20)

    expect(retVal.cursor).toBe(cursor)
    expect(retVal.offset).toBe(40)
    expect(retVal.items).toEqual(exptectedItems)
  })

  test('should correctly get the end of the offset list', async () => {
    const exptectedItems = [
      menuItemInfo[8],
      menuItemInfo[18],
      menuItemInfo[28],
      menuItemInfo[38],
      menuItemInfo[48],
      menuItemInfo[9],
      menuItemInfo[19],
      menuItemInfo[29],
      menuItemInfo[39],
    ]

    const retVal = await getTrendingItems(cursor, 40)

    expect(retVal.cursor).toBeNull()
    expect(retVal.offset).toBeNull()
    expect(retVal.items).toEqual(exptectedItems)
  })

  test('should get a new list if the cursor is not valid', async () => {
    const invalidCursorName = 'notavalidcursor'
    const retVal = await getTrendingItems(invalidCursorName)

    expect(retVal.cursor).not.toBeNull()
    expect(retVal.cursor).not.toBe(invalidCursorName)
  })

  test('should throw if the offset is not a number', async () => {
    await expect(getTrendingItems(cursor, 'hello_world')).rejects.toThrow(RangeError)
  })

  test('should throw if the offset is less than zero', async () => {
    await expect(getTrendingItems(cursor, -3)).rejects.toThrow(RangeError)
  })
})