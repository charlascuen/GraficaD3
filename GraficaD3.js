import React from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Grid, Row, Table, Checkbox, Radio} from "react-bootstrap";
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
				componentDidMount(){
					let { clientWidth } = this.refs.chartContainer;
					this.setState({chartWidth: clientWidth});
				},
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
						phase: 1,
						editing: true,
						cols: cols,
						rows: rows,
						data: data,
						keys: keys,
						valueKeys: keys,
						file: false,
						isFile: true,
						error: false,
						type: "line",
						key: 0,
						x: "",
						y: [{
							key: "",
							color: extState.chartLineColor
						}],
						gridX: true,
						gridY: true,
						rings: [{
							name: "",
							value: "",
							color: extState.chartLineColor
						}]
					};
				},

				modifyState(){
					base.setState("type", this.state.type);
					base.setState("x", this.state.x);
					base.setState("y", this.state.y);
					base.setState("gridX", this.state.gridX);
					base.setState("gridY", this.state.gridY);
					base.setState("rings", this.state.rings);
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

				csvToJSON(csv){

					let lines = csv.split("\n");

					let result = [];

					let headers = lines[0].split(",");

					for(var i = 1; i < lines.length; i++){

						let obj = {};
						let currentline = lines[i].split(",");

						for (let j = 0; j < headers.length; j++) {
							obj[headers[j]] = currentline[j];
						}
						result.push(obj);
					}

					return result; //JavaScript object
					//return JSON.stringify(result); //JSON
				},

				validateJson(json){

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
					this.setState({cols: cols.length, rows: json.length, data: json, keys: cols, x: cols[0], file: true});

					this.setState({error: false});
					return true;
				},

				validateData() {
					let data = this.state.data;
					let keys = this.state.keys;
					let nKeys = [];
					for (let i = 0; i < keys.length; i++) {
						let value = keys[i];
						nKeys[i] = {};
						nKeys[i].value = value;
						nKeys[i].notNumber = true;
					}

					for (let o = 0; o < data.length; o++) {
						let row = data[o];
						for (let i = 0; i < keys.length; i++) {
							let key = nKeys[i];
							data[o][keys[i]] = isNaN(data[o][keys[i]]) || typeof(data[o][keys[i]]) === "boolean" ? data[o][keys[i]] : parseInt(data[o][keys[i]]);
							if(key.notNumber){
								nKeys[i].notNumber = isNaN(row[key.value]) || typeof(row[key.value]) === "boolean";
							}
						}
					}

					let valueKeys = [];
					for (let key of nKeys) {
						if(!key.notNumber){
							valueKeys.push(key.value);
						}
					}
					console.log(valueKeys);
					this.setState({valueKeys: valueKeys, y: [{key: valueKeys[0], color: extState.chartLineColor}], rings: [{name: keys[0], value: valueKeys[0], color: extState.chartLineColor}]});
					this.updateChart();
				},

				compareKeys(a, b) {
					a = a.sort().toString();
					b = b.sort().toString();
					return a === b;
				},

				fileChanged(event){
					var files = event.target.files;
					var file = files[0];
					console.log(file);
					var reader = new FileReader();
					let context = this;
					reader.onload = function() {
						let data = this.result;
						if(file.name.split('.').pop() === "csv"){
							data = context.csvToJSON(data);
						} else if(file.name.split('.').pop() === "json"){
							data = JSON.parse(data);
						}
						if(context.validateJson(data)){
							context.validateData();
							base.setState("chartData", JSON.parse(this.result));
						}
					};
					reader.readAsText(file);
				},

				keyChanged(event) {
					let keys = this.state.keys;
					let pre = keys[event.target.name];
					let data = this.state.data;
					keys[event.target.name] = event.target.value;
					for (let i = 0; i < data.length; i++) {
						let value = data[i][pre];
						data[i][event.target.value] = value;
						delete data[i][pre];
					}
					this.setState({keys: keys, data: data});

				},

				dataChanged(event) {
					console.log(event.target.name);
					let pos = event.target.name.split(" ");
					let row = pos[0];
					let col = pos[1];
					let data = this.state.data;
					data[row][col] = isNaN(event.target.value) ? event.target.value : parseInt(event.target.value);
					this.setState({data: data});
					this.validateData();
				},

				editButtonClicked() {
					if(this.state.editing){
						this.setState({phase: 2});
					}
					this.setState({editing: !this.state.editing});
					this.updateChart();
				},

				updateChart(){
					this.setState({ key: Math.random() });
				},

				isFileChanged(event){
					let isFile = event.target.value === "true" ? true : false;
					this.setState({isFile: isFile, editing: !isFile});
				},

				typeChanged(event){
					this.setState({type: event.target.value});
					this.updateChart();
				},

				colorChanged(event){
					let y = this.state.y;
					y[event.target.name].color = event.target.value;
					this.setState({y: y});
					this.updateChart();
				},

				yAxisChanged(event){
					let yAxis = this.state.y;
					let number =  event.target.value;
					if(number > yAxis.length){
						for (var i = yAxis.length; i < number; i++) {
							yAxis[i] = {
								key: "",
								color: extState.chartLineColor
							};
						}
					} else {
						yAxis = yAxis.slice(0, number);
					}
					this.setState({y: yAxis});
					this.updateChart();
				},

				xKeyChanged(event){
					this.setState({x: event.target.value});
					this.updateChart();
				},

				xGridChanged(event){
					this.setState({gridX: event.target.checked});
					this.updateChart();
				},

				yKeyChanged(event){
					let y = this.state.y;
					y[event.target.name].key = event.target.value;
					this.setState({y: y});
					this.updateChart();
				},

				yGridChanged(event){
					this.setState({gridY: event.target.checked});
					this.updateChart();
				},

				ringsNumberChanged(event){
					let rings = this.state.rings;
					let number =  event.target.value;
					if(number > rings.length){
						for (var i = rings.length; i < number; i++) {
							rings[i] = {
								name: "",
								value: "",
								color: extState.chartLineColor
							};
						}
					} else {
						rings = rings.slice(0, number);
					}
					this.setState({rings: rings});
					this.updateChart();
				},

				ringNameChanged(event){
					let rings = this.state.rings;
					rings[event.target.name].name = event.target.value;
					this.setState({rings: rings});
					this.updateChart();
				},

				ringValueChanged(event){
					let rings = this.state.rings;
					rings[event.target.name].value = event.target.value;
					this.setState({rings: rings});
					this.updateChart();
				},

				ringColorChanged(event){
					let rings = this.state.rings;
					rings[event.target.name].color = event.target.value;
					this.setState({rings: rings});
					this.updateChart();
				},

				render() {
					let state = this.state;
					let context = this;
					console.log(state);
					this.modifyState();
					return (
						/* jshint ignore:start */
						<Grid>
							<Row style={{marginLeft: "10px", marginRight: "10px"}}>
								<Col xs={this.state.editing ? 12 : 5} style={{paddingTop: "10px"}}>
									<Row>
										<Col xs={12}>
											<h2 style={{paddingLeft: '0px'}}>Orígen de los datos</h2>
											<Form horizontal={true}>
												<FormGroup>
													<FormControl type="file" onChange={this.fileChanged} />
												</FormGroup>
												<FormGroup>
													<Col componentClass={ControlLabel} xs={4}>
														<FormControl.Static>
															{'O Rellena una tabla'}
														</FormControl.Static>
													</Col>
												</FormGroup>
												<FormGroup>
													{this.state.editing &&
														<div>
															<Col componentClass={ControlLabel} xs={2}>
																{Dali.i18n.t("GraficaD3.data_cols")}
															</Col>
															<Col xs={3}>
																<FormControl type="number" name="cols" value={this.state.cols} onChange={this.colsChanged}/>
															</Col>

															<Col componentClass={ControlLabel} xs={1}>
																{Dali.i18n.t("GraficaD3.data_rows")}
															</Col>
															<Col xs={3}>
																<FormControl type="number" name="rows" value={this.state.rows} onChange={this.rowsChanged}/>
															</Col>
														</div>
													}
													<Col xs={3}>
														<Button onClick={context.editButtonClicked} style={{marginTop: '0px'}}>
															{this.state.editing ? 'Confirmar' : 'Editar'}
														</Button>
													</Col>
												</FormGroup>
												{this.state.editing &&
													<div style={{marginTop: '10px'}}>
														<table className="table bordered hover" >
															<thead>
																<tr>
																	{Array.apply(0, Array(state.cols)).map(function (x, i) {
																		return(
																			<th key={i + 1}>
																				<FormControl type="text" name={i} value={state.keys[i]} style={{margin: '0px'}} onChange={context.keyChanged}/>
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
														</table>
													</div>
												}
											</Form>
										</Col>
										{!this.state.editing &&
											<Col xs={12}>
												<h2>Opciones del gráfico</h2>

												<Form horizontal={true}>
													<FormGroup>
														<Col componentClass={ControlLabel} xs={4}>
															<FormControl.Static>
																{Dali.i18n.t("GraficaD3.chart_type")}
															</FormControl.Static>
														</Col>
														<Col xs={6} xsOffset={2}>
															<FormControl componentClass="select" placeholder="line" onChange={this.typeChanged}>
																<option value="line">Línea</option>
																<option value="area">Área</option>
																<option value="bar">Barras</option>
																<option value="pie">Tarta</option>
															</FormControl>
														</Col>
													</FormGroup>
												</Form>
												{this.state.type !== 'pie' &&
													<Form horizontal={true}>
														<FormGroup>
															<Col componentClass={ControlLabel} xs={4}>
																<FormControl.Static>
																	{'Eje Horizontal'}
																</FormControl.Static>
															</Col>
															<Col xs={8}>
																<FormControl componentClass="select" placeholder={state.keys[0]} value={state.x} onChange={this.xKeyChanged}>
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
																<FormControl.Static>
																	{'Ejes Verticales'}
																</FormControl.Static>
															</Col>
															<Col xs={8}>
																<FormControl type="number" value={this.state.y.length} onChange={this.yAxisChanged}/>
															</Col>

														</FormGroup>

														{state.y.map(function (y, i) {
															return(
																<div key={i + 1}>
																	<FormGroup>
																		<Col componentClass={ControlLabel} xs={3}>
																			<FormControl.Static style={{float: 'left'}}>
																				{'Eje ' + i}
																			</FormControl.Static>
																		</Col>
																	</FormGroup>
																	<FormGroup>
																		<Col componentClass={ControlLabel} xs={4}>
																			<FormControl.Static>
																				{'Clave '}
																			</FormControl.Static>
																		</Col>
																		<Col xs={7} xsOffset={1}>
																			<FormControl componentClass="select" placeholder={state.valueKeys[0]} name={i} value={y.key} onChange={context.yKeyChanged}>
																				{state.valueKeys.map(function (x, i) {
																					return(
																						<option key={i + 1} value={x}>{x}</option>
																					);
																				})}
																			</FormControl>
																		</Col>
																	</FormGroup>
																	<FormGroup>
																		<Col componentClass={ControlLabel} xs={4}>
																			<FormControl.Static>
																				{"Color"}
																			</FormControl.Static>
																		</Col>
																		<Col xs={6} xsOffset={2}>
																			<FormControl type="color" name={i} value={y.color} onChange={context.colorChanged}/>
																		</Col>
																	</FormGroup>
																</div>
															);
														})}
														<FormGroup>
															<Col componentClass={ControlLabel} xs={4}>
																<FormControl.Static>
																	{'Ver rejilla'}
																</FormControl.Static>
															</Col>
															<Col xs={4}>
																<Checkbox checked={state.gridX} onChange={this.xGridChanged}></Checkbox>
																{'Horizontal'}
															</Col>
															<Col xs={4}>
																<Checkbox checked={state.gridY} onChange={context.yGridChanged}></Checkbox>
																{'Vertical'}
															</Col>
														</FormGroup>
													</Form>
												}
												{this.state.type === 'pie' &&
													<Form horizontal={true}>
														<FormGroup>
															<Col componentClass={ControlLabel} xs={4}>
																<FormControl.Static>
																	{'Anillos'}
																</FormControl.Static>
															</Col>
															<Col xs={8}>
																<FormControl type="number" value={context.state.rings.length} onChange={context.ringsNumberChanged}/>
															</Col>

														</FormGroup>

														{state.rings.map(function (ring, i) {
															return(
																<div key={i + 1}>
																	<FormGroup>
																		<Col componentClass={ControlLabel} xs={3}>
																			<FormControl.Static>
																				{'Anillo ' + i}
																			</FormControl.Static>
																		</Col>
																	</FormGroup>

																	<FormGroup>
																		<Col componentClass={ControlLabel} xs={4} xsOffset={3}>
																			{'Nombre'}
																		</Col>
																		<Col xs={5}>
																			<FormControl componentClass="select" placeholder="select" name={i} value={ring.name} onChange={context.ringNameChanged}>
																				{state.keys.map(function (key, i) {
																					return(
																						<option key={i + 1} value={key}>{key}</option>
																					);
																				})}
																			</FormControl>
																		</Col>
																	</FormGroup>
																	<FormGroup>
																		<Col componentClass={ControlLabel} xs={4} xsOffset={3}>
																			{'Valor'}
																		</Col>
																		<Col xs={5}>
																			<FormControl componentClass="select" placeholder={state.valueKeys[0]} name={i} value={ring.value} onChange={context.ringValueChanged}>
																				{state.valueKeys.map(function (key, i) {
																					return(
																						<option key={i + 1} value={key}>{key}</option>
																					);
																				})}
																			</FormControl>
																		</Col>
																	</FormGroup>
																	<FormGroup>
																		<Col componentClass={ControlLabel} xs={4} xsOffset={3}>
																			{"Color"}
																		</Col>
																		<Col xs={5}>
																			<FormControl type="color" name={i} value={ring.color} onChange={context.ringColorChanged}/>
																		</Col>
																	</FormGroup>
																</div>
															);
														})}
													</Form>
												}
											</Col>
										}
									</Row>
								</Col>
								<div className="col-xs-7 col-xs-offset-5" ref="chartContainer" style={{padding: '0px', zIndex: '10', position: 'fixed'}}>
									<div style={{marginLeft: '-25px'}}>
										{!this.state.editing &&
											<Chart state={state} key={this.state.key} ></Chart>
										}
									</div>
								</div>
							</Row>

						</Grid>


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
			base.setState( "chartType", elements[0].id );
		},
		handleToolbar: function (name, value) {
			base.setState(name, value);
		}

	};
}
