import { RequestHandler } from 'express'
// import lowdb from "lowdb"
import lowdb = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");
// import { dirname, join } from 'path';
// import { fileURLToPath } from 'url';
// import db from '../db';
import { ITransaction, Transaction } from '../models/transaction'
// const __dirname = dirname(fileURLToPath(import.meta.url));
// const file = join(__dirname, 'db.json');
type Data = {
  transactions: Transaction[]
}
// const adapter = new FileSync<Data>('db.json')
// const db = lowdb(adapter)


// Use JSON file for storage
const adapter = new FileSync<Data>('data/db.json');
const db = lowdb(adapter);

// db.defaults({
//   transactions: [],
// }).write();

const TRANSACTIONS: Transaction[] = []

export const createTransaction: RequestHandler = async (req, res, next) => {
  const transactionObj = {
    ...req.body,
    id: new Date().valueOf().toString()
  }
  const newTransaction = new Transaction(transactionObj as ITransaction);
  db.get('transactions').push(newTransaction).write();
  console.log(db.get('transactions'))
  res.status(201).json({
    message: 'Created the transaction.',
    createdTransaction: newTransaction,
  })
}

export const getTransactions: RequestHandler = async (req, res, next) => {
  res.json({ transactions: db.get('transactions') })
}

export const updateTransaction: RequestHandler<{ id: string }> = (req, res, next) => {
  const transactionId = req.params.id

  const updatedText = (req.body as { text: string }).text

  const transactionIndex = TRANSACTIONS.findIndex((transaction) => transaction.id === transactionId)

  if (transactionIndex < 0) {
    throw new Error('Could not find transaction!')
  }

  TRANSACTIONS[transactionIndex] = new Transaction({
    id: transactionId,
    description: updatedText,
  } as ITransaction)

  res.json({
    message: 'Updated!!',
    updatedTransaction: TRANSACTIONS[transactionIndex],
  })
}

export const deleteTransaction: RequestHandler = (req, res, next) => {
  const transactionId = req.params.id

  const transactionIndex = TRANSACTIONS.findIndex((transaction) => transaction.id === transactionId)

  if (transactionIndex < 0) {
    throw new Error('Could not find transaction!')
  }

  TRANSACTIONS.splice(transactionIndex, 1)

  res.json({ message: 'Transaction deleted!' })
}
