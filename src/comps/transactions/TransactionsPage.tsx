import AddTransaction from "./AddTransaction";
import TransactionsHistory from "./TransactionsHistory";

export default function TransactionsPage(){
    return(
        <div className="flex flex-col gap-4">
            <AddTransaction />
            <TransactionsHistory />
        </div>
    )
}