import "../StyleSheets/cardfolder/card.css"
export default function Card(props){

   // const attributes = props.attribute
    return(
        <div className ="card" onClick={()=>props.display(props.title)}>
            
                <h4 className="card_title">{props.title}</h4>
                <div className="card_desc">{props.desc}</div>
                <div className="card_tagcont">{props.attributes.map(i=>{
                  return <div className="card_tags">{i}</div>
                })}</div>

           
        </div>
    ); 
}