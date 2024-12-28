import { useEffect, useState } from "react"
import AddOneTime from "./AddOneTime"
import AddRecurring from "./AddRecurring"
import TransactionsHistory from "./TransactionsHistory"

function TransactionsPage(){
    const [transaction, setTransaction] = useState({
        id: '',
        name: '',
        date: '',
        outcome: false,
        cost: '',
        note: '',
        isRecurring: false,
        recurringTime: ''
    })
    const [transactionList, setTransactionList] = useState([])

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
    
    return (
        <div className="mt-6 mb-5 w-5/6">
            <div className="flex justify-around">
                <AddOneTime setTransaction={setTransaction} />
                <AddRecurring setTransaction={setTransaction} />
            </div>
            <TransactionsHistory transactionList={transactionList} removeTransaction={removeTransaction} />
        </div>
    )
}

export default TransactionsPage