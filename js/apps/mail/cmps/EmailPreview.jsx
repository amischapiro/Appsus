const { Link } = ReactRouterDOM


export function EmailPreview({email}){
   
   
    return (
        
        <article className="email-preview">
            <h3>{email.subject}</h3> 
            {email.from && <h5>From:"{email.from}"</h5>}
            {email.to && <h5>To:"{email.to}"</h5>}
            <p>{email.body}</p>
            <Link className="clean-link" to={`/email/${email.id}`} >[   ]</Link>
            {email.isRead && <img src="../../assets/img/read-icon.png" /> }
            {!email.isRead && <img src="../../assets/img/unread-icon.png" /> }
            
        </article>
        

    )
}