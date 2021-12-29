const { Link } = ReactRouterDOM


export function EmailPreview({email}){
   
   
    return (
        
        <article className="email-preview">
            <h3>{email.subject}</h3> 
            <h5>Delivered to:"{email.to}"</h5>
            <p>{email.body}</p>
            <Link className="clean-link" to={`/email/${email.id}`}>[   ]</Link>
            
        </article>
        

    )
}