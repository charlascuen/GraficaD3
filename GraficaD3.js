import React from "react";
import ReactServer from "react-dom/server";
import { Form, Button, FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip} from "recharts";
import ChartRender from "./chartrender";

export function GraficaD3(base) {
	return {
		getConfig: function () {
			return {
				name: "GraficaD3",
				displayName: Dali.i18n.t("GraficaD3.PluginName"),
                category: 'animations',
				needsConfigModal: true,
				needsTextEdition: false,
				icon: "format_color_text"
			};
		},
		getToolbar: function () {
			return {
				main: {
					__name: "Main",
					accordions: {
						style: {
							__name: Dali.i18n.t("GraficaD3.style"),
							icon: "palette",
							order: [
								"margins",
								"paddings",
								"borderWidth",
								"borderStyle",
								"borderColor",
								"borderRadius",
								"opacity"
							],
							accordions: {
								margins: {
									__name: Dali.i18n.t("GraficaD3.margin"),
									buttons: {
										left: {
											__name: Dali.i18n.t("GraficaD3.left"),
											type: "number",
											value: "0px",
											min: 0,
											max: 500,
											units: "px"
										},
										right: {
											__name: Dali.i18n.t("GraficaD3.right"),
											type: "number",
											value: "0px",
											min: 0,
											max: 500,
											units: "px"
										},
										top: {
											__name: Dali.i18n.t("GraficaD3.top"),
											type: "number",
											value: "0px",
											min: 0,
											max: 500,
											units: "px"
										},
										bottom: {
											__name: Dali.i18n.t("GraficaD3.bottom"),
											type: "number",
											value: "0px",
											min: 0,
											max: 500,
											units: "px"
										}
									},
								},
								paddings: {
									__name: Dali.i18n.t("GraficaD3.padding"),
									buttons: {
										left: {
											__name: Dali.i18n.t("GraficaD3.left"),
											type: "number",
											value: "0px",
											min: 0,
											max: 500,
											units: "px"
										},
										right: {
											__name: Dali.i18n.t("GraficaD3.right"),
											type: "number",
											value: "0px",
											min: 0,
											max: 500,
											units: "px"
										},
										top: {
											__name: Dali.i18n.t("GraficaD3.top"),
											type: "number",
											value: "0px",
											min: 0,
											max: 500,
											units: "px"
										},
										bottom: {
											__name: Dali.i18n.t("GraficaD3.bottom"),
											type: "number",
											value: "0px",
											min: 0,
											max: 500,
											units: "px"
										}
									},
								}
							},
							buttons: {
								borderWidth: {
									__name: Dali.i18n.t("GraficaD3.border_width"),
									type: "number",
									value: "0px",
									min: 0,
									max: 10,
									units: "px"
								},
								borderStyle: {
									__name: Dali.i18n.t("GraficaD3.border_style"),
									type: "select",
									value: "solid",
									options: ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "initial", "inherit"]
								},
								borderColor: {
									__name: Dali.i18n.t("GraficaD3.border_color"),
									type: "color",
									value: "#000000"
								},
								borderRadius: {
									__name: Dali.i18n.t("GraficaD3.border_radius"),
									type: "number",
									value: "0%",
									min: "0",
									max: "50",
									step: "5",
									units: "%"
								},
								opacity: {
									__name: Dali.i18n.t("GraficaD3.opacity"),
									type: "range",
									value: 1,
									min: 0,
									max: 1,
									step: 0.01
								}
							}
						},
						chart: {
							icon: "rate_review",
							__name: Dali.i18n.t("GraficaD3.PluginName"),
							order: [
								"chartTitle",
								"chartMargings",
								"showXGrid",
								"showYGrid",
								"chartLineColor"
							],
							accordions: {
								chartMargings: {
									__name: Dali.i18n.t("GraficaD3.margin"),
									buttons: {
										left: {
											__name: Dali.i18n.t("GraficaD3.left"),
											type: "number",
											value: "0px",
											min: 0,
											max: 500,
											units: "px"
										},
										right: {
											__name: Dali.i18n.t("GraficaD3.right"),
											type: "number",
											value: "0px",
											min: 0,
											max: 500,
											units: "px"
										},
										top: {
											__name: Dali.i18n.t("GraficaD3.top"),
											type: "number",
											value: "0px",
											min: 0,
											max: 500,
											units: "px"
										},
										bottom: {
											__name: Dali.i18n.t("GraficaD3.bottom"),
											type: "number",
											value: "0px",
											min: 0,
											max: 500,
											units: "px"
										}
									},
								}
							},
							buttons: {
								chartTitle: {
									__name: Dali.i18n.t("GraficaD3.title"),
									type: "text",
									autoManaged: false,
									value: this.getInitialState().chartTitle
								},
								showXGrid: {
									__name: Dali.i18n.t("GraficaD3.x_grid"),
									type: "checkbox",
									autoManaged: false,
									value: this.getInitialState().showXGrid
								},
								showYGrid: {
									__name: Dali.i18n.t("GraficaD3.y_grid"),
									type: "checkbox",
									autoManaged: false,
									value: this.getInitialState().showYGrid
								},
								chartLineColor: {
									__name: Dali.i18n.t("GraficaD3.line_color"),
									type: "color",
									autoManaged: false,
									value: this.getInitialState().chartLineColor
								},

							}
						}
					}
				}
			};
		},
		getInitialState: function () {
			return {
				chartTitle:		Dali.i18n.t("GraficaD3.title"),
				chartWidth:		700,
				chartHeight:	300,
				showXGrid:		"checked",
				showYGrid:		"checked",
				chartMargings:	{left: 100, right: 100, top: 50, bottom: 50},
				chartData:		{file: ""},
				chartLineColor:	"#ff7f0e"

			};
		},
		getRenderTemplate: function (state) {

			const Chart = ChartRender.getBarChart(state);

			var html = ReactServer.renderToStaticMarkup(
				/* jshint ignore:start */
				<Chart />
				/* jshint ignore:end */

			);

			html = html.replace(/text-anchor/g, 'textAnchor');
			html = html.replace(/stroke-width/g, 'strokeWidth');
			html = html.replace(/stroke-dasharray/g, 'strokeDasharray');

			return html;

		},
		getConfigTemplate: function (state) {

			return ReactServer.renderToStaticMarkup(
				/* jshint ignore:start */
				<Form horizontal={true}>
					<FormGroup>
						<Col componentClass={ControlLabel}
							sm={2}>
							{Dali.i18n.t("GraficaD3.file")}
						</Col>
						<Col dangerouslySetInnerHTML={{__html: "<input type=\"file\" onchange=\"$dali$.fileChanged(event, this)\">"}}
							sm={10} />

					</FormGroup>
					<FormGroup>
						<Col componentClass={ControlLabel}
							sm={2}>
							{Dali.i18n.t("GraficaD3.x_axis")}
						</Col>
						<Col sm={10}
							dangerouslySetInnerHTML={{__html: "<input type=\"text\" name=\"chartXKey\" onchange=\"$dali$.valueChanged(event, this)\">" }}/>

					</FormGroup>

					<FormGroup>
						<Col componentClass={ControlLabel}
							sm={2}>
							{Dali.i18n.t("GraficaD3.y_axis")}
						</Col>
						<Col sm={10}
							dangerouslySetInnerHTML={{__html: "<input type=\"text\" name=\"chartYKey\" onchange=\"$dali$.valueChanged(event, this)\">"}}/>

					</FormGroup>

				</Form>
				/* jshint ignore:end */
			);
		},
		fileChanged: function (event, element, parent) {

			var files = event.target.files; var file = files[0];
			var reader = new FileReader();
			reader.onload = function() {
				base.setState( "chartData", JSON.parse(this.result) );
			};
			reader.readAsText(file);
		},
		valueChanged: function (event, element) {

			base.setState( element.name, element.value );
		},
		handleToolbar: function (name, value) {

			base.setState(name, value);
		},
		getLineChart: function (state) {

			console.log("hola");

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
		}
	};
}
