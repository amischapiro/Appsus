import { EmailList } from "../cmps/EmailList.jsx"
import { emailService } from "../services/email.service.js"
import { Loader } from "../../../cmps/Loader.jsx"
import { EmailFilter } from "../cmps/EmailFilter.jsx"
import { EmailCtgs } from "../cmps/EmailCtgs.jsx"
import { EmailDetails } from "../cmps/EmailDetails.jsx"

const { Route, Switch } = ReactRouterDOM;

export class EmailApp extends React.Component {
    state = {
        emails: [],
        filterBy: null,
        unread: null
    }
    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        const { filterBy } = this.state
        emailService.query(filterBy).then(emails => {
            this.setState({ emails })
        })
        setTimeout(() => {
            this.updateUnread()
        }, 10);
    }

    updateUnread = () => {
        const unread = this.state.emails.filter(email => {
            return !email.isRead
        })
        this.setState({ unread: unread.length })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails)
    }



    render() {

        const { emails, filterBy, unread } = this.state
        if (!emails) return <Loader/>
        return (
            <section className="email-app">
                <div><EmailCtgs filterBy={filterBy} onSetFilter={this.onSetFilter} loadEmails={this.loadEmails} unread={unread} /></div>
                <div className="email-list-container"><EmailFilter filterBy={filterBy} onSetFilter={this.onSetFilter} />
                <EmailList emails={emails} loadEmails={this.loadEmails}/></div>
            </section>

            // <section className="email-app">
            //     <aside>
            //     <EmailCtgs filterBy={filterBy} onSetFilter={this.onSetFilter} loadEmails={this.loadEmails} unread={unread} />
            //     </aside>
            //     <main>
            //         <EmailFilter filterBy={filterBy} onSetFilter={this.onSetFilter}  />
            //         <Switch className="email-list-container">
            //             <Route  path="/email"  > 
            //             <EmailList emails={emails} loadEmails={this.loadEmails}/>
            //             </Route>
            //             <Route component={EmailDetails} path="/email/:emailId" /> 
            //         </Switch>
            //     </main>
            // </section>

        )
    }
}