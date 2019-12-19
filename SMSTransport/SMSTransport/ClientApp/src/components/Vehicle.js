import React, { Component } from 'react';
import RenderTable from './RenderTable';
import { NotificationContainer } from 'react-notifications';
import Download from './ExcelExport';
const service = require('../Utils/service.js');
const notification = require('../Utils/notification.js');

export class Vehicle extends Component {
    constructor(props) {
        
        super(props);
        this.Save = this.Save.bind(this);
        this.state = {
            vehicle: [], loading: true, editData: { veicleid: 0, vehicletype: "", vehicleno: "" }};

        service.Get('api/Master/ReadVehicles')
            .then(response => {
                this.setState({ vehicle: response.data, loading: false });
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
                        <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#vehicleModal" onClick={() => this.EditModal(row.original)}><i class="fa fa-pencil-square fa-xs" aria-hidden="true"></i></button>
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
                Header: 'Vehicle ID',
                accessor: 'veicleid',
                show: false, 
            },
            {
                Header: 'Type',
                accessor: 'vehicletype',
                width: 300
            },
            {
                Header: 'Number',
                accessor: 'vehicleno',
                width: 300
            },
        ]
        let mainView = this.state.loading
            ? <p><em>Loading...</em></p>
            : <RenderTable data={this.state.vehicle} columns={tableColumns} />;

        return (
           
            <div id="right-panel" className="right-panel">
                <NotificationContainer />
                <span className="heading">Vehicle Details</span>
                <hr className="heading-line"/>
                <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#vehicleModal" onClick={() => this.AddModal()}>Add</button>
                <Download data={this.state.vehicle} /><br /><br />
                {mainView}
                <div className="modal" id="vehicleModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Vehicle Details</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="card-body card-block">
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Type</label></div>
                                        <div className="col-md-4">
                                            <input type="text"
                                                value={this.state.editData.vehicletype}
                                                name="vehicletype"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Number</label></div>
                                        <div className="col-md-4">
                                            <input type="text"
                                                value={this.state.editData.vehicleno}
                                                name="vehicleno"
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
    AddModal = () => this.setState({ editData: { veicleid: 0, vehicletype: "", vehicleno: "" }});
    EditModal = (dataObj) => this.setState({ editData: { veicleid: dataObj.veicleid, vehicletype: dataObj.vehicletype, vehicleno: dataObj.vehicleno}});
    Save() {
        let veicleid = this.state.editData.veicleid == null ? 0 : this.state.editData.veicleid;
        let vehicletype = this.state.editData.vehicletype;
        let vehicleno = this.state.editData.vehicleno;

        //Validations
        if (vehicletype == null || vehicletype == undefined || vehicletype == "") {
            notification.createNotification("Please enter a vehicle type", 'warning');
            return false;
        }
        else if (vehicleno == null || vehicleno == undefined || vehicleno == "") {
            notification.createNotification("Please enter a vehicle number", 'warning');
            return false;
        }
        //Save Logic
        else {
            let data = { veicleid: veicleid, "vehicletype": vehicletype, "vehicleno": vehicleno};
            service.Post('api/Master/SaveVehicle', data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data[0].isSuccess) {
                        this.setState({ vehicle: response.data[1].value, loading: false });
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
        let data = { veicleid: parseInt(dataObj.veicleid) };
        service.Post('api/Master/DeleteVehicle', data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data[0].isSuccess) {
                        this.setState({ vehicle: response.data[1].value, loading: false });
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





