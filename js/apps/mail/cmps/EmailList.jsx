import { EmailPreview } from "./EmailPreview.jsx"


export function EmailList({ emails }) {


    return (
        <section>
            <h1>Inbox</h1>
            {emails.map(email=><EmailPreview key={email.id} email={email} />)}
        </section>
    )
}