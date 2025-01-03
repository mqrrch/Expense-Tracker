import { useEffect, useState } from "react"
import TransactionHistoryItem from "./TransactionHistoryItem";

function TransactionsHistory({ transactionList, removeTransaction, editTransaction }){
    const [sortBy, setSortBy] = useState("")
    const sortedTransactionList= [...transactionList].sort((a, b) => {
        if (sortBy === "date"){
            return new Date(b.date) - new Date(a.date);
        } else if (sortBy === "name"){
            return a.name.localeCompare(b.name);
        } else if (sortBy === "amount"){
            return b.cost - a.cost;
        }
    })

    return (
        <div className="transactions-history-container mt-5 h-2/3 overflow-y-auto">
            <div className="transaction-history-header flex justify-between">
                <p className="transaction-history-title p-2">Transaction History</p>
                <div className="flex justify-center items-center gap-5 mr-3">
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)} id="sort-by" name="sort-by" className="border-2 border-solid border-gray-500 rounded text-xs">
                        <option value="" disabled>Sort by</option>
                        <option value="none">None</option>
                        <option value="name">Name</option>
                        <option value="amount">Amount</option>
                        <option value="date">Date</option>
                    </select>
                </div>
            </div>
            {sortBy ? (
                <>
                    {sortedTransactionList.map((t, i) => 
                        <TransactionHistoryItem {...t}
                        key={i}
                        removeTransaction={removeTransaction}
                        editTransaction={editTransaction} />
                    )}    
                </>
            ) : (
                <>
                    {transactionList.map((t, i) => 
                        <TransactionHistoryItem {...t}
                        key={i}
                        removeTransaction={removeTransaction}
                        editTransaction={editTransaction} />
                    )}    
                </>
            )}
        </div>
    )
}

export default TransactionsHistory