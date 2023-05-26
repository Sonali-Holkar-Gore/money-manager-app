import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    transactionList.forEach(eacTransaction => {
      if (eacTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eacTransaction.amount
      }
    })
    return incomeAmount
  }

  getExpenses = () => {
    const {transactionList} = this.state
    let expensesAmount = 0
    transactionList.forEach(eacTransaction => {
      if (eacTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eacTransaction.amount
      }
    })
    return expensesAmount
  }

  getBalance = () => {
    const {transactionList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0
    transactionList.forEach(eacTransaction => {
      if (eacTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eacTransaction.amount
      } else {
        expensesAmount += eacTransaction.amount
      }
      balanceAmount = incomeAmount - expensesAmount
    })
    return balanceAmount
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  addTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeTransaction = transactionTypeOptions.find(
      eacTransaction => eacTransaction.optionId === optionId,
    )
    const {displayText} = typeTransaction
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updateTransactionList = transactionList.filter(
      eacTransaction => eacTransaction.id !== id,
    )
    this.setState({
      transactionList: updateTransactionList,
    })
  }

  render() {
    const {titleInput, amountInput, optionId, transactionList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    return (
      <div className="app-container">
        <div className="heading-container">
          <h1 className="heading">Hi, Richard</h1>
          <p className="greeting">
            Welcome back to your <span className="span">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          balanceAmount={balanceAmount}
          expensesAmount={expensesAmount}
          incomeAmount={incomeAmount}
        />
        <div className="transaction-history-container">
          <div className="container">
            <h1 className="sub-heading">Add Transaction</h1>
            <form className="form-container" onSubmit={this.addTransaction}>
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                className="input"
                placeholder="TITLE"
                value={titleInput}
                onChange={this.onChangeTitle}
              />
              <label className="label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                className="input"
                placeholder="AMOUNT"
                value={amountInput}
                onChange={this.onChangeAmount}
              />
              <label className="label" htmlFor="select">
                TYPE
              </label>
              <select
                className="input"
                id="select"
                value={optionId}
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option
                    className="option"
                    key={eachOption.optionId}
                    value={eachOption.optionId}
                  >
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button className="button" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="container">
            <h1 className="sub-heading">History</h1>
            <div>
              <ul className="history-container">
                <li className="table-header">
                  <p className="content">Title</p>
                  <p className="content">Amount</p>
                  <p className="content">Type</p>
                </li>
                {transactionList.map(eacTransaction => (
                  <TransactionItem
                    transactionDetails={eacTransaction}
                    key={eacTransaction.id}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
