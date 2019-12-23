import React, { Component } from 'react';
import RenderTable from './RenderTable';
import { NotificationContainer } from 'react-notifications';
import Download from './ExcelExport';
const service = require('../Utils/service.js');
const notification = require('../Utils/notification.js');

export class Mechanic extends Component {
    constructor(props) {
        
        super(props);
        this.Save = this.Save.bind(this);
        this.state = {
            mechanic: [], vehicleTypeOptions: [], vehicleNumbers: [], loading: true, editData: { id: 0, date: "", vehicletype: "", vehicleno: "", description: "", mechaniclobor: 0, electriclabor: 0, bodywork: 0, oilchange: 0, total: 0 }};

        service.Get('api/Expenses/ReadMechanic')
            .then(response => {
                this.setState({ mechanic: response.data[0], vehicleTypeOptions: response.data[1], loading: false, });
                
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
                        <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#mechanicModal" onClick={() => this.EditModal(row.original)}><i class="fa fa-pencil-square fa-xs" aria-hidden="true"></i></button>
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
                Header: 'Description',
                accessor: 'description',
                width: 200
            },
            {
                Header: 'Mechanic Labor',
                accessor: 'mechaniclobor',
                width: 150
            },
            {
                Header: 'Electric Labor',
                accessor: 'electriclabor',
                width: 150
            },
            {
                Header: 'Body Work',
                accessor: 'bodywork',
                width: 120
            },
            {
                Header: 'Oil/Grease',
                accessor: 'oilchange',
                width: 150
            },
             {
                Header: 'Total',
                accessor: 'total',
                width: 120
            }
        ]
        let mainView = this.state.loading
            ? <p><em>Loading...</em></p>
            : <RenderTable data={this.state.mechanic} columns={tableColumns} />;

        return (
           
            <div id="right-panel" className="right-panel">
                <NotificationContainer />
                <span className="heading">Mechanic Expenses</span>
                <hr className="heading-line"/>
                <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#mechanicModal" onClick={() => this.AddModal()}>Add</button>
                <Download data={this.state.mechanic} /><br /><br />
                {mainView}
                <div className="modal" id="mechanicModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Mechanic Expenses</h4>
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
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Description</label></div>
                                        <div className="col-md-4">
                                            <textarea type="text"
                                                value={this.state.editData.description}
                                                name="description"
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
                                    
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Mechanic Labor</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={this.state.editData.mechaniclobor}
                                                name="mechaniclobor"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Electric Labor</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={this.state.editData.electriclabor}
                                                name="electriclabor"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Body Work</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={this.state.editData.bodywork}
                                                name="bodywork"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Oil Change</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={this.state.editData.oilchange}
                                                name="oilchange"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div> 
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Total</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={
                                                    this.state.editData.total =
                                                    (isNaN(this.state.editData.mechaniclobor) ? 0 : parseFloat(this.state.editData.mechaniclobor)) +
                                                    (isNaN(this.state.editData.electriclabor) ? 0 : parseFloat(this.state.editData.electriclabor)) +
                                                    (isNaN(this.state.editData.bodywork) ? 0 : parseFloat(this.state.editData.bodywork)) +
                                                    (isNaN(this.state.editData.oilchange) ? 0 : parseFloat(this.state.editData.oilchange))
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
    AddModal = () => {
        let fullDate = new Date();
        let twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : (fullDate.getMonth() + 1);
        let hours = fullDate.getHours();
        let minutes = fullDate.getMinutes();
        //let ampm = (hours >= 12) ? "PM" : "AM";
        let currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear() + " " + hours + ":" + minutes;
        this.setState({ vehicleNumbers: [], editData: { id: 0, date: currentDate, vehicletype: "", vehicleno: "", description: "", mechaniclobor: 0, electriclabor: 0, bodywork: 0, oilchange: 0, total: 0 } });
    }
    EditModal = (dataObj) => this.setState({ editData: { id: dataObj.id, date: dataObj.date, vehicletype: dataObj.vehicletype, vehicleno: dataObj.vehicleno, description: dataObj.description, mechaniclobor: dataObj.mechaniclobor, electriclabor: dataObj.electriclabor, bodywork: dataObj.bodywork, oilchange: dataObj.oilchange, total: dataObj.total }});
    Save() {
        let id = this.state.editData.id == null ? 0 : this.state.editData.id;
        let date = this.state.editData.date;
        let vehicletype = this.state.editData.vehicletype;
        let vehicleno = this.state.editData.vehicleno;
        let description = this.state.editData.description;
        let mechaniclobor = this.state.editData.mechaniclobor;
        let electriclabor = this.state.editData.electriclabor;
        let bodywork = this.state.editData.bodywork;
        let oilchange = this.state.editData.oilchange;
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
            let data = { id: id, date: date, vehicletype: vehicletype, vehicleno: vehicleno, description: description, mechaniclobor: parseFloat(mechaniclobor), electriclabor: parseFloat(electriclabor), bodywork: parseFloat(bodywork), oilchange: parseFloat(oilchange), total: parseFloat(total)};
        service.Post('api/Expenses/SaveMechanic', data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data[0].isSuccess) {
                        this.setState({ mechanic: response.data[1].value[0], vehicletype: response.data[1].value[1], loading: false });
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
        service.Post('api/Expenses/DeleteMechanic', data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data[0].isSuccess) {
                        this.setState({ mechanic: response.data[1].value[0], vehicletype: response.data[1].value[1], loading: false });
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





