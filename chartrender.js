import React from "react";
import {PieChart, AreaChart, BarChart, LineChart, Pie, Area, Bar, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip} from "recharts";

let Chart = React.createClass({
	getInitialState() {

		return {
		};
	},

	dateFormat: function() {
		//console.log(arguments);
	},

	render: function() {
		/* jshint ignore:start */
		let state = this.props.state;
		console.log(state);
		switch (state.type) {
			case "line":
			return (
				<LineChart
					width={state.chartWidth} height={300}
					data={state.data}>
					<XAxis dataKey={state.x} name={state.x}/>
					<YAxis/>
					<CartesianGrid horizontal={state.gridX} vertical={state.gridY} />
					{state.y.map(function (y, o) {
						return(
							<Line key={o + 1} type="monotone"
								dataKey={y}
								stroke={state.lineColor}/>
						);
					})}
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
					<XAxis dataKey={state.x} name={state.x}/>
					<YAxis/>
					<CartesianGrid horizontal={state.gridX} vertical={state.gridY} />
					<Tooltip />
					{state.y.map(function (y, o) {
						return(
							<Area key={o + 1} type="monotone" dataKey={y} stroke={state.lineColor} fillOpacity={1} fill="url(#colorUv)" />
						);
					})}
				</AreaChart>
			);
			case "bar":
			return (
				<BarChart width={700} height={300}
					data={state.data}>
					<XAxis dataKey={state.x} name={state.x}/>
					<YAxis/>
					<CartesianGrid horizontal={state.gridX} vertical={state.gridY} />
					<Tooltip/>
					<Legend />
					{state.y.map(function (y, o) {
						return(
							<Bar key={o + 1} dataKey={y} fill={state.lineColor} scaleY={1} />
						);
					})}
				</BarChart>
			);
			case "pie":
			let data = [];
			for (let row of state.data) {
				let value = {};
				value.name = row[state.x];
				value.value = row[state.y[0]];
				data.push(value);
			}
			return (
				<PieChart width={700} height={300}>
					<Tooltip/>
					<Pie data={data} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label/>
				</PieChart>
			);
			default:
			return (
				<LineChart
					width={700} height={300}
					data={state.data}>
					<XAxis dataKey={state.x} name={state.x}/>
					<YAxis/>
					<CartesianGrid
						horizontal={true}
						vertical={state.x.grid} />
					{state.y.map(function (y, o) {
						return(
							<Line key={o + 1} type="monotone"
								dataKey={y}
								stroke={state.lineColor}/>
						);
					})}
					<Tooltip active={true}/>
					<Legend/>
				</LineChart>
			);

		}
		/* jshint ignore:end */
	}
});
module.exports = Chart;
