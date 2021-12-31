

export class EmailFilter extends React.Component{
    state={
        filterBy:{
            subject:'',
            readState:'all'
        },
        sortBy:'date'

    }

    handleChange = ({target})=>{
        const field = target.name
        const value = target.value.toLowerCase()
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

    onChangeSort = ({target})=>{
        const value = target.value
        this.setState(()=>({sortBy:value}),()=>this.props.onSetSort(this.state.sortBy))
    }




    render(){
        const {filterBy:{subject}} = this.state

        return(
            <form className="email-filter" onSubmit={this.onSubmitFilter} autoComplete="off">
                <div>
                <input placeholder="Search subject:" 
                type="text"
                id="by-subject"
                name="subject"
                value = {subject}
                onChange={this.handleChange}
                 />
                 <button>Search</button>
                 </div>
                 
                 <div>
                 Filter By:
                 <select name="readState" id="readState" onChange={this.handleChange}>
                     <option value="all">All</option>
                     <option value="unread">Unread</option>
                     <option value="read">Read</option>
                 </select>
                 </div>
                 <div>
                 Sort by:
                 <select name="sort-by" id="sort-by" onChange={this.onChangeSort} >
                    <option value="date">Date</option>
                    <option value="subject">Subject</option>
                 </select>
                 </div>



            </form>
        )
    }



}