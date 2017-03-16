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
		let data = this.props.data;
		let options = this.props.options;
		let width = this.props.width;
		console.log(width);
		switch (options.type) {
			case "line":
			return (
				<LineChart
					width={width || 700} height={300}
					data={data}>
					<XAxis dataKey={options.x} name={options.x}/>
					<YAxis/>
					<CartesianGrid horizontal={options.gridX} vertical={options.gridY} />
					{options.y.map((y, o) => {
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
				<AreaChart width={width || 700} height={300}
					data={data}>
					<defs>
						{options.y.map((y, o) => {
							return(

								<linearGradient id={"colorUv" + o} x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor={y.color} stopOpacity={0.8}/>
									<stop offset="95%" stopColor={y.color} stopOpacity={0}/>
								</linearGradient>
							);
						})}
					</defs>
					<XAxis dataKey={options.x} name={options.x}/>
					<YAxis/>
					<CartesianGrid horizontal={options.gridX} vertical={options.gridY} />
					<Tooltip />
					{options.y.map((y, o) => {
						return(
							<Area key={o + 1} type="monotone" dataKey={y.key} stroke={y.color} fillOpacity={1} fill={"url(#colorUv" + o + ")"}/>
						);
					})}
				</AreaChart>
			);
			case "bar":
			return (
				<BarChart width={width || 700} height={300}
					data={data}>
					<XAxis dataKey={options.x} name={options.x}/>
					<YAxis/>
					<CartesianGrid horizontal={options.gridX} vertical={options.gridY} />
					<Tooltip/>
					<Legend />
					{options.y.map((y, o) => {
						return(
							<Bar key={o + 1} dataKey={y.key} fill={y.color} scaleY={1} />
						);
					})}
				</BarChart>
			);
			case "pie":
			let rings = [];
			for (let ring of options.rings) {
				let newRing = {};
				let data = [];
				for (let row of data) {
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
				<PieChart width={width || 700} height={300}>
					<Tooltip/>
					{rings.map((ring, o) => {
						return(
							<Pie key={o + 1} data={ring.data} cx="50%" cy="50%" innerRadius={o*50} outerRadius={(o + 1)*50 - 10} fill={ring.color} label/>
						);
					})}
				</PieChart>
			);
			default:
			return (
				<LineChart
					width={width || 700} height={300}
					data={data}>
					<XAxis dataKey={options.x} name={options.x}/>
					<YAxis/>
					<CartesianGrid
						horizontal={true}
						vertical={options.xGrid} />
					{options.y.map((y, o) => {
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
