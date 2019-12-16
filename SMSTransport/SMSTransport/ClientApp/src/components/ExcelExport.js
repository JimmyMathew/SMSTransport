import React from "react";
import ReactExport from "react-export-excel";
import _ from "underscore";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Download extends React.Component {
  render() {
    var multiDataSet = [];
    var columns = [];
    var data = [];
    var test = {};
      if (this.props.data.length)
      {
          test.columns= _.keys(this.props.data[0]).map((column) => {
              return column.replace(/\b[a-z]/g, (x) => x.toUpperCase())
          });
      
        for (let i = 0; i < this.props.data.length; i++)
        {
        data.push(_.values(this.props.data[i]));
        }
      test.data = data;
      multiDataSet.push(test);
      }
    else {
        
          multiDataSet.columns = columns;
          multiDataSet.data = data;
    }
    return (
        <ExcelFile element={<button className="btn btn-info btn-sm button-gap">Export</button>} filename="SMSReport">
        <ExcelSheet dataSet={multiDataSet} name="Sheet1" />
      </ExcelFile>
    );
  }
}
