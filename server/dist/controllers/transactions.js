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
const errorHandler = (error, res) => {
    if (error instanceof Error) {
        res.status(500).json({ status: false, message: error.message });
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
            message: "Transaction created",
            transaction: newTransaction,
        });
    }
    catch (error) {
        errorHandler(error, res);
    }
};
exports.createTransaction = createTransaction;
const getTransactions = async (req, res, next) => {
    // setTimeout(
    //   () => res.status(200).json({ transactions: db.get("transactions") }),
    //   3000
    // )
    const transactions = db.get("transactions").value();
    let results = transactions;
    const total = transactions.length;
    let found = total;
    const query = req.query;
    if (query && Object.keys(query).length > 0) {
        results = transactions.filter((transaction) => {
            let filteredStatus = true;
            if (query.search && query.search !== "") {
                filteredStatus = transaction.description
                    .toLowerCase()
                    .includes(query.search.toLowerCase());
            }
            if (query.filter && filteredStatus) {
                const filterObj = JSON.parse(query.filter);
                const { min, max } = filterObj;
                if (min && !filteredStatus) {
                    filteredStatus = transaction.amount >= Number(min);
                }
                if (max && !filteredStatus) {
                    filteredStatus = transaction.amount <= Number(max);
                }
                const { endDate, startDate } = filterObj;
                if (filteredStatus && endDate && startDate) {
                    filteredStatus =
                        new Date(transaction.date).valueOf() <= Number(endDate) &&
                            new Date(transaction.date).valueOf() >= Number(startDate);
                }
            }
            return filteredStatus;
        });
        if (query.limit && query.page) {
            results = results.slice((query.page - 1) * query.limit, query.limit * query.page);
            found = results.length;
        }
    }
    res.status(200).json({ transactions: results, total, found });
};
exports.getTransactions = getTransactions;
const updateTransaction = (req, res, next) => {
    try {
        const transactionId = req.params.id;
        const updatedTransaction = req.body;
        if (!db.get("transactions").find({ id: transactionId }).value()) {
            throw new Error("Invalid transaction");
        }
        db.get("transactions")
            .find({ id: transactionId })
            .assign({
            description: updatedTransaction.description,
            amount: updatedTransaction.amount,
            date: updatedTransaction.date,
        })
            .value();
        res.json({
            message: "Transaction updated",
            transaction: db.get("transactions").find({ id: transactionId }),
        });
    }
    catch (error) {
        errorHandler(error, res);
    }
};
exports.updateTransaction = updateTransaction;
const deleteTransaction = (req, res, next) => {
    try {
        const transactionId = req.params.id;
        if (!db.get("transactions").find({ id: transactionId }).value()) {
            throw new Error("Invalid transaction");
        }
        db.get("transactions").remove({ id: transactionId }).write();
        res.json({ message: "Transaction deleted" });
    }
    catch (error) {
        errorHandler(error, res);
    }
};
exports.deleteTransaction = deleteTransaction;
