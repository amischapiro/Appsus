import { bookService } from "../services/book.service.js";

export class RateBook extends React.Component {
    state = {
        // book: this.props.book,
        review: {
            fullName: 'Books Reader',
            rating: 0,
            date: new Date().toISOString().slice(0, 10),
            txt: ''
        }
    }



    onChange = (ev) => {
        const val = ev.target.value
        bookService.addReview(this.state.book, val)
    }
    onSaveReview = (ev) => {
        ev.preventDefault()
        const{review} = this.state
        const {bookId} = this.props
        bookService.addReview(bookId,review).then(this.props.loadBook)
        this.props.onToggleReviewModal()

    }
    handleChange = ({target}) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({
          review: { ...prevState.review, [field]: value },
        }));
    }





    render() {
        const { fullName, date, rating, txt } = this.state.review

        return (
            <section className="add-review">
                <div className="review-modal">
                    <h1>Add review</h1>
                    <button className="btn-toggle-modal"
                        onClick={() => this.props.onToggleReviewModal()}
                    >
                    x
                    </button>
                    <form onSubmit={this.onSaveReview} className="review-form">
                        <label htmlFor="fullName">Full name:</label>
                        <input type="text" name="fullName" id="fullName" placeholder="Enter full name" value={fullName} onChange={this.handleChange} />
                        <label htmlFor="rating">Rate Book:</label>
                        <select name="rating" id="rating" onChange={(event) => this.handleChange(event)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <label htmlFor="by-date">Date:</label>
                        <input
                            type="date"
                            id="by-date"
                            name="date"
                            value={date}
                            onChange={this.handleChange}/>
                        <textarea
                            name="txt"
                            cols="30"
                            rows="10"
                            value={txt}
                            onChange={this.handleChange}></textarea>
                            <button>Add review</button>
                    </form>

                </div>
            </section>
        )
    }
}
