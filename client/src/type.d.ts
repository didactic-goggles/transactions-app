interface ITransactionFormData {
  id?: string
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
  total?: number
}

interface IFilter {
  min: number | null
  max: number | null
  startDate: number | null
  endDate: number | null
}
