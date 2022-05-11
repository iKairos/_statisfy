import "../../StyleSheets/NewCSSFiles/researchFolder/ResearchScreen.css"


import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { IconButton, Typography } from "@mui/material";
import { CircularProgress } from '@mui/material';

import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import TimelineIcon from '@mui/icons-material/Timeline';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DetailsIcon from '@mui/icons-material/Details';
import DescriptionIcon from '@mui/icons-material/Description';


import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import DownloadSharpIcon from '@mui/icons-material/DownloadSharp';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";

import { DisplayTable, MemoizedTable } from "../../components/DisplayTable";
import { DataColumns } from "./dataColumns";
import { formatBytes } from '../../utils';
import { useDispatch, useSelector } from "react-redux";
import { processDataset } from "../../actions/datasetActions";

import ColumnGraphs, { MemoizedColumnGraphs } from "./columnGraphs";
import { styled } from '@mui/material/styles';
//<span className ="text_topic">{researchGetRes?.data.test_type}</span>

const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 20,
      width: '100%',
      backgroundColor: '#7051b8',
    },
    
  });
  
  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(16),
      marginRight: theme.spacing(1),
      color: '#b5b5b5',
      '&.Mui-selected': {
        color: '#7051b8',
      },
      '&.Mui-focusVisible': {
        backgroundColor: '#000',
      },
    }),
  );


export default function ResData(props){
    
    const [contentPage, setContentPage] = useState(1);

    const nextContent = function(){
        setContentPage(contentPage+1);
    };
    const prevContent = function(){
        setContentPage(contentPage-1);
    };
    const switchContentPage = (event, newValue) => {
        setContentPage(newValue);
    };

    return(
        <div className="ResearchData">
                
          <div className="ResearchData_tabs">
              <Box sx = {{ 
                  minWidth: 100,
                  width: '1fr'
                  }}>
                  <StyledTabs
                      value={contentPage}
                      onChange={switchContentPage}
                      textColor="secondary"
                      indicatorColor="secondary"
                      aria-label="scrollable tabs"
                      variant="scrollable"
                      scrollButtons="auto"
                      orientation="vertical"
                      visibleScrollbar
                  >
                      <StyledTab value={1} label="Description" icon={<DescriptionIcon  fontSize='inherit'/>}  iconPosition="start"/>
                      <StyledTab value={2} label="Data" icon={<TimelineIcon  fontSize='inherit'/>} iconPosition="start"/>
                      <StyledTab value={3} label="Columns" icon={<ViewColumnIcon  fontSize='inherit'/>} iconPosition="start"/>
                      <StyledTab value={4} label="Details" icon={<DetailsIcon  fontSize='inherit'/>} iconPosition="start"/>
                  </StyledTabs>
              </Box>
          </div>
          
              {contentPage === 1 &&
                <div className="ResearchData_content">
                  <div className="ResearchData_content_header">
                      <h5 className = "ResearchScreenText_datasetDesc_Title">
                          Dataset Description
                      </h5>
                  </div>
                  <div className="ResearchData_content_desc">
                      <h6 className = "ResearchScreenText_datasetDesc_Title"> Context</h6>
                      <p className = "ResearchScreenText_datasetDesc">
                          This Dataset ChuChu
                      </p>
                      <h6 className = "ResearchScreenText_datasetDesc_Title"> Content</h6>
                      <p className = "ResearchScreenText_datasetDesc">
                          This Dataset ChuChu
                      </p>
                      <h6 className = "ResearchScreenText_datasetDesc_Title"> Acknowledgements</h6>
                      <p className = "ResearchScreenText_datasetDesc">
                          This Dataset ChuChu
                      </p>
                  </div>
                  
                </div>
              }
              {contentPage === 2 &&
                <div className="ResearchData_content">
                  <div className="ResearchData_content_header">
                    <h5 className = "ResearchScreenText_datasetDesc_Title">
                      {props.DataSetFile ? `${props.DataSetFile?.filename.slice(9,)} (${formatBytes(props.DataSetFile?.filesize)})` : <CircularProgress color="secondary" thickness={2.5} size={30}/>}
                    </h5>
                  </div>
                      {typeof props.DataSetFile !== 'undefined' ? 
                        <MemoizedTable 
                            data={props.DataSetFile.data} 
                            Header={true} 
                            rowNumber={15}
                            checked={false}
                        /> : <CircularProgress color="secondary" thickness={2.5} size={30}/>
                      }
                </div>
              }
              {contentPage === 3 &&
                 <div className="ResearchData_content">
                   <div className="ResearchData_columns">
                    {
                        typeof props.DatasetDetails?.details !== "undefined" ? (
                            props.DatasetDetails?.details.map( data => {
                                return <MemoizedColumnGraphs size={props.DatasetDetails.rows} data={data}/>
                            })
                        ) : <CircularProgress color="secondary" thickness={2.5} size={30}/>
                    }
                   </div>
                    
                </div>
              }
              {contentPage === 4 &&
                <div className="ResearchData_content">
                  <div className="ResearchData_content_header">
                    <h5 className = "ResearchScreenText_datasetDesc_Title">
                      Dataset Details
                    </h5>
                  </div>
                  <div className = "ResearchData_info">
                      <Typography  variant="button" ><InsertDriveFileOutlinedIcon/>File Name</Typography>
                      <Typography variant="subtitle2" >{props.DataSetFile ? `${props.DataSetFile?.filename.slice(9,)}` : <CircularProgress color="secondary" thickness={2.5} size={30}/>}</Typography>

                      <Typography variant="button" ><UploadFileOutlinedIcon />File Size</Typography>
                      <Typography variant="subtitle2" >{props.DataSetFile && formatBytes(props.DataSetFile?.filesize)}</Typography>

                      <Typography variant="button" ><ViewColumnOutlinedIcon />Columns</Typography>
                      <Typography variant="subtitle2" >{typeof props.DatasetDetails?.columns !== 'undefined' ? `${props.DatasetDetails?.columns} columns`: ""}</Typography>

                      <Typography variant="button" ><TableRowsOutlinedIcon />Rows</Typography>
                      <Typography variant="subtitle2">{typeof props.DatasetDetails?.rows !== 'undefined' ? `${props.DatasetDetails?.rows} rows`: ""}</Typography>
                  </div>
                </div>
            }
            </div>
        
       
    );
}