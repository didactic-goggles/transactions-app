"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.getTransactions = exports.createTransaction = void 0;
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const transaction_1 = require("../models/transaction");
const adapter = new FileSync("data/db.json");
const db = lowdb(adapter);
db.defaults({
    transactions: [],
}).write();
const TRANSACTIONS = [];
const errorHandler = (error, res) => {
    if (error instanceof Error) {
        res.status(500).json({ message: error.message });
    }
};
const createTransaction = async (req, res, next) => {
    try {
        const transactionObj = {
            ...req.body,
            id: new Date().valueOf().toString(),
        };
        const newTransaction = new transaction_1.Transaction(transactionObj);
        db.get("transactions").push(newTransaction).write();
        res.status(201).json({
            message: "Created the transaction.",
            transaction: newTransaction,
        });
    }
    catch (error) {
        errorHandler(error, res);
    }
};
exports.createTransaction = createTransaction;
const getTransactions = async (req, res, next) => {
    res.status(200).json({ transactions: db.get("transactions") });
};
exports.getTransactions = getTransactions;
const updateTransaction = (req, res, next) => {
    const transactionId = req.params.id;
    const updatedText = req.body.text;
    const transactionIndex = TRANSACTIONS.findIndex((transaction) => transaction.id === transactionId);
    if (transactionIndex < 0) {
        throw new Error("Could not find transaction!");
    }
    TRANSACTIONS[transactionIndex] = new transaction_1.Transaction({
        id: transactionId,
        description: updatedText,
    });
    res.json({
        message: "Updated!!",
        updatedTransaction: TRANSACTIONS[transactionIndex],
    });
};
exports.updateTransaction = updateTransaction;
const deleteTransaction = (req, res, next) => {
    const transactionId = req.params.id;
    const transactionIndex = TRANSACTIONS.findIndex((transaction) => transaction.id === transactionId);
    if (transactionIndex < 0) {
        throw new Error("Could not find transaction!");
    }
    TRANSACTIONS.splice(transactionIndex, 1);
    res.json({ message: "Transaction deleted!" });
};
exports.deleteTransaction = deleteTransaction;
