import { createSlice } from '@reduxjs/toolkit'

const iniState = {
    employees: [],
};

const Employees = createSlice({
    name: 'employees',
    initialState: iniState,
    reducers: {
        allEmployees(state, { payload }) {
            return {
                ...state,
                employees: [...payload]
            }
        },
        addEmployee(state, { payload }) {
            return {
                ...state,
                employees: [...state.employees, payload],
            };
        },
        editEmployee(state, { payload }) {
            return {
                ...state,
                employees: [...state.employees, ...state.employees.filter(emp => {
                    if (emp.id === payload.id) {
                        return payload
                    }
                })]
            };
        },
        deleteEmployee(state, { payload }) {
            return {
                ...state,
                employees: [...state.employees.filter(user => user.id !== payload)]
            }
        },
    },
})

export const { allEmployees, addEmployee, editEmployee, deleteEmployee } = Employees.actions
export default Employees.reducer