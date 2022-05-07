import React, { FormEvent, useState } from "react"

import { useAppDispatch } from "app/hooks"
import { addTransaction } from "app/transactionsSlice"

const TransactionForm: React.FC = () => {
  const [formData, setFormData] = useState<ITransactionFormData>({
    description: "",
    amount: 0,
    date: new Date()
  })

  const dispatch = useAppDispatch()

  const handleTransactionSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(addTransaction(formData))
  }
  return (
    <>
      {" "}
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
          <label htmlFor="date">Type</label>
          <input type="date" name="" id="date" onChange={(e: FormEvent<HTMLInputElement>) =>
              setFormData({
                ...formData,
                date: new Date(e.currentTarget.value),
              })
            }/>
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  )
}

export default TransactionForm
