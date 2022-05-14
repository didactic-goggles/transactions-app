interface ITransactionFormData {
  id?: string
  description: string
  amount: number | null
  date: string
}

interface ITransaction {
  id: string
  description: string
  amount: number
  date: string
}

interface TransactionProps {
  transaction: ITransaction
}

type ApiDataType = {
  status: string
  transactions?: ITransaction[]
  message?: string
  transaction?: ITransaction
  total?: number
  totalAmount?: number
  error?: Error
}

interface IFilter {
  min: number | null
  max: number | null
  startDate: number | null
  endDate: number | null
}
