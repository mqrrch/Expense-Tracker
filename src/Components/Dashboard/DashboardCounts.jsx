function DashboardCounts(){
    return(
        <div className="dashboard-total-container grid text-center gap-10">
            <div className="dashboard-total-item">
                <p className="dashboard-total-count text-blue-500">$500</p>
                <p className="dashboard-total-name">Income</p>
            </div>
            <div className="dashboard-total-item">
                <p className="dashboard-total-count text-pink-500">$500</p>
                <p className="dashboard-total-name">Expenses</p>
            </div>
            <div className="dashboard-total-item">
                <p className="dashboard-total-count text-green-500">$500</p>
                <p className="dashboard-total-name">Balance</p>
            </div>
            <div className="dashboard-total-item">
                <p className="dashboard-total-count text-cyan-500">500</p>
                <p className="dashboard-total-name">Transactions</p>
            </div>
        </div>
    )
}

export default DashboardCounts