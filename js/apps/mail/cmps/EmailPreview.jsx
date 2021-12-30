import { emailService } from "../services/email.service.js"
import { LongTxt } from "./LongTxt.jsx"

const { Link } = ReactRouterDOM

export class EmailPreview extends React.Component{
   state={
       isLongTxt:false,
       isStarred:false


   }
   componentDidMount() {
       this.setState((prevState)=>({...prevState,isStarred:this.props.email.isStarred}))
   }
   
    getIcon= () => {
        const icon = this.props.email.isRead ? 'read-icon' : 'unread-icon'
        return icon 
    }
    onToggleTxt = () => {
        this.setState((prevState) => ({ ...prevState, isLongTxt: !this.state.isLongTxt }));
        
      };

      onToggleStar = () =>{
        this.setState((prevState) => ({ ...prevState, isStarred: !this.state.isStarred }),()=>
        emailService.emailStarred(this.props.email.id,this.state.isStarred))
        setTimeout(() => {
            this.props.loadEmails()
        }, 10);
      }
    
   render(){
    const email = this.props.email
    const {isLongTxt,isStarred} = this.state
    return (
        
        <article className="email-preview" onClick={this.onToggleTxt}>
            <h3>{email.subject}</h3> 
            {email.from && <h5>From:"{email.from}"</h5>}
            {email.to && <h5>To:"{email.to}"</h5>}
            {/* <p>{email.body}</p> */}
            <LongTxt text={email.body} isLongTxt={isLongTxt} onToggleTxt={this.onToggleTxt} />
            <Link className="clean-link" to={`/email/${email.id}`} >[expand]</Link>
            <img src={`../../assets/img/${this.getIcon()}.png`} /> 
            <p className={`star ${isStarred?'filled':''}`} onClick={this.onToggleStar}>⭐</p>
            
        </article>
        

    )
   }
}