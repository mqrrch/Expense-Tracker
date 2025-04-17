import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTransactionAsync } from "../../features/transactionsAsyncThunks";
import { AppDispatch } from "../../store";
import { useReduxSelector } from "../../hooks/useReduxSelector";

interface IsOpen{
    isAddTransaction: boolean;
    setIsAddTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddTransaction({ isAddTransaction, setIsAddTransaction }: IsOpen){
    const [transactionType, setTransactionType] = useState<string>('Income');
    const [transactionName, setTransactionName] = useState<string>('');
    const [transactionCost, setTransactionCost] = useState<number>(0);
    const [transactionDate, setTransactionDate] = useState<string>('');
    const [isTimesDropdownOpen, setIsTimesDropdownOpen] = useState<boolean>(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
    const [selectedTime, setSelectedTime] = useState<string>('One time');
    const [selectedCategory, setSelectedCategory] = useState<string>('Others');
    const isLoading = useReduxSelector(state => state.transactions.loading);
    const timesDropdownRef = useRef<HTMLDivElement>(null);
    const categoryDropdownRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();

    const transactionTimes: string[] = [
        'One time',
        'Daily',
        'Weekly',
        'Monthly',
        'Yearly'
    ];

    const filteredTransactionTimes: string[] = transactionTimes.filter((time) => time !== selectedTime);

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

    const filteredCategoryList: string[] = categoryList.filter((category) => category !== selectedCategory);

    useEffect(() => {
        const handleClickOutsideDropdown = (e: MouseEvent) => {
            if (timesDropdownRef.current && !timesDropdownRef.current.contains(e.target as Node)) {
                setIsTimesDropdownOpen(false);
            };
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target as Node)) {
                setIsCategoryDropdownOpen(false);
            };
        };

        const listener = (e: globalThis.MouseEvent) => handleClickOutsideDropdown(e);

        if (isTimesDropdownOpen || isCategoryDropdownOpen){
            document.addEventListener('mousedown', listener);
        } 
        
        return () => document.removeEventListener('mousedown', listener);
    }, [isTimesDropdownOpen, isCategoryDropdownOpen]);

    const handleChangeTime = (time: string) => {
        setSelectedTime(time);
        setIsTimesDropdownOpen(false);
    };

    const handleChangeCategory = (category: string) => {
        setSelectedCategory(category);
        setIsCategoryDropdownOpen(false);
    };
    const handleChangeCost = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (transactionCost < 100000000000000 || isNaN(Number(e))){
            setTransactionCost(e.currentTarget.valueAsNumber);
        };
    };
    const handleOnKeyDownCost = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key.toLowerCase() === 'backspace' || e.key.toLowerCase() === 'delete'){
            return;
        };
        const currentValue = transactionCost.toString();
        if(currentValue.length >= 15){
            e.preventDefault();
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await dispatch(addTransactionAsync({
                type: transactionType,
                name: transactionName,
                cost: transactionCost,
                category: selectedCategory,
                time: selectedTime,
                date: transactionDate,
            }));

            setTransactionType('Income');
            setTransactionName('');
            setTransactionCost(0);
            setSelectedCategory('Others');
            setTransactionDate('');
            setSelectedTime('One time');
            setIsAddTransaction(false);
        } catch (err){
            console.error(err);
        }
    }
    
    return(
        <div className={`fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] bg-[#111] border-1 border-[#4a4a4a] rounded-xl text-gray-300 z-50 transition-all duration-400 ${!isAddTransaction && 'opacity-0 pointer-events-none'}`}>
            <i 
                onClick={() => setIsAddTransaction(false)}
                className="fa-solid fa-xmark absolute top-2.5 right-3 cursor-pointer"
            ></i>
            <p className="px-3 py-1.5 border-b-1 border-[#4a4a4a] font-semibold">Add Transaction</p>
            <form 
                onSubmit={handleSubmit}
                className={`p-3 flex flex-col gap-3 ${isLoading && 'opacity-50 cursor-not-allowed pointer-events-none'}`}
            >
                <div className="flex w-full border-1 border-[#222] rounded-xl">
                    <button 
                        type="button"
                        onClick={() => setTransactionType('Income')}
                        className={`flex-1 p-1 cursor-pointer rounded-xl rounded-r-none transition-colors duration-300 ${transactionType === 'Income' && 'bg-linear-to-r from-[#3a3a3a] to-[#4b4b4b]'}`}
                    >
                        Income
                    </button>
                    <button 
                        type="button"
                        onClick={() => setTransactionType('Expense')}
                        className={`flex-1 p-1 cursor-pointer rounded-xl rounded-l-none transition-colors duration-300 ${transactionType === 'Expense' && 'bg-linear-to-l from-[#3a3a3a] to-[#4b4b4b]'}`}
                    >
                        Expense
                    </button>
                </div>
                <input 
                    className="px-2 p-1 border-1 border-[#222] rounded-lg outline-none"
                    name="transaction-name"
                    id="transaction-name" 
                    placeholder="Transaction name.."
                    autoComplete="off"
                    value={transactionName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTransactionName(e.currentTarget.value)}
                    disabled={isLoading}
                    required
                ></input>
                <div className="relative">
                    <input 
                        className={`w-full px-2 p-1 pr-8 rounded-lg border-1 border-[#222] outline-none ${isLoading && 'cursor-not-allowed'}`}
                        type="number"
                        name="transaction-cost"
                        id="transaction-cost"
                        placeholder="Cost"
                        autoComplete="off"
                        value={transactionCost.toString()}
                        min={1}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeCost(e)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleOnKeyDownCost(e)}
                        disabled={isLoading}
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
                            className={`flex justify-between items-center w-full rounded-lg p-1 px-2 pr-3 select-none border-1 border-[#222] outline-none ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            disabled={isLoading}
                        >
                            {selectedCategory}
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
                            className={`flex justify-between items-center w-full rounded-lg p-1 px-2 pr-3 select-none border-1 border-[#222] outline-none ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            disabled={isLoading}
                        >
                            {selectedTime}
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
                    className={`px-2 p-1 rounded-lg border-1 border-[#222] outline-none ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    type="date"
                    name="transaction-date"
                    id="transaction-date"
                    autoComplete="off"
                    min="1900-01-01"
                    max={new Date().toLocaleDateString('fr-ca')}
                    value={transactionDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTransactionDate(e.currentTarget.value)}
                    disabled={isLoading}
                    required
                ></input>
                <button 
                    type="submit" 
                    className={`p-2 border-1 border-[#4a4a4a] rounded-lg hover:bg-[#222] transition-colors duration-300 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={isLoading}
                >
                    Add Transaction
                </button>
            </form>
        </div>
    )
}