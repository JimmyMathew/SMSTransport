import React, { Component } from 'react';
import RenderTable from './RenderTable';
import { NotificationContainer } from 'react-notifications';
import Download from './ExcelExport';
const service = require('../Utils/service.js');
const notification = require('../Utils/notification.js');

export class Tire extends Component {
    constructor(props) {
        
        super(props);
        this.Save = this.Save.bind(this);
        this.state = {
            tire: [], vehicleTypeOptions: [], vehicleNumbers: [], loading: true, editData: { id: 0, date: "", vehicletype: "", vehicleno: "", tyretype: "", side: "", company: "", startkm: 0, closekm: 0, starthour: 0, closehour: 0,total: 0 }};

        service.Get('api/Expenses/ReadTire')
            .then(response => {
                this.setState({ tire: response.data[0], vehicleTypeOptions: response.data[1], loading: false, });
                
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
                        <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#tireModal" onClick={() => this.EditModal(row.original)}><i class="fa fa-pencil-square fa-xs" aria-hidden="true"></i></button>
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
                Header: 'Type',
                accessor: 'tyretype',
                width: 120
            },
            {
                Header: 'Side',
                accessor: 'side',
                width: 120
            },
            {
                Header: 'Company',
                accessor: 'company',
                width: 120
            },
            {
                Header: 'Start Km',
                accessor: 'startkm',
                width: 120
            },
            {
                Header: 'Close Km',
                accessor: 'closekm',
                width: 120
            },
            {
                Header: 'Start Hour',
                accessor: 'starthour',
                width: 120
            },
            {
                Header: 'Close Hr',
                accessor: 'closehour',
                width: 120
            },
            {
                Header: 'Total',
                accessor: 'total',
                width: 120
            }
        ]
        let mainView = this.state.loading
            ? <p><em>Loading...</em></p>
            : <RenderTable data={this.state.tire} columns={tableColumns} />;

        return (
           
            <div id="right-panel" className="right-panel">
                <NotificationContainer />
                <span className="heading">Tire Expenses</span>
                <hr className="heading-line"/>
                <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#tireModal" onClick={() => this.AddModal()}>Add</button>
                <Download data={this.state.tire} /><br /><br />
                {mainView}
                <div className="modal" id="tireModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Tire Expenses</h4>
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
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Type</label></div>
                                        <div className="col-md-4">
                                            <select
                                                value={this.state.editData.tyretype}
                                                name="tyretype"
                                                className="form-control"
                                                onChange={this.HandleChange}>

                                                <option value="">Select...</option>
                                                <option value="Original">Original</option>
                                                <option value="Retired">Retired</option>

                                            </select>
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Side</label></div>
                                        <div className="col-md-4">
                                            <select
                                                value={this.state.editData.side}
                                                name="side"
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
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Company</label></div>
                                        <div className="col-md-4">
                                            <input type="text"
                                                value={this.state.editData.company}
                                                name="company"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Start KM</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={this.state.editData.startkm}
                                                name="startkm"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                                
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Close KM</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={this.state.editData.closekm}
                                                name="closekm"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Start Hr</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={this.state.editData.starthour}
                                                name="starthour"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                                
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Close Hr</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={this.state.editData.closehour}
                                                name="closehour"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Total</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
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
        this.setState({ vehicleNumbers: [], editData: { id: 0, date: currentDate, vehicletype: "", vehicleno: "", tyretype: "", side: "", company: "", startkm: 0, closekm: 0, starthour: 0, closehour: 0, total: 0 } });
    }
    EditModal = (dataObj) => this.setState({ editData: { id: dataObj.id, date: dataObj.date, vehicletype: dataObj.vehicletype, vehicleno: dataObj.vehicleno, tyretype: dataObj.tyretype, side: dataObj.side, company: dataObj.company, startkm: dataObj.startkm, closekm: dataObj.closekm, starthour: dataObj.starthour, closehour: dataObj.closehour, total: dataObj.total }});
    Save() {
        let id = this.state.editData.id == null ? 0 : this.state.editData.id;
        let date = this.state.editData.date;
        let vehicletype = this.state.editData.vehicletype;
        let vehicleno = this.state.editData.vehicleno;
        let tyretype = this.state.editData.tyretype;
        let side = this.state.editData.side;
        let company = this.state.editData.company;
        let startkm = this.state.editData.startkm;
        let closekm = this.state.editData.closekm;
        let starthour = this.state.editData.starthour;
        let closehour = this.state.editData.closehour;
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
            let data = { id: id, date: date, vehicletype: vehicletype, vehicleno: vehicleno, tyretype: tyretype, side: side, company: company, startkm: parseFloat(startkm), closekm: parseFloat(closekm), starthour: parseFloat(starthour), closehour: parseFloat(closehour), total: parseFloat(total) };
        service.Post('api/Expenses/SaveTire', data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data[0].isSuccess) {
                        this.setState({ tire: response.data[1].value[0], vehicletype: response.data[1].value[1], loading: false });
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
        service.Post('api/Expenses/DeleteTire', data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data[0].isSuccess) {
                        this.setState({ tire: response.data[1].value[0], vehicletype: response.data[1].value[1], loading: false });
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





