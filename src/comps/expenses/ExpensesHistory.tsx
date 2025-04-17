import { useReduxSelector } from "../../hooks/useReduxSelector"
import ExpensesHistoryItem from "./ExpensesHistoryItem";

export default function ExpensesHistory(){
    const expenseItems = useReduxSelector(state => state.expenses.expenses);
    console.log(expenseItems)

    return (
        <div className="w-full h-[16rem] flex flex-col bg-[#191919] rounded-xl shadow-2xl border-1 border-[#4a4a4a]">
            <p className="text-gray-300 px-3 py-1.5 border-b-1 border-[#4a4a4a] font-semibold">Expenses History</p>
            <div className="py-1 px-3 flex-1 overflow-y-scroll overflow-x-hidden">
                {expenseItems.map((expense, index: number) => (
                    <ExpensesHistoryItem 
                        key={index}
                        {...expense}
                    />
                ))}
            </div>
        </div>
    )
}