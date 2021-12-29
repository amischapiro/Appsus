import { bookService } from "../services/book.service.js"
import { SearchList } from "../cmps/SearchList.jsx"
import { eventBusService } from "../../../services/event-bus.service.js"

export class Booksearch extends React.Component{
    state={
        list: null

    }

    onChange = (event)=>{
        const search = event.target.value
        bookService.getList(search)
        .then((list)=>this.setState({list}))
        
    }

    onAddBook= (book)=> {
        bookService.addBook(book)
        .then((book)=>{
            eventBusService.emit('user-msg', { txt: `${book.title} was added !`, type: 'success' })
            this.props.history.push('/book')
        })

        
    }

    render(){
        return <section>
            <input type="text" placeholder="Search for a book" onChange={(event)=>this.onChange(event)} />
            <SearchList list={this.state.list} onAddBook={this.onAddBook} ></SearchList>
        </section>
    }
}