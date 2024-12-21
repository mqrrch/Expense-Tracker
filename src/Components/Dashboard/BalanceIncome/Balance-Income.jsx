import Balance from "./Balance"
import IncomeExpense from "./Income-Expense"

function BalanceAndIncome(){
    return (
        <div className="balance-income-container mt-5 w-full h-3/4 flex gap-10">
            <div className="balance-container w-1/2 h-full">
                <p className="relative top-2 left-4 text-sm text-gray-600">Account - Balance</p>
                <Balance />
            </div>
            <div className="income-container w-1/2 h-full">
                <p className="relative top-2 left-4 text-sm text-gray-600">Income - Expense</p>
                <IncomeExpense />
            </div>
        </div>
    )
}

export default BalanceAndIncome