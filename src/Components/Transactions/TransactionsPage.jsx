import { useEffect, useState } from "react"
import AddOneTime from "./AddOneTime"
import AddRecurring from "./AddRecurring"
import TransactionsHistory from "./TransactionsHistory"

function TransactionsPage(){
    const [transaction, setTransaction] = useState({
        id: '',
        name: '',
        category: '',
        date: '',
        outcome: false,
        cost: '',
        note: '',
        recurringTime: ''
    })
    const [transactionList, setTransactionList] = useState(() => {
        const localValue = localStorage.getItem("TRANSACTION_LIST");
        if (localValue === null) return [];
        return JSON.parse(localValue);
    })

    useEffect(() => {
        localStorage.setItem("TRANSACTION_LIST", JSON.stringify(transactionList))
      }, [transactionList])

    useEffect(() => {
        // The if statement is to check if its valid or not (only name because every input is required)
        if (transaction.name) {
            setTransactionList((prevList) => [...prevList, transaction])
        }
    }, [transaction])

    function removeTransaction(id){
        setTransactionList(currentList => {
            return currentList.filter((transaction) => transaction.id !== id)
        })
    }

    function editTransaction(id, newName, newCategory, newDate, newOutcome, newCost, newNote, newRecurringTime){
        setTransactionList(currentList => {
            return currentList.map(transaction => {
                if (transaction.id === id){
                    return {...transaction, 
                        name: newName, 
                        category: newCategory,
                        date: newDate, 
                        outcome: newOutcome, 
                        cost: newCost, 
                        note: newNote, 
                        recurringTime: newRecurringTime}
                }
                return transaction
            })
        })
    }
    
    return (
        <div className="mt-6 pb-6 w-10/12 min-h-fit overflow-hidden">
            <div className="add-transaction-container flex gap-16">
                <AddOneTime setTransaction={setTransaction} />
                <AddRecurring setTransaction={setTransaction} />
            </div>
            <TransactionsHistory transactionList={transactionList} 
            removeTransaction={removeTransaction} 
            editTransaction={editTransaction} />
        </div>
    )
}

export default TransactionsPage