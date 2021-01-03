import React, {useContext, useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {ReviewContext} from "./ReviewProvider"

import {ProfileContext} from "../profile/ProfileProvider"


export const ReviewList = (props) => {
    const {allReviews, getRideReviews} = useContext(ReviewContext)
    const {getProfile} = useContext(ProfileContext)
    const [profile, setProfile] = useState({})

    useEffect(() => {
        getRideReviews()
        getProfile().then(r => setProfile(r))
    }, [])

    return (
        <>
        <h1>{profile[0]?.user?.username}</h1>
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
            {/* <iframe width="600" height="450" frameborder="0" 
            src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyC0FVlhjU3_UIGyKc8DuhSUpgCleNP2aXE&origin=28.416243200345246,-81.5812048967371&destination=28.4199638504,-81.5846422864&waypoints=28.419418,-81.58498&mode=walking"
            allowFullScreen ></iframe> */}
        </article>
        </>
    )
}
