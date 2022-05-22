import React from 'react'
//import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
const theme = createTheme({
    palette: {
        primary: {
        main: '#7051b8',
        },
        secondary: {
        main: '#7051b8',
        },
    },
    });


export const ColumnTable = (props) => {

    var data = props.data;
    const column = [
        { field: 'variable', headerName: 'Variables', width: 200 }
    ];
    const rows = data.map((i, index) => ({id: index, variable: i}));
    

    
    
    return (
    <ThemeProvider theme={theme}>
        <div style={{ height:400, width: '100%' }}>
            {props.checked? (
                <DataGrid
                rows={rows}
                columns={column}
                checkboxSelection
                pageSize={props.rowNumber}
                rowsPerPageOptions={[props.rowNumber]}
                onSelectionModelChange={props.handleSelection}
                />
            ):(
                <DataGrid
                rows={rows}
                columns={column}
                pageSize={props.rowNumber}
                rowsPerPageOptions={[props.rowNumber]}
                onSelectionModelChange={props.handleSelection}

                />
            )}
        </div>
    </ThemeProvider>
    
    );
  };

  export const MemoizedColumnTable = React.memo(ColumnTable);