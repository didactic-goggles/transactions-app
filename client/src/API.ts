import axios, { AxiosResponse } from "axios"
const baseUrl: string = "http://localhost:3000"

export const getTransactions = async (): Promise<
  AxiosResponse<ApiDataType>
> => {
  try {
    const transactions: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "/transactions"
    )
    return transactions
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
    throw new Error(error as string)
  }
}

export const createTransaction = async (
  formData: ITransactionFormData
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const transactions: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + "/transactions",
      formData
    )
    console.log(transactions)
    return transactions
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
    throw new Error(error as string)
  }
}

export const deleteTransaction = async (
  transactionId: string
): Promise<string> => {
  try {
    await axios.delete(
      baseUrl + "/transactions/" + transactionId
    )
    return transactionId
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
    throw new Error(error as string)
  }
}
