import React, { Component } from 'react';
import RenderTable from './RenderTable';
import { NotificationContainer } from 'react-notifications';
import Download from './ExcelExport';
const service = require('../Utils/service.js');
const notification = require('../Utils/notification.js');

export class Party extends Component {
    constructor(props) {
        
        super(props);
        this.Save = this.Save.bind(this);
        this.state = {
            party: [], loading: true, editData: { partyid: 0, partytype: "", partyname: "", mobile: "", telephone: "", address: "", email: "", pancard: "", gstin: "" }};

        service.Get('api/Master/ReadParties')
            .then(response => {
                this.setState({ party: response.data, loading: false });
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
                        <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#partyModal" onClick={() => this.EditModal(row.original)}><i class="fa fa-pencil-square fa-xs" aria-hidden="true"></i></button>
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
                Header: 'Party ID',
                accessor: 'partyid',
                show: false, 
            },
            {
                Header: 'Type',
                accessor: 'partytype',
                width: 150
            },
            {
                Header: 'Name',
                accessor: 'partyname',
                width: 200
            },
            {
                Header: 'Mobile',
                accessor: 'mobile',
                width: 150
            },
            {
                Header: 'Telephone',
                accessor: 'telephone',
                width: 150
            },
            {
                Header: 'Address',
                accessor: 'address',
                width: 300
            },
            {
                Header: 'E-Mail',
                accessor: 'email',
                width: 150
            },
            {
                Header: 'PAN',
                accessor: 'pancard',
                width: 200
            },
            {
                Header: 'GST IN',
                accessor: 'gstin',
                width: 200
            },
        ]
        let mainView = this.state.loading
            ? <p><em>Loading...</em></p>
            : <RenderTable data={this.state.party} columns={tableColumns} />;

        return (
           
            <div id="right-panel" className="right-panel">
                <NotificationContainer />
                <span className="heading">Party Details</span>
                <hr className="heading-line"/>
                <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#partyModal" onClick={() => this.AddModal()}>Add</button>
                <Download data={this.state.party} /><br /><br />
                {mainView}
                <div className="modal" id="partyModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Party Details</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="card-body card-block">
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Type</label></div>
                                        <div className="col-md-4">
                                            <input type="text"
                                                value={this.state.editData.partytype}
                                                name="partytype"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Name</label></div>
                                        <div className="col-md-4">
                                            <input type="text"
                                                value={this.state.editData.partyname}
                                                name="partyname"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Mobile</label></div>
                                        <div className="col-md-4">
                                            <input type="text"
                                                value={this.state.editData.mobile}
                                                name="mobile"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Telephone</label></div>
                                        <div className="col-md-4">
                                            <input type="text"
                                                value={this.state.editData.telephone}
                                                name="telephone"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Address</label></div>
                                        <div className="col-md-4">
                                            <input type="text"
                                                value={this.state.editData.address}
                                                name="address"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">E-Mail</label></div>
                                        <div className="col-md-4">
                                            <input type="text"
                                                value={this.state.editData.email}
                                                name="email"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">PAN</label></div>
                                        <div className="col-md-4">
                                            <input type="text"
                                                value={this.state.editData.pancard}
                                                name="pancard"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">GST IN</label></div>
                                        <div className="col-md-4">
                                            <input type="text"
                                                value={this.state.editData.gstin}
                                                name="gstin"
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
    AddModal = () => this.setState({ editData: { partyid: 0, partytype: "", partyname: "", mobile: "", telephone: "", address: "", email: "", pancard: "", gstin: "" }});
    EditModal = (dataObj) => this.setState({ editData: { partyid: dataObj.partyid, partytype: dataObj.partytype, partyname: dataObj.partyname, mobile: dataObj.mobile, telephone: dataObj.telephone, address: dataObj.address, email: dataObj.email, pancard: dataObj.pancard, gstin: dataObj.gstin }});
    Save() {
        let partyid = this.state.editData.partyid == null ? 0 : this.state.editData.partyid;
        let partytype = this.state.editData.partytype;
        let partyname = this.state.editData.partyname;
        let mobile = this.state.editData.mobile;
        let telephone = this.state.editData.telephone;
        let address = this.state.editData.address;
        let email = this.state.editData.email;
        let pancard = this.state.editData.pancard;
        let gstin = this.state.editData.gstin;

        //Validations
        if (partytype == null || partytype == undefined || partytype == "") {
            notification.createNotification("Please enter a party type", 'warning');
            return false;
        }
        else if (partyname == null || partyname == undefined || partyname == "") {
            notification.createNotification("Please enter a name", 'warning');
            return false;
        }
        //Save Logic
        else {
            let data = { partyid: partyid, partytype: partytype, partyname: partyname, mobile: parseInt(mobile), telephone: parseInt(telephone), address: address, email: email, pancard: pancard, gstin: gstin };
            service.Post('api/Master/SaveParty', data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data[0].isSuccess) {
                        this.setState({ party: response.data[1].value, loading: false });
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
        let data = { partyid: parseInt(dataObj.partyid) };
        service.Post('api/Master/DeleteParty', data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data[0].isSuccess) {
                        this.setState({ party: response.data[1].value, loading: false });
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





