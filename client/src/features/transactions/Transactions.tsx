import React from "react"

import { useAppSelector } from "app/hooks"
import {
  selectErrors,
  selectStatus,
  selectTransactions,
} from "app/transactionsSlice"
// import styles from "./Transactions.module.css"
import ErrorMessage from "features/ErrorMessage"
import LoadingSpinner from "features/LoadingSpinner"
import NoTransactions from "features/NoTransactions"
import TransactionItem from "./TransactionItem"
import TransactionFilter from "./filter/index"
import TransactionPagination from "./TransactionsPagination"

const Transactions: React.FC = () => {
  const transactions = useAppSelector(selectTransactions)
  const status = useAppSelector(selectStatus)
  const fetchError = useAppSelector(selectErrors).fetchError
  let element
  if (status === "failed")
    element = <ErrorMessage error={fetchError as Error} />
  else if (status === "loading") element = <LoadingSpinner />
  else if (status === "idle" && transactions.length === 0)
    element = <NoTransactions />
  else
    element = (
      <ul className="list-group mb-5">
        {transactions.map((transaction) => (
          <TransactionItem transaction={transaction} key={transaction.id} />
        ))}
      </ul>
    )
  return (
    <section>
      <TransactionFilter />
      {element}
      <TransactionPagination />
    </section>
  )
}

export default Transactions
