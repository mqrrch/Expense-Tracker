import { useState } from "react"

function AddOneTime({ setTransaction }){
    const [otName, setOtName] = useState("")
    const [otCategory, setOtCategory] = useState("")
    const [otOutcome, setOtOutcome] = useState(false)
    const [otCost, setOtCost] = useState("")
    const [otDate, setOtDate] = useState("")
    const [otNote, setOtNote] = useState("")
    // border-2 border-solid border-red-500

    function handleNameChange(e){
        setOtName(e.target.value)
    }
    function handleCategoryChange(e){
        setOtCategory(e.target.value)
    }
    function handleCostChange(e){
        setOtCost(e.target.value)
    }
    function handleDateChange(e){
        setOtDate(e.target.value)
    }
    function handleNoteChange(e){
        setOtNote(e.target.value)
    }
    
    function handleSubmit(e){
        e.preventDefault()

        if (otName.trim().length === 0){
            alert("Please enter a name!")
            return;
        }

        setTransaction({
            id: crypto.randomUUID(),
            name: otName,
            category: otCategory,
            outcome: otOutcome,
            cost: otCost,
            date: otDate,
            note: otNote,
            recurringTime: ''
        })

        setOtName("")
        setOtCategory("")
        setOtOutcome(false)
        setOtCost("")
        setOtDate("")
        setOtNote("")
    }

    return (
        <form className="add-one-time-form flex flex-col p-4" onSubmit={handleSubmit}>
            <p className="text-center">One Time Transaction</p>
            <label className="mt-4" htmlFor="one-time-name">Enter Name</label>
            <input id="one-time-name" name="one-time-name" placeholder="Insert Name" maxLength={30} onChange={handleNameChange} value={otName} required />
            <label className="mt-4" htmlFor="one-time-category">Choose Category</label>
            <select id='one-time-category' name="one-time-category" onChange={handleCategoryChange} value={otCategory} required>
                <option value="" disabled>-- Choose Category --</option>
                <option value="food">Food</option>
                <option value="housing">Housing</option>
                <option value="transportation">Transportation</option>
                <option value="entertainment">Entertainment</option>
                <option value="health">Health</option>
                <option value="shopping">Shopping</option>
                <option value="education">Education</option>
                <option value="debt">Debt</option>
                <option value="savings">Savings</option>
                <option value="others">Others</option>
            </select>
            <label htmlFor="one-time-cost" className="mt-2 flex gap-1">
                Enter Cost
                {otOutcome ? (
                    <div className="ml-1 space-x-1">
                        <button type="button" className="add-transaction-mode-btn text-sm w-5 cursor-pointer" onClick={() => setOtOutcome(false)} title="Income">I</button>
                        <button type="button" className="add-transaction-mode-btn mode-active text-sm w-5 cursor-pointer" onClick={() => setOtOutcome(true)} title="Outcome">O</button>
                    </div>
                ) : (
                    <div className="ml-1 space-x-1">
                        <button type="button" className="add-transaction-mode-btn mode-active text-sm w-5 cursor-pointer" onClick={() => setOtOutcome(false)} title="Income">I</button>
                        <button type="button" className="add-transaction-mode-btn text-sm w-5 cursor-pointer" onClick={() => setOtOutcome(true)} title="Outcome">O</button>
                    </div>
                )}
            </label>
            <input type="number" id="one-time-cost" name="one-time-cost" placeholder="Insert cost" onChange={handleCostChange} value={otCost} required />
            <label className="mt-4" htmlFor="one-time-date">Enter Date</label>
            <input type="date" id="one-time-date" name="one-time-date" onChange={handleDateChange} value={otDate} required />
            <label className="mt-4" htmlFor="one-time-note">Add note</label>
            <textarea id="one-time-note" name="one-time-note" rows={5} className="resize-none text-sm" placeholder="Add a brief note about this transaction..." maxLength={300} onChange={handleNoteChange} value={otNote}></textarea>
            <button type="submit" className="submit-one-time p-2 mt-4">Add transaction</button>
        </form>
    )
}

export default AddOneTime