import AddExpense from "./AddExpense";
import ExpensesHistory from "./ExpensesHistory";

export default function ExpensesPage(){
    return(
        <div className="flex flex-col gap-6">
            <AddExpense />
            <ExpensesHistory />
        </div>
    )
}