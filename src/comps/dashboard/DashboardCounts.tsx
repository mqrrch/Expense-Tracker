export default function DashboardCounts(){
    const counts = [
        { name: 'Income', value: 500, color: 'text-blue-500'},
        { name: 'Expenses', value: 500, color: 'text-pink-500'},
        { name: 'Balance', value: 500, color: 'text-green-500'},
        { name: 'Transactions', value: 500, color: 'text-cyan-500'},
    ]

    return (
        <div className="grid grid-cols-2 gap-4 text-center">
            {counts.map((item) => (
                <div key={item.name} className="p-4 border-1 bg-[#191919] border-[#4a4a4a] rounded-xl">
                    <p className="text-gray-300 font-semibold">{item.name}</p>
                    <p className={`${item.color} text-xl`}>{item.value}{item.name !== 'Transactions' && '$'}</p>
                </div>
            ))}
        </div>
    )
}