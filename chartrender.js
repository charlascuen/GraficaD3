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
					width={state.chartWidth || 700 || 700} height={300}
					data={state.data}>
					<XAxis dataKey={state.x} name={state.x}/>
					<YAxis/>
					<CartesianGrid horizontal={state.gridX} vertical={state.gridY} />
					{state.y.map(function (y, o) {
						return(
							<Line key={o + 1} type="monotone" dataKey={y.key} stroke={y.color}/>
						);
					})}
					<Tooltip active={true}/>
					<Legend/>
				</LineChart>
			);
			case "area":
			return (
				<AreaChart width={state.chartWidth || 700} height={300}
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
							<Area key={o + 1} type="monotone" dataKey={y.key} stroke={y.color} fillOpacity={1} fill="url(#colorUv)"/>
						);
					})}
				</AreaChart>
			);
			case "bar":
			return (
				<BarChart width={state.chartWidth || 700} height={300}
					data={state.data}>
					<XAxis dataKey={state.x} name={state.x}/>
					<YAxis/>
					<CartesianGrid horizontal={state.gridX} vertical={state.gridY} />
					<Tooltip/>
					<Legend />
					{state.y.map(function (y, o) {
						return(
							<Bar key={o + 1} dataKey={y.color} fill={y.color} scaleY={1} />
						);
					})}
				</BarChart>
			);
			case "pie":
			let rings = [];
			for (let ring of state.rings) {
				let newRing = {};
				let data = [];
				for (let row of state.data) {
					let value = {};
					value.name = row[ring.name];
					value.value = row[ring.value];
					data.push(value);
				}
				newRing.data = data;
				newRing.color = ring.color;
				rings.push(newRing);
			}

			return (
				<PieChart width={state.chartWidth || 700} height={300}>
					<Tooltip/>
					{rings.map(function (ring, o) {
						return(
							<Pie key={o + 1} data={ring.data} cx="50%" cy="50%" innerRadius={o*50} outerRadius={(o + 1)*50 - 10} fill={ring.color} label/>
						);
					})}
				</PieChart>
			);
			default:
			return (
				<LineChart
					width={state.chartWidth || 700} height={300}
					data={state.data}>
					<XAxis dataKey={state.x} name={state.x}/>
					<YAxis/>
					<CartesianGrid
						horizontal={true}
						vertical={state.xGrid} />
					{state.y.map(function (y, o) {
						return(
							<Line key={o + 1} type="monotone"
								dataKey={y.key}
								stroke={y.color}/>
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
