import { createSlice } from "@reduxjs/toolkit";
import updateTransactions from "../utils/updateTransactions";

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
      state.incomes.push(action.payload.incomeData);
      state.totalIncome = calcTotalIncome(state.incomes);
      state.currBalance = state.totalIncome - state.totalExpense;
      updateTransactions(state, action.payload.userId, action.payload.transId);
    },
    addExpense(state, action) {
      // state.expenses = [...state.expenses, action.payload];
      state.expenses.push(action.payload.expenseData);
      state.totalExpense = calcTotalExpense(state.expenses);
      state.currBalance = state.totalIncome - state.totalExpense;
      updateTransactions(state, action.payload.userId, action.payload.transId);
    },
    addGraph(state, action) {
      state.graphData.push({
        amount: action.payload.amount,
        createdAt: action.payload.createdAt,
      });
      updateTransactions(state, action.payload.userId, action.payload.transId);
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

export default accountSlice.reducer;
