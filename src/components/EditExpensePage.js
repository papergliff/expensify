import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { editExpense, removeExpense } from '../actions/expenses'

export class EditExpensePage extends React.Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  onSubmit(expense) {
    const { editExpense, history } = this.props

    editExpense(expense)
    history.push('/')
  }

  onRemove() {
    const { removeExpense, history } = this.props

    removeExpense()
    history.push('/')
  }

  render() {
    const { expense } = this.props

    return (
      <div>
        <ExpenseForm
          expense={expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch, props) => ({
  editExpense: expense => dispatch(editExpense(props.match.params.id, expense)),
  removeExpense: () => dispatch(removeExpense({ id: props.match.params.id }))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)