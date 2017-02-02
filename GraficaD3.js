import React from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Grid, Row, Table, Tabs, Tab, Checkbox} from "react-bootstrap";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip} from "recharts";
import Typeahead from 'react-bootstrap-typeahead';

let Chart = require("./chartrender");

export function GraficaD3(base) {
	return {
		getConfig: function () {
			return {
				name: "GraficaD3",
				flavor: "react",
				displayName: Dali.i18n.t("GraficaD3.PluginName"),
				category: "text",
				needsConfigModal: true,
				needsTextEdition: false,
				icon: "format_color_text",
				initialWidth: '700px'
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
								"chartType",
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
								chartType: {
									__name: Dali.i18n.t("GraficaD3.title"),
									type: "select",
									autoManaged: false,
									value: "solid",
									options: ["line", "area", "bar", "pie"]
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
				showXGrid:		"checked",
				showYGrid:		"checked",
				chartMargins:	{left: 100, right: 100, top: 50, bottom: 50},
				chartData:		{file: ""},
				chartLineColor:	"#ff7f0e",
				cols:			2,
				rows:			1

			};
		},
		getRenderTemplate: function (state) {
			
			return (
				/* jshint ignore:start */
				<Chart state={state}></Chart>
				/* jshint ignore:end */
			);


		},
		getConfigTemplate: function (extState) {
			
			let Config = React.createClass({
				getInitialState() {
					let cols = extState.cols;
					let rows = extState.rows;
					
					let data = [];
					let keys = [];
					let row = {};
					for (let i = 0; i < cols; i++) {
						keys.push(i);
						row[i] = "";
					}
					for (var i = 0; i < rows; i++) {
						data.push(row);
					}
					
					return {
						tab: 1,
						cols: cols,
						rows: rows,
						data: data,
						keys: keys,
						file: false,
						error: false,
						type: "line",
						lineColor: extState.chartLineColor,
						x: {
							key: "",
							grid: true
						},
						y: {
							key: "",
							grid: true
						}
					};
				},
				
				modifyState(){
					base.setState("type", this.state.type);
					base.setState("lineColor", this.state.lineColor);
					base.setState("x", this.state.x);
					base.setState("y", this.state.y);
					base.setState("data", this.state.data);
				},
				
				colsChanged(event){
					let pre = this.state.cols;
					let value = parseInt(event.target.value);
					let keys = this.state.keys;
					let data = this.state.data;
					
					if (value > pre) {
						for (let o = pre; o < value; o++) {
							keys.push(o);
						}
						for (let i = 0; i < data.length; i++) {
							for (let o = pre; o < value; o++) {
								data[i][o] = "";
							}
						}
						
					} else if (value < pre) {
						
						for (let i = 0; i < data.length; i++) {
							for (let o = value; o < pre; o++) {
								delete data[i][keys[o]];
							}
						}
						keys = keys.slice(0, value);
					}
					this.setState({cols: parseInt(value), data: data, keys: keys});
				},
				
				rowsChanged(event){
					let pre = this.state.rows;
					let value = parseInt(event.target.value);
					
					let keys = this.state.keys;
					let data = this.state.data;
					
					if (value > pre) {
						let row = {};
						for (let i = 0; i < keys.length; i++) {
							row[keys[i]] = "";
						}
						for (let i = pre; i < value; i++) {
							data.push(row);
						}
					} else if (value < pre) {
						data = data.slice(0, value);
					}
					this.setState({rows: parseInt(value), data: data});
				},
				
				validateJson(json){
					console.log("json");
					console.log(json);
					
					let data = {};
					if(json.length === 0){
						this.setState({error: true});
						return false;
					}
					let cols = Object.keys(json[0]);
					if(cols.length === 0){
						this.setState({error: true, file: false});
						return false;
					}
					for(let row of json) {
						
						if(!this.compareKeys(cols, Object.keys(row))){
							this.setState({error: true, file: false});
							return false;
						}
						cols = Object.keys(row);
					}
					this.setState({cols: cols.length, rows: json.length, data: json, keys: cols, file: true});
					
					this.setState({error: false});
					return true;
				},
				
				compareKeys(a, b) {
					a = a.sort().toString();
					b = b.sort().toString();
					return a === b;
				},
				
				fileChanged(event){
					var files = event.target.files;
					var file = files[0];
					var reader = new FileReader();
					let context = this;
					reader.onload = function() {
						if(context.validateJson(JSON.parse(this.result))){
							base.setState("chartData", JSON.parse(this.result));
						}
					};
					reader.readAsText(file);
				},
				
				keyChanged(event) {
					let keys = this.state.keys;
					let pre = keys[event.target.name];
					let data = this.state.data;
					/*if(event.target.value === ""){
						return;
					}*/
					keys[event.target.name] = event.target.value;
					for (var i = 0; i < data.length; i++) {
						let value = data[i][pre];
						data[i][event.target.value] = value;
						delete data[i][pre];
					}
					this.setState({keys: keys, data: data});
				},
				
				tabChanged(tab) {
					let xKey = this.state.x.key === "" ? this.state.keys[0] : this.state.x.key;
					let yKey = this.state.y.key === "" ? this.state.keys[0] : this.state.y.key;
					this.setState({tab: tab, x: {key: xKey, grid: this.state.x.grid}, y: {key: yKey, grid: this.state.y.grid}});
					this.updateChart();
				},
				
				dataChanged(event) {
					let pos = event.target.name.split(" ");
					let row = pos[0];
					let col = pos[1];
					let data = this.state.data;
					data[row][col] = isNaN(parseInt(event.target.value)) ? event.target.value : parseInt(event.target.value);
					console.log(data[row][col]);
					this.setState({data: data});
				},
				
				updateChart(){
					this.setState({type: this.state.type});
				},
				
				typeChanged(event){
					this.setState({type: event.target.value});
				},
				
				colorChanged(event){
					this.setState({lineColor: event.target.value});
					this.updateChart();
				},
				
				xKeyChanged(event){
					this.setState({x: {key: event.target.value, grid: this.state.x.grid}});
					this.updateChart();
				},
				
				xGridChanged(event){
					this.setState({x: {key: this.state.x.key, grid: event.target.checked}});
					this.updateChart();
				},
				
				yKeyChanged(event){
					this.setState({y: {key: event.target.value, grid: this.state.y.grid}});
					this.updateChart();
				},
				
				yGridChanged(event){
					this.setState({y: {key: this.state.y.key, grid: event.target.checked}});
					this.updateChart();
				},
				
				render() {
					let state = this.state;
					let context = this;
					this.modifyState();
					//console.log(state);
					return (
						/* jshint ignore:start */
						<Tabs activeKey={state.tab} onSelect={this.tabChanged} id="charts-config-tab">
							<Tab eventKey={1} title="Datos">
								<Grid>
									<Row style={{marginLeft: "10px", marginRight: "10px"}}>
										<Col xs={4} style={{border: "1px solid rgb(204, 204, 204)", paddingTop: "10px"}}>
											<Form horizontal={true}>
												<FormGroup>
													<Col componentClass={ControlLabel} xs={4}>
														{Dali.i18n.t("GraficaD3.data_cols")}
													</Col>
													<Col xs={6} xsOffset={2}>
														<FormControl type="number" name="cols" value={this.state.cols} onChange={this.colsChanged}/>
													</Col>
												</FormGroup>
												
												<FormGroup>
													<Col componentClass={ControlLabel} xs={4}>
														{Dali.i18n.t("GraficaD3.data_rows")}
													</Col>
													<Col xs={6} xsOffset={2}>
														<FormControl type="number" name="rows" value={this.state.rows} onChange={this.rowsChanged}/>
													</Col>
												</FormGroup>

											</Form>						
										</Col>
										<Col xs={7} xsOffset={1} style={{border: "1px solid rgb(204, 204, 204)", padding: "10px"}}>
											<Form horizontal={true}>
												<FormGroup>
													<Col componentClass={ControlLabel} sm={3}>
														{Dali.i18n.t("GraficaD3.file")}
													</Col>
													<Col sm={9}>
														<FormControl
															type="file"
															onChange={this.fileChanged}	/>
													</Col>

												</FormGroup>
												<FormGroup>
													<Col componentClass={ControlLabel} xs={3}>
														<FormControl.Static>
															{Dali.i18n.t("GraficaD3.or")}
														</FormControl.Static>
													</Col>
													
												</FormGroup>
												<Table bordered condensed hover>
													<thead>
														<tr>
															{Array.apply(0, Array(state.cols)).map(function (x, i) {
				    											return(
																	<th key={i + 1}>
																		<FormControl type="text" name={i} value={state.keys[i]} onChange={context.keyChanged}/>
																	</th>
																);
															})}
														</tr>
													</thead>
													<tbody>
														{Array.apply(0, Array(state.rows)).map(function (x, i) {
															
															return(
																<tr key={i + 1}>
																
																{Array.apply(0, Array(state.cols)).map(function (x, o) {
					    											return(
																		<td key={o + 1}>
																			<FormControl type="text" name={i + " " + state.keys[o]} value={state.data[i][state.keys[o]]} onChange={context.dataChanged}/>
																		</td>
																	);
																})}
																</tr>
															);
														})}
													</tbody>
												</Table>
											</Form>		
										</Col>
									</Row>
									
									<Row>
										
									</Row>
								</Grid>
							</Tab>
							<Tab eventKey={2} title="Gráfica">
								<Grid>
									<Row style={{marginLeft: "10px", marginRight: "10px"}}>
										<Col xs={6} style={{border: "1px solid rgb(204, 204, 204)", paddingTop: "10px"}}>
											<Form horizontal={true}>
												<FormGroup>
													<Col componentClass={ControlLabel} xs={4}>
														{Dali.i18n.t("GraficaD3.chart_type")}
													</Col>
													<Col xs={6} xsOffset={2}>
														<FormControl componentClass="select" placeholder="select" onChange={this.typeChanged}>
															<option value="line">Línea</option>
															<option value="area">Área</option>
															<option value="bar">Barras</option>
															<option value="pie">Tarta</option>
														</FormControl>
													</Col>
												</FormGroup>
												<FormGroup>
													<Col componentClass={ControlLabel} xs={4}>
														{"Color"}
													</Col>
													<Col xs={6} xsOffset={2}>
														<FormControl type="color" name="color" value={this.state.lineColor} onChange={this.colorChanged}/>
													</Col>
												</FormGroup>
											</Form>						
										</Col>
										<Col xs={5} xsOffset={1} style={{border: "1px solid rgb(204, 204, 204)", padding: "10px"}}>
											<Form horizontal={true}>
												<FormGroup>
													<Col componentClass={ControlLabel} xs={2}>
														<FormControl.Static>
															{Dali.i18n.t("GraficaD3.x_axis")}
														</FormControl.Static>
													</Col>
													
												</FormGroup>
												<FormGroup>
													<Col componentClass={ControlLabel} xs={4}>
														{Dali.i18n.t("GraficaD3.key")}
													</Col>
													<Col xs={7} xsOffset={1}>
														<FormControl componentClass="select" placeholder="select" value={state.x.key} onChange={this.xKeyChanged}>
															{state.keys.map(function (x, i) {
				    											return(
																	<option key={i + 1} value={x}>{x}</option>
																);
															})}
														</FormControl>
													</Col>
												</FormGroup>
												<FormGroup>
													<Col componentClass={ControlLabel} xs={4}>
														{Dali.i18n.t("GraficaD3.grid")}
													</Col>
													<Col xs={7} xsOffset={1}>
														<Checkbox checked={state.x.grid} onChange={this.xGridChanged}></Checkbox>
													</Col>
												</FormGroup>
												<FormGroup>
													<Col componentClass={ControlLabel} xs={2}>
														<FormControl.Static>
															{Dali.i18n.t("GraficaD3.y_axis")}
														</FormControl.Static>
													</Col>
													
												</FormGroup>
												<FormGroup>
													<Col componentClass={ControlLabel} xs={4}>
														{Dali.i18n.t("GraficaD3.key")}
													</Col>
													<Col xs={7} xsOffset={1}>
														<FormControl componentClass="select" placeholder="select" value={state.y.key} onChange={this.yKeyChanged}>
															{state.keys.map(function (x, i) {
				    											return(
																	<option key={i + 1} value={x}>{x}</option>
																);
															})}
														</FormControl>
													</Col>
												</FormGroup>
												<FormGroup>
													<Col componentClass={ControlLabel} xs={4}>
														{Dali.i18n.t("GraficaD3.grid")}
													</Col>
													<Col xs={7} xsOffset={1}>
														<Checkbox checked={state.y.grid} onChange={this.yGridChanged}></Checkbox>
													</Col>
												</FormGroup>
											</Form>
										</Col>
									</Row>
									
									<Row>
										<Col xs={12}>
											<Chart state={state}></Chart>
										</Col>
										
									</Row>
								</Grid>							
							</Tab>
						</Tabs>
						
						
						/* jshint ignore:end */
					);
				}
			});
				
			return (
				/* jshint ignore:start */
				<Config></Config>
				/* jshint ignore:end */
			);
		},
		fileChanged: function (event) {

			var files = event.target.files;
			var file = files[0];
			var reader = new FileReader();
			reader.onload = function() {
				base.setState( "chartData", JSON.parse(this.result) );
			};
			reader.readAsText(file);
		},
		chartTypeChange: function (elements) {
			console.log(elements);
			base.setState( "chartType", elements[0].id );
		},
		handleToolbar: function (name, value) {

			base.setState(name, value);
		}

	};
}