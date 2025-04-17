import { useState } from "react";
import AddTransaction from "./AddTransaction";
import TransactionsHistory from "./TransactionsHistory";

export default function TransactionsPage(){
    const [isAddTransaction, setIsAddTransaction] = useState<boolean>(false);

    return(
        <div className="flex flex-col gap-4">
            <button 
                className="flex gap-2 justify-center items-center text-gray-300 p-1 py-2 border-1 border-[#4a4a4a] transition-colors duration-300 hover:bg-[#1a1a1a] rounded-lg cursor-pointer"
                onClick={() => setIsAddTransaction(true)}
            >
                <p>Add Transaction</p>
                <i className="fa-solid fa-plus text-green-500"></i>
            </button>
            <div 
                className={`fixed top-0 left-0 w-full h-screen bg-black z-40 transition-all duration-300 ${isAddTransaction ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsAddTransaction(false)}
            ></div>
            <AddTransaction isAddTransaction={isAddTransaction} setIsAddTransaction={setIsAddTransaction} />
            <TransactionsHistory />
        </div>
    )
}