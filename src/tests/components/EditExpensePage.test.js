import React from 'react'
import { shallow } from 'enzyme'
import { EditExpensePage } from '../../components/EditExpensePage' 
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

let onSubmit
let onClick
let history
let wrapper

beforeEach(() => {
  onSubmit = jest.fn()
  onClick = jest.fn()
  history = { push: jest.fn() }
  wrapper = shallow(<EditExpensePage onSubmit={onSubmit} onClick={onClick} history={history} />)
})

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
  wrapper.find(ExpenseForm).prop('onSubmit')(expenses[0])
  expect(history.push).toHaveBeenCalledWith('/')
  expect(onSubmit).toHaveBeenCalledWith(expenses[0])
})

test('should handle onClick', () => {
  wrapper.find('button').prop('onClick')(expenses[0])
  expect(history.push).toHaveBeenCalledWith('/')
  expect(onClick).toHaveBeenCalled()
})
