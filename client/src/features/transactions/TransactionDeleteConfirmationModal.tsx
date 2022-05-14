import { useAppDispatch, useAppSelector } from "app/hooks"
import {
  removeTransaction,
  selectedTransaction,
  selectTransaction,
} from "app/transactionsSlice"
import { useState } from "react"
import Modal from "react-bootstrap/Modal"

const TransactionDeleteConfirmationModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const transaction = useAppSelector(selectedTransaction)

  const handleClose = () => {
    dispatch(selectTransaction(null))
  }

  const handleRemoveTransactionClick = () => {
    dispatch(removeTransaction(transaction!.id))
    handleClose()
  }

  return (
    <Modal show={Boolean(transaction)} onHide={handleClose} centered size="sm">
      <Modal.Body>
        Dou want to delete transaction {transaction?.description}
      </Modal.Body>
      <Modal.Footer className="flex-nowrap p-0">
        <button
          className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 border-end"
          onClick={handleRemoveTransactionClick}
        >
          <strong>Yes, delete</strong>
        </button>
        <button
          className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0"
          onClick={handleClose}
        >
          No, cancel
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default TransactionDeleteConfirmationModal
