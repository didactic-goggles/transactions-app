interface ITransactionFormData {
  description: string
  type: "income" | "expense"
  amount: number
}

interface ITransaction {
  id: string
  description: string
  type: "income" | "expense"
  amount: number
  t_date: Date
}

interface TransactionProps {
  transaction: ITransaction
}

type ApiDataType = {
  message: string
  status: string
  transactions: ITransaction[]
  transaction?: ITransaction
}
