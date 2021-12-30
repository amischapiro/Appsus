import { EmailPreview } from "./EmailPreview.jsx"


export function EmailList({ emails,loadEmails }) {

    if(!emails.length) return <h1 className="no-emails" >No emails to show</h1>
    return (
        
        <section>
            {emails.map(email=><EmailPreview key={email.id} email={email} loadEmails={loadEmails} />)}
        </section>
    )
}