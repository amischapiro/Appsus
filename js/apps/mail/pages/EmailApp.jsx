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
        if (!emails.length) return <Loader />
        return (
            <section className="email-app">
                <div><EmailCtgs filterBy={filterBy} onSetFilter={this.onSetFilter} loadEmails={this.loadEmails} unread={unread} /></div>
                <div><EmailFilter filterBy={filterBy} onSetFilter={this.onSetFilter} />
                <EmailList emails={emails} loadEmails={this.loadEmails}/></div>
            </section>

            // <section className="email-app">
            //     <aside>
            //     <EmailCtgs filterBy={filterBy} onSetFilter={this.onSetFilter} loadEmails={this.loadEmails} unread={unread} />
            //     </aside>
            //     <main>
            //         <EmailFilter filterBy={filterBy} onSetFilter={this.onSetFilter}  />
            //         <Switch>
            //             <Route component={EmailList} path="/email/inbox" emails={emails} />
            //             <Route component={EmailDetails} path="/email/:emailId" />
            //         </Switch>
            //     </main>
            // </section>

        )
    }
}