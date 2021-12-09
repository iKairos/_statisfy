import React from 'react'
import MOCK_DATA from './MOCK_DATA.json'
import  "../StyleSheets/tablesFolder/tables.css";
//import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export const DisplayTable = (props) => {
   
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

      const columnHeader = columns.map(i => {
        return {field: i , headerName: i, width: 70}
      })
      //{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
      //i.id = index;
      const rows = data.map((i, index) => ({id: index, ...i}));


      return (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columnHeader}
            pageSize={props.rowNumber}
            rowsPerPageOptions={[props.rowNumber]}
            checkboxSelection
          />
        </div>
      );
  }};