import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const data = [
  { id: 'Rent', value: 500, label: 'Rent' },
  { id: 'Food', value: 300, label: 'Food' },
  { id: 'Transportation', value: 200, label: 'Transportation' },
  { id: 'Utilities', value: 150, label: 'Utilities' },
  { id: 'Other', value: 100, label: 'Other' },
];

const DonutChart = () => {
  return (
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 400, bottom: 60, left: 40 }}
        innerRadius={0.5} // Controls the "donut" effect
        padAngle={0.7} // Adds space between slices
        cornerRadius={1} // Rounds the edges of slices
        colors={{ scheme: 'nivo' }} // Color scheme
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        activeOuterRadiusOffset={3}
        legends={[
            {
                anchor: 'top',
                direction: 'column',
                justify: false,
                translateX: 350,
                translateY: 0,
                itemsSpacing: 12,
                itemWidth: 100,
                itemHeight: 10,
                itemTextColor: '#808080',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
        theme={{
            legends: {
                text: {
                    fontSize: '14',
                    fontFamily: "'Montserrat', sans-serif"
                }
            },
            labels: {
                text: {
                    fontSize: '12',
                    fontFamily: "'Montserrat', sans-serif",
                }
            }
        }}
    />
  );
};

export default DonutChart;