import "../../StyleSheets/resmetafolder/resmeta.css"
export default function ResMeta(props){

   // const attributes = props.attribute
    return(
        <div className ="resMeta" >
            <div className="resMeta_table">
                <div className="resMeta_row">
                    <div className="resMeta_title">Usage Information</div>
                    <div className="resMeta_content_container">
                        <div className="resMeta_category">
                                <p>License</p>
                                <div className="resMeta_content">
                                    <p>Ipsum elit ea minim culpa pariatur cupidatat dolor cupidatat pariatur cillum culpa laboris.</p>
                                </div>
                        </div>
                        <div className="resMeta_category">
                                <p>Visibility</p>
                                <div className="resMeta_content">
                                    <p>2</p>
                                </div>
                        </div>
                    </div>
                    
                </div>

                <div className="resMeta_row">
                    <div className="resMeta_title">Maintainers</div>
                    <div className="resMeta_content_container">
                        <div className="resMeta_category">
                                <p>Dataset Owner/s</p>
                                <div className="resMeta_content">
                                    <p>2</p>
                                </div>
                        </div>
                        
                    </div>
                    
                </div>

                <div className="resMeta_row">
                    <div className="resMeta_title">Updates</div>
                    <div className="resMeta_content_container">
                        <div className="resMeta_category">
                                <p>Expected Update Frequency</p>
                                <div className="resMeta_content">
                                    <p>2</p>
                                </div>
                        </div>
                        <div className="resMeta_category">
                                <p>Last Updated</p>
                                <div className="resMeta_content">
                                    <p>2</p>
                                </div>
                        </div>
                        <div className="resMeta_category">
                                <p>Date Created</p>
                                <div className="resMeta_content">
                                    <p>2</p>
                                </div>
                        </div>
                        <div className="resMeta_category">
                                <p>Current Version</p>
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