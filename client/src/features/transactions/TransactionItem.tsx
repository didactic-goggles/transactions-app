import { useAppDispatch } from "app/hooks"
import { removeTransaction } from "app/transactionsSlice"
import { useNavigate } from "react-router-dom"

type TransactionItemProps = {
  transaction: ITransaction
}

const TransactionItem: React.FC<TransactionItemProps> = (props) => {
  const navigate = useNavigate();
  const { transaction } = props
  const type = transaction.amount < 0 ? "danger" : "success"

  const dispatch = useAppDispatch()

  const handleUpdateTransactionClick = () => {
    navigate(`/${transaction.id}`)
  }

  const handleRemoveTransactionClick = () => {
    dispatch(removeTransaction(transaction.id))
  }
  return (
    <li
      className={`list-group-item d-flex align-items-center list-group-item-${type}`}
    >
      <div>
        <h4>{transaction.description}</h4>
        <h6>{new Date(transaction.date).toDateString()}</h6>
      </div>
      <div className="ms-5">
        <h2>{transaction.amount}</h2>
      </div>
      <div className="ms-auto">
        <button className="btn btn-outline-primary me-2" onClick={handleUpdateTransactionClick}>
          <i className="bi-pencil-square"></i>
        </button>
        <button className="btn btn-outline-danger" onClick={handleRemoveTransactionClick}>
          <i className="bi-trash3"></i>
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
