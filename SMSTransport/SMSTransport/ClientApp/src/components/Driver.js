import React, { Component } from 'react';
import RenderTable from './RenderTable';
import { NotificationContainer } from 'react-notifications';
import Download from './ExcelExport';
const service = require('../Utils/service.js');
const notification = require('../Utils/notification.js');

export class Driver extends Component {
    constructor(props) {
        
        super(props);
        this.Save = this.Save.bind(this);
        this.state = {
            driver: [], loading: true, editData: { driverid: 0, drivername: "", mobile: "", address: "" }};

        service.Get('api/Master/ReadDrivers')
            .then(response => {
                this.setState({ driver: response.data, loading: false });
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
                        <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#driverModal" onClick={() => this.EditModal(row.original)}><i class="fa fa-pencil-square fa-xs" aria-hidden="true"></i></button>
                        <button className="btn btn-danger button-gap btn-sm" onClick={() => this.Delete(row.original)}><i class="fa fa-trash fa-xs"></i></button>
                    </div>
                ),
                disableFilters: true,
                disableSortBy: true,
                Filter: () => (
                    <input disabled />
                ),
                width: 200
            },
            {
                Header: 'Driver ID',
                accessor: 'driverid',
                show: false, 
            },
            {
                Header: 'Name',
                accessor: 'drivername',
                width: 300
            },
            {
                Header: 'Mobile',
                accessor: 'mobile',
                width: 300
            },

            {
                Header: 'address',
                accessor: 'address',
                width: 600
            },
        ]
        let mainView = this.state.loading
            ? <p><em>Loading...</em></p>
            : <RenderTable data={this.state.driver} columns={tableColumns} />;

        return (
           
            <div id="right-panel" className="right-panel">
                <NotificationContainer />
                <span className="heading">Driver Details</span>
                <hr className="heading-line"/>
                <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#driverModal" onClick={() => this.AddModal()}>Add</button>
                <Download data={this.state.driver} /><br /><br />
                {mainView}
                <div className="modal" id="driverModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Driver Details</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="card-body card-block">
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Name</label></div>
                                        <div className="col-md-4">
                                            <input type="text"
                                                value={this.state.editData.drivername}
                                                name="drivername"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Mobile</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                value={this.state.editData.mobile}
                                                name="mobile"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Address</label></div>
                                        <div className="col-md-4">
                                            <textarea type="text"
                                                value={this.state.editData.address}
                                                name="address"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                    </div>
                                    <br/>
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
    AddModal = () => this.setState({ editData: { driverid: 0, drivername: "", mobile: "", address: "" }});
    EditModal = (dataObj) => this.setState({ editData: { driverid: dataObj.driverid, drivername: dataObj.drivername, mobile: dataObj.mobile, address: dataObj.address }});
    Save() {
        let driverid = this.state.editData.driverid == null ? 0 : this.state.editData.driverid;
        let drivername = this.state.editData.drivername;
        let mobile = this.state.editData.mobile;
        let address = this.state.editData.address;

        //Validations
        if (drivername == null || drivername == undefined || drivername == "") {
            notification.createNotification("Please enter a name", 'warning');
            return false;
        }
        //Save Logic
        else {
            let data = { driverid: driverid, "drivername": drivername, "mobile": parseInt(mobile), "address": address };
        service.Post('api/Master/SaveDriver', data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data[0].isSuccess) {
                        this.setState({ driver: response.data[1].value, loading: false });
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
        let data = { driverid: parseInt(dataObj.driverid) };
        service.Post('api/Master/DeleteDriver', data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data[0].isSuccess) {
                        this.setState({ driver: response.data[1].value, loading: false });
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





