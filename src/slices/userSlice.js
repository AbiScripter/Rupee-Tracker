import { createSlice } from "@reduxjs/toolkit";
import updateTransactions from "../utils/updateTransactions";

const initialState = {
  user: {
    name: "",
    email: "",
    currBalance: 0,
    incomes: [],
    expenses: [],
    totalIncome: 0,
    totalExpense: 0,
    graphData: [],
  },
};

const calcTotalIncome = (incomes) => {
  return incomes.reduce((acc, curr) => acc + curr.amount, 0);
};

const calcTotalExpense = (expenses) => {
  return expenses.reduce((acc, curr) => acc + curr.amount, 0);
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initiateUser: (state, action) => {
      state.user = action.payload;
    },

    clearUser: (state) => {
      state.user = initialState.user;
    },

    reset: (state) => {
      state.user = initialState.user;
    },

    addIncome: (state, action) => {
      state.user.incomes = [...state.user.incomes, action.payload];
      state.user.totalIncome = calcTotalIncome(state.user.incomes);
      state.user.currBalance = state.user.totalIncome - state.user.totalExpense;
      updateTransactions(state.user);
    },

    addExpense(state, action) {
      state.user.expenses = [...state.user.expenses, action.payload];
      state.user.totalExpense = calcTotalExpense(state.user.expenses);
      state.user.currBalance = state.user.totalIncome - state.user.totalExpense;
      updateTransactions(state.user);
    },

    addGraph(state, action) {
      state.user.graphData = [
        ...state.user.graphData,
        {
          amount: action.payload.amount,
          createdAt: action.payload.createdAt,
        },
      ];
      updateTransactions(state.user);
    },
  },
});

export const {
  initiateUser,
  clearUser,
  addIncome,
  addExpense,
  addGraph,
  reset,
} = userSlice.actions;
export default userSlice.reducer;
