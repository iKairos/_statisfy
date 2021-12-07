import React from 'react'
import MOCK_DATA from './MOCK_DATA.json'
import  "../StyleSheets/tablesFolder/tables.css";

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

      return (
        <div className="table_width">
        <table>
          <thead>
              <tr>
                  {
                    props.Header? (
                      columns.map(i => {return <th className="column_table_header">{i}</th>})
                    ): (
                      
                      columns.map(i => {return (
                        <th className="column_table_header"><input type="text" className="table_input" placeholder="Column"></input></th>
                      )})
                    )
                   
                  }
              </tr>
          </thead>
          <tbody>
            {
              !props.Header? (
                <tr>
                  {
                    columns.map(i => {return <td className="column_table_content">{i}</td>})
                  }
                </tr>
                
              ):null
            }
              {
                data.map(i => {
                  return(
                    <tr>
                      {
                        columns.map(col =>{
                          return(
                            <td className="column_table_content">{i[col]}</td>
                          )
                        })  
                      }
                    </tr>
                  )
                })
              }
          </tbody>
        </table>
        </div>
      );
  }};