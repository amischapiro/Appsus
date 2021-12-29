import { bookService } from "../services/book.service.js"
import { RateBook } from "../cmps/RateBook.jsx"
import { ReviewList } from "../cmps/ReviewList.jsx"
import { eventBusService } from "../../../services/event-bus.service.js"
import { Loader } from "../../../cmps/Loader.jsx"

export class BookDetails extends React.Component {
    // function
    state = {
        book: null,
        isShowReviewModal: false
    }
    componentDidMount() {
        this.loadBook()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }

    loadBook = () => {
        const { bookId } = this.props.match.params 
        bookService.getBookById(bookId).then(book => {
            if (!book) return this.props.history.push('/')
            this.setState({ book })
        })
    }
    onRemoveReview = (reviewId) => {
        const bookId = this.state.book.id;
        bookService.removeReview(bookId, reviewId).then(this.loadBook);
      };

    onGoBack = () => {
        this.props.history.push('/book')
    }
    onToggleReviewModal = () => {
        this.setState((prevState) => ({ ...prevState, isShowReviewModal: !this.state.isShowReviewModal }));
      };

    onRemoveBook = ()=>{
        const { id } = this.state.book
        bookService.removeBook(id).then(() => {
            eventBusService.emit('user-msg', { txt: ` ${this.state.book.title} is deleted !`, type: 'danger' })
            this.onGoBack()
        })
    }  

    render() {
        const {book,isShowReviewModal} = this.state
        if(!book) return <Loader/>
        const {review} = this.state.book
        
        return (
            <section className="book-details">
                <img src={`${book.thumbnail}`} alt="" />
                <h2>Title: {book.title}</h2>
                <h3>Authors: {book.authors}</h3>
                <h4>Subtitle: {book.subtitle}</h4>
                <p>Publish Date: {book.publishedDate}</p>
                {(new Date().getFullYear() - book.publishedDate) > 10 &&
                    <p>Veteran Book</p>}
                {(new Date().getFullYear() - book.publishedDate) < 1 &&
                    <p>New!</p>}
                <p>Description: {book.description}</p>
                <p>Page Count: {book.pageCount}</p>
                {book.pageCount > 200 && book.pageCount < 500 && <p>Decent reading</p>}
                {book.pageCount > 500 && <p>Long reading</p>}
                {book.pageCount < 100 && <p>Light reading</p>}
                <p>Categories: {book.categories.map((c, idx) => {
                    if (idx === book.categories.length - 1) return c + '.'
                    return c + ', '
                })}</p>
                <p>Language: {book.language}</p>
                <p className={`${book.listPrice.amount > 150 ? 'red' : ''}
                ${book.listPrice.amount < 20 ? 'green' : ''}`}>Price: <span>{book.listPrice.amount}</span></p>
                <button onClick={this.onToggleReviewModal}>Add review</button>
                {isShowReviewModal&&(<RateBook book={book} bookId={book.id} loadBook={this.loadBook} onToggleReviewModal={this.onToggleReviewModal} />)} 
                <button className="primary-btn" onClick={this.onGoBack}>Go back</button>
                <button className="primary-btn" onClick={this.onRemoveBook}>Remove book</button>
                <div className="review-container">
                <ReviewList review={review}  onRemoveReview={this.onRemoveReview}></ReviewList>

                </div>
            </section>
        )
    }
}