import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary'
import getExpensesTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'

test('should render expenses summary component with one expense', () => {
  const wrapper = shallow(<ExpensesSummary expenses={[expenses[0]]} expensesTotal={getExpensesTotal([expenses[0]])} />)
  expect(wrapper).toMatchSnapshot()
})

test('should render expenses summary component with multiple expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenses={expenses} expensesTotal={getExpensesTotal(expenses)} />)
  expect(wrapper).toMatchSnapshot()
})