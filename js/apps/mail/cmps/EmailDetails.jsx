import { emailService } from "../services/email.service.js"
import { Loader } from "../../../cmps/Loader.jsx"
import { eventBusService } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { noteService } from "../../keep/services/note.service.js"
import { EmailList } from "./EmailList.jsx"
export class EmailDetails extends React.Component{
    state={
        email:null
    }

    componentDidMount() {
        this.loadEmail()
        
    }

    

    loadEmail = () => {
        console.log('this.props:', this.props);
        
        const { emailId } = this.props.match.params 
        emailService.getEmailById(emailId).then(email => {
            if (!email) return this.props.history.push('/email')
            this.setState({ email },()=>emailService.emailRead(emailId))
        })
    }

    onGoBack = () => {
        this.props.loadEmails()
        this.props.history.push('/email')
    }

    onRemoveEmail = ()=>{
        const { id } = this.state.email
        emailService.removeEmail(id).then(() => {
            eventBusService.emit('user-msg', { txt: ` Email is deleted !`, type: 'danger' })
            this.onGoBack()
            
        })
    }

    onEmailNote = ()=>{
        const note = this.state.email.body
        noteService.saveNote(note)
    }

   
    




    render(){
        const {email} = this.state
        if(!email) return <Loader/>

        return <section className="email-details">
            <small>Sent at {utilService.getFormattedTime(email.sentAt)}</small>
            <h1>{email.subject}</h1>
            <p>{email.to}</p>
            <p>{email.from}</p>
            <h5>{email.body}</h5>
            <button className="primary-btn" onClick={this.onGoBack}>Go back</button>
            <button className="primary-btn" onClick={this.onRemoveEmail} >Delete⛔</button>
            <button className="primary-btn" onClick={this.onEmailNote}>Create a note</button>

        </section>
    }
}