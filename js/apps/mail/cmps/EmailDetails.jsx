import { emailService } from "../services/email.service.js"
import { Loader } from "../../../cmps/Loader.jsx"
import { eventBusService } from "../../../services/event-bus.service.js"
export class EmailDetails extends React.Component{
    state={
        email:null
    }

    componentDidMount() {
        this.loadEmail()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.emailId !== this.props.match.params.emailId) {
            this.loadEmail()
        }
    }

    loadEmail = () => {
        const { emailId } = this.props.match.params 
        emailService.getEmailById(emailId).then(email => {
            if (!email) return this.props.history.push('/')
            this.setState({ email })
        })
    }

    onGoBack = () => {
        this.props.history.push('/email')
    }

    onRemoveEmail = ()=>{
        const { id } = this.state.email
        emailService.removeEmail(id).then(() => {
            eventBusService.emit('user-msg', { txt: ` Email is deleted !`, type: 'danger' })
            this.onGoBack()
        })
    }
    





    render(){
        const {email} = this.state
        if(!email) return <Loader/>

        return <section className="email-details">
            <small>Sent at{email.sentAt}</small>
            <h1>{email.subject}</h1>
            <p>{email.to}</p>
            <h5>{email.body}</h5>
            <button className="primary-btn" onClick={this.onGoBack}>Go back</button>
            <button className="primary-btn" onClick={this.onRemoveEmail} >Delete⛔</button>

        </section>
    }
}