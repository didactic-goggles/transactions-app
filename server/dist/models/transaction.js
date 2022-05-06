"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    constructor(data) {
        if (typeof data.amount !== 'number') {
            throw new Error('Invalid amount');
        }
        if (data.type !== 'excome' && data.type !== 'income') {
            throw new Error('Invalid type');
        }
        this.id = data.id;
        this.description = data.description;
        this.type = data.type;
        this.amount = data.amount;
        this.t_date = data.t_date;
    }
}
exports.Transaction = Transaction;
