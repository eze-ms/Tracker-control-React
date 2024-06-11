import { useReducer, createContext, Dispatch, ReactNode, useMemo  } from "react"
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totatExpenses: number
    remainingBudget: number
}
type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvided = ({children}: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    const totatExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])
    const remainingBudget = state.budget - totatExpenses

    return(
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totatExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}