import { createSlice } from "@reduxjs/toolkit";
import UpdateTrans from "./utils/updateTransactions";

const initialState = {
  currBalance: 0,
  incomes: [],
  expenses: [],
  totalIncome: 0,
  totalExpense: 0,
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

export const { addIncome, addExpense, initiateStateLogin, reset } =
  accountSlice.actions;

export const addIncomeAsync =
  (incomeData, usserId, transId) => async (dispatch, getState) => {
    dispatch(addIncome(incomeData));
    const state = getState().account;
    const { updateTransactions } = UpdateTrans(usserId, transId);
    await updateTransactions(state);
  };

export const addExpenseAsync =
  (expenseData, usserId, transId) => async (dispatch, getState) => {
    dispatch(addExpense(expenseData));
    const state = getState().account;
    const { updateTransactions } = UpdateTrans(usserId, transId);
    await updateTransactions(state);
  };

export default accountSlice.reducer;
