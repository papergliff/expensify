import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import selectExpenses from '../selectors/expenses'
import getExpensesTotal from '../selectors/expenses-total'

export const ExpenseSummary = ({ expenses, expensesTotal }) => (
  <div>
    {
      expenses.length === 1 ? (
        <p>Viewing 1 expense totalling {numeral(expensesTotal / 100).format('$0,0.00')}</p>
      ) : (
        <p>Viewing {expenses.length} expenses totalling {numeral(expensesTotal / 100).format('$0,0.00')}</p>
      )
    }
  </div>
)

const mapStateToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters),
  expensesTotal: getExpensesTotal(selectExpenses(state.expenses, state.filters)),
})

export default connect(mapStateToProps)(ExpenseSummary)
