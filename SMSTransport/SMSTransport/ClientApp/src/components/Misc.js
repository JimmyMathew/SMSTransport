import React, { Component } from 'react';
import RenderTable from './RenderTable';
import { NotificationContainer } from 'react-notifications';
import Download from './ExcelExport';
const service = require('../Utils/service.js');
const notification = require('../Utils/notification.js');

export class Misc extends Component {
    constructor(props) {
        
        super(props);
        this.Save = this.Save.bind(this);
        this.state = {
            misc: [], vehicleTypeOptions: [], vehicleNumbers: [], loading: true, editData: { id: 0, date: "", vehicletype: "", vehicleno: "", pc: 0, rdo: 0, rto: 0,total: 0 }};

        service.Get('api/Expenses/ReadMisc')
            .then(response => {
                this.setState({ misc: response.data[0], vehicleTypeOptions: response.data[1], loading: false, });
                
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
                        <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#miscModal" onClick={() => this.EditModal(row.original)}><i class="fa fa-pencil-square fa-xs" aria-hidden="true"></i></button>
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
                Header: 'PC',
                accessor: 'pc',
                width: 120
            },
            {
                Header: 'RDO',
                accessor: 'rdo',
                width: 120
            },
            {
                Header: 'RTO',
                accessor: 'rto',
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
            : <RenderTable data={this.state.misc} columns={tableColumns} />;

        return (
           
            <div id="right-panel" className="right-panel">
                <NotificationContainer />
                <span className="heading">Miscellaneous Expenses</span>
                <hr className="heading-line"/>
                <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#miscModal" onClick={() => this.AddModal()}>Add</button>
                <Download data={this.state.misc} /><br /><br />
                {mainView}
                <div className="modal" id="miscModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Miscellaneous Expenses</h4>
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
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">PC</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={this.state.editData.pc}
                                                name="pc"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                        
                                    />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">RDO</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={this.state.editData.rdo}
                                                name="rdo"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">RTO</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={this.state.editData.rto}
                                                name="rto"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Total</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                step="any"
                                                value={
                                                    this.state.editData.total =
                                                    (isNaN(this.state.editData.pc) ? 0 : parseFloat(this.state.editData.pc)) +
                                                    (isNaN(this.state.editData.rdo) ? 0 : parseFloat(this.state.editData.rdo)) +
                                                    (isNaN(this.state.editData.rto) ? 0 : parseFloat(this.state.editData.rto)) 
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
        this.setState({ vehicleNumbers: [], editData: { id: 0, date: currentDate, vehicletype: "", vehicleno: "", pc: 0, rdo: 0, rto: 0, total: 0 } });
    }
    EditModal = (dataObj) => this.setState({ editData: { id: dataObj.id, date: dataObj.date, vehicletype: dataObj.vehicletype, vehicleno: dataObj.vehicleno, pc: dataObj.pc, rdo: dataObj.rdo, rto: dataObj.rto, total: dataObj.total }});
    Save() {
        let id = this.state.editData.id == null ? 0 : this.state.editData.id;
        let date = this.state.editData.date;
        let vehicletype = this.state.editData.vehicletype;
        let vehicleno = this.state.editData.vehicleno;
        let pc = this.state.editData.pc;
        let rdo = this.state.editData.rdo;
        let rto = this.state.editData.rto;
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
            let data = { id: id, date: date, vehicletype: vehicletype, vehicleno: vehicleno, pc: parseFloat(pc), rdo: parseFloat(rdo), rto: parseFloat(rto), total: parseFloat(total) };
        service.Post('api/Expenses/SaveMisc', data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data[0].isSuccess) {
                        this.setState({ misc: response.data[1].value[0], vehicletype: response.data[1].value[1], loading: false });
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
        service.Post('api/Expenses/DeleteMisc', data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data[0].isSuccess) {
                        this.setState({ misc: response.data[1].value[0], vehicletype: response.data[1].value[1], loading: false });
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





