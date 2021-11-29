import React from 'react'
import MOCK_DATA from './MOCK_DATA.json'
import '../StyleSheets/table.css'

export const DisplayTable = (props) => {
    var data = props.data;

    if(typeof data === 'undefined'){
      return <h1>.</h1>
    }else{
      if (data.length > 50) {
        data = data.slice(0,50)
      }
      
      const columns = Object.keys(data[1]).map((key, id)=>{
        return key;
      })

      return (
        <table>
          <thead>
              <tr>
                  {
                    columns.map(i => {return <th>{i}</th>})
                  }
              </tr>
          </thead>
          <tbody>
              {
                data.map(i => {
                  return(
                    <tr>
                      {
                        columns.map(col =>{
                          return(
                            <td>{i[col]}</td>
                          )
                        })  
                      }
                    </tr>
                  )
                })
              }
          </tbody>
        </table>
      );
  }};