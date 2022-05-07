interface ITransactionFormData {
  description: string
  amount: number
  date: Date
}

interface ITransaction {
  id: string
  description: string
  amount: number
  date: Date
}

interface TransactionProps {
  transaction: ITransaction
}

type ApiDataType = {
  status: string
  transactions?: ITransaction[]
  message?: string
  transaction?: ITransaction
}
