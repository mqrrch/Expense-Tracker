import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useReduxSelector } from "../../hooks/useReduxSelector";

interface ChartData {
    month: string;
    value: number;
}

export default function Balance(){
    const transactions = useReduxSelector(state => state.transactions.transactions);
    
    function getBalance(month: string){
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const filteredTransactions = transactions.filter(transaction => transaction.date.split('-')[0] === String(currentYear) && transaction.date.split('-')[1] === month);
        const incomeCost = filteredTransactions.filter(transaction => transaction.type.toLowerCase() !== 'expense').reduce((prevAmount, transaction) => prevAmount += transaction.cost, 0);
        const expenseCost = filteredTransactions.filter(transaction => transaction.type.toLowerCase() !== 'income').reduce((prevAmount, transaction) => prevAmount += transaction.cost, 0);
        return incomeCost - expenseCost;
    }

    const data: ChartData[] = [
        {month: 'Jan', value: getBalance('01')},
        {month: 'Feb', value: getBalance('02')},
        {month: 'Mar', value: getBalance('03')},
        {month: 'Apr', value: getBalance('04')},
        {month: 'May', value: getBalance('05')},
        {month: 'Jun', value: getBalance('06')},
        {month: 'Jul', value: getBalance('07')},
        {month: 'Aug', value: getBalance('08')},
        {month: 'Sep', value: getBalance('09')},
        {month: 'Oct', value: getBalance('10')},
        {month: 'Nov', value: getBalance('11')},
        {month: 'Dec', value: getBalance('12')},
    ]
    
    function capitalizeFirstLetter(val: string | number | undefined | null): string {
        if (!val) return '';
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    return (
        <div className='w-full bg-[#191919] rounded-xl shadow-2xl border-1 border-[#4a4a4a] mt-4'>
            <p className="text-gray-300 px-3 py-1.5 border-b-1 border-[#4a4a4a] font-semibold">Balance</p>
            <div className='w-full h-[16rem]'>
                <ResponsiveContainer width='100%' height='100%'>
                    <LineChart
                        data={data}
                        margin={{ top: 15, bottom: 0, right: 15, left: 15 }}
                    >
                        <CartesianGrid strokeDasharray='5 5' />
                        <XAxis dataKey='month' fontSize={12} />
                        <Tooltip
                            content={(props) => (
                                <div className='bg-[#191919] border-1 border-[#4a4a4a] text-gray-300 rounded-xl p-2'>
                                    <p>{props.label}</p>
                                    {props.payload?.map((item) => (
                                        <div key={item.name}>
                                            <p 
                                                className=''>
                                                {capitalizeFirstLetter(item.name)} : {item.value}$
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        />
                        <Line dataKey="value" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}