import React, {useContext, useEffect, useState} from "react"
import {RideContext} from "./RideProvider"
import {ReviewContext} from "../review/ReviewProvider"

import {ProfileContext} from "../profile/ProfileProvider"

export const RideDetail = (props) => {
    const {profile} = useContext(ProfileContext)
    const {getRideById} = useContext(RideContext)
    const {rideReviews, getReviewsByRide, deleteRideReview} = useContext(ReviewContext)
    
    
    const [ride, setRide] = useState({})

    useEffect(() => {
        const rideId = props.match.params.rideId
        getRideById(rideId).then(r => setRide(r))
        getReviewsByRide(rideId)
        
    }, [])

    return (
        <>
        <div>
            <h1>{ride.name}</h1>
            <button onClick={() => props.history.push(`/ridereviews/new/${props.match.params.rideId}`)
            }>
                New Review
            </button>
        </div>
        <h3>Reviews</h3>
        <article>
            {
                rideReviews.map(r => {
                    return <section key={r.id}>
                    <div>{r.review}</div>
                    {
                        (profile[0]?.user.id === r.reviewer?.user.id) ? 
                        <>
                        <button onClick={() => props.history.push(`/ridereviews/edit/${r.id}`)}>Edit</button>
                        <button onClick={() => deleteRideReview(r)}>Delete</button>
                        </>
                        :
                        ''
                    }
                    
                    </section>
                })
            }
        </article>
        <button onClick={() => props.history.push(`/rides`)}>Back</button>
        </>
    )
}