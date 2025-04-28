import Balance from "./Balance";
import DashboardCounts from "./DashboardCounts";
import IncomeExpense from "./IncomeExpense";
import Summary from "./Summary";

// how do i want this to work?
// - dashboard will have a time period
// - dashboard can show monthly or yearly summaries
// - balance += income when income date is passed or add automatically if one time (same goes for expense but minus)

// need to work on:
// - yearly transaction
// - more sorting on transaction history
// - alert when deleting a transaction
// - maybe a delete all
// - maybe sort from a period of time
// - better design maybe

// - add balance when income date is passed (reversed if expense)
// - time period of dashboard (default is latest month)
// - choose between monthly or yearly dashboard

// as to make this project not that complex yet, it will only have some basic features and then will update if i feel like so lol

export default function DashboardPage(){
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const monthNames: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return (
        <div>
            <p className="text-gray-300 mb-2" title="Disabled for now">Period: {monthNames[currentMonth]}, {currentYear}</p>
            <DashboardCounts />
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Summary />
                <IncomeExpense />
            </div>
            <Balance />
        </div>
    )
}