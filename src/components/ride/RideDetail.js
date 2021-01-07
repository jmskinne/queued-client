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

    // return (
    //     <>
    //     <div>
    //         <h1>{ride.name}</h1>
    //         <button onClick={() => props.history.push(`/ridereviews/new/${props.match.params.rideId}`)
    //         }>
    //             New Review
    //         </button>
    //     </div>
    //     <h3>Reviews</h3>
    //     <article>
    //         {
    //             rideReviews.map(r => {
    //                 return <section key={r.id}>
    //                 <div>{r.review}</div>
    //                 {
    //                     (profile[0]?.user.id === r.reviewer?.user.id) ? 
    //                     <>
    //                     <button onClick={() => props.history.push(`/ridereviews/edit/${r.id}`)}>Edit</button>
    //                     <button onClick={() => deleteRideReview(r)}>Delete</button>
    //                     </>
    //                     :
    //                     ''
    //                 }
                    
    //                 </section>
    //             })
    //         }
    //     </article>
    //     <button onClick={() => props.history.push(`/rides`)}>Back</button>
    //     </>
    // )
    return (
        <>
        <div class="bg-warm-grey-200">
            <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
                <div class="lg:text-center">
                    
                        <p class="text-2xl leading-8 font-extrabold  text-warm-grey-900 sm:text-4xl"> {ride.name} </p>
                        <div class="rounded-md mt-4 mb-4">
                        <button onClick={() => props.history.push(`/ridereviews/new/${props.match.params.rideId}`)
                            } class="px-8 py-3 border-warm-grey-900 border-transparent text-base font-medium rounded-md text-warm-grey-900 bg-lime-green-400 hover:bg-lime-green-900 hover:text-warm-grey-050 md:py-4 md:text-lg md:px-10">
                            Review This Ride
                            </button>
                        </div>
                        <div class="flex flex-wrap items-center justify-center xl:-mx-4">
                            
                            {
                                rideReviews.map(r => {
                                    return <div class="w-full sm:w-1/2 lg:w-1/2 py-6 px-3">
                                             <div class="bg-yellow-vivid-050 shadow-xl rounded-lg overflow-hidden"  key={r.id}>
                                                  <div class="flex flex-wrap overflow-hidden">
                                                    <div class="w-full overflow-hidden">  
                                                        <p class="tracking-wide text-lg  text-warm-grey-900 text-left p-3">{r.review}</p>
                                                    </div>
                                                    </div>
                                                    <div class="flex overflow-hidden border-t px-2 items-baseline mb-4">
                                                        <div class="w-4/12 overflow-hidden text-left">
                                                            {
                                                               (profile[0]?.user.id === r.reviewer?.user.id) 
                                                               ? 
                                                                <>
                                                                <button onClick={() => props.history.push(`/ridereviews/edit/${r.id}`)}>
                                                                    <svg class="h6 w-6 text-cyan-600 ml-3 mt-2 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    </svg>
                                                                </button>                                                    
                                                                <button onClick={() => deleteRideReview(r)}>
                                                                    <svg class="h6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                </button>
                                                                </>
                                                                :
                                                                ''
                                                            }
                                                    
                                                        </div>
                                                        <div class="w-4/12 overflow-hidden ">
                                                            <p class="tracking-wide text-2xl  font-bold text-warm-grey-600 text-center mt-2">Rating: {r.rating}</p>
                                                        </div>
                                                        <div class="w-4/12 overflow-hidden">
                                                            <p class="text-warm-grey-300 mt-2">Reviewer: {r.reviewer?.user.username}</p>
                                                        </div>
    
                                                    </div>
                                                </div>
                                            </div>
                                            


                                })
                            }
                        </div>
                        <div>
                        <button class="bg-cyan-050 hover:bg-cyan-900 text-warm-grey-700 hover:text-warm-grey-050 font-bold py-2 px-4 rounded" onClick={() => props.history.push(`/rides`)}>Back</button>
                        </div>
                    
                </div>
            </div>
        </div>

        </>
    )
}