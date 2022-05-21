import { func } from "prop-types";
import { MLTechniques } from "../../../static/statMethods";
import Card from "../../Card";
import { useState } from "react";
import { Alert, InputAdornment} from "@mui/material";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import "../../../StyleSheets/cardfolder/card.css"
import { Typography } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import { IconButton, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import PercentIcon from '@mui/icons-material/Percent';
import LoopIcon from '@mui/icons-material/Loop';

import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
    palette: {
      primary: {
        main: '#7051b8',
      },
      secondary: {
        main: '#7051b8',
      },
    },
  });

export default function MachineLearningChoices(props){
    const filtered = MLTechniques.filter(([name, tags]) => {
        return props.tags.every(tag => tags.includes(tag))
    })

    const [isClicked, setClicked] = useState(true);

    const handleHighlight = function(highlight){
        setClicked(highlight);
    }

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const [testing, setTesting] = useState(30);
    const [iteration, setIteration] = useState(1000);
    const [learning, setLearning] = useState(0.05);

    const handleTesting = (event) => {
        props.setCallbackTestSize(event.target.value);
    };

    const handleIteration = (event) => {
        props.setCallbackIteration(event.target.value);
    };

    const handleLearning = (event) => {
        props.setCallbackLearningRate(event.target.value);
    }

    return(
        <div className="ChoicesCont">
            <ThemeProvider theme={theme}>
            <Alert icon={props.chosen !== "" ? <CheckCircleOutlineOutlinedIcon/> : <AnalyticsIcon/>} color="secondary" sx={{marginBottom:"1rem", marginTop:"2rem"}}>
                <div style={{display:"flex", flexDirection:"row", gap:"0.5rem"}}>
                    Select Machine Learning Technique 
                
                </div>
                
                
            </Alert>
            <div className="statContainer">
                <div className="statContainer_sub">
                    <Typography>Recommended</Typography>
                    {
                        filtered.length !== 0 ? filtered.map(([method, tags]) => {
                            return <Card title={method}  display={props.display} Chosen={props.chosen} isFiltered = {true} handleHighlight = {handleHighlight} isClicked = {isClicked} />
                        }) : <Typography>No recommendation</Typography>
                    }
                </div>
                <div className="statContainer_sub">
                    <Typography>All Methods</Typography>
                    {
                        MLTechniques.map(([method,tags]) => {
                            return <Card title={method} display={props.display} Chosen={props.chosen} isFiltered = {false} handleHighlight = {handleHighlight} isClicked = {isClicked}/>
                        })
                    }
                </div>
            </div>

            {props.chosen !== "" &&
                <div className="statContainer_details">
                    <div className="statContainer_details_contents">
                        <Typography fontWeight={600}>
                            {props.chosen}
                        </Typography>
                        <Typography>
                            loremMinim exercitation dolor duis sunt in velit. loremMinim exercitation dolor duis sunt in velit.
                        </Typography>
                    </div>
                    <div className="statContainer_details_contents">
                        <div className="statContainer_details_contents_header">
                            <Typography fontWeight={600}>Configurations</Typography>
                            <IconButton
                                sx={{position:"absolute", right:0, top : 0}}
                                onClick={handleToggle}
                            >
                            <SettingsIcon color="secondary"/>
                            </IconButton>
                        </div>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open}
                        >
                            <div className="statContainer_details_contents_backdrop_container">
                                <Typography variant="h6">Configuration</Typography>
                                <div className="statContainer_details_contents_backdrop">
                                    <Typography> Train Test Split</Typography>
                                    
                                    <div style={{display:"flex", flexDirection:"row", gap:"0.25rem"}}>
                                        <TextField
                                        id="outlined-helperText"
                                        label="Test Size (in percent)"
                                        type="Number"
                                        value={props.callbackTestSize}
                                        onChange={handleTesting}
                                        color="secondary"
                                        InputProps={
                                            {
                                                endAdornment: (
                                                    <InputAdornment position="end"> 
                                                        <PercentIcon fontSize="small" color="secondary"/>
                                                    </InputAdornment>
                                                )
                                            }
                                        }
                                        />

                                    </div>
                                    <Typography> Iterations</Typography>
                                    <TextField
                                        id="outlined-helperText"
                                        type="Number"
                                        label="Iterations"
                                        value={props.callbackIteration}
                                        color="secondary"
                                        onChange={handleIteration}
                                        InputProps={
                                            {
                                                endAdornment: (
                                                    <InputAdornment position="end"> 
                                                        <LoopIcon fontSize="small" color="secondary"/>
                                                    </InputAdornment>
                                                )
                                            }
                                        }
                                    />
                                    <Typography> Learning Rate</Typography>
                                    <TextField
                                        id="outlined-helperText"
                                        type="Number"
                                        label="alpha"
                                        value={props.callbackLearningRate}
                                        color="secondary"
                                        onChange={handleLearning}
                                        InputProps={
                                            {
                                                endAdornment: (
                                                    <InputAdornment position="end"> 
                                                        <Typography color="secondary">α</Typography>
                                                    </InputAdornment>
                                                )
                                            }
                                        }
                                    />
                                </div>
                                <div 
                                    style={{
                                        display:"flex", 
                                        flexDirection:"row", 
                                        position:"absolute",
                                        right: 5,
                                        bottom: 5,
                                        }}
                                    >
                                    <Button color="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </Backdrop>

                        <div className="statContainer_details_contents_divider">
                        <Typography>Training Dataset Size</Typography>
                        <Typography>{100-Number(props.callbackTestSize)}%</Typography>
                        <Typography>Test Dataset Size</Typography>
                        <Typography>{props.callbackTestSize}%</Typography>
                        <Typography> Iterations</Typography>
                        <Typography>{props.callbackIteration}</Typography>
                        <Typography> Learning Rate</Typography>
                        <Typography>{props.callbackLearningRate}</Typography>
                        </div>
                    </div>

                </div>
            }
            </ThemeProvider>
            
            
        </div>
        
    )
}