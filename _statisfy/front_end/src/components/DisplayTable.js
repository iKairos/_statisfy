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
      
      const columnHeader = columns.map(i => {
        return {field: i , headerName: i, width: 140}
      })
      
      const rows = data.map((i, index) => ({id: index, ...i}));

      return (
        <div style={{ height:500, width: '100%' }}>
          {props.checked? (
            <DataGrid
              rows={rows}
              columns={columnHeader}
              pageSize={props.rowNumber}
              rowsPerPageOptions={[props.rowNumber]}
              onSelectionModelChange={props.callbackSetSelectedRows}
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

  const areEqual = (prev, curr) => {
    return JSON.stringify(prev.data) == JSON.stringify(curr.data)
  }

  export const MemoizedTable = React.memo(DisplayTable, areEqual);