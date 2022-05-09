import { RequestHandler, Response } from "express"
import lowdb = require("lowdb")
import FileSync = require("lowdb/adapters/FileSync")
import { ITransaction, Transaction } from "../models/transaction"

type Data = {
  transactions: Transaction[]
}

type ReqQuery = {
  search?: string
  limit?: number
  page?: number
  filter?: string
}

type ReqQueryFilter = {
  amount: {
    min: number
    max: number
  }
  date: {
    startDate: number
    endDate: number
  }
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
  const transactions = db.get("transactions").value()
  let results = transactions
  let total = transactions.length
  const query: ReqQuery = req.query
  if (query && Object.keys(query).length > 0) {
    results = transactions.filter((transaction) => {
      if (query.search && query.search !== "") {
        return transaction.description
          .toLowerCase()
          .includes(query.search.toLowerCase())
      }
      if (query.filter) {
        const filterObj: ReqQueryFilter = JSON.parse(query.filter)
        if (filterObj.amount) {
          const { min, max } = filterObj.amount
          if (min && max && min < max)
            return transaction.amount <= max && transaction.amount >= min
        }
        if (filterObj.amount) {
          const { endDate, startDate } = filterObj.date
          return (
            new Date(transaction.date).valueOf() <= endDate &&
            new Date(transaction.date).valueOf() >= startDate
          )
        }
      }
    })
    total = results.length
    if (query.limit && query.page) {
      results = results.slice(
        (query.page - 1) * query.limit,
        query.limit * query.page
      )
    }
  }
  res.status(200).json({ transactions: results, total })
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
  try {
    const transactionId = req.params.id

    if (!db.get("transactions").find({ id: transactionId }).value()) {
      throw new Error("Invalid transaction")
    }

    db.get("transactions").remove({ id: transactionId }).write()

    res.json({ message: "Transaction deleted" })
  } catch (error) {
    errorHandler(error, res)
  }
}
