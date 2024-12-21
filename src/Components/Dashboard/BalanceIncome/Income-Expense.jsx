import { ResponsiveBar } from "@nivo/bar"

const data = [
    {Month: "Jan", Income: 1200, Expense: 600},
    {Month: "Feb", Income: 1500, Expense: 200},
    {Month: "Mar", Income: 1060, Expense: 40},
    {Month: "Apr", Income: 1040, Expense: 900},
    {Month: "May", Income: 1800, Expense: 1500},
    {Month: "Jun", Income: 2600, Expense: 1240},
    {Month: "Jul", Income: 3400, Expense: 680},
    {Month: "Aug", Income: 1900, Expense: 780},
    {Month: "Sep", Income: 8200, Expense: 620},
    {Month: "Oct", Income: 1600, Expense: 430},
    {Month: "Nov", Income: 3400, Expense: 610},
    {Month: "Dec", Income: 1400, Expense: 680},
]

function IncomeExpense(){
    return(
        <ResponsiveBar
        data={data}
        keys={["Income", "Expense"]} // The items to compare
        indexBy="Month" // The grouping key (e.g., month)
        groupMode="grouped"
        margin={{ top: 40, right: 30, bottom: 60, left: 60 }}
        padding={0.5} // Spacing between bars in a group
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }} // Color scheme for bars
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          `${e.id}: ${e.formattedValue} in month: ${e.indexValue}`
        }
        theme={{
            axis: {
                ticks: {
                    text: {
                        fontSize: '12',
                        fontFamily: "'Montserrat', sans-serif"
                    }
                }
            }
        }}
      />
    )
}

export default IncomeExpense