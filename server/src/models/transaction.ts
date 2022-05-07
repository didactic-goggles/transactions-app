export interface ITransaction {
  id: string
  description: string
  amount: number
  date: Date
}

export class Transaction {
  id: string
  description: string
  amount: number
  date: Date
  constructor(data: ITransaction) {
    if (typeof data.amount !== 'number') {
      throw new Error('Invalid amount')
    }
    this.id = data.id
    this.description = data.description
    this.amount = data.amount
    this.date = data.date
  }
}
