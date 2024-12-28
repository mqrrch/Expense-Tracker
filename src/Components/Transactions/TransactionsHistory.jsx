import { useEffect, useState } from "react"
import ViewMoreTransaction from "./ViewMoreTransaction";
import TransactionHistoryItem from "./TransactionHistoryItem";

function TransactionsHistory({ transactionList, removeTransaction }){
    return (
        <div className="transactions-history-container mt-5 h-96 overflow-y-auto">
            <p className="mt-2 ml-4">Transaction History</p>
            {transactionList.map((t, i) => 
                <TransactionHistoryItem {...t}
                key={i}
                removeTransaction={removeTransaction} />
            )}
        </div>
    )
}

export default TransactionsHistory