import { useEffect, useRef, useState } from "react";
import { useReduxSelector } from "../../hooks/useReduxSelector"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { editTransactionAsync } from "../../features/transactionsAsyncThunks";
import { TransactionItemTypes } from "../../features/types";

interface ViewTransactionProps{
    isViewTransaction: boolean;
    setIsViewTransaction: React.Dispatch<React.SetStateAction<boolean>>;
    transaction: TransactionItemTypes;
    classProp: string;
    handleCloseView: (e: React.MouseEvent) => void;
}

export default function ViewTransaction({ 
    isViewTransaction,
    transaction, 
    classProp,
    handleCloseView }: ViewTransactionProps){
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [newTransactionType, setNewTransactionType] = useState<string>(transaction.type);
    const [newTransactionName, setNewTransactionName] = useState<string>(transaction.name);
    const [newTransactionCost, setNewTransactionCost] = useState<number>(transaction.cost);
    const [newTransactionDate, setNewTransactionDate] = useState<string>(transaction.date);
    const [isTimesDropdownOpen, setIsTimesDropdownOpen] = useState<boolean>(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
    const [newSelectedTime, setNewSelectedTime] = useState<string>(transaction.time);
    const [newSelectedCategory, setNewSelectedCategory] = useState<string>(transaction.category);
    const timesDropdownRef = useRef<HTMLDivElement>(null);
    const categoryDropdownRef = useRef<HTMLDivElement>(null);

    const isLoading = useReduxSelector(state => state.transactions.loading);
    const dispatch = useDispatch<AppDispatch>();

    const [disableSave, setDisableSave] = useState<boolean>(false);

    const transactionTimes: string[] = [
        'One time',
        'Daily',
        'Weekly',
        'Monthly',
        'Yearly'
    ];

    const filteredTransactionTimes: string[] = transactionTimes.filter((time) => time !== newSelectedTime);

    const categoryList: string[] = [
        'Food',
        'Housing',
        'Transportation',
        'Entertainment',
        'Health',
        'Shopping',
        'Education',
        'Debt',
        'Savings',
        'Others',
    ];

    const filteredCategoryList: string[] = categoryList.filter((category) => category !== newSelectedCategory);

    useEffect(() => {
        setNewTransactionType(transaction.type);
        setNewTransactionName(transaction.name);
        setNewTransactionCost(transaction.cost);
        setNewSelectedCategory(transaction.category);
        setNewTransactionDate(transaction.date);
        setNewSelectedTime(transaction.time);
    }, [transaction])

    useEffect(() => {
        const handleClickOutsideDropdown = (e: MouseEvent) => {
            if (timesDropdownRef.current && !timesDropdownRef.current.contains(e.target as Node)) {
                setIsTimesDropdownOpen(false);
            }
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target as Node)) {
                setIsCategoryDropdownOpen(false);
            }
        }

        const listener = (e: globalThis.MouseEvent) => handleClickOutsideDropdown(e);

        if (isTimesDropdownOpen || isCategoryDropdownOpen){
            document.addEventListener('mousedown', listener);
        } 
        
        return () => document.removeEventListener('mousedown', listener);
    }, [isTimesDropdownOpen, isCategoryDropdownOpen])

    useEffect(() => {
        if(
            !newTransactionName.trim() || 
            !newTransactionCost || 
            newTransactionCost < 1 ||
            !newTransactionDate
        ) {
            setDisableSave(true);
        } else{
            setDisableSave(false);
        };
    }, [newTransactionName, newTransactionCost, newTransactionDate]);

    const handleChangeTime = (time: string) => {
        setNewSelectedTime(time);
        setIsTimesDropdownOpen(false);
    }
    const handleChangeCategory = (category: string) => {
        setNewSelectedCategory(category);
        setIsCategoryDropdownOpen(false);
    }
    const handleChangeCost = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (newTransactionCost < 100000000000000 || isNaN(Number(e))){
            setNewTransactionCost(e.currentTarget.valueAsNumber)
        }
    }
    const handleOnKeyDownCost = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key.toLowerCase() === 'backspace' || e.key.toLowerCase() === 'delete'){
            return;
        };
        const currentValue = newTransactionCost.toString();
        if(currentValue.length >= 15){
            e.preventDefault();
        };
    }

    const handleCancel = (e: React.MouseEvent) => {
        handleCloseView(e);
        setIsEdit(false);

        setNewTransactionType(transaction.type);
        setNewTransactionName(transaction.name);
        setNewTransactionCost(transaction.cost);
        setNewSelectedCategory(transaction.category);
        setNewTransactionDate(transaction.date);
        setNewSelectedTime(transaction.time);
    }

    const handleRemoveOrCancel = () => {
        if (!isEdit){
            return; // Dont have the code to remove transaction yet
        } else {
            setIsEdit(false);

            setNewTransactionType(transaction.type);
            setNewTransactionName(transaction.name);
            setNewTransactionCost(transaction.cost);
            setNewSelectedCategory(transaction.category);
            setNewTransactionDate(transaction.date);
            setNewSelectedTime(transaction.time);
        }
    }

    const handleEditOrSave = async() => {
        if(!transaction.id) return;

        if (!isEdit){
            setIsEdit(true);
        } else{
            try{
                await dispatch(editTransactionAsync({
                    id: transaction.id,
                    type: newTransactionType,
                    name: newTransactionName,
                    cost: newTransactionCost,
                    category: newSelectedCategory,
                    time: newSelectedTime,
                    date: newTransactionDate,
                }));
            } catch (err){
                console.error(err);
            }
        }
    }

    return (
        <>
            <div 
                className={`fixed top-0 left-0 w-full h-screen bg-black z-40 ${classProp === 'fade-in' ? 'overlay-fade-in' : 'overlay-fade-out'} ${!isViewTransaction && 'pointer-events-none'}`}
                onClick={(e) => handleCancel(e)}
            ></div>

            <div className={`fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] ${isEdit ? 'bg-[#111]' : 'bg-[#191919]'} border-1 border-[#4a4a4a] rounded-xl text-gray-300 z-50 transition-colors duration-300 ${classProp} ${!isViewTransaction && 'pointer-events-none'}`}>
                <i 
                    onClick={(e) => handleCancel(e)}
                    className="fa-solid fa-xmark absolute top-2.5 right-3 cursor-pointer"
                ></i>
                <p className="px-3 py-1.5 border-b-1 border-[#4a4a4a] font-semibold">Transaction</p>
                <form
                    className={`p-3 flex flex-col gap-3 ${isLoading && 'opacity-50 cursor-not-allowed pointer-events-none'}`}
                >
                    <div className="flex w-full border-1 border-[#222] rounded-xl">
                        <button 
                            type="button"
                            onClick={() => setNewTransactionType('Income')}
                            className={`flex-1 p-1 rounded-xl rounded-r-none transition-colors duration-300 ${newTransactionType === 'Income' && 'bg-[#414141]'} ${!isEdit ? 'cursor-default' : 'cursor-pointer'}`}
                            disabled={!isEdit}
                        >
                            Income
                        </button>
                        <button 
                            type="button"
                            onClick={() => setNewTransactionType('Expense')}
                            className={`flex-1 p-1 rounded-xl rounded-l-none transition-colors duration-300 ${newTransactionType === 'Expense' && 'bg-[#414141]'} ${!isEdit ? 'cursor-default' : 'cursor-pointer'}`}
                            disabled={!isEdit}
                        >
                            Expense
                        </button>
                    </div>
                    <input 
                        className={`px-2 p-1 border-1 border-[#222] rounded-lg outline-none ${!isEdit ? 'cursor-default' : 'cursor-text'}`}
                        name="transaction-name"
                        id="transaction-name" 
                        placeholder="Transaction name.."
                        autoComplete="off"
                        value={newTransactionName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTransactionName(e.currentTarget.value)}
                        disabled={!isEdit}
                        required
                    ></input>


                    {/* SOMEHOW IT CAN BE EDITED TO MORE THAN 100T COST. FIX THIS */}
                    <div className="relative">
                        <input 
                            className={`w-full px-2 p-1 pr-8 rounded-lg border-1 border-[#222] outline-none ${isLoading && 'cursor-not-allowed'}`}
                            type="number"
                            name="transaction-cost"
                            id="transaction-cost"
                            placeholder="Cost"
                            autoComplete="off"
                            value={newTransactionCost.toString()}
                            min={1}
                            max={100000000000000}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeCost(e)}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleOnKeyDownCost(e)}
                            disabled={!isEdit}
                            required
                        ></input>
                        <label 
                            htmlFor="transaction-cost" 
                            className="absolute top-[4.5px] right-3 text-[#888]"
                        >
                            $
                        </label>
                    </div>
                    <div className="flex flex-col gap-3">
                        {/* Custom category dropdown */}
                        <div className="relative rounded-lg mx-auto select-none w-full" ref={categoryDropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                className={`flex justify-between items-center w-full rounded-lg p-1 px-2 pr-3 select-none border-1 border-[#222] outline-none ${!isEdit ? 'cursor-default' : 'cursor-pointer'}`}
                                disabled={!isEdit}
                            >
                                {newSelectedCategory}
                                <div className={`border-r-2 border-b-2 p-1 ${isCategoryDropdownOpen ? 'rotate-[-135deg] mb-[-3px]' : 'rotate-45 mb-[3px]'}`}></div>
                            </button>

                            {isCategoryDropdownOpen && (
                                <div className="absolute mt-1 w-full bg-[#191919] shadow-lg rounded-md z-[3]">
                                    <ul className="max-h-[180px] overflow-auto">
                                        {filteredCategoryList.map((category, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleChangeCategory(category)}
                                                className="px-4 py-1.5 cursor-pointer hover:bg-[#222] first-of-type:hover:rounded-t-md last-of-type:hover:rounded-b-md"
                                            >
                                                {category}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Custom times dropdown */}
                        <div className="relative rounded-lg mx-auto select-none w-full" ref={timesDropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsTimesDropdownOpen(!isTimesDropdownOpen)}
                                className={`flex justify-between items-center w-full rounded-lg p-1 px-2 pr-3 select-none border-1 border-[#222] outline-none ${!isEdit ? 'cursor-default' : 'cursor-pointer'}`}
                                disabled={!isEdit}
                            >
                                {newSelectedTime}
                                <div className={`border-r-2 border-b-2 p-1 ${isTimesDropdownOpen ? 'rotate-[-135deg] mb-[-3px]' : 'rotate-45 mb-[3px]'}`}></div>
                            </button>

                            {isTimesDropdownOpen && (
                                <div className="absolute mt-1 w-full bg-[#191919] shadow-lg rounded-md z-[3]">
                                    <ul className="max-h-60 overflow-auto">
                                        {filteredTransactionTimes.map((time, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleChangeTime(time)}
                                                className="px-4 py-1.5 cursor-pointer hover:bg-[#222] first-of-type:hover:rounded-t-md last-of-type:hover:rounded-b-md"
                                            >
                                                {time}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <input 
                        className={`px-2 p-1 rounded-lg border-1 border-[#222] outline-none ${!isEdit ? 'cursor-default' : 'cursor-text'}`}
                        type="date"
                        name="transaction-date"
                        id="transaction-date"
                        autoComplete="off"
                        value={newTransactionDate}
                        min="1900-01-01"
                        max={new Date().toLocaleDateString('fr-ca')}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTransactionDate(e.currentTarget.value)}
                        disabled={!isEdit}
                        required
                    ></input>
                    <div className="flex gap-3">
                        <button 
                            type="button" 
                            className={`w-full p-1.5 border-1 border-red-500 rounded-xl hover:bg-[#222] transition-colors duration-300 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            onClick={handleRemoveOrCancel}
                            disabled={isLoading}
                        >
                            {!isEdit ? 'Remove' : 'Cancel'}
                        </button>
                        <button 
                            type="button"
                            className={`w-full p-1.5 border-1 ${isEdit ? 'border-green-500' : 'border-blue-500'} rounded-xl hover:bg-[#222] transition-colors duration-300 ${isLoading || disableSave ? 'cursor-not-allowed' : 'cursor-pointer'} ${disableSave && 'opacity-50'}`}
                            onClick={handleEditOrSave}
                            disabled={isLoading || disableSave}
                        >
                            {!isEdit ? 'Edit' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}