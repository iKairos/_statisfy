import { func } from "prop-types";
import { statMethods } from "../../../static/statMethods";
import Card from "../../Card";
import { useState } from "react";


import "../../../StyleSheets/cardfolder/card.css"
import { Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import StatConfig from "./statConfig";

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

  const ButtonStyles = makeStyles ({
    icons:{
        color: '#7051b8'
    },
    alert:{
        backgroundColor:'white',
        border:'1px solid #7051b8',
        fontFamily:'Poppins'
    },
    text:{
        fontFamily:'Poppins'
    }
    })

export default function StatisticalChoices(props){
    const ButtonClasses = ButtonStyles();
    const filtered = statMethods.filter(([name, tags]) => {
        return props.tags.every(tag => tags.includes(tag))
    })

    const [isClicked, setClicked] = useState(true);

    const handleHighlight = function(highlight){
        setClicked(highlight);
    }

    return(
        <div className="statContainer">
            <ThemeProvider theme={theme}>
                <div className="statContainer_sub">
                    <Typography className={ButtonClasses.text}>Recommended</Typography>
                    {
                        filtered.length !== 0 ? filtered.map(([method, tags]) => {
                            return <Card title={method}  display={props.display} Chosen={props.chosen} isFiltered = {true} handleHighlight = {handleHighlight} isClicked = {isClicked} />
                        }) : <Typography className={ButtonClasses.text}>No recommendation</Typography>
                        
                    }
                    <Typography className={ButtonClasses.text}>All Methods</Typography>
                    {
                        statMethods.map(([method,tags]) => {
                            return <Card title={method} display={props.display} Chosen={props.chosen} isFiltered = {false} handleHighlight = {handleHighlight} isClicked = {isClicked}/>
                        })
                    }
                    
                    </div>
                <div className="statContainer_sub">
                    <Typography className={ButtonClasses.text}>Configurations</Typography>
                    <StatConfig
                        studyColumns = {props.studyColumns}
                        chosen = {props.chosen}
                    />

                </div>
            </ThemeProvider>
            

           
        </div>
    )
}