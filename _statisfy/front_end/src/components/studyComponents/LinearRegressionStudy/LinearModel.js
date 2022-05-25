import "../../../StyleSheets/linearmodelfolder/linearmodel.css"
import { Typography,Button, Alert, LinearProgress } from "@mui/material";
import TextField from '@mui/material/TextField';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { predictModel } from "../../../actions/researchAction";
import { useDispatch, useSelector } from "react-redux";
const ButtonStyles = makeStyles ({

    icons:{
        color: '#7051b8'
    },
    inputText:{
        fontFamily:'Poppins',
    },
    inputText2:{
        fontFamily:'Poppins',
        fontWeight:'700'
    },
    inputText3:{
        fontFamily:'Poppins',
        fontWeight:'700',
        color: '#7051b8',
    },
    btn:{
        borderRadius: '0.5rem',
        width:'fit-content',
        height:'2.5rem',
        color:'#7051b8',
        backgroundColor:'white',
        fontWeight:'700',
        paddingLeft:'0.5rem',
        paddingRight:'0.5rem',
        fontFamily:'Poppins',
        border:'1px solid #7051b8',
    },
    alert:{
        backgroundColor:'white',
        border:'1px solid #7051b8',
        fontFamily:'Poppins'
    }

  })

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

export default function LinearModel(props){
    const ButtonClasses = ButtonStyles();
    const [features, setFeatures] = useState([]);
    const [hasClicked, setHasClicked] = useState(false);

    const dispatch = useDispatch();

    const fileDetailsSelector = useSelector((state) => 
        state.predictModel
    );

    const {predict_loading, predictRes} = fileDetailsSelector;

    const handlePredict = (e) => {
        dispatch(predictModel({
            'study_id': props.study,
            'model': props.model,
            'features': features
        }));

        setHasClicked(true);
    };

    const handleChange = (i, e) => {
        let values = [...features];
        values[i] = Number(e.target.value);
        setFeatures(values);
    }

    return(
        <ThemeProvider theme={theme}>
            <div className="LinearModel">
                <div className="LinearModel_header">
                    <Typography variant="h6" className={ButtonClasses.inputText3}>Prediction Model</Typography>
                    <Alert 
                        icon={<InfoOutlinedIcon className={ButtonClasses.icons}/>} 
                        className={ButtonClasses.alert} 
                        sx={{marginBottom:"1rem"}}>
                        Fill up the independent variable field/s and click on predict to generate value for the dependent variable.
                    </Alert>
                </div>

                <div className="LinearModel_content">
                    <div className="LinearModel_independent">
                        <div className="LinearModel_independent_header">
                            <Typography className={ButtonClasses.inputText2}>Independent Variable/s</Typography>
                    </div>
                    {
                        props.columns.map((col, i) => {
                            return(
                                <div className="LinearModel_independent_content" key={i}>
                                    <Typography className={ButtonClasses.inputText}>{col}</Typography>
                                    <TextField
                                        hiddenLabel
                                        variant="standard"
                                        InputProps={{
                                            classes: {
                                            input: ButtonClasses.inputText,
                                        }
                                        }}
                                        onChange={e => handleChange(i, e)}
                                    />
                                </div>
                            )
                        })
                    }
                        
                    </div>
                    <div className="LinearModel_dependent">
                        <Typography  className={ButtonClasses.inputText2}>Dependent Variable (Label)</Typography>
                            <Typography className={ButtonClasses.inputText}>{props.label}</Typography>
                            {
                                typeof predictRes === 'undefined' ? 
                                <LinearProgress  color='secondary'/> : 
                                <TextField
                                    hiddenLabel
                                    variant="filled"
                                    label={null}
                                    value = {hasClicked ? predictRes.predicted : null}
                                    className={ButtonClasses.inputText}
                                    InputProps={{
                                        classes: {
                                        input: ButtonClasses.inputText,
                                    },
                                        readOnly: true, 
                                    }}
                                />
                            }
                        {
                            typeof predictRes === 'undefined' ? null : <Button className={ButtonClasses.btn} onClick={handlePredict}>Predict</Button>
                        }
                    </div>
                </div>
            </div>
        </ThemeProvider>
        
    );  
}