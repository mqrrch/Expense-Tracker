import { ResponsivePie } from '@nivo/pie';
import DonutChart from './DonutChart';

const data = [
  { id: 'Rent', value: 500, label: 'Rent' },
  { id: 'Food', value: 300, label: 'Food' },
  { id: 'Transportation', value: 200, label: 'Transportation' },
  { id: 'Utilities', value: 150, label: 'Utilities' },
  { id: 'Other', value: 100, label: 'Other' },
];

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