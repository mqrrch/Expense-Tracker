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
    isRecurring,
    recurringTime,
    removeTransaction,
}){

    const [isViewMoreOpen, setIsViewMoreOpen] = useState(false)
    const [isOutcome, setIsOutcome] = useState(false)

    console.log(id)

    return (
        <div className="flex justify-between mt-2 mx-4">
            <p>{name}</p>
            <div className="flex">
                <p className="w-56 text-center">{date}</p>
                {outcome ? (
                    <p className="w-48 text-red-500">-${cost}</p>
                ) : (
                    <p className="w-48 text-green-500">+${cost}</p>
                )}

                <button className="text-center mr-5" onClick={() => setIsViewMoreOpen(true)}>
                    <i className="fa-solid fa-ellipsis"></i>
                </button>

                <ViewMoreTransaction id={id}
                name={name}
                category={category}
                date={date}
                outcome={outcome}
                cost={cost}
                note={note}
                isRecurring={isRecurring}
                recurringTime={recurringTime}
                isViewMoreOpen={isViewMoreOpen}
                setIsViewMoreOpen={setIsViewMoreOpen}
                isOutcome={isOutcome}
                setIsOutcome={setIsOutcome}
                removeTransaction={removeTransaction} />
                
            </div>
        </div>
    )
}

export default TransactionHistoryItem