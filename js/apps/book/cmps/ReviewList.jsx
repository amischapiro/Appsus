import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList({ review, onRemoveReview }) {
    return <div>{review.map(rev => <ReviewPreview key={rev.id} review={rev} onRemoveReview={onRemoveReview}></ReviewPreview>)}</div>
}