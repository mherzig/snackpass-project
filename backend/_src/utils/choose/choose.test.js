import choose from '.'

const initArray = [ 'one', 'two', 'three', 'four', 'five' ]

describe('choose from an array', () => {
  test('should pick the correct number of items', () => {
    const newArr = choose(initArray, 3)
    expect(newArr.length).toBe(3)
  })

  test('should default to 1 item when `num` is not specified', () => {
    const newArr = choose(initArray)
    expect(newArr.length).toBe(1)
  })

  test('should default to the input array length when `num` is larger', () => {
    const newArr = choose(initArray, 10)
    expect(newArr.length).toBe(initArray.length)
  })

  test('should floor `num` when not an integer', () => {
    const newArr = choose(initArray, 2.84)
    expect(newArr.length).toBe(2)
  })

  test('should default to 1 item when `num` is not a positive integer', () => {
    const newArr = choose(initArray, 0)
    expect(newArr.length).toBe(1)
  })

  test('should default to 1 item when `num` is not a number', () => {
    const newArr = choose(initArray, 'test')
    expect(newArr.length).toBe(1)
  })
})