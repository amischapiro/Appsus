import { EmailPreview } from "./EmailPreview.jsx"


export function EmailList({ emails,loadEmails }) {


    return (
        
        <section>
            {emails.map(email=><EmailPreview key={email.id} email={email} loadEmails={loadEmails} />)}
        </section>
    )
}