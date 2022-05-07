"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    constructor(data) {
        if (typeof data.amount !== 'number') {
            throw new Error('Invalid amount');
        }
        this.id = data.id;
        this.description = data.description;
        this.amount = data.amount;
        this.date = data.date;
    }
}
exports.Transaction = Transaction;
