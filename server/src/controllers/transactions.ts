import { RequestHandler, Response } from "express"
import lowdb = require("lowdb")
import FileSync = require("lowdb/adapters/FileSync")
import { ITransaction, Transaction } from "../models/transaction"

type Data = {
  transactions: Transaction[]
}

const adapter = new FileSync<Data>("data/db.json")
const db = lowdb(adapter)

db.defaults({
  transactions: [],
}).write();

const TRANSACTIONS: Transaction[] = []

const errorHandler = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    res.status(500).json({ message: error.message })
  }
}

export const createTransaction: RequestHandler = async (req, res, next) => {
  try {
    const transactionObj = {
      ...req.body,
      id: new Date().valueOf().toString(),
    }
    const newTransaction = new Transaction(transactionObj as ITransaction)
    db.get("transactions").push(newTransaction).write()
    res.status(201).json({
      message: "Created the transaction.",
      transaction: newTransaction,
    })
  } catch (error) {
    errorHandler(error, res)
  }
}

export const getTransactions: RequestHandler = async (req, res, next) => {
  setTimeout(() => res.status(200).json({ transactions: db.get("transactions") }), 3000)
  // res.status(200).json({ transactions: db.get("transactions") })
}

export const updateTransaction: RequestHandler<{ id: string }> = (
  req,
  res,
  next
) => {
  const transactionId = req.params.id

  const updatedText = (req.body as { text: string }).text

  const transactionIndex = TRANSACTIONS.findIndex(
    (transaction) => transaction.id === transactionId
  )

  if (transactionIndex < 0) {
    throw new Error("Could not find transaction!")
  }

  TRANSACTIONS[transactionIndex] = new Transaction({
    id: transactionId,
    description: updatedText,
  } as ITransaction)

  res.json({
    message: "Updated!!",
    updatedTransaction: TRANSACTIONS[transactionIndex],
  })
}

export const deleteTransaction: RequestHandler = (req, res, next) => {
  const transactionId = req.params.id

  db.get("transactions").remove({ id: transactionId })
  .write()

  res.json({ message: "Transaction deleted!" })
}
