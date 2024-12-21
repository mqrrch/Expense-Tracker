import { ResponsiveLine } from "@nivo/line"

const data = [
    {
        id: "Balance",
        data: [
            {'x': 'Jan', 'y': 100},
            {'x': 'Feb', 'y': 200},
            {'x': 'Mar', 'y': 100},
            {'x': 'Apr', 'y': 600},
            {'x': 'May', 'y': 700},
            {'x': 'Jun', 'y': 200},
            {'x': 'Jul', 'y': 400},
            {'x': 'Aug', 'y': 600},
            {'x': 'Sep', 'y': 1000},
            {'x': 'Oct', 'y': 1800},
            {'x': 'Nov', 'y': 1700},
            {'x': 'Dec', 'y': 1600},
        ]
    }
]

function Balance(){
    return(
        <ResponsiveLine
            data={data}
            margin={{ top: 40, right: 30, bottom: 60, left: 55 }}
            xScale={{ type: "point" }}
            yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: true,
                reverse: false,
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
            }}
            axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
            }}
            colors={{ scheme: "nivo" }}
            pointSize={4}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
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

export default Balance