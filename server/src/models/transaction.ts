export interface ITransaction {
  id: string
  description: string
  type: 'income' | 'expense'
  amount: number
  t_date: Date
}

export class Transaction {
  id: string
  description: string
  type: 'income' | 'expense'
  amount: number
  t_date: Date
  constructor(data: ITransaction) {
    if (typeof data.amount !== 'number') {
      throw new Error('Invalid amount')
    }
    if (data.type !== 'expense' && data.type !== 'income') {
      throw new Error('Invalid type')
    }
    this.id = data.id
    this.description = data.description
    this.type = data.type
    this.amount = data.amount
    this.t_date = data.t_date
  }
}
