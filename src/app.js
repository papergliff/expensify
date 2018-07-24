import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense, removeExpense, editExpense } from './actions/expenses'
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from './actions/filters'
import getVisibleExpenses from './selectors/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

const store = configureStore()

store.subscribe(() => {
  const state = store.getState()
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses)
})

store.dispatch(addExpense({ description: 'water bills', note: 'water bill', amount: 5000, createdAt: 1250 }))
store.dispatch(addExpense({ description: 'gas bills', note: 'gas bill', amount: 2000, createdAt: 1500 }))
store.dispatch(setTextFilter('water bill'))


ReactDOM.render(<AppRouter />, document.getElementById('app'))
