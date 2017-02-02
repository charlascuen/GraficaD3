import React from "react";
import {PieChart, AreaChart, BarChart, LineChart, Pie, Area, Bar, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip} from "recharts";

let Chart = React.createClass({
    getInitialState() {
        
        return {
        };
    },
    
    render: function() {
        /* jshint ignore:start */
        let state = this.props.state;
        switch (state.type) {
            case "line":
                return (
                    <LineChart
                        width={700} height={300}
                        data={state.data}>
                        <XAxis
                            dataKey={state.x.key}
                            name={state.x.key}/>
                        <YAxis dataKey={state.y.key}
                            name={state.y.key}
                            label={state.y.key}/>
                        <CartesianGrid
                            horizontal={state.y.grid}
                            vertical={state.x.grid} />
                        <Line type="monotone"
                            dataKey={state.y.key}
                            stroke={state.lineColor}/>
                        <Tooltip active={true}/>
                        <Legend/>
                    </LineChart>
                );
            case "area":
                return (
                    <AreaChart width={700} height={300}
                        data={state.data}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey={state.x.key}
                            name={state.x.key}/>
                        <YAxis dataKey={state.y.key}
                            name={state.y.key}
                            label={state.y.key}/>
                        <CartesianGrid
                            horizontal={state.y.grid}
                            vertical={state.x.grid} />
                        <Tooltip />
                        <Area type="monotone" dataKey={state.y.key} stroke={state.lineColor} fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                );
            case "bar":
                return (
                    <BarChart width={700} height={300}
                        data={state.data}>
                        <XAxis
                            dataKey={state.x.key}
                            name={state.x.key}/>
                        <YAxis dataKey={state.y.key}
                            name={state.y.key}
                            label={state.y.key}/>
                        <CartesianGrid
                            horizontal={state.y.grid}
                            vertical={state.x.grid} />
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey={state.y.key}
                            fill={state.lineColor}
                            scaleY={1} />
                    </BarChart>
                );
            case "pie":
                return (
                    <PieChart width={700} height={300}>
                        <Pie data={state.data} nameKey={state.y.key} valueKey={state.x.key} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label/>
                    </PieChart>
                );
            default:
                return (
                    <LineChart
                        width={700} height={300}
                        data={state.data}>
                        <XAxis
                            dataKey={state.x.key}
                            name={state.x.key}/>
                        <YAxis dataKey={state.y.key}
                            name={state.y.key}
                            label={state.y.key}/>
                        <CartesianGrid
                            horizontal={state.y.grid}
                            vertical={state.x.grid} />
                        <Line type="monotone"
                            dataKey={state.y.key}
                            stroke={state.lineColor}/>
                        <Tooltip active={true}/>
                        <Legend/>
                    </LineChart>
                );

        }
        /* jshint ignore:end */
    }
});
module.exports = Chart;
