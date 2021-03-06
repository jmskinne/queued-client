import React, {useContext, useEffect, useRef, useState} from "react"
import {ReviewContext} from "./ReviewProvider"

export const ReviewForm = (props) => {
    const {addRideReview, updateRideReview , getReviewById, messageError } = useContext(ReviewContext)

    const [theReview, setTheReview] = useState({})
    const [warning, setWarning] = useState(false)

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
        if(theReview.rating >= 0 && theReview.rating <= 5) {
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
        } else {
            setWarning(true)
        }
        
    }

    return (
        <div class="bg-warm-grey-200">
            <div class="text-center">
                <p class="text-warm-grey-900 text-4xl font-bold pt-3">Review Ride</p>
                {
                    warning 
                    ?
                    <div class="my-2 px-2 overflow-hidden max-w flex justify-center">
                        <div class="bg-yellow-vivid-300 shadow-l rounded-lg overflow-hidden p-4 mb-2">
                            <div class= "flex justify-evenly overflow-hidden xl:-mx-3">
                                <p class="tracking-wide text-lg font-bold text-warm-grey-900">Rating must be between 0 and 5</p>
                                <button onClick={() => setWarning(false)}><svg class="h5 w-5 text-warm-grey-900 ml-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg></button>
                            </div>
                        </div>
                    </div>
                    :
                    ''
                }
            </div>
            <div class="flex flex-wrap items-center justify-center">
                <form class="w-full max-w-lg mt-12">
                    
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-warm-grey-700 text-xs font-bold mb-2" for="rating">
                            Rating 1-5
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="rating" type="text" ref={rating} name="rating" value={theReview.rating} onChange={reviewHandler} />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-warm-grey-700 text-xs font-bold mb-2" for="review">
                            Review
                        </label>
                        <textarea class=" no-resize appearance-none block w-full bg-gray-200 
                        text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48" 
                        id="review" type="text" ref={review} name="review" value={theReview.review} onChange={reviewHandler} required></textarea>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3 flex justify-center">
                        <button class="px-8 py-3 border-warm-grey-900 border-transparent text-base font-medium 
                        rounded-md text-warm-grey-900 bg-lime-green-400 hover:bg-lime-green-900 hover:text-warm-grey-050" 
                        type="submit" onClick={e => {
                            e.preventDefault()
                            saveReview()
                        }}>
                            {editMode ? "Update Review" : "Submit Review"}
                        </button>
                        
                        
                    </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3 flex justify-center">
                    <button class="bg-cyan-050 hover:bg-cyan-900 text-warm-grey-700 hover:text-warm-grey-050 font-bold py-2 px-4 rounded" onClick={() => props.history.push(`/rides/${props.match.params.rideId}`)}>Back</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    )

}