import React from "react"

import { useAppSelector } from "app/hooks"
import {
  selectErrors,
  selectStatus,
  selectTotal,
  selectTransactions,
} from "app/transactionsSlice"
import ErrorMessage from "features/ErrorMessage"
import LoadingSpinner from "features/LoadingSpinner"
import NoTransactions from "features/NoTransactions"
import TransactionItem from "./TransactionItem"
import TransactionFilter from "./filter/index"
import TransactionPagination from "./TransactionsPagination"
import NoItemFound from "features/NoItemFound"

const Transactions: React.FC = () => {
  const transactions = useAppSelector(selectTransactions)
  const status = useAppSelector(selectStatus)
  const total = useAppSelector(selectTotal)
  const fetchError = useAppSelector(selectErrors).fetchError
  let element
  if (status === "failed") return <ErrorMessage error={fetchError as Error} />
  else if (status === "loading") element = <LoadingSpinner />
  else if (status === "idle" && transactions.length === 0 && total === 0)
    element = <NoTransactions />
  else {
    let innerElement
    if (total !== 0 && transactions.length === 0) innerElement = <NoItemFound />
    else
      innerElement = (
        <ul className="list-group mb-5">
          {transactions.map((transaction) => (
            <TransactionItem transaction={transaction} key={transaction.id} />
          ))}
        </ul>
      )
    element = (
      <>
        <TransactionFilter />
        {innerElement}
        <TransactionPagination />
      </>
    )
  }
  return <section>{element}</section>
}

export default Transactions
