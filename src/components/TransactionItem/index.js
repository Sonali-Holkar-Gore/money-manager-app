import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails
  const onDelete = () => {
    deleteTransaction(id)
  }
  return (
    <li className="transactiom-item">
      <p className="item">{title}</p>
      <p className="item">{amount}</p>
      <p className="item">{type}</p>
      <button
        className="delete-button"
        type="button"
        data-testid="delete"
        onClick={onDelete}
      >
        <img
          className="delete-image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
