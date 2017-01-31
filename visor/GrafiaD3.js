import React from 'react';
import ReactDOM from 'react-dom';
import ReactServer from 'react-dom/server';

export function Prueba(base) {
	return {
		getRenderTemplate: function (state) {

			var Recharts = require("recharts");

			const {LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip} = Recharts;

			var html = ReactServer.renderToStaticMarkup(
				/* jshint ignore:start */
				<LineChart
					width={700} height={300}
					data={state.chartData}>
					<XAxis
						dataKey={state.chartXKey}
						name={state.chartXKey}/>
					<YAxis dataKey={state.chartYKey}
						name={state.chartYKey}/>
					<CartesianGrid
						horizontal={state.showYGrid == "checked" ? true : false}
						vertical={state.showXGrid == "checked" ? true : false} />
					<Line type="monotone"
						dataKey={state.chartYKey}
						stroke={state.chartLineColor}/>
					<Tooltip active={true}/>
					<Legend/>
				</LineChart>
				/* jshint ignore:end */

			);

			html = html.replace(/text-anchor/g, 'textAnchor');
			html = html.replace(/stroke-width/g, 'strokeWidth');
			html = html.replace(/stroke-dasharray/g, 'strokeDasharray');

			console.log(html);
			return html;

		},
		handleToolbar: function (name, value) {

			base.setState(name, value);
		}
	};


}
