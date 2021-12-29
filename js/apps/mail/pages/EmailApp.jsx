import { EmailList } from "../cmps/EmailList.jsx"
import { emailService } from "../services/email.service.js"
import { Loader } from "../../../cmps/Loader.jsx"
import { EmailFilter } from "../cmps/EmailFilter.jsx"

export class EmailApp extends React.Component{
    state={
        emails:[],
        filterBy:null
    }
    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () =>{
        const { filterBy } = this.state
        emailService.query(filterBy).then(emails => {
            this.setState({ emails })
        })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails)
    }
    
    

    render(){
        const {emails,filterBy} = this.state
        if(!emails.length) return <Loader/>
        return (
            <section className="email-app">
                <h1>Email</h1>
                <EmailFilter filterBy={filterBy} onSetFilter={this.onSetFilter} />
                <EmailList emails={emails}/>
            </section>


        )
    }
}