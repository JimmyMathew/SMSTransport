import React, { Component } from 'react';
import RenderTable from './RenderTable';
import { NotificationContainer } from 'react-notifications';
import Download from './ExcelExport';
const service = require('../Utils/service.js');
const notification = require('../Utils/notification.js');

export class Daily extends Component {
    constructor(props) {
        
        super(props);
        this.Save = this.Save.bind(this);
        this.state = {
            daily: [], vehicleTypeOptions:[],vehicleNumbers:[], loading: true, editData: { id: 0, date: "", name: "", vehicletype: "", vehicleno: "", driverbata: "", toll: "", pass: "", fuelrate: "", fuellitre: "", total: "" }};

        service.Get('api/Expenses/ReadDaily')
            .then(response => {
                this.setState({ daily: response.data[0], vehicleTypeOptions: response.data[1], loading: false, });
                
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
                        <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#dailyModal" onClick={() => this.EditModal(row.original)}><i class="fa fa-pencil-square fa-xs" aria-hidden="true"></i></button>
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
                Header: 'Name',
                accessor: 'name',
                width: 200
            },

            {
                Header: 'vehicletype',
                accessor: 'vehicletype',
                width: 200
            },
            {
                Header: 'vehicleno',
                accessor: 'vehicleno',
                width: 200
            },
            {
                Header: 'driverbata',
                accessor: 'driverbata',
                width: 120
            },
            {
                Header: 'toll',
                accessor: 'toll',
                width: 120
            },
            {
                Header: 'pass',
                accessor: 'pass',
                width: 120
            },
            {
                Header: 'fuelrate',
                accessor: 'fuelrate',
                width: 120
            },
            {
                Header: 'fuellitre',
                accessor: 'fuellitre',
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
            : <RenderTable data={this.state.daily} columns={tableColumns} />;

        return (
           
            <div id="right-panel" className="right-panel">
                <NotificationContainer />
                <span className="heading">Daily Expenses</span>
                <hr className="heading-line"/>
                <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#dailyModal" onClick={() => this.AddModal()}>Add</button>
                <Download data={this.state.daily} /><br /><br />
                {mainView}
                <div className="modal" id="dailyModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Daily Expenses</h4>
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
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Name</label></div>
                                        <div className="col-md-4">
                                            <input type="text"
                                                value={this.state.editData.name}
                                                name="name"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Vehicle Type</label></div>
                                        <div className="col-md-4">
                                            <select
                                                value={this.state.editData.vehicletype}
                                                name="vehicletype"
                                                className="form-control"
                                                //onChange={this.HandleChange}
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
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Driver Bata</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                value={this.state.editData.driverbata}
                                                name="driverbata"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Toll</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                value={this.state.editData.toll}
                                                name="toll"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Pass</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                value={this.state.editData.pass}
                                                name="pass"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Fuel Rate</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                value={this.state.editData.fuelrate}
                                                name="fuelrate"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Fuel Litre</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                value={this.state.editData.fuellitre}
                                                name="fuellitre"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Total</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                value={this.state.editData.total}
                                                name="total"
                                                className="form-control"
                                                onChange={this.HandleChange}
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
        editData[targetName] = event.target.type == "number" ? parseInt(event.target.value) : event.target.value;
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
    AddModal = () => {
        let fullDate = new Date();
        let twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : (fullDate.getMonth() + 1);
        let hours = fullDate.getHours();
        let minutes = fullDate.getMinutes();
        //let ampm = (hours >= 12) ? "PM" : "AM";
        let currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear() + " " + hours + ":" + minutes;
        this.setState({ vehicleNumbers: [], editData: { id: 0, date: currentDate, name: "", vehicletype: "", vehicleno: "", driverbata: "", toll: "", pass: "", fuelrate: "", fuellitre: "", total: "" } });
    }
    EditModal = (dataObj) => this.setState({ editData: { id: dataObj.id, date: dataObj.date, name: dataObj.name, vehicletype: dataObj.vehicletype, vehicleno: dataObj.vehicleno, driverbata: dataObj.driverbata, toll: dataObj.toll, pass: dataObj.pass, fuelrate: dataObj.fuelrate, fuellitre: dataObj.fuellitre, total: dataObj.total }});
    Save() {
        let id = this.state.editData.id == null ? 0 : this.state.editData.id;
        let date = this.state.editData.date;
        let name = this.state.editData.name;
        let vehicletype = this.state.editData.vehicletype;
        let vehicleno = this.state.editData.vehicleno;
        let driverbata = this.state.editData.driverbata;
        let toll = this.state.editData.toll;
        let pass = this.state.editData.pass;
        let fuelrate = this.state.editData.fuelrate;
        let fuellitre = this.state.editData.fuellitre;
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
        //Save Logic
        else {
            let data = { id: id, date: date, name: name, vehicletype: vehicletype, vehicleno: vehicleno, driverbata: parseFloat(driverbata), toll: parseFloat(toll), pass: parseFloat(pass), fuelrate: parseFloat(fuelrate), fuellitre: parseFloat(fuellitre), total: parseFloat(total) };
        service.Post('api/Expenses/SaveDaily', data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data[0].isSuccess) {
                        this.setState({ daily: response.data[1].value[0], vehicletype: response.data[1].value[1], loading: false });
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
        service.Post('api/Expenses/DeleteDaily', data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data[0].isSuccess) {
                        this.setState({ daily: response.data[1].value[0], vehicletype: response.data[1].value[1], loading: false });
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





