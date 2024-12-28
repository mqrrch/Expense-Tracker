function AddRecurring(){
    return (
        <form className="add-recurring-form flex flex-col w-2/5 p-4">
            <p className="text-center">Recurring Transaction</p>
            <label className="mt-4" htmlFor="recurring-name">Enter Name</label>
            <input id="recurring-name" name="recurring-name" placeholder="Insert Name" maxLength={30} required />
            <label className="mt-4" htmlFor="recurring-category">Choose Category</label>
            <select id='recurring-category' name="recurring-category" required>
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
            <label className="mt-4" htmlFor="recurring-cost">Enter Cost</label>
            <input type="number" id="recurring-cost" name="recurring-cost" placeholder="Insert cost" />
            <label className="mt-4" htmlFor="recurring-time">Enter Time</label>
            <select id="recurring-time" name="recurring-time" required>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>
            <label className="mt-4" htmlFor="recurring-note">Add note</label>
            <textarea id="recurring-note" name="recurring-note" rows={5} className="resize-none text-sm" placeholder="Add a brief note about this transaction..." maxLength={300}></textarea>
            <button type="submit" className="submit-recurring p-2 mt-4">Add transaction</button>
        </form>
    )
}

export default AddRecurring