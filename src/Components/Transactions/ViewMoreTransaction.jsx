import { animated, useTransition } from "@react-spring/web";
import { useState } from "react";

function ViewMoreTransaction({ 
    id,
    name,
    category,
    date,
    outcome,
    cost,
    note,
    recurringTime,
    isViewMoreOpen, 
    setIsViewMoreOpen,  
    removeTransaction,
    editTransaction,
}){

    const [onEditMode, setOnEditMode] = useState(false)
    const [newName, setNewName] = useState(name)
    const [newCategory, setNewCategory] = useState(category)
    const [newDate, setNewDate] = useState(date)
    const [newOutcome, setNewOutcome] = useState(outcome)
    const [newCost, setNewCost] = useState(cost)
    const [newNote, setNewNote] = useState(note)
    const [newRecurringTime, setNewRecurringTime] = useState(recurringTime)
    
    const viewMoreTransition = useTransition(isViewMoreOpen, {
        from: { transform: "translateY(150%)" },
        enter: { transform: "translateY(0%)" },
        leave: { transform: "translateY(150%)" },
        config: { tension: 150, friction: 25 },
    })

    const overlayTransition = useTransition(isViewMoreOpen, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { tension: 120, friction: 25 },
    });

    function handleRemove(id){
        removeTransaction(id)
        setIsViewMoreOpen(false)
        setOnEditMode(false)
    }
    
    function handleSubmit(e){
        e.preventDefault()

        if (newName.trim().length === 0){
            alert("Please enter a name!")
            return;
        }

        setOnEditMode(false)
        editTransaction(
            id,
            newName,
            newCategory,
            newDate,
            newOutcome,
            newCost,
            newNote,
            newRecurringTime
        )
    }
    
    function handleCancel(){
        setOnEditMode(false)
        setNewName(name)
        setNewCategory(category)
        setNewDate(date)
        setNewOutcome(outcome)
        setNewCost(cost)
        setNewNote(note)
        setNewRecurringTime(recurringTime)
    }

    function handleExit(){
        setIsViewMoreOpen(false)
        setOnEditMode(false)
        setNewName(name)
        setNewCategory(category)
        setNewDate(date)
        setNewOutcome(outcome)
        setNewCost(cost)
        setNewNote(note)
        setNewRecurringTime(recurringTime)
    }

    return (
        <>
            {overlayTransition(
                (styles, item) =>
                    item && (
                        <animated.div className="fixed top-0 left-0 h-full w-full flex justify-center items-center bg-gray-500 z-10"
                        style={{backgroundColor: 'rgba(0, 0, 0, 0.3)', pointerEvents: isViewMoreOpen ? "auto" : "none", ...styles}}
                        onClick={handleExit}>
                            {viewMoreTransition(
                                (styles, item) =>
                                    item && (
                                        onEditMode ? (
                                            <animated.form className="view-more-container z-20"
                                            style={styles} onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
                                                <div className="view-more-items flex flex-col m-6">
                                                    <button onClick={() => setIsViewMoreOpen(false)}>
                                                        <i className="fa-solid fa-xmark absolute top-2 right-4 text-2xl"></i>
                                                    </button>
                                                    <div className="flex flex-col">
                                                        <label htmlFor="name">Name</label>
                                                        <input value={newName} className="pl-1" id="name" name="name" autoComplete="name" onChange={e => setNewName(e.target.value)} title={name} />
                                                    </div>
                                                    {/* I cant think of another name for category, date, recurring time and cost so i just use cdrc */}
                                                    <div className="view-more-cdrc-container flex gap-7">
                                                        <div className="view-more-category-date flex flex-col w-1/2">
                                                            <label htmlFor="category" className="mt-2">Category</label>
                                                            <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="h-6" id="category" name="category" title={newCategory}>
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
                                
                                                            <label htmlFor="date" className="mt-2">Date</label>
                                                            <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} id="date" name="date" className="h-6 pl-1" title={newDate} />
                                                        </div>
                                                        
                                                        <div className="view-more-rectime-cost flex flex-col w-1/2">
                                                            <label htmlFor="recurring" className="mt-2">Recurring Time</label>
                                                            <select id="recurring" name="recurring" value={newRecurringTime} onChange={e => setNewRecurringTime(e.target.value)} className="h-6" title={newRecurringTime}>
                                                                <option value="">None</option>
                                                                <option value="weekly">Weekly</option>
                                                                <option value="monthly">Monthly</option>
                                                                <option value="yearly">Yearly</option>
                                                            </select>
                                
                                                            <label htmlFor="cost" className="mt-2 flex gap-1">
                                                                Cost
                                                                {newOutcome ? (
                                                                    <div className="ml-1 space-x-1">
                                                                        <button type="button" className="view-more-mode-btn text-sm w-5 cursor-pointer" title="Income" onClick={() => setNewOutcome(false)} >I</button>
                                                                        <button type="button" className="view-more-mode-btn mode-active text-sm w-5 cursor-pointer" title="Outcome" onClick={() => setNewOutcome(true)} >O</button>
                                                                    </div>
                                                                ) : (
                                                                    <div className="ml-1 space-x-1">
                                                                        <button type="button" className="view-more-mode-btn mode-active text-sm w-5 cursor-pointer" title="Income" onClick={() => setNewOutcome(false)} >I</button>
                                                                        <button type="button" className="view-more-mode-btn text-sm w-5 cursor-pointer" title="Outcome" onClick={() => setNewOutcome(true)} >O</button>
                                                                    </div>
                                                                )}
                                                            </label>
                                                            <input type="number" value={newCost} onChange={e => setNewCost(e.target.value)} id="cost" name="cost" className="pl-1 h-6" title={newCost} />
                                                        </div>
                                                    </div>
                                                    
                                                    <textarea value={newNote} onChange={e => setNewNote(e.target.value)} rows={6} id="note" name="note" className="mt-3 p-1 resize-none"></textarea>
                                                    
                                                    <div className="view-more-btn-container flex justify-between w-full mt-5">
                                                        <button type="button" className="view-more-remove-btn w-20 py-1 bg-red-500 rounded text-white" onClick={() => handleRemove(id)}>Remove</button>
                                                        <div className="view-more-edit-save-container">
                                                            <button type="button" className="view-more-edit-btn w-20 py-1 bg-blue-500 rounded text-white" onClick={handleCancel}>Cancel</button>
                                                            <button type="submit" className="view-more-save-btn ml-4 w-20 py-1 bg-green-500 rounded text-white">Save</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </animated.form>
                                        ) : (
                                            <animated.form className="view-more-container z-20"
                                            style={styles} onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
                                                <div className="view-more-items flex flex-col m-6">
                                                    <button onClick={() => setIsViewMoreOpen(false)}>
                                                        <i className="fa-solid fa-xmark absolute top-2 right-4 text-2xl"></i>
                                                    </button>
                                                    <div className="flex flex-col">
                                                        <label htmlFor="name">Name</label>
                                                        <input value={name.trim()} className="pl-1" id="name" name="name" autoComplete="name" title={name} disabled />
                                                    </div>
                                                    {/* I cant think of another name for category, date, recurring time and cost so i just use cdrc */}
                                                    <div className="view-more-cdrc-container flex gap-7">
                                                        <div className="view-more-category-date flex flex-col w-1/2">
                                                            <label htmlFor="category" className="mt-2">Category</label>
                                                            <select value={category} className="h-6" id="category" name="category" title={category} disabled>
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
                                
                                                            <label htmlFor="date" className="mt-2">Date</label>
                                                            <input type="date" value={date} id="date" name="date" className="h-6 pl-1" title={date} disabled />
                                                        </div>
                                                        
                                                        <div className="view-more-rectime-cost flex flex-col w-1/2">
                                                            <label htmlFor="recurring" className="mt-2">Recurring Time</label>
                                                            <select id="recurring" name="recurring" value={recurringTime} className="h-6" title={recurringTime} disabled>
                                                                <option value="">None</option>
                                                                <option value="weekly">Weekly</option>
                                                                <option value="monthly">Monthly</option>
                                                                <option value="yearly">Yearly</option>
                                                            </select>
                                
                                                            <label htmlFor="cost" className="mt-2 flex gap-1">
                                                                Cost
                                                                {outcome ? (
                                                                    <div className="ml-1 space-x-1">
                                                                        <button type="button" className="view-more-mode-btn text-sm w-5 cursor-pointer" title="Income" disabled>I</button>
                                                                        <button type="button" className="view-more-mode-btn mode-active text-sm w-5 cursor-pointer" title="Outcome" disabled>O</button>
                                                                    </div>
                                                                ) : (
                                                                    <div className="ml-1 space-x-1">
                                                                        <button type="button" className="view-more-mode-btn mode-active text-sm w-5 cursor-pointer" title="Income" disabled>I</button>
                                                                        <button type="button" className="view-more-mode-btn text-sm w-5 cursor-pointer" title="Outcome" disabled>O</button>
                                                                    </div>
                                                                )}
                                                            </label>
                                                            <input type="number" value={cost} id="cost" name="cost" className="pl-1 h-6" title={cost} disabled />
                                                        </div>
                                                    </div>
                                                    
                                                    <textarea value={note} rows={6} id="note" name="note" className="mt-3 p-1 resize-none" disabled></textarea>
                                                    
                                                    <div className="view-more-btn-container flex justify-between w-full mt-5">
                                                        <button type="button" className="view-more-remove-btn w-20 py-1 bg-red-500 rounded text-white" onClick={() => handleRemove(id)}>Remove</button>
                                                        <div className="view-more-edit-save-container">
                                                            <button type="button" className="view-more-edit-btn w-20 py-1 bg-blue-500 rounded text-white" onClick={() => setOnEditMode(true)}>Edit</button>
                                                            <button type="submit" className="view-more-save-btn ml-4 w-20 py-1 bg-green-500 rounded text-white">Save</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </animated.form>
                                        )
                                    )
                                )}
                        </animated.div>
                    )
            )}
        </>
    )
}

export default ViewMoreTransaction