import { func } from "prop-types";
import { MLTechniques } from "../../../static/statMethods";
import Card from "../../Card";
import { useState } from "react";
import { Alert} from "@mui/material";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import "../../../StyleSheets/cardfolder/card.css"
import { Typography } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import { IconButton, Button } from "@mui/material";
import TextField from '@mui/material/TextField';

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

    const [training, setTraining] = useState(10);
    const [validation, setValidation] = useState(20);
    const [testing, setTesting] = useState(70);
    const [iteration, setIteration] = useState(1000);
    const [learning, setLearning] = useState(0.5);

    return(
        <div className="ChoicesCont">
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
                            <SettingsIcon/>
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
                                        label="Training"
                                        value={training}
                                        onChange={(e) => setTraining(e.target.value)}
                                        />
                                        <TextField
                                        id="outlined-helperText"
                                        label="Validation"
                                        value={validation}
                                        onChange={(e) => setValidation(e.target.value)}
                                        />
                                        <TextField
                                        id="outlined-helperText"
                                        label="Testing"
                                        value={testing}
                                        onChange={(e) => setTesting(e.target.value)}
                                        />

                                    </div>
                                    <Typography> Iterations</Typography>
                                    <TextField
                                        id="outlined-helperText"
                                        label="Iterations"
                                        value={iteration}
                                        onChange={(e) => setIteration(e.target.value)}
                                    />
                                    <Typography> Learning Rate</Typography>
                                    <TextField
                                        id="outlined-helperText"
                                        label="alpha"
                                        value={learning}
                                        onChange={(e) => setLearning(e.target.value)}
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
                                    <Button onClick={handleClose}>
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </Backdrop>

                        <div className="statContainer_details_contents_divider">
                        <Typography> Train Test Split</Typography>
                        <Typography>{training}|{validation}|{testing}</Typography>
                        <Typography> Iterations</Typography>
                        <Typography>{iteration}</Typography>
                        <Typography> Learning Rate</Typography>
                        <Typography>{learning}</Typography>
                        </div>
                    </div>

                </div>
            }
            
        </div>
        
    )
}