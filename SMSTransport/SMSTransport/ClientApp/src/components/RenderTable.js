import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";  



let RenderTable = (props)=> {
    return (
        <div>
            <ReactTable
                data={props.data}
                columns={props.columns}
                defaultPageSize={17}
                pageSizeOptions={[20, 30, 50, 100, 200, 500]}
                filterable
                sortable
            />
        </div>
    );

}

export default RenderTable;