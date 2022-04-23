import "../../../StyleSheets/linearmodelfolder/linearmodel.css"
import { Typography,Button } from "@mui/material";
import TextField from '@mui/material/TextField';




export default function LinearModel(props){
    
  return(
      <div className="LinearModel">
          <div className="LinearModel_header">
              <Typography>Prediction Model</Typography>
              <Button>Predict</Button>

          </div>
          <div className="LinearModel_content">
                <div className="LinearModel_independent">
                    <div className="LinearModel_independent_header">
                        <Typography>Independent Variable/s</Typography>
                    </div>
                    <div className="LinearModel_independent_content">
                        <Typography>variable</Typography>
                        <TextField/>
                    </div>
                    
                </div>
                <div className="LinearModel_dependent">
                    <Typography>Dependent Variable (Label)</Typography>
                </div>

          </div>
      </div>
  );  
}