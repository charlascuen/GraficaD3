import React from "react";
import {BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip} from "recharts";

export default{
    getLineChart: function (state) {

        const Chart = React.createClass({
            render(){
                return (
                /* jshint ignore:start */
                <LineChart
                    width={700} height={300}
                    data={state.chartData}>
                    <XAxis
                        dataKey={state.chartXKey}
                        name={state.chartXKey}/>
                    <YAxis dataKey={state.chartYKey}
                        name={state.chartYKey}
                        label={state.chartYKey}/>
                    <CartesianGrid
                        horizontal={state.showYGrid == "checked" ? true : false}
                        vertical={state.showXGrid == "checked" ? true : false} />
                    <Line type="monotone"
                        dataKey={state.chartYKey}
                        stroke={state.chartLineColor}
                        strokeDasharray="3 3"/>
                    <Tooltip active={true}/>
                    <Legend/>
                </LineChart>
                /* jshint ignore:end */
            );
            }
        });

        return Chart;
    },
    getBarChart: function (state) {

        const Chart = React.createClass({
            render(){
                return (
                /* jshint ignore:start */
                <BarChart width={700} height={300}
                    data={state.chartData}>
                    <XAxis
                        dataKey={state.chartXKey}
                        name={state.chartXKey}/>
                    <YAxis dataKey={state.chartYKey}
                        name={state.chartYKey}
                        label={state.chartYKey}/>
                    <CartesianGrid
                        horizontal={state.showYGrid == "checked" ? true : false}
                        vertical={state.showXGrid == "checked" ? true : false} />
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey={state.chartYKey}
                        fill={state.chartLineColor}
                        scaleY={1} />
                </BarChart>
                /* jshint ignore:end */
            );
            }
        });

        return Chart;
    }
};
