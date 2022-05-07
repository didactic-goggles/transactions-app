import React from "react"

import { useAppSelector } from "app/hooks"
import {
  selectErrors,
  selectStatus,
  selectTransactions,
} from "app/transactionsSlice"
import styles from "./Transactions.module.css"
import ErrorMessage from "features/ErrorMessage"
import LoadingSpinner from "features/LoadingSpinner"
import NoTransactions from "features/NoTransactions"
import TransactionItem from "./TransactionItem"

const Transactions: React.FC = () => {
  const transactions = useAppSelector(selectTransactions)
  const status = useAppSelector(selectStatus)
  const fetchError = useAppSelector(selectErrors).fetchError
  if (status === "failed") return <ErrorMessage error={fetchError as Error} />
  if (status === "loading") return <LoadingSpinner />
  if (status === "idle" && transactions.length === 0) return <NoTransactions />
  return (
    <div>
      <ul className="list-group">
        {transactions.map((transaction) => (
          <TransactionItem transaction={transaction} key={transaction.id} />
        ))}
      </ul>
    </div>
  )
}

export default Transactions
