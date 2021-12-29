

export class EmailFilter extends React.Component{
    state={
        filterBy:{
            subject:''
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
                <label htmlFor="by-subject">By Name:</label>
                <input placeholder="Enter subject" 
                type="text"
                id="by-subject"
                name="subject"
                value = {subject}
                onChange={this.handleChange}
                 />
                 <button>Filter</button>



            </form>
        )
    }



}