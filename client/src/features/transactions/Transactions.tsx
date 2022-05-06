import React, { FormEvent, useState } from "react"

import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { addTransaction, selectTransactions } from "./transactionsSlice"
import styles from "./Transactions.module.css"

export function Transactions() {
  const transactions = useAppSelector(selectTransactions)
  const [formData, setFormData] = useState<ITransactionFormData>({
    description: "",
    type: "income",
    amount: 0,
  })

  const dispatch = useAppDispatch()

  const handleTransactionSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(addTransaction(formData))
  }
  return (
    <div style={{ textAlign: "center" }}>
      <form action="" onSubmit={handleTransactionSubmit}>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setFormData({
                ...formData,
                description: e.currentTarget.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            id="amount"
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setFormData({
                ...formData,
                amount: parseInt(e.currentTarget.value),
              })
            }
          />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <select
            name=""
            id="type"
            onChange={(e: FormEvent<HTMLSelectElement>) =>
              setFormData({
                ...formData,
                type: e.currentTarget.value as "income" | "expense",
              })
            }
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
      <div className={styles.row}>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} style={{border: '1px solid #eee', padding: '1rem'}}>
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
