import "../StyleSheets/studyfolder/study.css"
import GenericStudy from "./studyComponents/GenericStudy";
import LinearStudy from "./studyComponents/LinearRegressionStudy/LinearStudy";
import CorrelationStudy from "./studyComponents/PearsonRStudy/CorrelationStudy";


export default function Study(props){
    console.log(props.data)
    return(
        <>
            {
                props.data['test_type'] == "Pearson R Correlation Test" ? 
                <CorrelationStudy
                    data = {props.data}
                    details = {props.details}
                /> :
                props.data['test_type'] == 'Linear Regression' ? 
                <LinearStudy
                    data = {props.data}
                    details = {props.details}
                />
                : props.data['test_type'] == "Spearman Rho Rank Correlation Test" ? 
                <CorrelationStudy
                    data = {props.data}
                    details = {props.details}
                /> : <GenericStudy
                    data = {props.data}
                    details = {props.details}
                />
            }
        </>
        
    );  
}