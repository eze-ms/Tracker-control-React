import { useMemo, useState, useEffect } from "react";
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {
    const [budget, setBudget] = useState<string | number>('');
    const { dispatch, state } = useBudget();

    useEffect(() => {
        // Inicializa el valor del presupuesto cuando se abre el modal
        if (state.modal && state.budget !== undefined) {
            setBudget(state.budget.toString());
        }
    }, [state.modal, state.budget]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setBudget(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const budgetNumber = parseFloat(budget as string);
        if (!isNaN(budgetNumber) && budgetNumber > 0) {
            dispatch({ type: 'add-budget', payload: { budget: budgetNumber } });
            setBudget(''); // Clear the input after submission
        }
    };

    const isValid = useMemo(() => {
        const budgetNumber = parseFloat(budget as string);
        return isNaN(budgetNumber) || budgetNumber <= 0;
    }, [budget]);

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                    Definir Presupuesto
                </label>
                <input
                    id="budget"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                value='Definir Presupuesto'
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
                disabled={isValid}
            />
        </form>
    );
}
