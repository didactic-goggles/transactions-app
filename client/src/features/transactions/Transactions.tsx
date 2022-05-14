import React from "react"

import { useAppSelector } from "app/hooks"
import {
  selectErrors,
  selectStatus,
  selectTotal,
  selectTotalAmount,
  selectTransactions,
} from "app/transactionsSlice"
import ErrorMessage from "features/ErrorMessage"
import LoadingSpinner from "features/LoadingSpinner"
import NoTransactions from "features/NoTransactions"
import TransactionItem from "./TransactionItem"
import TransactionFilter from "./filter/index"
import TransactionPagination from "./TransactionsPagination"
import NoItemFound from "features/NoItemFound"
import TransactionPieChart from "./TransactionPieChart"
import TransactionDeleteConfirmationModal from "./TransactionDeleteConfirmationModal"

const Transactions: React.FC = () => {
  const transactions = useAppSelector(selectTransactions)
  const status = useAppSelector(selectStatus)
  const total = useAppSelector(selectTotal)
  const totalAmount = useAppSelector(selectTotalAmount)
  const fetchError = useAppSelector(selectErrors).fetchError
  let element
  if (status === "failed") return <ErrorMessage error={fetchError as string} />
  else if (status === "loading") element = <LoadingSpinner />
  else if (
    !transactions ||
    !Array.isArray(transactions) ||
    (status === "idle" && transactions.length === 0 && total === 0)
  )
    element = <NoTransactions />
  else {
    let innerElement
    if (total !== 0 && transactions.length === 0) innerElement = <NoItemFound />
    else
      innerElement = (
        <>
          <div className="row mb-3">
            <div className="col-md-5 mb-3">
              <div className="card">
                <div className="card-body">
                  <h1 className="display-6">
                    Your total
                    <span
                      className={`ms-2 text-${
                        totalAmount > 0 ? "success" : "danger"
                      }`}
                    >
                      {totalAmount}
                    </span>
                  </h1>
                  <small className="text-muted mb-3 d-block">
                    This is a total amount of transactions you listed
                  </small>
                  <TransactionPieChart data={transactions} />
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <ul className="list-group mb-5">
                {transactions.map((transaction) => (
                  <TransactionItem
                    transaction={transaction}
                    key={transaction.id}
                  />
                ))}
              </ul>
            </div>
          </div>
          <TransactionDeleteConfirmationModal />
        </>
      )
    element = (
      <>
        <TransactionFilter />
        <hr />
        {innerElement}
        <TransactionPagination />
      </>
    )
  }
  return <section>{element}</section>
}

export default Transactions
