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
    isRecurring,
    recurringTime,
    isViewMoreOpen, 
    setIsViewMoreOpen, 
    isOutcome, 
    setIsOutcome, 
    removeTransaction 
}){

    const [onEditMode, setOnEditMode] = useState(false)
    
    const viewMoreTransition = useTransition(isViewMoreOpen, {
        from: { transform: "translateX(-100%)" },
        enter: { transform: "translateX(0%)" },
        leave: { transform: "translateX(-100%)" },
        config: { tension: 200, friction: 25 },
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
    }
    
    function handleSubmit(e){
        e.preventDefault()
        console.log(id)
    }

    return (
        <>
            {overlayTransition(
                (styles, item) =>
                    item && (
                        <animated.div className="fixed top-0 left-0 h-full w-full bg-gray-500 z-10"
                        style={{backgroundColor: 'rgba(0, 0, 0, 0.3)', pointerEvents: isViewMoreOpen ? "auto" : "none", ...styles}}
                        onClick={() => setIsViewMoreOpen(false)}></animated.div>
                    )
            )}

            {viewMoreTransition(
                (styles, item) => 
                    item && (
                        onEditMode ? (
                            <animated.form className="view-more-container fixed flex justify-center items-center inset-1/4 inset-y-20 z-50"
                            style={styles} onClick={e => e.stopPropagation()} onSubmit={handleSubmit} disabled>
                                <button onClick={() => setIsViewMoreOpen(false)}>
                                    <i className="fa-solid fa-xmark absolute top-2 right-4 text-2xl"></i>
                                </button>
                                <div className="absolute flex flex-col top-2 left-2 m-4 mx-6 w-10/12">
                                    <div className="flex flex-col">
                                        <label htmlFor="name">Name</label>
                                        <input value={name} className="pl-1" id="name" name="name" autoComplete="name" />
                                    </div>
    
                                    <div className="flex gap-8">
                                        <div className="flex flex-col w-1/2">
                                            <label htmlFor="category" className="mt-2">Category</label>
                                            <select value={category} className="h-6" id="category" name="category">
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
                                            <input type="date" value={date} id="date" name="date" className="h-6 pl-1" />
                                        </div>
                                        
                                        <div className="flex flex-col w-1/2">
                                            <label htmlFor="recurring" className="mt-2">Recurring Time</label>
                                            <select id="recurring" name="recurring" value={recurringTime} className="h-6">
                                                <option value="">None</option>
                                                <option value="weekly">Weekly</option>
                                                <option value="monthly">Monthly</option>
                                                <option value="yearly">Yearly</option>
                                            </select>
    
                                            <label htmlFor="cost" className="mt-2 flex gap-1">
                                                Cost
                                                {isOutcome ? (
                                                    <div className="ml-1 space-x-1">
                                                        <button type="button" className="view-more-mode-btn text-sm px-2 cursor-pointer" onClick={() => setIsOutcome(false)}>Income</button>
                                                        <button type="button" className="view-more-mode-btn mode-active text-sm px-2 cursor-pointer" onClick={() => setIsOutcome(true)} disabled>Outcome</button>
                                                    </div>
                                                ) : (
                                                    <div className="ml-1 space-x-1">
                                                        <button type="button" className="view-more-mode-btn mode-active text-sm w-20 cursor-pointer" onClick={() => setIsOutcome(false)} disabled>Income</button>
                                                        <button type="button" className="view-more-mode-btn text-sm w-20 cursor-pointer" onClick={() => setIsOutcome(true)}>Outcome</button>
                                                    </div>
                                                )}
                                            </label>
                                            <input type="number" value={cost} id="cost" name="cost" className="pl-1 h-6"/>
                                        </div>
                                    </div>
                                    
                                    <textarea value={note} rows={6} id="note" name="note" className="mt-3 p-1 resize-none"></textarea>
                                </div>
                                
                                <button type="button" className="absolute bottom-2 right-64 w-20 py-1 bg-red-500 text-white" onClick={() => handleRemove(id)}>Remove</button>
                                <button type="button" className="absolute bottom-2 right-32 w-20 py-1 bg-blue-500 text-white" onClick={() => setOnEditMode(false)}>Edit</button>
                                <button type="submit" className="absolute bottom-2 right-8 w-20 py-1 bg-green-500 text-white">Save</button>
                            </animated.form>
                        ) : (
                            <animated.form className="view-more-container fixed flex justify-center items-center inset-1/4 inset-y-20 z-50"
                            style={styles} onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
                                <button onClick={() => setIsViewMoreOpen(false)}>
                                    <i className="fa-solid fa-xmark absolute top-2 right-4 text-2xl"></i>
                                </button>
                                <div className="absolute flex flex-col top-2 left-2 m-4 mx-6 w-10/12">
                                    <div className="flex flex-col">
                                        <label htmlFor="name">Name</label>
                                        <input value={name} className="pl-1" id="name" name="name" autoComplete="name" disabled />
                                    </div>
    
                                    <div className="flex gap-8">
                                        <div className="flex flex-col w-1/2">
                                            <label htmlFor="category" className="mt-2">Category</label>
                                            <select value={category} className="h-6" id="category" name="category" disabled>
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
                                            <input type="date" value={date} id="date" name="date" className="h-6 pl-1" disabled />
                                        </div>
                                        
                                        <div className="flex flex-col w-1/2">
                                            <label htmlFor="recurring" className="mt-2">Recurring Time</label>
                                            <select id="recurring" name="recurring" value={recurringTime} className="h-6" disabled>
                                                <option value="">None</option>
                                                <option value="weekly">Weekly</option>
                                                <option value="monthly">Monthly</option>
                                                <option value="yearly">Yearly</option>
                                            </select>
    
                                            <label htmlFor="cost" className="mt-2 flex gap-1">
                                                Cost
                                                {isOutcome ? (
                                                    <div className="ml-1 space-x-1">
                                                        <button type="button" className="view-more-mode-btn text-sm px-2 cursor-pointer" onClick={() => setIsOutcome(false)} disabled>Income</button>
                                                        <button type="button" className="view-more-mode-btn mode-active text-sm px-2 cursor-pointer" onClick={() => setIsOutcome(true)} disabled>Outcome</button>
                                                    </div>
                                                ) : (
                                                    <div className="ml-1 space-x-1">
                                                        <button type="button" className="view-more-mode-btn mode-active text-sm w-20 cursor-pointer" onClick={() => setIsOutcome(false)} disabled>Income</button>
                                                        <button type="button" className="view-more-mode-btn text-sm w-20 cursor-pointer" onClick={() => setIsOutcome(true)} disabled>Outcome</button>
                                                    </div>
                                                )}
                                            </label>
                                            <input type="number" value={cost} id="cost" name="cost" className="pl-1 h-6" disabled />
                                        </div>
                                    </div>
                                    
                                    <textarea value={note} rows={6} id="note" name="note" className="mt-3 p-1 resize-none" disabled></textarea>
                                </div>
                                
                                <button type="button" className="absolute bottom-2 right-64 w-20 py-1 bg-red-500 text-white" onClick={() => handleRemove(id)}>Remove</button>
                                <button type="button" className="absolute bottom-2 right-32 w-20 py-1 bg-blue-500 text-white" onClick={() => setOnEditMode(true)}>Edit</button>
                                <button type="submit" className="absolute bottom-2 right-8 w-20 py-1 bg-green-500 text-white">Save</button>
                            </animated.form>
                        )
                    )
            )}
        </>
    )
}

export default ViewMoreTransaction