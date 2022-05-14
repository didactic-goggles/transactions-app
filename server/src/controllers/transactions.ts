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
  min: number
  max: number
  startDate: number
  endDate: number
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
  const total = transactions.length
  let found = total
  const query: ReqQuery = req.query
  if (query && Object.keys(query).length > 0) {
    results = transactions.filter((transaction) => {
      let filteredStatus = true
      if (query.search && query.search !== "") {
        filteredStatus = transaction.description
          .toLowerCase()
          .includes(query.search.toLowerCase())
      }
      if (query.filter && filteredStatus) {
        const filterObj: ReqQueryFilter = JSON.parse(query.filter)
        const { min, max } = filterObj
        console.log(min, max)
        if (min && !filteredStatus) {
          filteredStatus = transaction.amount >= Number(min)
        }
        if (max && !filteredStatus) {
          filteredStatus = transaction.amount <= Number(max)
        }
        const { endDate, startDate } = filterObj
        if (!filteredStatus) {
          filteredStatus =
            new Date(transaction.date).valueOf() <= endDate &&
            new Date(transaction.date).valueOf() >= startDate
        }
      }
      return filteredStatus
    })
    if (query.limit && query.page) {
      found = results.length
      results = results.slice(
        (query.page - 1) * query.limit,
        query.limit * query.page
      )
    }
  }
  res.status(200).json({ transactions: results, total, found })
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
