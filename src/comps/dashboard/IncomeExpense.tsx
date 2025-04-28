import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useReduxSelector } from "../../hooks/useReduxSelector";
import { TransactionItemTypes } from "../../features/types";

interface ChartData {
    month: string;
    income: number;
    expense: number;
}

export default function IncomeExpense(){
    const transactions = useReduxSelector(state => state.transactions.transactions);
    const incomeTransactions = transactions.filter(transaction => transaction.type.toLowerCase() !== 'expense');
    const expenseTransactions = transactions.filter(transaction => transaction.type.toLowerCase() !== 'income');
    
    function getTotal(transactions: TransactionItemTypes[], month: string){
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const filteredTransactions = transactions.filter(transaction => transaction.date.split('-')[0] === String(currentYear) && transaction.date.split('-')[1] === month);
        return filteredTransactions.reduce((prevAmount, transaction) => prevAmount += transaction.cost, 0);
    }

    const data: ChartData[] = [
        {month: 'Jan', income: getTotal(incomeTransactions, '01'), expense: getTotal(expenseTransactions, '01')},
        {month: 'Feb', income: getTotal(incomeTransactions, '02'), expense: getTotal(expenseTransactions, '02')},
        {month: 'Mar', income: getTotal(incomeTransactions, '03'), expense: getTotal(expenseTransactions, '03')},
        {month: 'Apr', income: getTotal(incomeTransactions, '04'), expense: getTotal(expenseTransactions, '04')},
        {month: 'May', income: getTotal(incomeTransactions, '05'), expense: getTotal(expenseTransactions, '05')},
        {month: 'Jun', income: getTotal(incomeTransactions, '06'), expense: getTotal(expenseTransactions, '06')},
        {month: 'Jul', income: getTotal(incomeTransactions, '07'), expense: getTotal(expenseTransactions, '07')},
        {month: 'Aug', income: getTotal(incomeTransactions, '08'), expense: getTotal(expenseTransactions, '08')},
        {month: 'Sep', income: getTotal(incomeTransactions, '09'), expense: getTotal(expenseTransactions, '09')},
        {month: 'Oct', income: getTotal(incomeTransactions, '10'), expense: getTotal(expenseTransactions, '10')},
        {month: 'Nov', income: getTotal(incomeTransactions, '11'), expense: getTotal(expenseTransactions, '11')},
        {month: 'Dec', income: getTotal(incomeTransactions, '12'), expense: getTotal(expenseTransactions, '12')},
    ]
    
    function capitalizeFirstLetter(val: string | number | undefined | null): string {
        if (!val) return '';
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    return(
        <div className='w-full bg-[#191919] rounded-xl shadow-2xl border-1 border-[#4a4a4a]'>
            <p className="text-gray-300 px-3 py-1.5 border-b-1 border-[#4a4a4a] font-semibold">Income - Expense</p>
            <div className='w-full h-[16rem]'>
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                        margin={{ top: 15, bottom: 0, right: 15, left: 15 }}
                    >
                        <Bar dataKey='income' fill="#00c950" activeBar={<Rectangle fill="#00c950" stroke="#fff" />} />
                        <Bar dataKey='expense' fill="#fb2c36" activeBar={<Rectangle fill="#fb2c36" stroke="#fff" />} />
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="month" fontSize={12} />
                        <Tooltip 
                            cursor={{ fill: 'rgba(255,255,255,0.2)' }}
                            content={(props) => (
                                <div className='bg-[#191919] border-1 border-[#4a4a4a] text-gray-300 rounded-xl p-2'>
                                    <p>{props.label}</p>
                                    {props.payload?.map((item) => (
                                        <div key={item.name}>
                                            <p 
                                                className={`${item.name === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                                                {capitalizeFirstLetter(item.name)} : {item.value}$
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}