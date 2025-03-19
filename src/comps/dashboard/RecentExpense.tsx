export default function RecentExpense(){
    return (
        <div className="w-full h-[16rem] bg-[#191919] rounded-xl shadow-2xl border-1 border-[#4a4a4a]">
            <p className="text-gray-300 px-3 py-1.5 border-b-1 border-[#4a4a4a] font-semibold">Recent Expenses</p>
            <div className="pt-2 px-3 flex justify-between">
                <div className="text-gray-300 w-[100px]">
                    <p className="font-semibold text-sm">Subject</p>
                    <p>Get dinner</p>
                </div>
                <div className="text-gray-300 w-[100px] text-end">
                    <p className="font-semibold text-sm">Amount</p>
                    <p>$200</p>
                </div>

            </div>
        </div>
    )
}