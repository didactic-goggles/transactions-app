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
}).write()

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
      message: "Transaction created",
      transaction: newTransaction,
    })
  } catch (error) {
    errorHandler(error, res)
  }
}

export const getTransactions: RequestHandler = async (req, res, next) => {
  // setTimeout(
  //   () => res.status(200).json({ transactions: db.get("transactions") }),
  //   3000
  // )
  res.status(200).json({ transactions: db.get("transactions") })
}

export const updateTransaction: RequestHandler<{ id: string }> = (
  req,
  res,
  next
) => {
  try {
    const transactionId = req.params.id

    const updatedTransaction = req.body as ITransaction

    if (!db.get("transactions").find({ id: transactionId }).value()) {
      throw new Error("Invalid transaction")
    }

    db.get("transactions")
      .find({ id: transactionId })
      .assign({
        description: updatedTransaction.description,
        amount: updatedTransaction.amount,
        date: updatedTransaction.date,
      })
      .value()

    res.json({
      message: "Transaction updated",
      transaction: db.get("transactions").find({ id: transactionId }),
    })
  } catch (error) {
    errorHandler(error, res)
  }
}

export const deleteTransaction: RequestHandler = (req, res, next) => {
  const transactionId = req.params.id

  db.get("transactions").remove({ id: transactionId }).write()

  res.json({ message: "Transaction deleted" })
}
