import { createSlice } from "@reduxjs/toolkit";
import UpdateTrans from "./utils/updateTransactions";

const initialState = {
  currBalance: 0,
  incomes: [],
  expenses: [],
  totalIncome: 0,
  totalExpense: 0,
  graphData: [],
};

const calcTotalIncome = (incomes) => {
  return incomes.reduce((acc, curr) => acc + curr.amount, 0);
};

const calcTotalExpense = (expenses) => {
  return expenses.reduce((acc, curr) => acc + curr.amount, 0);
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    addIncome: (state, action) => {
      state.incomes.push(action.payload);
      state.totalIncome = calcTotalIncome(state.incomes);
      state.currBalance = state.totalIncome - state.totalExpense;
    },
    addExpense(state, action) {
      state.expenses = [...state.expenses, action.payload];
      state.totalExpense = calcTotalExpense(state.expenses);
      state.currBalance = state.totalIncome - state.totalExpense;
    },
    addGraph(state, action) {
      state.graphData.push(action.payload);
      // console.log(action.payload);
    },

    initiateStateLogin: (state, action) => {
      if (action.payload !== undefined) {
        console.log("from redux state", action.payload);
        return action.payload;
      }
      return state;
    },
    reset: () => initialState,
  },
});

export const { addIncome, addExpense, initiateStateLogin, addGraph, reset } =
  accountSlice.actions;

export const addIncomeAsync =
  (incomeData, userId, transactionId) => async (dispatch, getState) => {
    dispatch(addIncome(incomeData));
    const state = getState().account;
    const { updateTransactions } = UpdateTrans(userId, transactionId);
    await updateTransactions(state);
  };

export const addExpenseAsync =
  (expenseData, userId, transactionId) => async (dispatch, getState) => {
    dispatch(addExpense(expenseData));
    const state = getState().account;
    const { updateTransactions } = UpdateTrans(userId, transactionId);
    await updateTransactions(state);
  };

export const addGraphDataAsync =
  (amount, createdAt, userId, transactionId) => async (dispatch, getState) => {
    dispatch(addGraph({ amount: amount, createdAt: createdAt }));
    //   addGraph({ amount: -data.amount, createdAt: String(data.created.$d) })
    const state = getState().account;
    const { updateTransactions } = UpdateTrans(userId, transactionId);
    await updateTransactions(state);
  };

export default accountSlice.reducer;
