import React, { FormEvent, useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "app/hooks"
import {
  addTransaction,
  editTransaction,
  selectTransactions,
} from "app/transactionsSlice"
import Spinner from "react-bootstrap/Spinner"
import { useNavigate, useParams } from "react-router-dom"

const TransactionForm: React.FC = () => {
  const navigate = useNavigate()
  const urlParams = useParams()
  const { id } = urlParams
  const transactions = useAppSelector(selectTransactions)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [waiting, setWaiting] = useState<boolean>(false)
  const [formData, setFormData] = useState<ITransactionFormData>({
    description: "",
    amount: 0,
    date: new Date(),
  })

  useEffect(() => {
    const transactionData = transactions.find((t) => t.id === id)
    if (transactionData) {
      setFormData({
        id: transactionData.id,
        description: transactionData.description,
        amount: transactionData.amount,
        date: new Date(transactionData.date),
      })
      setIsEdit(true)
    }
  }, [id, transactions])

  const dispatch = useAppDispatch()

  const handleTransactionSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()
      setWaiting(true)
      await dispatch(
        isEdit ? editTransaction(formData) : addTransaction(formData)
      )
      alert(`Transaction ${isEdit ? "updated" : "created"}`)
      navigate("/")
    } catch (error) {
      // error
    }
    setWaiting(false)
  }
  return (
    <div className="card">
      <div className="card-body">
        <form action="" onSubmit={handleTransactionSubmit}>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              id="description"
              className="form-control"
              value={formData.description}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setFormData({
                  ...formData,
                  description: e.currentTarget.value,
                })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              className="form-control"
              value={formData.amount}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setFormData({
                  ...formData,
                  amount: Number(e.currentTarget.value),
                })
              }
              aria-describedby="amountHelp"
              required
            />
            <div id="amountHelp" className="form-text">
              You can enter positive or negative values. Negative values will be
              interpreted as expense.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Type
            </label>
            <input
              type="date"
              id="date"
              className="form-control"
              value={formData.date.toLocaleDateString("en-CA")}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setFormData({
                  ...formData,
                  date: new Date(e.currentTarget.value),
                })
              }
            />
          </div>
          <button
            type="submit"
            className={`btn btn-primary btn-loading ${
              waiting ? "btn-loading-active" : ""
            }`}
          >
            <span className="loading">
              <Spinner animation="border" />
            </span>
            <span className="text">{isEdit ? "Edit" : "Add"}</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default TransactionForm
