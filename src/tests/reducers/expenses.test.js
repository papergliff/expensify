import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual([])
})

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: -1
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses)
})

test('should add an expense', () => {
  const expense = {
    id: '109',
    description: 'Laptop',
    note: '',
    createdAt: 200000,
    amount: 295000 
  }
  const action = {
    type: 'ADD_EXPENSE',
    expense
  }
  const state = expensesReducer(undefined, action)
  expect(state).toEqual([expense])
})

test('should edit an expense', () => {
  const updates = {
    description: 'Rent',
    note: 'apt.',
    amount: 15000,
    createdAt: 10000
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates
  }
  const state = expensesReducer(expenses, action)
  expect(state[0]).toEqual({ id: '1', ...updates })
})

test('should not edit an expense if expense not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: { description: 'test desc'}
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses)
})