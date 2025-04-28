import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useReduxSelector } from '../../hooks/useReduxSelector';
import { useNavigate } from 'react-router-dom';

interface ChartData {
    name: string,
    value: number,
}

export default function Summary(){
    const transactions = useReduxSelector(state => state.transactions.transactions);
    const expenseTransactions = transactions.filter(transaction => transaction.type.toLowerCase() !== 'income');
    const navigate = useNavigate();
    
    function getCategoryCost(category: string){
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        function formatMonth(month: number): string{
            if (!month) return '';
            if (String(month).length === 1){
                return `0${month}`;
            } else{
                return String(month);
            };
        };
        const filteredTransactions = expenseTransactions.filter(transaction => transaction.date.split('-')[0] === String(currentYear) && transaction.date.split('-')[1] === formatMonth(currentMonth) && transaction.category === category);
        return filteredTransactions.reduce((prevAmount, transaction) => prevAmount += transaction.cost, 0)
    }

    const data: ChartData[] = [
        { name: 'Food', value: getCategoryCost('Food') },
        { name: 'Housing', value: getCategoryCost('Housing') },
        { name: 'Transportation', value: getCategoryCost('Transportation') },
        { name: 'Entertainment', value: getCategoryCost('Entertainment') },
        { name: 'Health', value: getCategoryCost('Health') },
        { name: 'Shopping', value: getCategoryCost('Shopping') },
        { name: 'Education', value: getCategoryCost('Education') },
        { name: 'Debt', value: getCategoryCost('Debt') },
        { name: 'Savings', value: getCategoryCost('Savings') },
        { name: 'Others', value: getCategoryCost('Others') },
    ];
    
    const colorRange: string[] = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(201, 203, 207, 0.6)',
        'rgba(46, 204, 113, 0.6)',
        'rgba(241, 196, 15, 0.6)',
        'rgba(231, 76, 60, 0.6)',
    ]

    return (
        <div className='w-full bg-[#191919] rounded-xl shadow-2xl border-1 border-[#4a4a4a]'>
            <p className="text-gray-300 px-3 py-1.5 border-b-1 border-[#4a4a4a] font-semibold">Summary</p>
            <div className='w-full h-[16rem] flex justify-center items-center'>
                {expenseTransactions.length === 0 ? (
                    <div className='text-gray-300 text-center'>
                        <p>No expenses yet</p>
                        <button 
                            onClick={() => navigate('/transactions')}
                            className='bg-green-600 hover:bg-green-700 transition-colors duration-300 w-full p-1 px-2 mt-2 rounded-lg cursor-pointer'
                        >
                            Add Transaction
                        </button>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                            >
                                {data.map((_, index) => 
                                    <Cell 
                                        key={index} 
                                        fill={colorRange[index]}
                                        className='outline-none'
                                    />
                                )}
                            </Pie>
                            <Tooltip
                                content={(props) => (
                                    <div className='bg-[#191919] border-1 border-[#4a4a4a] rounded-xl p-2'>
                                        {props.payload?.map((item) => (
                                            <div key={item.name}>
                                                <p className='text-gray-300'>{item.name}</p>
                                                <p className='text-indigo-500'>{item.value}$</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}