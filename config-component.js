import React from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Grid, Row, Table, Checkbox, Radio} from "react-bootstrap";

let Chart = require("./chart-component");

let DataProvider = React.createClass({
	getInitialState() {

		console.log('data');
		console.log(this.props.data);
		let rows = this.props.data.length;
		let cols = this.props.data.length === 0 ? 2 : Object.keys(this.props.data[0]).length;

		return {
			cols: cols,
			rows: rows,
			data: this.props.data,
			keys: this.props.keys,
			valueKeys: this.props.valueKeys,
			error: false
		};
	},

	confirmButton() {
		if (typeof this.props.dataChanged === 'function') {
			this.props.dataChanged({data: this.state.data, keys: this.state.keys, valueKeys: this.state.valueKeys});
		}
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

		return result;
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
		this.setState({cols: cols.length, rows: json.length, data: json, keys: cols, x: cols[0]});

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
		console.log(file);
		var reader = new FileReader();
		reader.onload = () => {
			let data = reader.result;
			if(file.name.split('.').pop() === "csv"){
				data = this.csvToJSON(data);
			} else if(file.name.split('.').pop() === "json"){
				data = JSON.parse(data);
			}
			this.validateJson(data);
		};
		reader.readAsText(file);
	},

	dataChanged(event) {
		console.log(event.target.name);
		let pos = event.target.name.split(" ");
		let row = pos[0];
		let col = pos[1];
		let data = this.state.data;
		data[row][col] = isNaN(event.target.value) || event.target.value === "" || event.target.value === null ? event.target.value : parseInt(event.target.value);
		this.setState({data: data});
		this.validateData();
	},

	render: function() {
		return (
			/* jshint ignore:start */
			<Col xs={12}>
				<h2 style={{paddingLeft: '0px'}}> Orígen de los datos </h2>
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
						<Col xs={3}>
							<Button onClick={this.confirmButton} style={{marginTop: '0px'}}>Confirmar</Button>
						</Col>
					</FormGroup>
					<div style={{marginTop: '10px'}}>
						<div style={{display: 'table', tableLayout: 'fixed', width: '100%'}}>
							{Array.apply(0, Array(this.state.cols)).map((x, i) => {
								return(
									<FormControl.Static key={i + 1} style={{display: 'table-cell', padding: '8px', textAlign: 'center'}}>
										{'ID Columna'}
									</FormControl.Static>
								);
							})}
						</div>
						<table className="table bordered hover" >
							<thead>
								<tr>
									{Array.apply(0, Array(this.state.cols)).map((x, i) => {
										return(
											<th key={i + 1}>
												<FormControl type="text" name={i} value={this.state.keys[i]} style={{margin: '0px'}} onChange={this.keyChanged}/>
											</th>
										);
									})}
								</tr>
							</thead>
							<tbody style={{backgroundColor: '#f2f2f2'}}>

								{Array.apply(0, Array(this.state.rows)).map((x, i) => {

									return(
										<tr key={i + 1}>

											{Array.apply(0, Array(this.state.cols)).map((x, o) => {
												return(
													<td key={o + 1}>
														<FormControl type="text" name={i + " " + this.state.keys[o]} value={this.state.data[i][this.state.keys[o]]} onChange={this.dataChanged}/>

													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</Form>
			</Col>
			/* jshint ignore:end */
		);
	}
});

let ChartOptions = React.createClass({
	getInitialState() {
		let options = this.props.options;
		options.keys = this.props.keys;
		options.valueKeys = this.props.valueKeys;
		return options;
	},

	optionsUpdate() {
		if (typeof this.props.optionsChanged === 'function') {
			this.props.optionsChanged({
				type: this.state.type,
				x: this.state.x,
				y: this.state.y,
				gridX: this.state.gridX,
				gridY: this.state.gridY,
				rings: this.state.rings,
			});
		}
	},

	typeChanged(event){
		this.setState({type: event.target.value});
		this.optionsUpdate();
	},

	colorChanged(event){
		let y = this.state.y;
		y[event.target.name].color = event.target.value;
		this.setState({y: y});
		this.optionsUpdate();
	},

	yAxisChanged(event){
		let yAxis = this.state.y;
		let number =  event.target.value;
		if(number > yAxis.length){
			for (var i = yAxis.length; i < number; i++) {
				yAxis[i] = {
					key: "",
					color: this.state.extState.chartLineColor
				};
			}
		} else {
			yAxis = yAxis.slice(0, number);
		}
		this.setState({y: yAxis});
		this.optionsUpdate();
	},

	xKeyChanged(event){
		this.setState({x: event.target.value});
		this.optionsUpdate();
	},

	xGridChanged(event){
		this.setState({gridX: event.target.checked});
		this.optionsUpdate();
	},

	yKeyChanged(event){
		let y = this.state.y;
		y[event.target.name].key = event.target.value;
		this.setState({y: y});
		this.optionsUpdate();
	},

	yGridChanged(event){
		this.setState({gridY: event.target.checked});
		this.optionsUpdate();
	},

	ringsNumberChanged(event){
		let rings = this.state.rings;
		let number =  event.target.value;
		if(number > rings.length){
			for (var i = rings.length; i < number; i++) {
				rings[i] = {
					name: this.state.keys[0],
					value: this.state.valueKeys[0],
					color: this.state.extState.chartLineColor
				};
			}
		} else {
			rings = rings.slice(0, number);
		}
		this.setState({rings: rings});
		this.optionsUpdate();
	},

	ringNameChanged(event){
		let rings = this.state.rings;
		rings[event.target.name].name = event.target.value;
		this.setState({rings: rings});
		this.optionsUpdate();
	},

	ringValueChanged(event){
		let rings = this.state.rings;
		rings[event.target.name].value = event.target.value;
		this.setState({rings: rings});
		this.optionsUpdate();
	},

	ringColorChanged(event){
		let rings = this.state.rings;
		rings[event.target.name].color = event.target.value;
		this.setState({rings: rings});
		this.optionsUpdate();
	},

	render: function() {
		return (
			/* jshint ignore:start */
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
								<FormControl componentClass="select" placeholder={this.state.keys[0]} value={this.state.x} onChange={this.xKeyChanged}>
									{this.state.keys.map((x, i) => {
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

						{this.state.y.map((y, i) => {
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
											<FormControl componentClass="select" placeholder={this.state.valueKeys[0]} name={i} value={y.key} onChange={this.yKeyChanged}>
												{this.state.valueKeys.map((x, i) => {
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
											<FormControl type="color" name={i} value={y.color} onChange={this.colorChanged}/>
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
								<Checkbox checked={this.state.gridX} onChange={this.xGridChanged}></Checkbox>
								{'Horizontal'}
							</Col>
							<Col xs={4}>
								<Checkbox checked={this.state.gridY} onChange={this.yGridChanged}></Checkbox>
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
								<FormControl type="number" value={this.state.rings.length} onChange={this.ringsNumberChanged}/>
							</Col>

						</FormGroup>

						{this.state.rings.map((ring, i) => {
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
											<FormControl componentClass="select" placeholder="select" name={i} value={ring.name} onChange={this.ringNameChanged}>
												{this.state.keys.map((key, i) => {
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
											<FormControl componentClass="select" placeholder={this.state.valueKeys[0]} name={i} value={ring.value} onChange={this.ringValueChanged}>
												{this.state.valueKeys.map((key, i) => {
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
											<FormControl type="color" name={i} value={ring.color} onChange={this.ringColorChanged}/>
										</Col>
									</FormGroup>
								</div>
							);
						})}
					</Form>
				}
			</Col>
			/* jshint ignore:end */
		);
	}
});

let Config = React.createClass({
	componentDidMount(){
		let { clientWidth } = this.refs.chartContainer;
		this.setState({chartWidth: clientWidth});
	},
	getInitialState() {

		let base = this.props.base;

		let data = [];
		let keys = [];
		let row = {};
		for (let i = 0; i < 2; i++) {
			keys.push(i);
			row[i] = "";
		}
		for (var i = 0; i < 1; i++) {
			data.push(row);
		}

		return {
			base: base,
			editing: true,
			data: data,
			keys: keys,
			valueKeys: keys,
			options: {
				type: "line",
				x: "",
				y: [{
					key: "",
					color: "#ff7f0e"
				}],
				gridX: true,
				gridY: true,
				rings: [{
					name: "",
					value: "",
					color: "#ff7f0e"
				}]
			}
		};
	},

	modifyState(){
		this.state.base.setState("options", this.state.options);
		this.state.base.setState("data", this.state.data);
	},

	dataChanged(values) {
		this.state.editing = false;
		this.state.data = values.data;
		this.state.keys = values.keys;
		this.state.base.setState("data", values.data);
		this.setOptions();
		this.updateChart();
	},

	setOptions() {
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
				data[o][keys[i]] = isNaN(data[o][keys[i]]) || typeof(data[o][keys[i]]) === "boolean"  || data[o][keys[i]] === "" || data[o][keys[i]] === null ? data[o][keys[i]] : parseInt(data[o][keys[i]]);
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
		this.setState({options:{valueKeys: valueKeys, y: [{key: valueKeys[0], color: "#ff7f0e"}], rings: [{name: keys[0], value: valueKeys[0], color: "#ff7f0e"}]}});
	},

	optionsChanged(options) {
		this.state.options = options;
		this.state.base.setState("options", options);
		this.updateChart();
	},

	editButtonClicked() {
		this.setState({editing: true});
	},

	updateChart(){
		this.setState({ key: Math.random() });
	},

	render() {
		console.log(this.state);
		this.modifyState();
		return (
			/* jshint ignore:start */
			<Grid>
				<Row style={{marginLeft: "10px", marginRight: "10px"}}>
					<Col xs={this.state.editing ? 12 : 5} style={{paddingTop: "10px"}}>
						<Row>
							{!this.state.editing &&
								<Button onClick={this.editButtonClicked} style={{marginTop: '0px'}}>Editar</Button>
							}
							{this.state.editing &&
								<DataProvider data={this.state.data} dataChanged={this.dataChanged} keys={this.state.keys} valueKeys={this.state.valueKeys}></DataProvider>
							}
							{!this.state.editing &&
								<ChartOptions options={this.state.options} optionsChanged={this.optionsChanged} keys={this.state.keys} valueKeys={this.state.valueKeys}></ChartOptions>
							}
						</Row>
					</Col>
					<div className="col-xs-7 col-xs-offset-5" ref="chartContainer" style={{padding: '0px', zIndex: '10', position: 'fixed'}}>
						<div style={{marginLeft: '-25px'}}>
							{!this.state.editing &&
								<Chart data={this.state.data} options={this.state.options} width={this.state.chartWidth} key={this.state.key} ></Chart>
							}
						</div>
					</div>
				</Row>

			</Grid>


			/* jshint ignore:end */
		);
	}
});

module.exports = Config;