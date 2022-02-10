
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Typography } from '@mui/material';

import { useState } from 'react';

export default function CleaningOptions(props) {
    const [nullCleaning, setCleaning] = useState('nothing');
    const handleCleaning = (event) => {
        setCleaning(event.target.value);
        const current_option = []
        
        props.CleanOptions.forEach(option => {
            const o = option;
            if(o.column === props.Variable){
                o['null_option']['method'] = event.target.value;
            }

            current_option.push(o);
        })
 
        props.CallbackColumnOptions(
            current_option
        )
    };
    const [nullReplace, setNullReplace] = useState('mean');
    const handleNullReplace = (event) => {
        setNullReplace(event.target.value);
        const current_option = []
        
        props.CleanOptions.forEach(option => {
            const o = option;
            if(o.column === props.Variable){
                o['null_option']['replace_by'] = event.target.value;
            }

            current_option.push(o);
        })
 
        props.CallbackColumnOptions(
            current_option
        )
    };

    const [outlierCleaning, setOutlier] = useState('nothing');
    const handleOutlier = (event) => {
        setOutlier(event.target.value);
        const current_option = []
        
        props.CleanOptions.forEach(option => {
            const o = option;
            if(o.column === props.Variable){
                o['outlier_option']['method'] = event.target.value;
            }

            current_option.push(o);
        })
 
        props.CallbackColumnOptions(
            current_option
        )
    };
    const [outlierReplace, setOutlierReplace] = useState('mean');
    const handleOutlierReplace = (event) => {
        setOutlierReplace(event.target.value);
        const current_option = []
        
        props.CleanOptions.forEach(option => {
            const o = option;
            if(o.column === props.Variable){
                o['outlier_option']['replace_by'] = event.target.value;
            }

            current_option.push(o);
        })
 
        props.CallbackColumnOptions(
            current_option
        )
    };

  return (
      <div className="resUpload_cleaning_container">
          <div className="resUpload_cleaning_variable">
              <Typography>{props.Variable}</Typography>
          </div>
          <div className="resUpload_cleaning">
            <FormControl component="fieldset">
                <FormLabel component="legend" color="secondary">Null Values</FormLabel>
                <RadioGroup
                    aria-label="gender"
                    name="controlled-radio-buttons-group"
                    value={nullCleaning}
                    onChange={handleCleaning}
                    color="secondary"
                >
                    <FormControlLabel value="delete" control={<Radio color="secondary"/>} label="Delete Rows" color="secondary" />
                    <FormControlLabel value="replace" control={<Radio color="secondary"/>} label="Replace Value"  color="secondary"/>
                        {nullCleaning === "replace" ?
                            <FormControl component="fieldset" sx={{paddingLeft:"1rem"}}>
                                <FormLabel component="legend" color="secondary">Replace Null Values with:</FormLabel>
                                <RadioGroup
                                    aria-label="gender"
                                    name="controlled-radio-buttons-group"
                                    value={nullReplace}
                                    onChange={handleNullReplace}
                                    color="secondary"
                                >
                                    <FormControlLabel value="mean" control={<Radio color="secondary"/>} label="Mean" color="secondary" />
                                    <FormControlLabel value="median" control={<Radio color="secondary"/>} label="Median"  color="secondary"/>
                                    <FormControlLabel value="mode" control={<Radio color="secondary"/>} label="Mode" color="secondary"/>
                                </RadioGroup>
                            </FormControl>
                            :null
                        }
                        

                    <FormControlLabel value="nothing" control={<Radio color="secondary"/>} label="Do Nothing" color="secondary"/>
                </RadioGroup>
            </FormControl>
            <FormControl component="fieldset">
                <FormLabel component="legend" color="secondary">Outliers</FormLabel>
                <RadioGroup
                    aria-label="gender"
                    name="controlled-radio-buttons-group"
                    value={outlierCleaning}
                    onChange={handleOutlier}
                    color="secondary"
                >
                    <FormControlLabel value="delete" control={<Radio color="secondary"/>} label="Delete Rows" color="secondary" />
                    <FormControlLabel value="replace" control={<Radio color="secondary"/>} label="Replace Value"  color="secondary"/>
                    {outlierCleaning === "replace"?
                        <FormControl component="fieldset" sx={{paddingLeft:"1rem"}}>
                            <FormLabel component="legend" color="secondary">Replace Null Values with:</FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                name="controlled-radio-buttons-group"
                                value={outlierReplace}
                                onChange={handleOutlierReplace}
                                color="secondary"
                            >
                                <FormControlLabel value="mean" control={<Radio color="secondary"/>} label="Mean" color="secondary" />
                                <FormControlLabel value="median" control={<Radio color="secondary"/>} label="Median"  color="secondary"/>
                                <FormControlLabel value="mode" control={<Radio color="secondary"/>} label="Mode" color="secondary"/>
                            </RadioGroup>
                        </FormControl> : null
                    }
                        
                    
                    
                    <FormControlLabel value="nothing" control={<Radio color="secondary"/>} label="Do Nothing" color="secondary"/>
                </RadioGroup>
            </FormControl>
        </div>

      </div>
    
  );
}
