export function ReviewPreview({ review, onRemoveReview }) {
    return <div key={review.id} className="review-details">
        <h4>{review.fullName}</h4>
        <h5 className="gray">{review.date}</h5>
        <h5>Stars:{review.rating}</h5>
        <p>{review.txt}</p>
        <button className="btn-remove-review" onClick={() => onRemoveReview(review.id)}>×</button>
    </div>
}