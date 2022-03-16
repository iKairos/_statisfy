import 'katex/dist/katex.min.css'
import "../../StyleSheets/computationscss/computation.css"
import PearsonComputation from './PearsonRStudy/PearsonComputation';

export default function Computation(props){
  return(
      <div className="Computation_container">

        {
          props.method == "Pearson R Correlation Test" ? 
            <PearsonComputation variables={props.variables}/>
          : null
        }
      </div>
  );  
}