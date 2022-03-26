import "../StyleSheets/studyfolder/study.css"
import LinearStudy from "./studyComponents/LinearRegressionStudy/LinearStudy";
import PearsonRStudy from "./studyComponents/PearsonRStudy/PearsonRStudy";


export default function Study(props){
    console.log(props)
    return(
        <>
            {
                props.data[5] == 'Pearson R Correlation Test' ? 
                <PearsonRStudy
                    data = {props.data}
                />
                : props.data[5] == 'Linear Regression' ?
                <LinearStudy
                    data = {props.data}
                /> : null
            }
        </>
        
    );  
}