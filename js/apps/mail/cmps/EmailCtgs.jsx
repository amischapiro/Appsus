import { ComposeEmail } from "./ComposeEmail.jsx";





export class EmailCtgs extends React.Component{

    state={
        isComposeShown:false,
        filterBy:{
            ctg: 'inbox'

        }

    }

    onToggleComposeModal = () => {
        this.setState((prevState) => ({ ...prevState, isComposeShown: !this.state.isComposeShown }));
      };

    onChangeCtg(newCtg){
        
        this.setState((prevState) =>({filterBy:{...prevState.filterBy,ctg:newCtg}}),()=>{
            this.props.onSetFilter(this.state.filterBy)
        })
        

    }

    render(){
        const {isComposeShown} = this.state


        return <section className="email-ctgs">
            <button onClick={this.onToggleComposeModal} className="compose-btn">Compose</button>
            {isComposeShown && (
                <ComposeEmail onToggleComposeModal={this.onToggleComposeModal}/>
            )}
            <button onClick={()=>this.onChangeCtg('inbox')}>Inbox</button>
            <button onClick={()=>this.onChangeCtg('sent')} >Sent</button>
        </section>
    }
}