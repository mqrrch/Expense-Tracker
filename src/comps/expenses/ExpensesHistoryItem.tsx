import { ExpenseItemTypes } from "../../features/types";

export default function ExpensesHistoryItem({ name, cost, type, date, note }: ExpenseItemTypes){
    function NumberFormatter(num: number):string {
        if (num >= 1_000_000_000_000) return (num / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T';
        if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
        return num.toString();
    }

    return(
        <div className="flex justify-between text-gray-300">
            <p className="w-[12ch] truncate">{name}</p>
            <p>${NumberFormatter(parseFloat(cost))}</p>
        </div>
    )
}