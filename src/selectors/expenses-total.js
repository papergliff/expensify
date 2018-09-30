import { pluck } from 'underscore'

export default (expenses) => {
  return pluck(expenses, 'amount').reduce((prev, curr) => prev + curr, 0)
}
