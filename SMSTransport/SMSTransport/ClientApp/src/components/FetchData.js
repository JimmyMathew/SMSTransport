import React, { Component } from 'react';
import RenderTable from './RenderTable';
import { NotificationContainer } from 'react-notifications';
import Download from './ExcelExport';
const service = require('../Utils/service.js');
const notification = require('../Utils/notification.js');

export class FetchData extends Component {
    constructor(props) {
        
        super(props);
        this.Save = this.Save.bind(this);
        this.state = {
            test: [], loading: true, editData: { id: 0, name: "", age: "", isactive: "" }};
        service.Get('api/Test/ReadTest')
            .then(response => {
                this.setState({ test: response.data, loading: false });
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
                        <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#testModal" onClick={() => this.EditModal(row.original)}><i class="fa fa-pencil-square fa-xs" aria-hidden="true"></i></button>
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
                Header: 'Name',
                accessor: 'name',
                width: 500
            },
            {
                Header: 'Age',
                accessor: 'age',
                width: 100
            },

            {
                Header: 'IsActive',
                accessor: 'isactive',
                width: 100
            },
        ]
        let mainView = this.state.loading
            ? <p><em>Loading...</em></p>
            : <RenderTable data={this.state.test} columns={tableColumns} />;

        return (
           
            <div id="right-panel" className="right-panel">
                <NotificationContainer />
                <span className="heading">Test Heading</span>
                <hr className="heading-line"/>
                <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#testModal" onClick={() => this.AddModal()}>Add</button>
                <Download data={this.state.test} /><br /><br />
                {mainView}
                <div className="modal" id="testModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Test Edit</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="card-body card-block">
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Name</label></div>
                                        <div className="col-md-4">
                                            <input type="text"
                                                value={this.state.editData.name}
                                                name="name"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Age</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                value={this.state.editData.age}
                                                name="age"
                                                className="form-control"
                                                onChange={this.HandleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-md-2"><label for="text-input" className=" form-control-label">Active</label></div>
                                        <div className="col-md-4">
                                            <input type="number"
                                                value={this.state.editData.isactive}
                                                name="isactive"
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
    AddModal = () => this.setState({ editData: { id: null, name: "", age: "", isactive: "" } });
    EditModal = (dataObj) => this.setState({ editData:{id:dataObj.id, name: dataObj.name, age: dataObj.age,isactive: dataObj.isactive }});
    Save() {
        let id = this.state.editData.id == null ? 0 : this.state.editData.id;
        let name = this.state.editData.name;
        let age = this.state.editData.age;
        let isActive = this.state.editData.isactive;

        //Validations
        if (name == null || name == undefined || name == "") {
            notification.createNotification("Please enter a name", 'warning');
            return false;
        }
        else if (age == null || age == undefined || age == "" || isNaN(age)) {
            notification.createNotification("Please enter an age", 'warning');
            return false;
        }
        else if (isActive == null || isActive == undefined || isActive == "" || isNaN(isActive)) {
            notification.createNotification("Please enter isActive", 'warning');
            return false;
        }
        //Save Logic
        else {
        let data = { id: id, "name": name, "age": parseInt(age), "isActive": parseInt(isActive) };
        service.Post('api/Test/SaveTest', data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data[0].isSuccess) {
                        this.setState({ test: response.data[1].value, loading: false });
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
        service.Post('api/Test/DeleteTest', data)
            .then(response => {
                if (response.status == 200) {
                    if (response.data[0].isSuccess) {
                        this.setState({ test: response.data[1].value, loading: false });
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





