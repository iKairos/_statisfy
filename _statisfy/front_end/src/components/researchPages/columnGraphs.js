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
                    <div className="colCard_row">
                        <Typography variant="button">Mean:</Typography>
                        <Typography variant="button">{props.data.mean}</Typography>
                    </div>
                    <div className="colCard_row">
                        <Typography variant="button">Normality:</Typography>
                        <Typography variant="button">{props.data.distribution}</Typography>
                    </div>
                    <div className="colCard_row">
                        <Typography variant="button">Normality</Typography>
                        <Typography variant="button">{props.data.distribution}</Typography>
                    </div>
                    <div className="colCard_row">
                        <Typography variant="button">Median:</Typography>
                        <Typography variant="button">{props.data.median}</Typography>
                    </div>
                    <div className="colCard_row">
                        <Typography variant="button">Median:</Typography>
                        <Typography variant="button">{props.data.median}</Typography>
                    </div>
                    <div className="colCard_row">
                        <Typography variant="button">Min:</Typography>
                        <Typography variant="button">{props.data.min}</Typography>
                    </div>
                    <div className="colCard_row">
                        <Typography variant="button">Max:</Typography>
                        <Typography variant="button">{props.data.max}</Typography>
                    </div>
                    <div className="colCard_row">
                        <Typography variant="button">std.dev:</Typography>
                        <Typography variant="button">{props.data.std}</Typography>
                    </div>
                    <div className="colCard_row">
                        <Typography variant="button">Null Count: </Typography>
                        <Typography variant="button">{props.data.null_count} {((props.data.null_count / props.size) * 100).toFixed(2)}%</Typography>
                    </div>
                    
                    
                    
                   
                    
                    
                    
                </div>
            </div>
            
               
        </div>
    ); 
}