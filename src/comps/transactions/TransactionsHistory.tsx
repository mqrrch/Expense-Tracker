import { useMemo, useState } from "react";
import { useReduxSelector } from "../../hooks/useReduxSelector";
import TransactionsHistoryItem from "./TransactionsHistoryItem";

export default function TransactionsHistory(){
    const [searchString, setSearchString] = useState<string>('');
    const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
    const [sortType, setSortType] = useState<string>('all');
    const transactions = useReduxSelector(state => state.transactions.transactions);

    const sortedTransactions = useMemo(() => {
        if (!transactions) return [];
        switch(sortType){
            case 'all':
                return transactions;
            case 'income':
                return transactions.filter((transaction) => transaction.type === 'Income');
            case 'expense':
                return transactions.filter((transaction) => transaction.type === 'Expense');
        }
    }, [transactions, sortType])

    const filteredTransactions = useMemo(() => {
        if (!sortedTransactions) return [];
        if (!searchString.trim()) return sortedTransactions;
        const sorted = [...sortedTransactions]
        return sorted.filter((transaction) => transaction.name.includes(searchString))
    }, [sortedTransactions, searchString])

    return (
        <div className="w-full h-[24rem] flex flex-col rounded-xl shadow-2xl border-1 border-[#4a4a4a] text-gray-300 overflow-hidden">
            <p className="px-3 py-1.5 border-b-1 border-[#4a4a4a] font-semibold">Transactions History</p>

            <div className="flex-1 overflow-y-scroll no-scrollbar overflow-x-hidden">
                {/* search */}
                <form 
                    className="flex justify-between items-center gap-4 border-1 border-[#4a4a4a] mx-2 mb-0 mt-2 rounded-lg p-1 px-2 "
                >
                    <input 
                        id="search-transaction" 
                        name="search-transaction"
                        className="placeholder:text-gray-500 w-full outline-none"
                        placeholder="Search.."
                        value={searchString}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchString(e.currentTarget.value)}
                    ></input>
                    <button 
                        type="button"
                        className="cursor-pointer"
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>

                {/* sort */}
                <div className="flex flex-col mx-2 mt-0.5">
                    <div className="flex justify-between">
                        <div className="flex-1"></div>
                        <button 
                            type="button"
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="flex items-center gap-2 cursor-pointer outline-none"
                        >
                            Sort
                            <div className={`history-arrow ${isSortOpen ? 'arrow-up' : 'arrow-down'}`}></div>
                        </button>
                    </div>
                    {isSortOpen && (
                        <div className="flex justify-end gap-4">
                            <p 
                                onClick={() => setSortType('all')}
                                className={`cursor-pointer ${sortType === 'all' ? 'text-gray-300' : 'text-gray-500'}`}
                            >
                                All
                            </p>
                            <p 
                                onClick={() => setSortType('income')}
                                className={`cursor-pointer ${sortType === 'income' ? 'text-gray-300' : 'text-gray-500'}`}
                            >
                                Income
                            </p>
                            <p 
                                onClick={() => setSortType('expense')}
                                className={`cursor-pointer ${sortType === 'expense' ? 'text-gray-300' : 'text-gray-500'}`}
                            >
                                Expenses
                            </p>
                        </div>
                    )}
                </div>

                {/* map */}
                <div className="mt-1">
                    {filteredTransactions.map((item, index) => (
                        <TransactionsHistoryItem 
                            key={index} 
                            item={item} 
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}