import { statMethods } from "../static/statMethods";
import Card from "./Card";

export default function AllCards(props){
    const filtered = statMethods.filter(([name, tags]) => {
        return props.tags.every(tag => tags.includes(tag))
    })

    return(
        <div className="upload_body">
            {
                filtered.length !== 0 ? filtered.map(([method, tags]) => {
                    return <Card title={method} desc="desc" attributes={tags}/>
                }) : <h1>Oops, nothing here!</h1>
            }
        </div>
    )
}