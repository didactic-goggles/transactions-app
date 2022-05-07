import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store'
import { getTransactions, createTransaction } from 'API'

export interface TransactionsState {
  transactions: ITransaction[];
  status: 'idle' | 'loading' | 'failed';
  errors: {
    fetchError: {}
  }
}

const initialState: TransactionsState = {
  transactions: [],
  status: 'idle',
  errors: {
    fetchError: {}
  }
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const response = await getTransactions();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (formData: ITransactionFormData) => {
    const response = await createTransaction(formData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
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
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'idle';
        state.transactions = action.payload.transactions;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action)
        state.errors.fetchError = action.error as Error;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload.transaction as ITransaction)
      })
  },
});



// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTransactions = (state: RootState) => state.transactions.transactions;
export const selectStatus = (state: RootState) => state.transactions.status;
export const selectErrors = (state: RootState) => state.transactions.errors
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

export default transactionsSlice.reducer;