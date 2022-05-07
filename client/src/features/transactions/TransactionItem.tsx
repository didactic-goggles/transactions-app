import { useAppDispatch } from "app/hooks"
import { removeTransaction } from "app/transactionsSlice"

type TransactionItemProps = {
  transaction: ITransaction
}

const TransactionItem: React.FC<TransactionItemProps> = (props) => {
  const { transaction } = props
  const type = transaction.amount < 0 ? "danger" : "success"

  const dispatch = useAppDispatch()

  const handleItemClick = () => {
    console.log(transaction)
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
        <button className="btn btn-outline-primary me-2">
          <i className="bi-pencil-square"></i>
        </button>
        <button className="btn btn-outline-danger" onClick={handleItemClick}>
          <i className="bi-trash3"></i>
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
