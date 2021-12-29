import { ComposeEmail } from "./ComposeEmail.jsx";





export class EmailCtgs extends React.Component{

    state={
        isComposeShown:false,
        filterBy:{
            inbox:'',
            sent:''

        }

    }

    onToggleComposeModal = () => {
        this.setState((prevState) => ({ ...prevState, isComposeShown: !this.state.isComposeShown }));
      };

    render(){
        const {isComposeShown} = this.state


        return <section className="email-ctgs">
            <button onClick={this.onToggleComposeModal} className="compose-btn">Compose</button>
            {isComposeShown && (
                <ComposeEmail onToggleComposeModal={this.onToggleComposeModal}/>
            )}
            <h1>Inbox</h1>
            <h1>Sent Mail</h1>
        </section>
    }
}