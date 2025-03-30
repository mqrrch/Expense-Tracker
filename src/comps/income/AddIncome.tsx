import React, { useEffect, useRef, useState } from "react"

export default function AddIncome(){
    const [incomeName, setIncomeName] = useState<string>('');
    const [incomeCost, setIncomeCost] = useState<string>('');
    const [incomeDate, setIncomeDate] = useState<string>('');
    const [incomeNote, setIncomeNote] = useState<string>('');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState<string>('One time');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const incomeTypes: string[] = [
        'One time',
        'Daily',
        'Weekly',
        'Monthly',
        'Yearly'
    ]

    useEffect(() => {
        const handleClickOutsideDropdown = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)){
                setIsDropdownOpen(false);
            }
        }

        const listener = (e: globalThis.MouseEvent) => handleClickOutsideDropdown(e);

        if (isDropdownOpen) {
            document.addEventListener('mousedown', listener);
        }

        return () => document.removeEventListener('mousedown', listener);
    }, [isDropdownOpen])

    function handleChangeType(type: string) {
        setSelectedType(type);
        setIsDropdownOpen(false);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
    }

    return (
        <div className="bg-[#191919] border-1 border-[#4a4a4a] rounded-xl text-gray-300">
            <p className="px-3 py-1.5 border-b-1 border-[#4a4a4a] font-semibold">Add Income</p>
            <form 
                onSubmit={handleSubmit}
                className="p-3 flex flex-col gap-3"
            >
                <input 
                    className="px-2 p-1 border-1 border-[#222] rounded-lg outline-none"
                    name="income-name"
                    id="income-name" 
                    placeholder="Income name.."
                    value={incomeName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIncomeName(e.currentTarget.value)}
                    required
                ></input>
                <input 
                    className="px-2 p-1 rounded-lg border-1 border-[#222] outline-none"
                    type="number"
                    name="income-cost"
                    id="income-cost"
                    value={incomeCost}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIncomeCost(e.currentTarget.value)}
                    placeholder="Cost"
                    required
                ></input>
                <div className="flex flex-col gap-3">
                    <input 
                        className="px-2 p-1 rounded-lg border-1 border-[#222] outline-none"
                        type="date"
                        name="income-date"
                        id="income-date"
                        value={incomeDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIncomeDate(e.currentTarget.value)}
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
                                    {incomeTypes.map((type, index) => (
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
                    id="income-note"
                    name="income-note"
                    rows={3}
                    value={incomeNote}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setIncomeNote(e.currentTarget.value)}
                    placeholder="Add a note..."
                ></textarea>
                <button 
                    type="submit" 
                    className="cursor-pointer p-2 border-1 border-[#4a4a4a] rounded-xl hover:bg-[#222] transition-colors duration-300"
                >
                    Add Income
                </button>
            </form>
        </div>
    )
}