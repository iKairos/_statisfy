import 'katex/dist/katex.min.css'
import "../../StyleSheets/computationscss/computation.css"
import PearsonComputation from './PearsonRStudy/PearsonComputation';
import SpearmanComputation from './PearsonRStudy/SpearmanComputation';

export default function Computation(props){
  return(
      <div className="Computation_container">

        {
          props.method == "Pearson R Correlation Test" ? 
            <PearsonComputation variables={props.variables}/>
          : props.method == "Spearman Rho Rank Correlation Test" ? 
            <SpearmanComputation variables={props.variables}/>
          :
          null
        }
      </div>
  );  
}