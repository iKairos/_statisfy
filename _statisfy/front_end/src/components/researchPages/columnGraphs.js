import "../../StyleSheets/resdatafolder/resdata.css"
import { Button } from "@mui/material";
import { Typography, Divider, useMediaQuery } from "@mui/material";



export default function ColumnGraphs(props){
    const matches = useMediaQuery('(min-width:900px)');
   // const attributes = props.attribute
    return(
        <div className ="colCard">
            <div className="colCard_title">
                <Typography variant="h6">Variable Name</Typography>
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
                    
                    <Typography variant="button">Mean:</Typography>
                    <Typography variant="button">Median:</Typography>
                    <Typography variant="button">Min:</Typography>
                    <Typography variant="button">Max:</Typography>
                    <Typography variant="button">std.dev:</Typography>
                    <Typography variant="button">Normality:</Typography>
                    <Typography variant="button">Null Count:</Typography>
                </div>
            </div>
            
               
        </div>
    ); 
}