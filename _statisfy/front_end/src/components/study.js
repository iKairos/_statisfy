import "../StyleSheets/studyfolder/study.css"
import LinearStudy from "./studyComponents/LinearRegressionStudy/LinearStudy";
import PearsonRStudy from "./studyComponents/PearsonRStudy/PearsonRStudy";


export default function Study(props){
    console.log(props.data)
    return(
        <>
            {
                props.data['test_type'] == "Pearson R Correlation Test" ? 
                <PearsonRStudy
                    data = {props.data}
                    details = {props.details}
                /> :
                props.data['test_type'] == 'Linear Regression' ? 
                <LinearStudy
                    data = {props.data}
                    details = {props.details}
                />
                : null
            }
        </>
        
    );  
}