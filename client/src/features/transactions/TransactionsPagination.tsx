import { useAppDispatch, useAppSelector } from "app/hooks"
import { fetchTransactions, limit, selectQuery } from "app/transactionsSlice"
import Pagination from "react-bootstrap/Pagination"

const TransactionPagination: React.FC = () => {
  const dispatch = useAppDispatch()
  const query = useAppSelector(selectQuery)
  const limitOptions = [5, 10, 20, 50]
  let items = []
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === query.page}>
        {number}
      </Pagination.Item>
    )
  }
  return (
    <div className="d-flex justify-content-end">
      <div className="d-flex align-items-start me-3">
        <label htmlFor="limit" className="form-label me-2 flex-fill w-100">
          Items per page:
        </label>
        <select
          className="form-select"
          id="limit"
          onChange={(e) => {
            dispatch(limit(Number(e.target.value)))
            dispatch(
              fetchTransactions({ ...query, limit: Number(e.target.value) })
            )
          }}
          value={query.limit}
        >
          {limitOptions.map((lim) => (
            <option value={lim} key={lim}>
              {lim}
            </option>
          ))}
        </select>
      </div>
      <Pagination>{items}</Pagination>
    </div>
  )
}

export default TransactionPagination
