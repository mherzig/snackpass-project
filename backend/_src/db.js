import Knex from 'knex'
import knexConfig from '../knexfile'

export let knex

export default () => {
  knex = Knex(knexConfig)
}