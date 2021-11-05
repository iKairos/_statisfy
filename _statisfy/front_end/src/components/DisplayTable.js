import React, {useMemo} from 'react'
import {useTable} from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import '../StyleSheets/table.css'




export const DisplayTable = () => {
    const data = useMemo(() => MOCK_DATA, []);
    const columns = useMemo(() => Object.keys(data[1]).map((key, id)=>{
          return {
            Header: key,
            accessor: key
          }
        }, [data]))
        
    console.log(columns);
  
    const tableInstance = useTable({
      columns,
      data
    });
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = tableInstance;
  
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };