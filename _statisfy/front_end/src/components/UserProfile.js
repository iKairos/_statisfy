

export default function UserProfile(props){
    const stringifyDatetime = datetime => {
        const d = new Date(datetime).toLocaleString('en-US', {
            timeZone: 'Asia/Manila'
            });

        //return `${d.getMonth()}/${d.getDay()}/${d.getFullYear()} ${d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
        return d
    }

    return(
        <div style={{minHeight:"5rem"}}>
            <h1>{props.user.first_name} {props.user.last_name}</h1>
            <p>UID: {props.user._id}</p>
            <p>Username: {props.user.username}</p>
            <p>Email: {props.user.email_address}</p>
            <p>Registered since: {stringifyDatetime(props.user.created_at)}</p>
        </div>
    ); 
}