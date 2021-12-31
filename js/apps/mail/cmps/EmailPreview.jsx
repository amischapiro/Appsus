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
    onToggleTxt = () => {
        this.setState((prevState) => ({ ...prevState, isLongTxt: !this.state.isLongTxt }));
        
      };

      onToggleStar = (ev) =>{
          ev.stopPropagation()
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
        
        <article className={`email-preview ${email.isRead ?'':'unread-bgc' } ${isLongTxt ? 'full-preview':''}`} onClick={this.onToggleTxt}>
            <i className={email.isRead ? "far fa-envelope-open":"fas fa-envelope"} ></i> 
            <p className={`star ${isStarred?'filled':''}`} onClick={this.onToggleStar}>⭐</p>
            <p className="preview-subject">{email.subject}</p> 
            {email.from && <p className="to-from">From:"{email.from}"</p>}
            {email.to && <p className="to-from">To:"{email.to}"</p>}
            <LongTxt text={email.body} isLongTxt={isLongTxt} onToggleTxt={this.onToggleTxt} />
            <Link className={`clean-link expand ${isLongTxt ? '':'hide'}`} to={`/email/${email.id}`}  ><i className="fas fa-expand"></i></Link>
            
        </article>
        

    )
   }
}