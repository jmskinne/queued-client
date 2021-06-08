import React, {useState} from "react"

export const ReviewContext = React.createContext()

export const ReviewProvider = (props) => {
    const [allReviews, setReviews] = useState([])
    const [rideReviews, setRideReviews] = useState([])

    const getRideReviews = () => {
        return fetch("https://queued-server-qav5d.ondigitalocean.app/ridereviews", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
        .then(setReviews)
    }

    const getReviewById = (reviewId) => {
        return fetch(`https://queued-server-qav5d.ondigitalocean.app/ridereviews/${reviewId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
    }

    const getReviewsByRide = (rideId) => {
        return fetch(`https://queued-server-qav5d.ondigitalocean.app/ridereviews?ride_id=${rideId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
        .then(setRideReviews)
    }

    const addRideReview = (newReview) => {
        return fetch("https://queued-server-qav5d.ondigitalocean.app/ridereviews", {
            method : "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body : JSON.stringify(newReview)
        })
        .then(() => getReviewsByRide(newReview.ride_id))
    }

    const updateRideReview = (reviewId, newReview) => {
        return fetch(`https://queued-server-qav5d.ondigitalocean.app/ridereviews/${reviewId}`, {
            method : "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body : JSON.stringify(newReview)
        }).then(() => getReviewsByRide(newReview.ride_id))
    }

    const deleteRideReview = (review) => {
        return fetch(`https://queued-server-qav5d.ondigitalocean.app/ridereviews/${review.id}`, {
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