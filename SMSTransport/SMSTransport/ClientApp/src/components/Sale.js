import React, { Component } from 'react';
import RenderTable from './RenderTable';
import { NotificationContainer } from 'react-notifications';
import Download from './ExcelExport';
const service = require('../Utils/service.js');
const notification = require('../Utils/notification.js');

export class Sale extends Component {
    constructor(props) {
        
        super(props);
        this.Save = this.Save.bind(this);
        this.state = {
            isDisabled : true,
            isDisabledTon : true,
            sale: [], vehicleTypeOptions: [], vehicleNumbers: [], loading: true, editData: { id: 0, date: "", vehicletype: "", vehicleno: "", drivername: "", mode: "", partyname: "", rentdetail: "", loadfrom: "", loadto: "", ratetype: "", rate: 0, ton: 0, startingkm: 0, closingkm: 0, expensekm: 0, total: 0 }};

        service.Get('api/Sales/ReadSale')
            .then(response => {
                this.setState({ sale: response.data[0], vehicleTypeOptions: response.data[1], loading: false, });
                
            })
            .catch((error) => {
                console.log("Error Log:");
                console.log("----------");
                console.log(error.response.data);
                console.log("----------");
                notification.createNotification(error.response.data.errorHeading, 'error');

            });

    }


    render() {
      
        const tableColumns = [
            {
                Header: 'Action',
                Cell: row => (
                    <div>
                        <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#saleModal" onClick={() => this.EditModal(row.original)}><i class="fa fa-pencil-square fa-xs" aria-hidden="true"></i></button>
                        <button className="btn btn-danger button-gap btn-sm" onClick={() => this.Delete(row.original)}><i class="fa fa-trash fa-xs"></i></button>
                    </div>
                ),
                disableFilters: true,
                disableSortBy: true,
                Filter: () => (
                    <input disabled />
                ),
                width: 100
            },
            {
                Header: 'ID',
                accessor: 'id',
                show: false, 
            },
            {
                Header: 'Date',
                accessor: 'date',
                width: 200
            },
            {
                Header: 'Vehicle Type',
                accessor: 'vehicletype',
                width: 200
            },
            {
                Header: 'Vehicle No',
                accessor: 'vehicleno',
                width: 200
            },
            {
                Header: 'drivername',
                accessor: 'drivername',
                width: 120
            },
            {
                Header: 'mode',
                accessor: 'mode',
                width: 120
            },
            {
                Header: 'partyname',
                accessor: 'partyname',
                width: 120
            },
            {
                Header: 'rentdetail',
                accessor: 'rentdetail',
                width: 120
            },
            {
                Header: 'loadfrom',
                accessor: 'loadfrom',
                width: 120
            },
            {
                Header: 'loadto',
                accessor: 'loadto',
                width: 120
            },
            {
                Header: 'ratetype',
                accessor: 'ratetype',
                width: 120
            },
            {
                Header: 'rate',
                accessor: 'rate',
                width: 120
            },
            {
                Header: 'ton',
                accessor: 'ton',
                width: 120
            },
            {
                Header: 'startingkm',
                accessor: 'startingkm',
                width: 120
            },
            {
                Header: 'closingkm',
                accessor: 'closingkm',
                width: 120
            },
            {
                Header: 'expensekm',
                accessor: 'expensekm',
                width: 120
            },
            {
                Header: 'total',
                accessor: 'total',
                width: 120
            }
        ]
        let mainView = this.state.loading
            ? <p><em>Loading...</em></p>
            : <RenderTable data={this.state.sale} columns={tableColumns} />;

        return (
           
            <div id="right-panel" className="right-panel">
                <NotificationContainer />
                <span className="heading">Sales</span>
                <hr className="heading-line"/>
                <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#saleModal" onClick={() => this.AddModal()}>Add</button>
                <Download data={this.state.sale} /><br /><br />
                {mainView}
                <div className="modal" id="saleModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Sales</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="card-body card-block">
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Date</label></div>
                                        <div className="col-md-4">
                                            <input type="text"
                                                value={this.state.editData.date}
                                                name="date"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                                disabled
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Vehicle Type</label></div>
                                        <div className="col-md-4">
                                            <select
                                                value={this.state.editData.vehicletype}
                                                name="vehicletype"
                                                className="form-control"
                                                onChange={this.HandleVehicleTypeChange}>
                                                <option value="">Select...</option>
                                                {this.state.vehicleTypeOptions.map((data, key) => {
                                                    return (
                                                        <option key={data.key} value={data.key}>
                                                            {data.value}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Vehicle No</label></div>
                                        <div className="col-md-4">
                                            <input type="text"
                                                value={this.state.editData.vehicleno}
                                                name="vehicleno"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                                list="vehicleNumberList"
                                            />
                                            <datalist id="vehicleNumberList">
                                                {this.state.vehicleNumbers.map((data, key) => {
                                                    return (
                                                        <option key={data.key} value={data.key}>
                                                            {data.value}
                                                        </option>
                                                    );
                                                })}
                                            </datalist>
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Driver</label></div>
                                        <div className="col-md-4">
                                            <select
                                                value={this.state.editData.drivername}
                                                name="drivername"
                                                className="form-control"
                                                onChange={this.HandleChange}>
                                                <option value="">Select...</option>
                                                <option value="Original">Original</option>
                                                <option value="Retired">Retired</option>

                                            </select>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Mode</label></div>
                                        <div className="col-md-4">
                                            <select
                                                value={this.state.editData.mode}
                                                name="mode"
                                                className="form-control"
                                                onChange={this.HandleChange}>

                                                <option value="">Select...</option>
                                                <option value="Sales">Sales</option>
                                                <option value="Purchase">Purchase</option>

                                            </select>
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Party</label></div>
                                        <div className="col-md-4">
                                            <select
                                                value={this.state.editData.partyname}
                                                name="partyname"
                                                className="form-control"
                                                onChange={this.HandleChange}>

                                                <option value="">Select...</option>
                                                <option value="Front">Front</option>
                                                <option value="Middle">Middle</option>
                                                <option value="Back">Back</option>

                                            </select>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Rent detail</label></div>
                                        <div className="col-md-4">
                                            <select
                                                value={this.state.editData.rentdetail}
                                                name="rentdetail"
                                                className="form-control"
                                                onChange={this.HandleChange}>
                                                <option value="">Select...</option>
                                                <option value="Cash">Cash</option>
                                                <option value="Credit">Credit</option>

                                            </select>
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Load from</label></div>
                                        <div className="col-md-4">
                                            <input type="text"
                                                value={this.state.editData.loadfrom}
                                                name="loadfrom"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                                
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Load to</label></div>
                                        <div className="col-md-4">
                                            <input type="text"
                                                value={this.state.editData.loadto}
                                                name="loadto"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Rate Type</label></div>
                                        <div className="col-md-4">
                                            <select
                                                value={this.state.editData.ratetype}
                                                name="ratetype"
                                                className="form-control"
                                                onChange={(event) => { this.HandleChange(event); this.HandleDisable(event); }}>
                                                <option value="">Select...</option>
                                                <option value="Km">Km</option>
                                                <option value="Ton">Ton</option>

                                            </select>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Rate</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={this.state.editData.rate}
                                                name="rate"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Ton</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={this.state.editData.ton}
                                                name="ton"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                                disabled={this.state.isDisabledTon}
                                                
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                       
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Closing KM</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={this.state.editData.closingkm}
                                                name="closingkm"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                                disabled={this.state.isDisabled}

                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Starting KM</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={this.state.editData.startingkm}
                                                name="startingkm"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                                disabled={this.state.isDisabled}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Expense KM</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={this.state.editData.expensekm = 
                                                    (isNaN(this.state.editData.closingkm) ? 0 : parseFloat(this.state.editData.closingkm)) - 
                                                    (isNaN(this.state.editData.startingkm) ? 0 : parseFloat(this.state.editData.startingkm))
                                                }
                                                name="expensekm"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                                disabled
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Total</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={
                                                    this.state.editData.total = 
                                                    ((isNaN(this.state.editData.rate) ? 0 : parseFloat(this.state.editData.rate)) *
                                                     (isNaN(this.state.editData.expensekm) ? 0 : parseFloat(this.state.editData.expensekm))) +
                                                    (isNaN(this.state.editData.rate) ? 0 : parseFloat(this.state.editData.rate)) *
                                                    (isNaN(this.state.editData.ton) ? 0 : parseFloat(this.state.editData.ton))
                                                 }
                                                name="total"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-4"></div>
                                        <div className="col-md-6">
                                            <div className="col-md-3">
                                                <button type="button" className="btn btn-info btn-lg" onClick={() => this.Save()}>Save</button>
                                            </div>
                                            <div className="col-md-3">
                                                <button type="button" className="btn btn-danger btn-lg" onClick={() => this.AddModal()}>Reset</button>
                                            </div>
                                            </div>
                                        </div>
                                </div>


                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-warning btn-sm" data-dismiss="modal" ref="modalClose">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
                </div>

          
        );
       
    }
    //Custom Functions
    HandleChange = (event) => {
        let editData = { ...this.state.editData};
        let targetName = event.target.name;
        editData[targetName] = event.target.type == "number" ? parseFloat(event.target.value) : event.target.value;
        this.setState({ editData });
    }
    HandleVehicleTypeChange = (event) => {
        let editData = { ...this.state.editData };
        editData["vehicletype"] = event.target.value;
        let data = { vehicletype: event.target.value };
        service.Post('api/Expenses/ReadVehiclesOnType', data)
            .then(response => {
                editData["vehicleno"] = "";
                    this.setState({ vehicleNumbers: response.data, editData });
               
            })
            .catch((error) => {
                console.log("Error Log:");
                console.log("----------");
                console.log(error.response.data);
                console.log("----------");
                notification.createNotification(error.response.data.errorHeading, 'error');

            });
    }
    HandleDisable = (event) => {
        if (event.target.value == "Km") {
            this.setState({isDisabledTon : true, isDisabled : false});
        }
        else {
            this.setState({ isDisabledTon : false, isDisabled : true });
        }
              
    }
    isDisabledTon = () => {
        if (this.state.editData.ratetype == "Ton")
            return true;
        else
            return false;
    }
    AddModal = () => {
        let fullDate = new Date();
        let twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : (fullDate.getMonth() + 1);
        let hours = fullDate.getHours();
        let minutes = fullDate.getMinutes();
        //let ampm = (hours >= 12) ? "PM" : "AM";
        let currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear() + " " + hours + ":" + minutes;
        this.setState({ vehicleNumbers: [], editData: { id: 0, date: currentDate, vehicletype: "", vehicleno: "", drivername: "", mode: "", partyname: "", rentdetail: "", loadfrom: "", loadto: "", ratetype: "", rate: 0, ton: 0, startingkm: 0, closingkm: 0, expensekm: 0, total: 0 } });
    }
    EditModal = (dataObj) => this.setState({ editData: { id: dataObj.id, date: dataObj.date, vehicletype: dataObj.vehicletype, vehicleno: dataObj.vehicleno, drivername: dataObj.drivername, mode: dataObj.mode, partyname: dataObj.partyname, rentdetail: dataObj.rentdetail, loadfrom: dataObj.loadfrom, loadto: dataObj.loadto, ratetype: dataObj.ratetype, rate: dataObj.rate, ton: dataObj.ton, startingkm: dataObj.startingkm, closingkm: dataObj.closingkm, expensekm: dataObj.expensekm, total: dataObj.total }});
    Save() {
        let id = this.state.editData.id == null ? 0 : this.state.editData.id;
        let date = this.state.editData.date;
        let vehicletype = this.state.editData.vehicletype;
        let vehicleno = this.state.editData.vehicleno;
        let drivername = this.state.editData.drivername;
        let mode = this.state.editData.mode;
        let partyname = this.state.editData.partyname;
        let rentdetail = this.state.editData.rentdetail;
        let loadfrom = this.state.editData.loadfrom;
        let loadto = this.state.editData.loadto;
        let ratetype = this.state.editData.ratetype;
        let rate = this.state.editData.rate;
        let ton = this.state.editData.ton;
        let startingkm = this.state.editData.startingkm;
        let closingkm = this.state.editData.closingkm;
        let expensekm = this.state.editData.expensekm;
        let total = this.state.editData.total;

        //Validations
        if (vehicletype == null || vehicletype == undefined || vehicletype == "") {
            notification.createNotification("Please select a Vehicle type", 'warning');
            return false;
        }
        else if (vehicleno == null || vehicleno == undefined || vehicleno == "") {
            notification.createNotification("Please select a Vehicle No", 'warning');
            return false;
        }
        else if (mode == null || mode == undefined || mode == "") {
            notification.createNotification("Please select a Mode", 'warning');
            return false;
        }
        else if (rentdetail == null || rentdetail == undefined || rentdetail == "") {
            notification.createNotification("Please select a Rent detail", 'warning');
            return false;
        }
        else if (drivername == null || drivername == undefined || drivername == "") {
            notification.createNotification("Please select a Driver", 'warning');
            return false;
        }
        else if (partyname == null || partyname == undefined || partyname == "") {
            notification.createNotification("Please select a Party", 'warning');
            return false;
        }
        else if (ratetype == null || ratetype == undefined || ratetype == "") {
            notification.createNotification("Please select a Rate type", 'warning');
            return false;
        }
        //Save Logic
        else {
            let data = { id: id, date: date, vehicletype: vehicletype, vehicleno: vehicleno, drivername: drivername, mode: mode, partyname: partyname, rentdetail: rentdetail, loadfrom: loadfrom, loadto: loadto, ratetype: ratetype, rate: rate, ton: ton, startingkm: startingkm, closingkm: closingkm, expensekm: expensekm, total: total };
        service.Post('api/Sales/SaveSale', data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data[0].isSuccess) {
                        this.setState({ sale: response.data[1].value[0], vehicletype: response.data[1].value[1], loading: false });
                        this.refs.modalClose.click();
                    }
                    notification.createNotification(response.data[0].message, 'info');
                }
                else
                    notification.createNotification(response.statusText, 'error');
            })
            .catch((error) => {
                console.log("Error Log:");
                console.log("----------");
                console.log(error.response.data);
                console.log("----------");
                notification.createNotification(error.response.data.errorHeading, 'error');

            });
            
    }
    };
    Delete = (dataObj) => {
        let data = { id: parseInt(dataObj.id) };
        service.Post('api/Sales/DeleteSale', data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data[0].isSuccess) {
                        this.setState({ sale: response.data[1].value[0], vehicletype: response.data[1].value[1], loading: false });
                    }
                    notification.createNotification(response.data[0].message, 'info');
                }
                else
                    notification.createNotification(response.statusText, 'error');
            })
            .catch((error) => {
                console.log("Error Log:");
                console.log("----------");
                console.log(error.response.data);
                console.log("----------");
                notification.createNotification(error.response.data.errorHeading, 'error');

            });

    };
}





