import { ComposeEmail } from "./ComposeEmail.jsx";





export class EmailCtgs extends React.Component {

    state = {
        isComposeShown: false,
        filterBy: {
            ctg: 'all'

        }

    }

    onToggleComposeModal = () => {
        this.setState((prevState) => ({ ...prevState, isComposeShown: !this.state.isComposeShown }));
    };

    onChangeCtg(newCtg) {

        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, ctg: newCtg } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })


    }

    render() {
        const { isComposeShown } = this.state
        const {ctg} = this.state.filterBy


        return <section className="email-ctgs">
            <div className={`main-screen` + (isComposeShown ? ' gray-screen' : '')} ></div>
            <div onClick={this.onToggleComposeModal} className="ctg compose-btn">
            <i className="fas fa-plus-circle"></i>
            <p>Compose</p>
            </div>
            {isComposeShown && (
                <ComposeEmail onToggleComposeModal={this.onToggleComposeModal} loadEmails={this.props.loadEmails} />
            )}
            <div className={`ctg ${this.state.filterBy.ctg === 'all' ? 'active-ctg' : ''} `} onClick={() => this.onChangeCtg('all')} >
                <i className="fas fa-envelope-square"></i>
                <p>All Mail {ctg==='all'&&`(${this.props.unread} unread)`}</p>
            </div>
            <div className={`ctg ${this.state.filterBy.ctg === 'inbox' ? 'active-ctg' : ''}`} onClick={() => this.onChangeCtg('inbox')}>
                <i className="fas fa-inbox"></i>
                <p >Inbox {ctg==='inbox'&&`(${this.props.unread} unread)`} </p>
            </div>
            <div className={`ctg ${this.state.filterBy.ctg === 'sent' ? 'active-ctg' : ''}`} onClick={() => this.onChangeCtg('sent')}>
            <i className="fa fa-paper-plane"></i>
            <p>Sent {ctg==='sent'&&`(${this.props.unread} unread)`}</p>
            </div>
            <div className={`ctg ${this.state.filterBy.ctg === 'starred' ? 'active-ctg' : ''}`} onClick={() => this.onChangeCtg('starred')}>
            <i className="far fa-star"></i>
            <p>Starred {ctg==='starred'&&`(${this.props.unread} unread)`}</p>
            </div>
        </section>
    }
}