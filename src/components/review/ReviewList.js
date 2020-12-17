import React, {useContext, useEffect} from "react"
import {Link} from "react-router-dom"
import {ReviewContext} from "./ReviewProvider"

export const ReviewList = (props) => {
    const {allReviews, getRideReviews} = useContext(ReviewContext)

    useEffect(() => {
        getRideReviews()
    }, [])

    return (
        <>
        <article>
            {
                allReviews.map(r => {
                    return <section key={r.id}>
                        <div><Link to={`/rides/${r.ride_id}`}>{r.ride?.name}</Link></div>
                        <div>Review: {r.review}</div>
                        <div>User: {r.reviewer.user.username}</div>
                    </section>
                })
            }
        </article>
        </>
    )
}
