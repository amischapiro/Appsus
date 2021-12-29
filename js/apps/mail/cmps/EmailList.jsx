import { EmailPreview } from "./EmailPreview.jsx"


export function EmailList({ emails }) {


    return (
        <section>
            {emails.map(email=><EmailPreview key={email.id} email={email} />)}
        </section>
    )
}