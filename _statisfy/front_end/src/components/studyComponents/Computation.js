import 'katex/dist/katex.min.css'
import PearsonStep from "./PearsonStep";
import "../../StyleSheets/computationscss/computation.css"

export default function Computation(props){
  return(
      <div className="Computation_container">

        {
          props.method == "Pearson R Correlation Test" ? 
            <PearsonStep variables={props.variables}/>
          : null
        }
      </div>
  );  
}