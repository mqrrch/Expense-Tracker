import BalanceAndIncome from "./BalanceIncome/Balance-Income"
import DashboardCounts from "./DashboardCounts"
import TotalExpenses from "./Total Expenses/TotalExpenses"

function Dashboard() {
    return (
        <div className="absolute mt-6 w-fit h-5/6">
            <DashboardCounts />
            <TotalExpenses />
            <BalanceAndIncome />
        </div>
    )
}

export default Dashboard