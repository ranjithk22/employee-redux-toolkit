import { configureStore } from '@reduxjs/toolkit'
import EmployeesReducer from "./EmployeesReducer";

export const Store = configureStore({
  reducer: { Employees: EmployeesReducer }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
