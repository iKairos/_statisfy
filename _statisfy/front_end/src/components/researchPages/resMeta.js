import "../../StyleSheets/resmetafolder/resmeta.css"
import { Typography } from "@mui/material";
export default function ResMeta(props){

   // const attributes = props.attribute
    return(
        <div className ="resMeta" >
            <div className="resMeta_table">
                <div className="resMeta_row">
                    <Typography variant ="h6" className="resMeta_title">Usage Information</Typography>
                    <div className="resMeta_content_container">
                        <div className="resMeta_category">
                            <Typography variant="button">License</Typography>
                                <div className="resMeta_content">
                                    <p>Ipsum elit ea minim culpa pariatur cupidatat dolor cupidatat pariatur cillum culpa laboris.</p>
                                </div>
                        </div>
                        <div className="resMeta_category">
                            <Typography variant="button">Visibility</Typography>
                                <div className="resMeta_content">
                                    <p>2</p>
                                </div>
                        </div>
                    </div>
                    
                </div>

                <div className="resMeta_row">
                    <Typography variant ="h6" className="resMeta_title">Maintainers</Typography>
                    <div className="resMeta_content_container">
                        <div className="resMeta_category">
                                <Typography variant="button">Dataset Owner/s</Typography>
                                <div className="resMeta_content">
                                    <p>2</p>
                                </div>
                        </div>
                        
                    </div>
                    
                </div>

                <div className="resMeta_row">
                    <Typography variant ="h6" className="resMeta_title">Updates</Typography>
                    <div className="resMeta_content_container">
                        <div className="resMeta_category">
                            <Typography variant="button">Expected Update Frequency</Typography>
                                <div className="resMeta_content">
                                    <p>2</p>
                                </div>
                        </div>
                        <div className="resMeta_category">
                            <Typography variant="button">Last Updated</Typography>
                                <div className="resMeta_content">
                                    <p>2</p>
                                </div>
                        </div>
                        <div className="resMeta_category">
                            <Typography variant="button">Date Created</Typography>
                                <div className="resMeta_content">
                                    <p>2</p>
                                </div>
                        </div>
                        <div className="resMeta_category">
                                <Typography variant="button">Current Version</Typography>
                                <div className="resMeta_content">
                                    <p>2</p>
                                </div>
                        </div>
                    </div>
                    
                </div>
                


            </div>
        </div>
    ); 
}