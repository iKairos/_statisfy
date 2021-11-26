
export default function Navigator(props){

    // const attributes = props.attribute
 
     return(
        <div className="dashboard_btn_cont">
            <div className="dashboard_btn_div">
                <button className="dashboard_btn" disabled={props.prevDisabled} onClick={props.PrevScreen}> previous</button>
            </div>
            <div className="dashboard_btn_div">
                <button className="dashboard_btn" disabled={props.nextDisabled} onClick={props.NextScreen}> next</button>
            </div>
        </div>
     ); 
 }