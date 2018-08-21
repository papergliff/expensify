import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { editExpense, removeExpense } from '../actions/expenses'

export class EditExpensePage extends React.Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onSubmit(expense) {
    const { onSubmit, history } = this.props

    onSubmit(expense)
    history.push('/')
  }

  onClick() {
    const { onClick, history } = this.props

    onClick()
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
        <button onClick={this.onClick}>Remove</button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch, props) => ({
  onSubmit: expense => dispatch(editExpense(props.match.params.id, expense)),
  onClick: () => dispatch(removeExpense({ id: props.match.params.id }))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)