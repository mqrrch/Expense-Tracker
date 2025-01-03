import { useState } from "react"
import ViewMoreTransaction from "./ViewMoreTransaction"

function TransactionHistoryItem({
    id,
    name,
    category,
    date,
    outcome,
    cost,
    note,
    recurringTime,
    removeTransaction,
    editTransaction,
}){

    const [isViewMoreOpen, setIsViewMoreOpen] = useState(false)

    function NumberFormatter(num) {
        parseFloat(num);
        if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
        return num.toString();
    }

    function capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return (
        <div className="transaction-history-item flex mb-2 px-3 pt-2">
            <p className="transaction-history-name min-w-48 max-w-48 whitespace-nowrap overflow-hidden overflow-ellipsis">{name}</p>
            <div className="transaction-history-btn-container flex w-full ml-32">
                <p className="transaction-history-category w-1/3">{capitalizeFirstLetter(category)}</p>
                <p className="transaction-history-date w-1/3">{date}</p>
                {outcome ? (
                    <p className="transaction-history-cost text-red-500 w-1/3" title={cost}>-${NumberFormatter(cost)}</p>
                ) : (
                    <p className="transaction-history-cost text-green-500 w-1/3" title={cost}>+${NumberFormatter(cost)}</p>
                )}
                <button className="transaction-history-view-more-btn" onClick={() => setIsViewMoreOpen(true)}>
                    <i className="fa-solid fa-ellipsis"></i>
                </button>
            </div>

            <ViewMoreTransaction id={id}
            name={name.trim()}
            category={category}
            date={date}
            outcome={outcome}
            cost={cost}
            note={note}
            recurringTime={recurringTime}
            isViewMoreOpen={isViewMoreOpen}
            setIsViewMoreOpen={setIsViewMoreOpen}
            removeTransaction={removeTransaction}
            editTransaction={editTransaction} />

        </div>
    )
}

export default TransactionHistoryItem