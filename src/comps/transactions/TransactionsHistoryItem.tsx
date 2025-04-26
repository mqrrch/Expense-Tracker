import { useState } from "react";
import ViewTransaction from "./ViewTransaction";
import { TransactionItemTypes } from "../../features/types";

interface ItemTypes{
    item: TransactionItemTypes
}

export default function TransactionsHistoryItem({ item }: ItemTypes){
    const [isViewTransaction, setIsViewTransaction] = useState<boolean>(false);
    const [animationClass, setAnimationClass] = useState<string>('');

    const handleOpenView = (e: React.MouseEvent) => {
        e.stopPropagation();
        setAnimationClass('fade-in');
        setIsViewTransaction(true);
    };

    const handleCloseView = (e: React.MouseEvent) => {
        e.stopPropagation();
        setAnimationClass('fade-out');
        setTimeout(() => {
            setIsViewTransaction(false);
        }, 300);
    }

    function NumberFormatter(num: number):string {
        if (num >= 1_000_000_000_000_000) return (num / 1_000_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'Qd';
        if (num >= 1_000_000_000_000) return (num / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T';
        if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
        return num.toString();
    };

    return (
        <div
            onClick={(e) => handleOpenView(e)}
            className={`flex gap-3 py-1 px-3 hover:bg-[#333] ${!isViewTransaction && 'cursor-pointer'}`}
        >
            <i className={`fa-solid ${item.type === 'Income' ? 'fa-sack-dollar bg-green-500' : 'fa-sack-xmark bg-red-500'} place-self-center p-1.5 rounded-full`}></i>
            <div className="flex justify-between w-full">
                <div className="text-gray-300">
                    <p className="w-[8ch] truncate">{item.name}</p>
                    <p className="text-[12px] text-gray-400">{item.date}</p>
                </div>
                <p className={`w-[7ch] text-end place-self-center ${item.type === 'Income' ? 'text-green-500' : 'text-red-500'}`}>
                    {item.type === 'Income' ? '+' : '-'}${NumberFormatter(item.cost)}
                </p>
            </div>

            {isViewTransaction && (
                <>
                    <ViewTransaction
                        isViewTransaction={isViewTransaction}
                        setIsViewTransaction={setIsViewTransaction}
                        transaction={item}
                        classProp={animationClass}
                        setAnimationClass={setAnimationClass}
                        handleCloseView={handleCloseView}
                    />
                </>
            )}
        </div>
    )
}