import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
    name: string,
    value: number,
}

const data: ChartData[] = [
    { name: 'Food', value: 10 },
    { name: 'Housing', value: 10 },
    { name: 'Transportation', value: 10 },
    { name: 'Entertainment', value: 10 },
    { name: 'Health', value: 10 },
    { name: 'Shopping', value: 10 },
    { name: 'Education', value: 10 },
    { name: 'Debt', value: 10 },
    { name: 'Savings', value: 10 },
    { name: 'Others', value: 10 },
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

export default function Summary(){

    return (
        <div className='w-full bg-[#191919] rounded-xl shadow-2xl border-1 border-[#4a4a4a] mt-4'>
            <p className="text-gray-300 px-3 py-1.5 border-b-1 border-[#4a4a4a] font-semibold">Summary</p>
            <div className='w-full h-[16rem]'>
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
            </div>
        </div>
    );
}