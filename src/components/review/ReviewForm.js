import React, {useContext, useEffect, useRef, useState} from "react"
import {ReviewContext} from "./ReviewProvider"

export const ReviewForm = (props) => {
    const {addRideReview, updateRideReview , getReviewById } = useContext(ReviewContext)

    const [theReview, setTheReview] = useState({})

    const rating = useRef(null)
    const review = useRef(null)

    const editMode = props.match.params.hasOwnProperty("reviewId")

    useEffect(() => {
        if(editMode) {
            const reviewId = parseInt(props.match.params.reviewId)
            getReviewById(reviewId).then(r => setTheReview(r))
        }
    }, [])

    const reviewHandler = (e) => {
        const newReview = {... theReview}
        newReview[e.target.name] = e.target.value
        setTheReview(newReview)
    }

    

    const saveReview = () => {
        if(editMode) {
            updateRideReview(parseInt(props.match.params.reviewId), {
                rating : theReview.rating,
                review : theReview.review,
                ride_id : theReview.ride_id,
                reviewer_id : theReview.reviewer_id
            }).then(props.history.push(`/rides/${theReview.ride_id}`))
        } else {
            addRideReview({
                rating : theReview.rating,
                review : theReview.review,
                ride_id : props.match.params.rideId
            }).then(props.history.push(`/rides/${props.match.params.rideId}`))
        }
    }

    return (
        <form className="reviewForm">
            <fieldset>
                <div>
                    <label htmlFor="rating">Rating: </label>
                    <input type="text" ref={rating} name="rating" required autoFocus value={theReview.rating} onChange={reviewHandler} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="review">Review: </label>
                    <input type="text" ref={review} name="review" required autoFocus value={theReview.review} onChange={reviewHandler} />
                </div>
            </fieldset>
            <button type="submit"
                onClick={e => {
                    e.preventDefault()
                    saveReview()
                }}
                className="btn btn-form">
                {editMode ? "Update Review" : "Save Review"}
            </button>
        </form>
    )

}