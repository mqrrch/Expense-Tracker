import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTransactionAsync } from "../../features/transactionsAsyncThunks";
import { AppDispatch } from "../../store";
import { useReduxSelector } from "../../hooks/useReduxSelector";
import { useNavigate } from "react-router-dom";


export default function AddTransaction(){
    const user = useReduxSelector(state => state.user);
    const [transactionType, setTransactionType] = useState<string>('Income');
    const [transactionName, setTransactionName] = useState<string>('');
    const [transactionCost, setTransactionCost] = useState<number>(0);
    const [transactionDate, setTransactionDate] = useState<string>('');
    const [transactionNextPaymentDate, setTransactionNextPaymentDate] = useState<string>('');
    const [isFrequenciesDropdownOpen, setIsFrequenciesDropdownOpen] = useState<boolean>(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
    const [selectedFrequency, setSelectedFrequency] = useState<string>('One time');
    const [selectedCategory, setSelectedCategory] = useState<string>('Others');
    const isLoading = useReduxSelector(state => state.transactions.loading);
    const [noAccount, setNoAccount] = useState<boolean>(true);
    const frequencyDropdownRef = useRef<HTMLDivElement>(null);
    const categoryDropdownRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const transactionFrequencies: string[] = [
        'One time',
        'Daily',
        'Weekly',
        'Monthly',
        'Yearly'
    ];

    const filteredTransactionFrequencies: string[] = transactionFrequencies.filter((frequency) => frequency !== selectedFrequency);

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
            if (frequencyDropdownRef.current && !frequencyDropdownRef.current.contains(e.target as Node)) {
                setIsFrequenciesDropdownOpen(false);
            };
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target as Node)) {
                setIsCategoryDropdownOpen(false);
            };
        };

        const listener = (e: globalThis.MouseEvent) => handleClickOutsideDropdown(e);

        if (isFrequenciesDropdownOpen || isCategoryDropdownOpen){
            document.addEventListener('mousedown', listener);
        } 
        
        return () => document.removeEventListener('mousedown', listener);
    }, [isFrequenciesDropdownOpen, isCategoryDropdownOpen]);

    useMemo(() => {
        if (!user.uid){
            setNoAccount(true);
        } else{
            setNoAccount(false);
        }
    }, [user])

    const handleChangeFrequency = (frequency: string) => {
        setSelectedFrequency(frequency);
        setIsFrequenciesDropdownOpen(false);
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
    const handleOnBlurCost = () => {
        if (!transactionCost) setTransactionCost(0);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user.uid) return;
        try{
            await dispatch(addTransactionAsync({
                type: transactionType,
                name: transactionName,
                cost: transactionCost,
                category: selectedCategory,
                frequency: selectedFrequency,
                date: transactionDate,
                nextPaymentDate: transactionNextPaymentDate,
            }));

            setTransactionType('Income');
            setTransactionName('');
            setTransactionCost(0);
            setSelectedCategory('Others');
            setSelectedFrequency('One time');
            setTransactionDate('');
            setTransactionNextPaymentDate('');
        } catch (err){
            console.error(err);
        }
    }
    
    return(
        <div className="w-full flex flex-col rounded-xl shadow-2xl border-1 border-[#4a4a4a] text-gray-300">
            <p className="px-3 py-1.5 border-b-1 border-[#4a4a4a] font-semibold">Add Transaction</p>
            <form 
                onSubmit={handleSubmit}
                className={`p-3 relative flex flex-col gap-2 ${isLoading && 'opacity-50 cursor-not-allowed pointer-events-none'}`}
            >
                {noAccount && (
                    <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-[rgba(0,0,0,0.9)] rounded-xl rounded-t-none gap-2 z-1">
                        <p className="text">Please log in to add transaction</p>
                        <button 
                            className="rounded-lg p-1 px-8 border-1 border-green-600 hover:bg-green-600 transition-colors duration-300 cursor-pointer"
                            onClick={() => navigate('/register')}
                        >
                            Log in
                        </button>
                    </div>
                )}
                
                <div className="flex w-full border-1 border-[#222] rounded-xl">
                    <button 
                        type="button"
                        onClick={() => setTransactionType('Income')}
                        className={`flex-1 p-1 cursor-pointer rounded-xl rounded-r-none transition-colors duration-300 ${transactionType === 'Income' && 'bg-linear-to-r from-[#3a3a3a] to-[#4b4b4b]'}`}
                        disabled={isLoading || noAccount}
                    >
                        Income
                    </button>
                    <button 
                        type="button"
                        onClick={() => setTransactionType('Expense')}
                        className={`flex-1 p-1 cursor-pointer rounded-xl rounded-l-none transition-colors duration-300 ${transactionType === 'Expense' && 'bg-linear-to-l from-[#3a3a3a] to-[#4b4b4b]'}`}
                        disabled={isLoading || noAccount}
                    >
                        Expense
                    </button>
                </div>
                
                <div className="flex flex-col gap-1">
                    <label htmlFor="transaction-name">Transaction Name</label>
                    <input 
                        className="px-2 p-1 border-1 border-[#222] rounded-lg outline-none"
                        name="transaction-name"
                        id="transaction-name" 
                        placeholder="Dinner.."
                        autoComplete="off"
                        value={transactionName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTransactionName(e.currentTarget.value)}
                        disabled={isLoading || noAccount}
                        required
                    ></input>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="transaction-cost">
                            Cost
                        </label>
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
                                onBlur={handleOnBlurCost}
                                disabled={isLoading || noAccount}
                                required
                            ></input>
                            <label 
                                htmlFor="transaction-cost" 
                                className="absolute top-[4.5px] right-3 text-[#888]"
                            >
                                $
                            </label>
                        </div>
                    </div>

                    {/* Custom category dropdown */}
                    <div className="relative rounded-lg mx-auto select-none w-full" ref={categoryDropdownRef}>
                        <p className="mb-1">Category</p>
                        <button
                            type="button"
                            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                            className={`flex justify-between items-center w-full rounded-lg p-1 px-2 pr-3 select-none border-1 border-[#222] outline-none ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            disabled={isLoading || noAccount}
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
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="transaction-date">Date</label>
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
                            disabled={isLoading || noAccount}
                            required
                        ></input>
                    </div>

                    {/* Custom frequency dropdown */}
                    <div className="relative rounded-lg mx-auto select-none w-full" ref={frequencyDropdownRef}>
                        <p className="mb-1">Frequency</p>
                        <button
                            type="button"
                            onClick={() => setIsFrequenciesDropdownOpen(!isFrequenciesDropdownOpen)}
                            className={`flex justify-between items-center w-full rounded-lg p-1 px-2 pr-3 select-none border-1 border-[#222] outline-none ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'} opacity-50`}
                            disabled={true}
                            title="Disabled for now"
                        >
                            {selectedFrequency}
                            <div className={`border-r-2 border-b-2 p-1 ${isFrequenciesDropdownOpen ? 'rotate-[-135deg] mb-[-3px]' : 'rotate-45 mb-[3px]'}`}></div>
                        </button>

                        {isFrequenciesDropdownOpen && (
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

                {/* <NextPaymentDate 
                    isLoading={isLoading} 
                    selectedFrequency={selectedFrequency}
                    transactionNextPaymentDate={transactionNextPaymentDate}
                    setTransactionNextPaymentDate={setTransactionNextPaymentDate} 
                /> */}

                <button 
                    type="submit" 
                    className={`p-2 mt-2 border-1 border-[#4a4a4a] rounded-lg hover:bg-[#222] transition-colors duration-300 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={isLoading || noAccount}
                >
                    Add Transaction
                </button>
            </form>
        </div>
    )
}