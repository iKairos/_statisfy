
import "../StyleSheets/researchfolder/research.css"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


export default function ResearchScreen(){
    const [value, setValue] = React.useState('one');
    const [contentPage, setContentPage] = React.useState('one');

    const switchTabs = (event, newValue) => {
        setValue(newValue);
    };

    const switchContentPage = (event, newValue) => {
        setContentPage(newValue);
    };
    return(
        <div className = "research">
            <div className = "research_container research_header">
                <div className = "research_header_display">
                    <span className ="text_title">Lorem Ipsum</span>
                    <p className ="text_label">RESEARCH TITLE</p>
                    <span className = "text_content">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infan
                    </span>
                </div>
                <div className = "research_header_tabs">
                    <Box sx={{ width: '100%' }}>
                        <Tabs
                            value={value}
                            onChange={switchTabs}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value="one" label="Computation" />
                            <Tab value="two" label="Interpretation" />
                        </Tabs>
                    </Box>
                </div>
            </div>
            {value === "one" &&
            <div className="research_container research_body">
                <div className = "research_body_header">
                    <span className ="text_topic">Pearson R Correlation Test</span>
                    <p className ="text_label">STATISTICS</p>

                <Box sx={{ width: '100%' }}>
                    <Tabs
                        value={contentPage}
                        onChange={switchContentPage}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="one" label="Dataset" />
                        <Tab value="two" label="Graphs" />
                        <Tab value="three" label="Results" />
                    </Tabs>
                </Box>
                </div>
                
            </div>
            }

            {value === "two" &&
            <div className="research_container research_body">
                <div className = "research_body_header">
                    <span className ="text_topic">Interpretation of the Results</span>
                    <p className ="text_label">SUMMARY</p>
                </div>
            </div>
            }
            
        </div>
    );
}