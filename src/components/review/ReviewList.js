// import React, {useContext, useEffect} from "react"
// import {Link} from "react-router-dom"
// import {ReviewContext} from "./ReviewProvider"




// export const ReviewList = (props) => {
//     const {allReviews, getRideReviews} = useContext(ReviewContext)
    

//     useEffect(() => {
//         getRideReviews()
        
//     }, [])

//     return (
//         <>
        
//         <article>
//             {
//                 allReviews.map(r => {
//                     return <section key={r.id}>
//                         <div><Link to={`/rides/${r.ride_id}`}>{r.ride?.name}</Link></div>
//                         <div>Review: {r.review}</div>
//                         <div>User: {r.reviewer.user.username}</div>
//                     </section>
//                 })
//             }
            {/* <iframe width="600" height="450" frameborder="0" 
            src="https://www.google.com/maps/embed/v1/directions?key=&origin=28.416243200345246,-81.5812048967371&destination=28.4199638504,-81.5846422864&waypoints=28.419418,-81.58498&mode=walking"
            allowFullScreen ></iframe> */}
//         </article>
//         </>
//     )
// }
