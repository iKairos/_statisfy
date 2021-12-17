import React from 'react'
import  "../../StyleSheets/tablesFolder/tables.css";
//import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export const DataColumns = (props) => {
   
    var data = props.data;
    var columns;

    if(typeof data === 'undefined'){
      return null;
    }else{
      if(props.Header == true){
        columns = Object.keys(data[1]).map((key, id)=>{
          return key;
        })
      }else{
        columns = Object.keys(data[0]).map((key, id)=>{
          return key;
        })
      }
      
     // { field: 'id', headerName: 'ID', width: 70 },
     /*const columnHeader = columns.map(i => {
        return {field: i , headerName: i, width: 100}
      })*/

      const columnHeader = [
         { field: 'columnName', headerName: 'Column Name', width: 140 },
         { field: 'data', headerName: 'Data', width: 140 },
         { field: 'mean', headerName: 'Mean', width: 140 },
         { field: 'std', headerName: 'Standard Deviation', width: 140 },
         { field: 'min', headerName: 'MIN', width: 140 },
         { field: 'max', headerName: 'MAX', width: 140 }
      ]
      //{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
      //const rows = data.map((i, index) => ({id: index, ...i}));
      const columnNames = columns.map(i => {
          return {columnName: i}
      })

      const rows = columnNames.map((i, index) => ({id: index, ...i}));


      return (
        <div style={{ height: 400, width: '100%' }}>
          {props.checked? (
            <DataGrid
              rows={rows}
              columns={columnHeader}
              pageSize={props.rowNumber}
              rowsPerPageOptions={[props.rowNumber]}
              checkboxSelection
            />
          ):(
            <DataGrid
              rows={rows}
              columns={columnHeader}
              pageSize={props.rowNumber}
              rowsPerPageOptions={[props.rowNumber]}
            />
          )}
          
        </div>
      );
  }};