import { useAppDispatch, useAppSelector } from "app/hooks"
import {
  fetchTransactions,
  limit,
  page,
  selectQuery,
  selectTotal,
} from "app/transactionsSlice"
import Pagination from "react-bootstrap/Pagination"

const TransactionPagination: React.FC = () => {
  const dispatch = useAppDispatch()
  const query = useAppSelector(selectQuery)
  const total = useAppSelector(selectTotal)
  const limitOptions = [5, 10, 20, 50]
  let items = []
  for (let number = 1; number <= Math.ceil(total / query.limit); number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === query.page}
        onClick={() => {
          if (number !== query.page) {
            dispatch(page(number))
            dispatch(fetchTransactions({ ...query, page: number }))
          }
        }}
      >
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
            const newLimit = Number(e.target.value)
            const newFilter = { ...query, limit: newLimit }
            if (newLimit > query.limit) {
              dispatch(page(1))
              newFilter.page = 1
            }
            dispatch(limit(newLimit))
            dispatch(
              fetchTransactions(newFilter)
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
