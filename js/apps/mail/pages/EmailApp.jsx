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
        unread: null,
        sortBy:'date'
    }
    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        const { filterBy,sortBy } = this.state
        emailService.query(filterBy,sortBy).then(emails => {
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
    onSetSort = (sortBy) =>{
        this.setState({sortBy},this.loadEmails)
    }



    render() {

        const { emails, filterBy, unread, sortBy } = this.state
        if (!emails) return <Loader/>
        return (
            <section className="email-app">
                <aside>
                <EmailCtgs filterBy={filterBy} onSetFilter={this.onSetFilter} loadEmails={this.loadEmails} unread={unread} />
                </aside>
                <main>
                    <EmailFilter filterBy={filterBy} onSetFilter={this.onSetFilter} sortBy={sortBy} onSetSort={this.onSetSort} />
                    <Switch className="email-list-container">
                        <Route component={(props) => <EmailDetails {...props} loadEmails={this.loadEmails} />} path ="/email/:emailId"/>

                        <Route path="/email/:emailId" >
                            <EmailDetails loadEmails={this.loadEmails} />
                            </Route>
                        <Route  path="/email"  > 
                        <EmailList emails={emails} loadEmails={this.loadEmails}/>
                        </Route>
                    </Switch>
                </main>
            </section>

        )
    }
}