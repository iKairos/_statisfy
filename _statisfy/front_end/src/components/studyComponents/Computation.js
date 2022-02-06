import 'katex/dist/katex.min.css'
import PearsonStep from "./PearsonStep";

export default function Computation(props){
  return(
      <div>
        <h3>Computation</h3>

        {
          props.method == "Pearson R Correlation Test" ? 
            <PearsonStep variables={props.variables}/>
          : null
        }
      </div>
  );  
}