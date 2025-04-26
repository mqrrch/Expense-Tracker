import { useReduxSelector } from "../../hooks/useReduxSelector"

export default function DashboardCounts(){
    const transactions = useReduxSelector(state => state.transactions.transactions);

    function NumberFormatter(num: number):string {
        if (num >= 1_000_000_000_000_000) return (num / 1_000_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'Qd';
        if (num >= 1_000_000_000_000) return (num / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T';
        if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
        return num.toString();
    };

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    function formatMonth(month: number){
        if (!month) return;
        if (String(month).length === 1){
            return `0${month}`;
        } else{
            return String(month);
        };
    };

    const currentMonthTransactions = transactions.filter(transaction => transaction.date.split('-')[1] === formatMonth(currentMonth) && transaction.date.split('-')[0] === String(currentYear));
    const expenseTransactionsCost = currentMonthTransactions.filter(transaction => transaction.type.toLowerCase() !== 'income')
                                        .reduce((prevCost, transaction) => prevCost += transaction.cost, 0);
    const incomeTransactionsCost = currentMonthTransactions.filter(transaction => transaction.type.toLowerCase() !== 'expense')
                                        .reduce((prevCost, transaction) => prevCost += transaction.cost, 0);
    

    // if its monthly, weekly incomes * 4, daily incomes * how much days in the month. count only when the day has passed
    // the timezone that will be used is UTC since its universal (or ill find for better alternative)
    // frequency not used yet since i am still confused asf

    const counts = [
        { name: 'Income', value: NumberFormatter(incomeTransactionsCost), color: 'text-blue-500'},
        { name: 'Expenses', value: NumberFormatter(expenseTransactionsCost), color: 'text-pink-500'},
        { name: 'Balance', value: NumberFormatter(incomeTransactionsCost - expenseTransactionsCost), color: 'text-green-500'},
        { name: 'Transactions', value: currentMonthTransactions.length, color: 'text-cyan-500'},
    ]

    return (
        <div className="grid grid-cols-2 gap-4 text-center">
            {counts.map((item) => (
                <div key={item.name} className="p-4 border-1 bg-[#191919] border-[#4a4a4a] rounded-xl">
                    <p className="text-gray-300 font-semibold">{item.name}</p>
                    <p className={`${item.color} text-xl`}>{item.name !== 'Transactions' && '$'}{item.value}</p>
                </div>
            ))}
        </div>
    )
}