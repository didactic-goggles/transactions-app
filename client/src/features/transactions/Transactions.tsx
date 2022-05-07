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

const Transactions: React.FC = () => {
  const transactions = useAppSelector(selectTransactions)
  const status = useAppSelector(selectStatus)
  const fetchError = useAppSelector(selectErrors).fetchError
  if (status === "failed") return <ErrorMessage error={fetchError as Error} />
  if (status === "loading") return <LoadingSpinner />
  return (
    <div style={{ textAlign: "center" }}>
      <div className={styles.row}>
        <ul>
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              style={{ border: "1px solid #eee", padding: "1rem" }}
            >
              <div>Id: {transaction.id}</div>
              <div>Desc: {transaction.description}</div>
              <div>Amount: {transaction.amount}</div>
              <div>Type: {transaction.type}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Transactions
