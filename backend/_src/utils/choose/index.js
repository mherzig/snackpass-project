/**
 * Chooses a specific number of items from an array.
 * 
 * @param {Array} arr   List of items to choose from
 * @param {Number} num  Number of items to choose
 * 
 * @returns {Array}     A new array containing the specified number of items
 */
const choose = (arr, num = 1) => {
  // ensure num is a positive integer
  num = isNaN(num) ? 1 : num
  num = ~~Math.max(num, 1)

  const options = [ ...arr ]

  while (options.length > num) {
    const index = ~~(Math.random() * options.length)
    options.splice(index, 1)
  }

  return options
}

export default choose