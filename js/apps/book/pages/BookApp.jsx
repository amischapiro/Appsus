import { bookService } from '../services/book.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from './BookDetails.jsx'

const { Link } = ReactRouterDOM

export class BookApp extends React.Component {
    state = {
        books: [],
        filterBy: null,
        // selectedBook: null

    }
    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        const { filterBy } = this.state
        bookService.query(filterBy).then(books => {
            this.setState({ books })
        })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }





    render() {
        const { books, filterBy } = this.state
        if(!books.length) return <div> loading... </div>
        
        return <section className="book-app">
            <BookFilter filterBy={filterBy} onSetFilter={this.onSetFilter} />
            <Link className="clean-link add-book" to="/book/search">Add book</Link>
            <BookList onSelectBook={this.onSelectBook} books={books} />
               </section>
    }
}