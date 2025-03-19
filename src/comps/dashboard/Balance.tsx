import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

interface ChartData {
    month: string;
    value: number;
}

const data: ChartData[] = [
    {month: 'Jan', value: 100},
    {month: 'Feb', value: 100},
    {month: 'Mar', value: 100},
    {month: 'Apr', value: 100},
    {month: 'May', value: 100},
    {month: 'Jun', value: 100},
    {month: 'Jul', value: 100},
    {month: 'Aug', value: 100},
    {month: 'Sep', value: 100},
    {month: 'Oct', value: 100},
    {month: 'Nov', value: 100},
    {month: 'Dec', value: 100},
]

function capitalizeFirstLetter(val: string | number | undefined | null): string {
    if (!val) return '';
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export default function Balance(){
    return (
        <div className='w-full bg-[#191919] rounded-xl shadow-2xl border-1 border-[#4a4a4a] mt-4'>
            <p className="text-gray-300 px-3 py-1.5 border-b-1 border-[#4a4a4a] font-semibold">Balance</p>
            <div className='w-full h-[16rem]'>
                <ResponsiveContainer width='100%' height='100%'>
                    <LineChart
                        data={data}
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