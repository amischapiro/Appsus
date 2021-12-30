

export class EmailFilter extends React.Component{
    state={
        filterBy:{
            subject:'',
            readState:'all'
        }
    }

    handleChange = ({target})=>{
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({filterBy:{...prevState.filterBy,[field]:value}}),()=>{
            this.props.onSetFilter(this.state.filterBy)
        })
    }
    onSubmitFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
        this.cleanForm()
    }
    cleanForm = ()=>{
        this.setState({filterBy:{subject:''}})
    }




    render(){
        const {filterBy:{subject}} = this.state

        return(
            <form className="email-filter" onSubmit={this.onSubmitFilter} autoComplete="off">
                <label htmlFor="by-subject">By Subject:</label>
                <input placeholder="Enter subject" 
                type="text"
                id="by-subject"
                name="subject"
                value = {subject}
                onChange={this.handleChange}
                 />
                 <select name="readState" id="readState" onChange={this.handleChange}>
                     <option value="all">All</option>
                     <option value="unread">Unread</option>
                     <option value="read">Read</option>
                 </select>
                 <button>Filter</button>



            </form>
        )
    }



}