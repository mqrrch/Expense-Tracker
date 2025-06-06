import React, { useEffect, useRef, useState } from "react";
import { useReduxSelector } from "../../hooks/useReduxSelector"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { editTransactionAsync, removeTransactionAsync } from "../../features/transactionsAsyncThunks";
import { TransactionItemTypes } from "../../features/types";

interface ViewTransactionProps{
    isViewTransaction: boolean;
    setIsViewTransaction: React.Dispatch<React.SetStateAction<boolean>>;
    transaction: TransactionItemTypes;
    classProp: string;
    setAnimationClass: React.Dispatch<React.SetStateAction<string>>;
    handleCloseView: (e: React.MouseEvent) => void;
}

export default function ViewTransaction({ 
    isViewTransaction,
    setIsViewTransaction,
    transaction, 
    classProp,
    setAnimationClass,
    handleCloseView }: ViewTransactionProps){
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [newTransactionType, setNewTransactionType] = useState<string>(transaction.type);
    const [newTransactionName, setNewTransactionName] = useState<string>(transaction.name);
    const [newTransactionCost, setNewTransactionCost] = useState<number>(transaction.cost);
    const [newTransactionDate, setNewTransactionDate] = useState<string>(transaction.date);
    // const [newNextPaymentDate, setNewNextPaymentDate] = useState<string>(transaction.nextPaymentDate);
    const [isFrequencyDropdownOpen, setIsFrequencyDropdownOpen] = useState<boolean>(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
    const [newSelectedFrequency, setNewSelectedFrequency] = useState<string>(transaction.frequency);
    const [newSelectedCategory, setNewSelectedCategory] = useState<string>(transaction.category);
    const frequencyDropdownRef = useRef<HTMLDivElement>(null);
    const categoryDropdownRef = useRef<HTMLDivElement>(null);

    const isLoading = useReduxSelector(state => state.transactions.loading);
    const dispatch = useDispatch<AppDispatch>();

    const [disableSave, setDisableSave] = useState<boolean>(false);

    const transactionFrequencies: string[] = [
        'One time',
        'Daily',
        'Weekly',
        'Monthly',
        'Yearly'
    ];

    const filteredTransactionFrequencies: string[] = transactionFrequencies.filter((frequency) => frequency !== newSelectedFrequency);

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
        setNewSelectedFrequency(transaction.frequency);
    }, [transaction])

    useEffect(() => {
        const handleClickOutsideDropdown = (e: MouseEvent) => {
            if (frequencyDropdownRef.current && !frequencyDropdownRef.current.contains(e.target as Node)) {
                setIsFrequencyDropdownOpen(false);
            }
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target as Node)) {
                setIsCategoryDropdownOpen(false);
            }
        }

        const listener = (e: globalThis.MouseEvent) => handleClickOutsideDropdown(e);

        if (isFrequencyDropdownOpen || isCategoryDropdownOpen){
            document.addEventListener('mousedown', listener);
        } 
        
        return () => document.removeEventListener('mousedown', listener);
    }, [isFrequencyDropdownOpen, isCategoryDropdownOpen])

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

    const handleChangeFrequency = (frequency: string) => {
        setNewSelectedFrequency(frequency);
        setIsFrequencyDropdownOpen(false);
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
        setNewSelectedFrequency(transaction.frequency);
    }

    const handleRemoveOrCancel = (e: React.MouseEvent) => {
        if (!isEdit){
            try{
                if(!transaction.id) return;
                const transactionId = transaction.id!;
                e.stopPropagation();
                setAnimationClass('fade-out');
                setTimeout(() => {
                    dispatch(removeTransactionAsync(transactionId));
                    setIsViewTransaction(false);
                }, 300);
            } catch (err){
                console.log(err);
            };
        } else {
            setIsEdit(false);

            setNewTransactionType(transaction.type);
            setNewTransactionName(transaction.name);
            setNewTransactionCost(transaction.cost);
            setNewSelectedCategory(transaction.category);
            setNewTransactionDate(transaction.date);
            setNewSelectedFrequency(transaction.frequency);
        }
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
            await dispatch(editTransactionAsync({
                id: transaction.id,
                type: newTransactionType,
                name: newTransactionName,
                cost: newTransactionCost,
                category: newSelectedCategory,
                frequency: newSelectedFrequency,
                date: newTransactionDate,
                nextPaymentDate: '',
            }));
            setIsEdit(false);
        } catch (err){
            console.error(err);
        }
    }

    return (
        <>
            <div 
                className={`fixed top-0 left-0 w-full h-screen bg-black z-40 ${classProp === 'fade-in' ? 'overlay-fade-in' : 'overlay-fade-out'} ${!isViewTransaction && 'pointer-events-none'}`}
                onClick={(e) => handleCancel(e)}
            ></div>

            <div className={`fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] max-w-[500px] ${isEdit ? 'bg-[#111]' : 'bg-[#191919]'} border-1 border-[#4a4a4a] rounded-xl text-gray-300 z-50 transition-colors duration-300 ${classProp} ${!isViewTransaction && 'pointer-events-none'}`}>
                <i 
                    onClick={(e) => handleCancel(e)}
                    className="fa-solid fa-xmark absolute top-2.5 right-3 cursor-pointer"
                ></i>
                <p className="px-3 py-1.5 border-b-1 border-[#4a4a4a] font-semibold">Transaction</p>
                <form
                    onSubmit={e => handleSubmit(e)}
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


                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="relative flex flex-1">
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

                        {/* Custom category dropdown */}
                        <div className="relative rounded-lg mx-auto select-none flex flex-1" ref={categoryDropdownRef}>
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
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="flex flex-1">
                            <input 
                                className={`px-2 p-1 rounded-lg border-1 border-[#222] w-full outline-none ${!isEdit ? 'cursor-default' : 'cursor-text'}`}
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
                        </div>

                        {/* Custom frequency dropdown */}
                        <div className="relative rounded-lg mx-auto select-none flex flex-1" ref={frequencyDropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsFrequencyDropdownOpen(!isFrequencyDropdownOpen)}
                                className={`flex justify-between items-center w-full rounded-lg p-1 px-2 pr-3 select-none border-1 border-[#222] outline-none opacity-50 ${!isEdit ? 'cursor-default' : 'cursor-pointer'}`}
                                disabled={true}
                                title="Disabled for now"
                            >
                                {newSelectedFrequency}
                                <div className={`border-r-2 border-b-2 p-1 ${isFrequencyDropdownOpen ? 'rotate-[-135deg] mb-[-3px]' : 'rotate-45 mb-[3px]'}`}></div>
                            </button>

                            {isFrequencyDropdownOpen && (
                                <div className="absolute mt-1 w-full bg-[#191919] shadow-lg rounded-md z-[3]">
                                    <ul className="max-h-60 overflow-auto">
                                        {filteredTransactionFrequencies.map((frequency, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleChangeFrequency(frequency)}
                                                className="px-4 py-1.5 cursor-pointer hover:bg-[#222] first-of-type:hover:rounded-t-md last-of-type:hover:rounded-b-md"
                                            >
                                                {frequency}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Supposed to be the next payment date input later */}
                    {/* <input 
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
                    ></input> */}
                    
                    <div className="flex gap-3">
                        <button 
                            type="button" 
                            className={`w-full p-1.5 border-1 border-red-500 rounded-xl hover:bg-[#222] transition-colors duration-300 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            onClick={handleRemoveOrCancel}
                            disabled={isLoading}
                        >
                            {!isEdit ? 'Remove' : 'Cancel'}
                        </button>
                        {isEdit ? (
                            <button 
                                type="submit"
                                className={`w-full p-1.5 border-1 border-green-500 rounded-xl hover:bg-[#222] transition-colors duration-300 ${isLoading || disableSave ? 'cursor-not-allowed' : 'cursor-pointer'} ${disableSave && 'opacity-50'}`}
                                disabled={isLoading || disableSave}
                            >
                                Save
                            </button>
                        ) : (
                            <button 
                                type="button"
                                className={`w-full p-1.5 border-1 border-blue-500 rounded-xl hover:bg-[#222] transition-colors duration-300 cursor-pointer`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsEdit(true)
                                }}
                                disabled={isLoading || disableSave}
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
}