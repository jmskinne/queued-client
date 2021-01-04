import React, {useState} from "react"

export const ReviewContext = React.createContext()

export const ReviewProvider = (props) => {
    const [allReviews, setReviews] = useState([])
    const [rideReviews, setRideReviews] = useState([])

    const getRideReviews = () => {
        return fetch("http://localhost:8000/ridereviews", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
        .then(setReviews)
    }

    const getReviewById = (reviewId) => {
        return fetch(`http://localhost:8000/ridereviews/${reviewId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
    }

    const getReviewsByRide = (rideId) => {
        return fetch(`http://localhost:8000/ridereviews?ride_id=${rideId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
        .then(setRideReviews)
    }

    const addRideReview = (newReview) => {
        return fetch("http://localhost:8000/ridereviews", {
            method : "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body : JSON.stringify(newReview)
        }).then(() => getReviewsByRide(newReview.ride_id))
    }

    const updateRideReview = (reviewId, newReview) => {
        return fetch(`http://localhost:8000/ridereviews/${reviewId}`, {
            method : "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body : JSON.stringify(newReview)
        }).then(() => getReviewsByRide(newReview.ride_id))
    }

    const deleteRideReview = (review) => {
        return fetch(`http://localhost:8000/ridereviews/${review.id}`, {
            method : "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
            }
        }).then(() => getReviewsByRide(review.ride_id))
    }

    return (
        <ReviewContext.Provider value={{
            allReviews,
            getRideReviews,
            rideReviews,
            getReviewsByRide,
            getReviewById,
            addRideReview,
            updateRideReview,
            deleteRideReview
        }}>
            {props.children}
        </ReviewContext.Provider>
    )

}