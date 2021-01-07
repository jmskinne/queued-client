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

    // return (
    //     <form className="reviewForm">
    //         <fieldset>
    //             <div>
    //                 <label htmlFor="rating">Rating: </label>
    //                 <input type="text" ref={rating} name="rating" required autoFocus value={theReview.rating} onChange={reviewHandler} />
    //             </div>
    //         </fieldset>
    //         <fieldset>
    //             <div>
    //                 <label htmlFor="review">Review: </label>
    //                 <input type="text" ref={review} name="review" required autoFocus value={theReview.review} onChange={reviewHandler} />
    //             </div>
    //         </fieldset>
    //         <button type="submit"
    //             onClick={e => {
    //                 e.preventDefault()
    //                 saveReview()
    //             }}
    //             className="btn btn-form">
    //             {editMode ? "Update Review" : "Save Review"}
    //         </button>
    //     </form>
    // )
    return (
        <div class="bg-warm-grey-200">
            <div class="text-center">
                <p class="text-warm-grey-900 text-4xl font-bold pt-3">Review Ride</p>
            </div>
            <div class="flex flex-wrap items-center justify-center">
                <form class="w-full max-w-lg mt-12">
                    
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-warm-grey-700 text-xs font-bold mb-2" for="rating">
                            Rating
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
                        id="review" type="text" ref={review} name="review" value={theReview.review} onChange={reviewHandler} ></textarea>
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