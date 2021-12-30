import { ComposeEmail } from "./ComposeEmail.jsx";





export class EmailCtgs extends React.Component{

    state={
        isComposeShown:false,
        filterBy:{
            ctg: 'all'

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
            <div className={`main-screen` + (isComposeShown ? ' gray-screen':'')} ></div>
            <button onClick={this.onToggleComposeModal} className="compose-btn">Compose</button>
            {isComposeShown && (
                <ComposeEmail onToggleComposeModal={this.onToggleComposeModal} loadEmails={this.props.loadEmails}/>
            )}
            <button className={this.state.filterBy.ctg ==='all' ? 'active-ctg':''} onClick={()=>this.onChangeCtg('all')}>All Mail</button>
            <button className={this.state.filterBy.ctg ==='inbox' ? 'active-ctg':''} onClick={()=>this.onChangeCtg('inbox')}>Inbox ({this.props.unread} unread)</button>
            <button className={this.state.filterBy.ctg === 'sent'  ? 'active-ctg':''} onClick={()=>this.onChangeCtg('sent')} >Sent</button>
        </section>
    }
}