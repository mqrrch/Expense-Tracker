import { ResponsivePie } from '@nivo/pie';
import DonutChart from './DonutChart';

function TotalExpenses(){
    return(
        <div className="total-expenses-container w-full h-3/4 mt-5">
            <p className="relative top-2 left-4 text-sm text-gray-600 font-medium">Total Expenses</p>
            <div className='relative bottom-4 h-full'>
                <DonutChart />
            </div>
        </div>
    )
}

export default TotalExpenses