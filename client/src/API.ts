import axios, { AxiosResponse } from "axios"
const baseUrl: string = "http://localhost:3000"

export const getTransactions = async (query: {} | undefined): Promise<
  AxiosResponse<ApiDataType>
> => {
  try {
    const transactions: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "/transactions", {
        params: query
      }
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
    const transaction: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + "/transactions",
      formData
    )
    return transaction
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
    throw new Error(error as string)
  }
}

export const updateTransaction = async (
  formData: ITransactionFormData
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const transaction: AxiosResponse<ApiDataType> = await axios.patch(
      baseUrl + "/transactions/" + formData.id,
      formData
    )
    return transaction
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
