import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addExpenseItemAsync } from "../../features/expensesAsyncThunks";
import { AppDispatch } from "../../store";

export default function AddExpense(){
    const [expenseName, setExpenseName] = useState<string>('');
    const [expenseCost, setExpenseCost] = useState<string>('');
    const [expenseDate, setExpenseDate] = useState<string>('');
    const [expenseNote, setExpenseNote] = useState<string>('');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState<string>('One time');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();

    const expensesTypes: string[] = [
        'One time',
        'Daily',
        'Weekly',
        'Monthly',
        'Yearly'
    ]

    useEffect(() => {
        const handleClickOutsideDropdown = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        const listener = (e: globalThis.MouseEvent) => handleClickOutsideDropdown(e);

        if (isDropdownOpen){
            document.addEventListener('mousedown', listener);
        } 
        
        return () => document.removeEventListener('mousedown', listener);
    }, [isDropdownOpen])

    const handleChangeType = (type: string) => {
        setSelectedType(type);
        setIsDropdownOpen(false);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await dispatch(addExpenseItemAsync({
                name: expenseName,
                cost: expenseCost,
                type: selectedType,
                date: expenseDate,
                note: expenseNote,
            }));

            setExpenseName('');
            setExpenseCost('');
            setExpenseDate('');
            setExpenseNote('');
            setSelectedType('One time');
        } catch (err){
            console.error(err);
        }
    }
    
    return(
        <div className="bg-[#191919] border-1 border-[#4a4a4a] rounded-xl text-gray-300">
            <p className="px-3 py-1.5 border-b-1 border-[#4a4a4a] font-semibold">Add Expense</p>
            <form 
                onSubmit={handleSubmit}
                className="p-3 flex flex-col gap-3"
            >
                <input 
                    className="px-2 p-1 border-1 border-[#222] rounded-lg outline-none"
                    name="expense-name"
                    id="expense-name" 
                    placeholder="Expense name.."
                    value={expenseName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExpenseName(e.currentTarget.value)}
                    required
                ></input>
                <input 
                    className="px-2 p-1 rounded-lg border-1 border-[#222] outline-none"
                    type="number"
                    name="expense-cost"
                    id="expense-cost"
                    value={expenseCost}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExpenseCost(e.currentTarget.value)}
                    placeholder="Cost"
                    required
                ></input>
                <div className="flex flex-col gap-3">
                    <input 
                        className="px-2 p-1 rounded-lg border-1 border-[#222] outline-none"
                        type="date"
                        name="expense-date"
                        id="expense-date"
                        value={expenseDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExpenseDate(e.currentTarget.value)}
                        required
                    ></input>
                    {/* Custom dropdown */}
                    <div className="relative rounded-lg mx-auto select-none w-full" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex justify-between items-center w-full rounded-lg p-1 px-2 pr-3 select-none border-1 border-[#222] outline-none cursor-pointer"
                        >
                            {selectedType}
                            <div className={`border-r-2 border-b-2 p-1 ${isDropdownOpen ? 'rotate-[-135deg] mb-[-3px]' : 'rotate-45 mb-[3px]'}`}></div>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute mt-1 w-full bg-[#191919] shadow-lg rounded-md z-[3]">
                                <ul className="max-h-60 overflow-auto">
                                    {expensesTypes.map((type, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleChangeType(type)}
                                            className="px-4 py-2 cursor-pointer hover:bg-[#222] first-of-type:hover:rounded-t-md last-of-type:hover:rounded-b-md"
                                        >
                                            {type}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <textarea
                    className="resize-none border-1 border-[#222] rounded-lg p-2 text-[14px] outline-none"
                    id="expense-note"
                    name="expense-note"
                    rows={3}
                    value={expenseNote}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setExpenseNote(e.currentTarget.value)}
                    placeholder="Add a note..."
                ></textarea>
                <button 
                    type="submit" 
                    className="cursor-pointer p-2 border-1 border-[#4a4a4a] rounded-xl hover:bg-[#222] transition-colors duration-300"
                >
                    Add Expense
                </button>
            </form>
        </div>
    )
}