
const { Link } = ReactRouterDOM

export function BookPreview({book}){
    const getCurrency = ()=>{
        switch (book.listPrice.currencyCode) {
            case 'ILS':
                return '₪'
            case 'EUR':
                return '€'        
        }
    }
    const getDollar = ()=>{
        return (book.listPrice.currencyCode==='USD')? '$': ''
    }
    
    
    return(
        <Link className="clean-link" to={`/book/${book.id}`}>
        <article className="book-preview">
            {book.listPrice.isOnSale&& <img className="sale" src="../../../../assets/img/sale.jpg" alt="" /> }
            <img className="preview-img" src={`${book.thumbnail}`} alt="" />
            <h3>{book.title}</h3>
            <h4>Price:{getDollar()}{book.listPrice.amount} 
            {getCurrency()}</h4>
        </article>
        </Link>
    )
}