import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "./store"
import { getTransactions, createTransaction, deleteTransaction } from "API"

export interface TransactionsState {
  transactions: ITransaction[]
  status: "idle" | "loading" | "failed"
  errors: {
    fetchError: {}
  }
  query: {
    limit: number
    page: number
    search: string
    filter: IFilter
  }
}

const initialState: TransactionsState = {
  transactions: [],
  status: "idle",
  errors: {
    fetchError: {},
  },
  query: {
    limit: 10,
    page: 1,
    search: "",
    filter: {
      amount: null,
      date: null,
    },
  },
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (query: {} | undefined) => {
    const response = await getTransactions(query)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
)

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (formData: ITransactionFormData) => {
    const response = await createTransaction(formData)
    return response.data
  }
)

export const removeTransaction = createAsyncThunk(
  "transactions/removeTransaction",
  async (transactionId: string) => {
    await deleteTransaction(transactionId)
    return transactionId
  }
)

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    search: (state, action: PayloadAction<string>) => {
      state.query.search = action.payload
      console.log(action.payload, state.query.search)
    },
    filter: (state, action: PayloadAction<IFilter>) => {
      state.query.filter = action.payload
    },
    limit: (state, action: PayloadAction<number>) => {
      state.query.limit = action.payload
    },
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "idle"
        state.transactions = action.payload.transactions as ITransaction[]
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed"
        state.errors.fetchError = action.error as Error
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload.transaction as ITransaction)
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        const transactionIndex = state.transactions.findIndex(
          (t) => t.id === action.payload
        )
        if (transactionIndex !== -1)
          state.transactions.splice(transactionIndex, 1)
      })
  },
})

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const { search, filter, limit } = transactionsSlice.actions
export const selectTransactions = (state: RootState) =>
  state.transactions.transactions
export const selectStatus = (state: RootState) => state.transactions.status
export const selectErrors = (state: RootState) => state.transactions.errors
export const selectQuery = (state: RootState) => state.transactions.query
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default transactionsSlice.reducer
