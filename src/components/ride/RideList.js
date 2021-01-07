
import React, {useContext, useEffect, useState} from "react"
import {Link} from "react-router-dom"
import { RideFavoriteContext } from "../ridefavorite/RideFavoriteProvider"
import {RideContext} from "./RideProvider"


export const RideList = (props) => {
    const {rides, getRides, getRideBySearch} = useContext(RideContext)
    const {rideFavoriteAction, getRideFavoritesByBoolean, rideFavorites} = useContext(RideFavoriteContext)
    const [filteredRides, setFilteredRides] = useState([])
    const [searchRides, setRideSearch] = useState('')
    
    useEffect(() => {
        getRides()
    }, [])

    useEffect(() => {
        getRideFavoritesByBoolean(1)
    },[])

    useEffect(() => {
        if (searchRides !== "") {
            getRideBySearch(searchRides).then(r => setFilteredRides(r))
        
        } else {
            setFilteredRides(rides)
        }
    }, [searchRides, rides])

    return (
        <>
        <div class="bg-warm-grey-200">
            <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8 mt-12">
                <div class="lg:text-center">
                    <div class="mt-2 mb-6 flex justify-center">
                        <p class="text-2xl leading-8 font-extrabold  text-warm-grey-900 sm:text-4xl">Ride Search:<span class="mr-4"></span> </p>
                        <input type="text" className="h-10 w-80 pr-8 pl-5 rounded-md z-0 focus:shadow focus:outline-none"
                            onKeyUp={e => setRideSearch(e.target.value)}
                            placeholder="Search for an attraction" />
                    </div>
                </div>
            
                <div class="lg:text-center">
                    <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-warm-grey-900 sm:text-4xl mb-6">
                        Rides
                    </p>
                </div>
                <div class="flex flex-wrap items-center justify-center">
                    {
                        filteredRides.map(r => {
                            return <div class="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3">
                                        <div class="bg-yellow-vivid-050 shadow-xl rounded-lg overflow-hidden" key={r.ride}>
                                            <div class= "flex justify-between p-4 border-b">
                                        
                                                {
                                                    (rideFavorites.find(f => f.ride_id === r.ride)) 
                                                    ? 
                                                    <button onClick={() => {rideFavoriteAction(r.ride, true)}}>
                                                    <svg class="h-6 w-6 text-red-600 fill-current mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                                    </svg></button>
                                                    :
                                            
                                                    <button onClick={() => {rideFavoriteAction(r.ride, true)}}>
                                                        <svg class="text-warm-grey-500 h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                        </svg>
                                                    </button>
                                            
                                                }

                                                <p class="uppercase tracking-wide text-lg font-bold text-warm-grey-900">{r.name}</p>
                                        
                                                <Link to={`/rides/${r.ride}`}><svg class="h-6 w-6 text-cyan-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg></Link>

                                            </div>
                                            
                                            <div class="flex flex-wrap overflow-hidden xl:-mx-2">
                                                <div class="w-full overflow-hidden xl:my-2 xl:px-2">
                                            {               
                                                (r.average_rating === null) 
                                                ?
                                                <p class="tracking-wide text-lg pt-2 font-bold text-warm-grey-700 text-center">Be the First to Review</p>  
                                                : 
                                                <p class="uppercase tracking-wide text-4xl pt-2 font-bold text-warm-grey-700 text-center">{Math.round(r.average_rating).toFixed(1)}</p>

                                            }
                                            <div class="flex justify-center pt-1">
                                                {
                                                    (r.average_rating === null) ? 
                                                    ''
                                                    :
                                                    ''
                                                    //iterate stars based on rating
                                                    // <svg class="h-6 w-6 text-gray-600 fill-current mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    // </svg>
                                                }
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        })
                    }
            
                </div>
            </div>
        </div>

        </>
    )



}

