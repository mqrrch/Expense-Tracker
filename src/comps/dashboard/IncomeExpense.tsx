import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface ChartData {
    month: string;
    income: number;
    expense: number;
}

const data: ChartData[] = [
    {month: 'Jan', income: 1500, expense: 200},
    {month: 'Feb', income: 1060, expense: 40},
    {month: 'Mar', income: 1040, expense: 900},
    {month: 'Apr', income: 1800, expense: 1500},
    {month: 'May', income: 1600, expense: 1240},
    {month: 'Jun', income: 1400, expense: 680},
    {month: 'Jul', income: 1900, expense: 780},
    {month: 'Aug', income: 1200, expense: 620},
    {month: 'Sep', income: 1600, expense: 430},
    {month: 'Oct', income: 1400, expense: 610},
    {month: 'Nov', income: 1400, expense: 680},
    {month: 'Dec', income: 1200, expense: 600},
]

function capitalizeFirstLetter(val: string | number | undefined | null): string {
    if (!val) return '';
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export default function IncomeExpense(){
    return(
        <div className='w-full bg-[#191919] rounded-xl shadow-2xl border-1 border-[#4a4a4a] mt-4'>
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