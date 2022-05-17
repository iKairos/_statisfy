import "../../../StyleSheets/linearmodelfolder/linearmodel.css"
import { Typography,Button, Alert } from "@mui/material";
import TextField from '@mui/material/TextField';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
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
  return(
      <ThemeProvider theme={theme}>
        <div className="LinearModel">
            <div className="LinearModel_header">
                <Typography variant="h6" className={ButtonClasses.inputText3}>Prediction Model</Typography>
                <Alert 
                    icon={<InfoOutlinedIcon className={ButtonClasses.icons}/>} 
                    className={ButtonClasses.alert} 
                    sx={{marginBottom:"1rem"}}>
                    Fill up the independent variable field/s and click on predict to generate value for the dependent varialbe
                </Alert>

            </div>
            <div className="LinearModel_content">
                    <div className="LinearModel_independent">
                        <div className="LinearModel_independent_header">
                            <Typography className={ButtonClasses.inputText2}>Independent Variable/s</Typography>
                        </div>
                        <div className="LinearModel_independent_content">
                            <Typography className={ButtonClasses.inputText}>variable</Typography>
                            <TextField
                                hiddenLabel
                                variant="standard"
                                InputProps={{
                                    classes: {
                                    input: ButtonClasses.inputText,
                                },
                                }}
                            />
                        </div>
                        <div className="LinearModel_independent_content">
                            <Typography className={ButtonClasses.inputText}>variable</Typography>
                            <TextField
                                hiddenLabel
                                variant="standard"
                                InputProps={{
                                    classes: {
                                    input: ButtonClasses.inputText,
                                },
                                }}
                            />
                        </div>
                        <div className="LinearModel_independent_content">
                            <Typography className={ButtonClasses.inputText}>variable</Typography>
                            <TextField
                                hiddenLabel
                                variant="standard"
                                InputProps={{
                                    classes: {
                                    input: ButtonClasses.inputText,
                                },
                                }}
                            />
                        </div>
                        
                    </div>
                    <div className="LinearModel_dependent">
                        <Typography  className={ButtonClasses.inputText2}>Dependent Variable (Label)</Typography>
                            <Typography className={ButtonClasses.inputText}>variable</Typography>
                            <TextField
                                hiddenLabel
                                variant="filled"
                                label={null}
                                value = "insert predicted value here"
                                className={ButtonClasses.inputText}
                                InputProps={{
                                    classes: {
                                    input: ButtonClasses.inputText,
                                },
                                    readOnly: true, 
                                }}
                            />
                        <Button className={ButtonClasses.btn}>Predict</Button>
                    </div>

            </div>
        </div>
      </ThemeProvider>
      
  );  
}