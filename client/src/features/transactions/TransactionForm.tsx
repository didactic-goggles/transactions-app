import React, { FormEvent, useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "app/hooks"
import {
  addTransaction,
  editTransaction,
  selectErrors,
  selectTransactions,
} from "app/transactionsSlice"
import Spinner from "react-bootstrap/Spinner"
import { useNavigate, useParams } from "react-router-dom"
import ErrorMessage from "features/ErrorMessage"

const TransactionForm: React.FC = () => {
  const navigate = useNavigate()
  const urlParams = useParams()
  const { id } = urlParams
  const transactions = useAppSelector(selectTransactions)
  const addError = useAppSelector(selectErrors).addError
  const editError = useAppSelector(selectErrors).editError

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [waiting, setWaiting] = useState<boolean>(false)
  const [formData, setFormData] = useState<ITransactionFormData>({
    description: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    const transactionData = transactions.find((t) => t.id === id)
    if (transactionData) {
      setFormData({
        id: transactionData.id,
        description: transactionData.description,
        amount: transactionData.amount,
        date: new Date(transactionData.date).toISOString().split("T")[0],
      })
      setIsEdit(true)
    }
  }, [id, transactions])

  const dispatch = useAppDispatch()

  const handleTransactionSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()
      setWaiting(true)
      const response = await dispatch(
        isEdit ? editTransaction(formData) : addTransaction(formData)
      )
      if(!response.payload) throw new Error('error')
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
        <form className="mb-3" onSubmit={handleTransactionSubmit}>
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
              value={formData.amount || ""}
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
              value={formData.date}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setFormData({
                  ...formData,
                  date: new Date(e.currentTarget.value)
                    .toISOString()
                    .split("T")[0],
                })
              }
            />
          </div>
          <button
            type="submit"
            className={`btn btn-primary btn-loading px-5 ${
              waiting ? "btn-loading-active" : ""
            }`}
          >
            <span className="loading">
              <Spinner animation="border" />
            </span>
            <span className="text">{isEdit ? "Edit" : "Add"}</span>
          </button>
        </form>
        {(editError || addError) && (
          <ErrorMessage error={(isEdit ? editError : addError) as string} />
        )}
      </div>
    </div>
  )
}

export default TransactionForm
