import "../StyleSheets/studyfolder/study.css"
import LinearStudy from "./studyComponents/LinearRegressionStudy/LinearStudy";
import PearsonRStudy from "./studyComponents/PearsonRStudy/PearsonRStudy";


export default function Study(props){
    console.log(props)
    return(
        <>
            <PearsonRStudy
                data = {props.data}
            />
            <LinearStudy
                data = {props.data}
            />
        </>
        
    );  
}