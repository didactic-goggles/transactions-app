"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.getTransactions = exports.createTransaction = void 0;
// import lowdb from "lowdb"
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
// import { dirname, join } from 'path';
// import { fileURLToPath } from 'url';
// import db from '../db';
const transaction_1 = require("../models/transaction");
// const adapter = new FileSync<Data>('db.json')
// const db = lowdb(adapter)
// Use JSON file for storage
const adapter = new FileSync('data/db.json');
const db = lowdb(adapter);
// db.defaults({
//   transactions: [],
// }).write();
const TRANSACTIONS = [];
const createTransaction = async (req, res, next) => {
    const transactionObj = {
        ...req.body,
        id: new Date().valueOf().toString()
    };
    const newTransaction = new transaction_1.Transaction(transactionObj);
    db.get('transactions').push(newTransaction).write();
    console.log(db.get('transactions'));
    res.status(201).json({
        message: 'Created the transaction.',
        createdTransaction: newTransaction,
    });
};
exports.createTransaction = createTransaction;
const getTransactions = async (req, res, next) => {
    res.json({ transactions: db.get('transactions') });
};
exports.getTransactions = getTransactions;
const updateTransaction = (req, res, next) => {
    const transactionId = req.params.id;
    const updatedText = req.body.text;
    const transactionIndex = TRANSACTIONS.findIndex((transaction) => transaction.id === transactionId);
    if (transactionIndex < 0) {
        throw new Error('Could not find transaction!');
    }
    TRANSACTIONS[transactionIndex] = new transaction_1.Transaction({
        id: transactionId,
        description: updatedText,
    });
    res.json({
        message: 'Updated!!',
        updatedTransaction: TRANSACTIONS[transactionIndex],
    });
};
exports.updateTransaction = updateTransaction;
const deleteTransaction = (req, res, next) => {
    const transactionId = req.params.id;
    const transactionIndex = TRANSACTIONS.findIndex((transaction) => transaction.id === transactionId);
    if (transactionIndex < 0) {
        throw new Error('Could not find transaction!');
    }
    TRANSACTIONS.splice(transactionIndex, 1);
    res.json({ message: 'Transaction deleted!' });
};
exports.deleteTransaction = deleteTransaction;
