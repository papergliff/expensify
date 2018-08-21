import React from 'react'
import moment from 'moment'
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onNoteChange = this.onNoteChange.bind(this)
    this.onAmountChange = this.onAmountChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.onFocusChange = this.onFocusChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: '',
    }
  }

  onDescriptionChange(e) {
    const description = e.target.value
    this.setState(() => ({ description }))
  }

  onNoteChange(e) {
    const note = e.target.value
    this.setState(() => ({ note }))
  }

  onAmountChange(e) {
    const amount = e.target.value

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }))
    }
  }

  onDateChange(createdAt) {
    if (createdAt) {
      this.setState(() => ({ createdAt }))
    }
  }

  onFocusChange({ focused })  {
    this.setState(() => ({ calendarFocused: focused }))
  }

  onSubmit(e) {
    e.preventDefault()
    const {
      description,
      amount,
      createdAt,
      note,
    } = this.state
    const { onSubmit } = this.props

    if (!description || !amount) {
      this.setState(() => ({ error: 'Please provide description and amount' }))
    } else {
      this.setState(() => ({ error: '' }))
      onSubmit({
        description,
        amount: parseFloat(amount, 10) * 100,
        createdAt: createdAt.valueOf(),
        note,
      })
    }
  }

  render() {
    const {
      error,
      description,
      amount,
      createdAt,
      calendarFocused,
      note,
    } = this.state
    return (
      <div>
        {error && <p>{error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={this.onDescriptionChange}
            autoFocus
          />
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={createdAt}
            onDateChange={this.onDateChange}
            focused={calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={note}
            onChange={this.onNoteChange}
          />
          <button>Add Expense</button>
        </form>
      </div>
    )
  }
}
