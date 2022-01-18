import "../../StyleSheets/resdatafolder/resdata.css"
import { Button } from "@mui/material";
import { Typography, Divider, useMediaQuery } from "@mui/material";



export default function ColumnGraphs(props){
    const matches = useMediaQuery('(min-width:900px)');
   // const attributes = props.attribute
    return(
        <div className ="colCard">
            <div className="colCard_title">
                <Typography variant="h6">{props.data.column}</Typography>
            </div>
                <Divider/>
            <div className="colCard_content">
                <div className="colCard_graph">
                    Graph Here
                </div>
                <div className="colCard_details">
                    {!matches? 
                        <Divider/> : null
                    }
                    
                    <Typography variant="button">Mean: {props.data.mean}</Typography>
                    <Typography variant="button">Normality: {props.data.distribution}</Typography>
                    <Typography variant="button">Median: {props.data.median}</Typography>
                    <Typography variant="button">Min: {props.data.min}</Typography>
                    <Typography variant="button">Max: {props.data.max}</Typography>
                    <Typography variant="button">std.dev: {props.data.std}</Typography>
                    <Typography variant="button">Null Count: {props.data.null_count} {((props.data.null_count / props.size) * 100).toFixed(2)}%</Typography>
                </div>
            </div>
            
               
        </div>
    ); 
}