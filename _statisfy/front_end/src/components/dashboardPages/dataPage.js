import { DisplayTable } from "../DisplayTable";


export default function DataPage(props){

 
     return(

        <div className = "data">
            <div className="data_container_display">
                <div className="data_container">
                    <div className="data_header">
                        <h3>Data</h3>
                    </div>
                    <div className="data_upload">
                        <input type="file" name="file" accept=".csv" onChange={(e) => props.ChangeHandler(e)} />
                        <button className="upload_btn"> Clear</button>
                    </div>
                </div>
                <div className="data_container">
                    <div className="data_header">
                        <h3>Data</h3>
                    </div>
                    <div className="data_upload">
                        <input type="file" name="file" accept=".csv" onChange={(e) => props.ChangeHandler(e)} />
                        <button className="upload_btn"> Clear</button>
                    </div>
                </div>
            </div>

            <div className="data_container_table">
                <div className="data_header">
                    Data
                </div>
                <div className="data_table">
                    <DisplayTable data={props.DataArray}/>
                </div>

            </div>
            
        </div>
     ); 
 }