import { useState } from "react"

function AddRecurring({ setTransaction }){
    const [recName, setRecName] = useState("")
    const [recCategory, setRecCategory] = useState("")
    const [recOutcome, setRecOutcome] = useState(false)
    const [recCost, setRecCost] = useState("")
    const [recDate, setRecDate] = useState("")
    const [recTime, setRecTime] = useState("weekly")
    const [recNote, setRecNote] = useState("")

    function handleSubmit(e){
        e.preventDefault()

        if (recName.trim().length === 0){
            alert("Please enter a name!")
            return;
        }

        setTransaction({
            id: crypto.randomUUID(),
            name: recName,
            category: recCategory,
            outcome: recOutcome,
            cost: recCost,
            date: recDate,
            note: recNote,
            recurringTime: recTime
        })

        setRecName("")
        setRecCategory("")
        setRecOutcome(false)
        setRecCost("")
        setRecDate("")
        setRecNote("")
        setRecTime("weekly")
    }

    return (
        <form className="add-recurring-form flex flex-col p-4" onSubmit={handleSubmit}>
            <p className="text-center">Recurring Transaction</p>
            <label className="mt-4" htmlFor="recurring-name">Enter Name</label>
            <input id="recurring-name" name="recurring-name" placeholder="Insert Name" maxLength={30} onChange={e => setRecName(e.target.value)} value={recName} required />
            <label className="mt-4" htmlFor="recurring-category">Choose Category</label>
            <select id='recurring-category' name="recurring-category" onChange={e => setRecCategory(e.target.value)} value={recCategory} required>
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
            <label htmlFor="recurring-cost" className="mt-2 flex gap-1">
                Enter Cost
                {recOutcome ? (
                    <div className="ml-1 space-x-1">
                        <button type="button" className="add-transaction-mode-btn text-sm w-5 cursor-pointer" onClick={() => setRecOutcome(false)} title="Income">I</button>
                        <button type="button" className="add-transaction-mode-btn mode-active text-sm w-5 cursor-pointer" onClick={() => setRecOutcome(true)} title="Outcome">O</button>
                    </div>
                ) : (
                    <div className="ml-1 space-x-1">
                        <button type="button" className="add-transaction-mode-btn mode-active text-sm w-5 cursor-pointer" onClick={() => setRecOutcome(false)} title="Income">I</button>
                        <button type="button" className="add-transaction-mode-btn text-sm w-5 cursor-pointer" onClick={() => setRecOutcome(true)} title="Outcome">O</button>
                    </div>
                )}
            </label>
            <input type="number" id="recurring-cost" name="recurring-cost" placeholder="Insert cost" onChange={e => setRecCost(e.target.value)} value={recCost} required />
            <div className="rec-time-date-container flex mt-4 gap-8">
                <div className="rec-time-container w-1/2 flex flex-col">
                    <label className="" htmlFor="recurring-time">Enter Time</label>
                    <select id="recurring-time" name="recurring-time" className="h-full" onChange={e => setRecTime(e.target.value)} value={recTime} required>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
                <div className="rec-date-container w-1/2 flex flex-col">
                    <label htmlFor="recurring-date">Starting Date</label>
                    <input type="date" id="recurring-date" name="recurring-date" className="h-full" onChange={e => setRecDate(e.target.value)} value={recDate} />
                </div>
            </div>
            <label className="mt-4" htmlFor="recurring-note">Add note</label>
            <textarea id="recurring-note" name="recurring-note" rows={5} className="resize-none text-sm" placeholder="Add a brief note about this transaction..." maxLength={300} onChange={e => setRecNote(e.target.value)} value={recNote}></textarea>
            <button type="submit" className="submit-recurring p-2 mt-4">Add transaction</button>
        </form>
    )
}

export default AddRecurring