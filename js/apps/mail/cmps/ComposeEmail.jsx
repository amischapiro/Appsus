import { emailService } from "../services/email.service.js";
import { eventBusService } from "../../../services/event-bus.service.js";


export class ComposeEmail extends React.Component {

    state = {
        email:{
            to:null,
            subject:null,
            body:null,
        }

    }

    sendEmail = (ev) => {
        ev.preventDefault();
        const { email } = this.state;
        emailService.sendEmail(email).then(()=>{
            eventBusService.emit('user-msg', { txt: ` Email sent!`, type: 'success' })
        })
        this.props.onToggleComposeModal();
        this.props.loadEmails()
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({
          email: { ...prevState.email, [field]: value },
        }));
      };

    onGoBack = () => {
        this.props.history.push('/email');
      };


    render() {

        return <section className="compose-modal">
            <div className="modal-header">
                <h1>New Message</h1>
                <button className="btn-compose-modal" onClick={() => this.props.onToggleComposeModal()} >❌</button>
            </div>
            <div><form onSubmit={this.sendEmail} className="compose-form" autoComplete="off" >
                <input type="text"
                    placeholder="To:"
                    name="to"
                    id="to"
                    onChange={this.handleChange}
                />
                <input type="text"
                    placeholder="Subject:"
                    name="subject"
                    id="subject"
                    onChange={this.handleChange}
                />
                <textarea name="body" id="body" cols="30" rows="10" placeholder="body:" onChange={this.handleChange}></textarea>
                <button>Send</button>
            </form>
            </div>
        </section>
    }
}