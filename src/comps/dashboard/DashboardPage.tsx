import Balance from "./Balance";
import DashboardCounts from "./DashboardCounts";
import IncomeExpense from "./IncomeExpense";
import Summary from "./Summary";

export default function DashboardPage(){
    return (
        <div>
            <DashboardCounts />
            <Summary />
            <IncomeExpense />
            <Balance />
        </div>
    )
}