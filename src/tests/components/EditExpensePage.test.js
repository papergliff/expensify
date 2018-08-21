import React from 'react'
import { shallow } from 'enzyme'
import { EditExpensePage } from '../../components/EditExpensePage' 
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

let editExpense 
let removeExpense
let history
let wrapper

beforeEach(() => {
  editExpense = jest.fn()
  removeExpense = jest.fn()
  history = { push: jest.fn() }
  wrapper = shallow(<EditExpensePage editExpense={editExpense} removeExpense={removeExpense} history={history} />)
})

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
  wrapper.find(ExpenseForm).prop('onSubmit')(expenses[0])
  expect(history.push).toHaveBeenCalledWith('/')
  expect(editExpense).toHaveBeenCalledWith(expenses[0])
})

test('should handle onClick', () => {
  wrapper.find('button').prop('onClick')(expenses[0])
  expect(history.push).toHaveBeenCalledWith('/')
  expect(removeExpense).toHaveBeenCalled()
})
