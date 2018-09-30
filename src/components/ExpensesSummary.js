import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import selectExpenses from '../selectors/expenses'
import getExpensesTotal from '../selectors/expenses-total'

export const ExpensesSummary = ({ expenses, expensesTotal }) => {
  const expenseWord = expenses.length === 1 ? 'expense' : 'expenses'
  const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00')
  return (
    <div>
      <h1>Viewing {expenses.length} {expenseWord} totalling {formattedExpensesTotal}</h1>
    </div>
  )
}

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters)

  return {
    expenses: visibleExpenses,
    expensesTotal: getExpensesTotal(visibleExpenses),
  }
}

export default connect(mapStateToProps)(ExpensesSummary)
