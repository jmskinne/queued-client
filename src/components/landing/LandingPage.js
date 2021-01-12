import React, {useContext, useEffect} from "react"
import {DateTime} from "luxon"


import {Link} from "react-router-dom"
import {TripContext} from "../trip/TripProvider"
import {RideContext} from "../ride/RideProvider"
import { RideFavoriteContext } from "../ridefavorite/RideFavoriteProvider"

export const LandingPage = (props) => {
    const {threeTrips, getThreeUpcomingTrips} = useContext(TripContext)
    const {sortedRides, getSortedRides} = useContext(RideContext)
    const {rideFavorites, getRideFavoritesByBoolean, rideFavoriteAction} = useContext(RideFavoriteContext)

    useEffect(() => {
        getThreeUpcomingTrips()
        getSortedRides()
        getRideFavoritesByBoolean(1)
    }, [])

    const handleStars = (num) => {
        if(num !== null) {
            let stars = []
            let icons = <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        
            for (let i = 0; i < num; i++) {
                stars.push(<svg class="h-6 w-6 text-yellow-vivid-600 fill-current mr-3"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">{icons}</svg>)
            }
            return stars
        }
    }
    
    

    return (
        <>
        <div class="relative bg-yellow-vivid-100 overflow-hidden">
            <div class="max-w-7xl mx-auto">
                <div class="relative z-10 pb-8 bg-yellow-vivid-100 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <svg class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-yellow-vivid-100 transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>
                    <span class="opacity-0">.</span>
                <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                    <div class="sm:text-center lg:text-left">
                        <h1 class="text-4xl tracking-tight font-extrabold text-warm-grey-900 sm:text-5xl md:text-6xl">
                            <span class="block xl:inline">Welcome to Queue</span>
                            <span class="block text-red-500 lg:inline"> Start Planning Now </span>
                        </h1>         
          
                        <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                            <div class="rounded-md shadow">
                                <button onClick={() => {props.history.push({pathname : "trips/new"})
                                }} class="w-full flex items-center justify-center px-8 py-3 border-warm-grey-900 border-transparent text-base font-medium rounded-md text-warm-grey-900 bg-lime-green-400 hover:bg-lime-green-900 hover:text-warm-grey-050 md:py-4 md:text-lg md:px-10">
                                Get started
                                </button>
                            </div>
                        </div>
                 </div>
                </main>
         </div>
        </div>
        <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1280/720/75/dam/wdpro-assets/gallery/destinations/magic-kingdom/magic-kingdom-gallery00.jpg?1550520271803" alt="" />
        </div>
    </div>
    <div class="py-12 bg-warm-grey-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="lg:text-center">
                <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-warm-grey-900 sm:text-4xl">
                    Upcoming Trips
                </p>
                <p class="mt-4 max-w-2xl text-xl text-warm-grey-700 lg:mx-auto">
                    Get Ready! You're going on vacation!
                </p>
            </div>
        </div>
    </div>
    <div class="bg-warm-grey-200">
    <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
        <div class="flex items-center justify-center">
            {
                threeTrips.map(t => {
                    return <div class="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3">
                            <div class="bg-yellow-vivid-050 shadow-xl rounded-lg overflow-hidden" key={t.id}>
                                <div class= "flex justify-between p-4 border-b">
                                    <p class="uppercase tracking-wide text-lg font-bold text-warm-grey-900">{t.name}
                                    </p>
                                    <Link to={`/trips/${t.id}`}><svg class="h-6 w-6 text-cyan-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg></Link>
                                </div>
                                <div class="flex flex-wrap overflow-hidden xl:-mx-2 justify-center">
                                    <p class="text-lg pt-2 text-warm-grey-900 font-bold text-center">{`\u2022`}  {t.hotel}  {`\u2022`}</p>
                                </div>
                                <div class="flex flex-wrap overflow-hidden xl:-mx-6">
                                    <div class="w-1/2 overflow-hidden xl:my-6 xl:px-6">
                                    <p class="uppercase tracking-wide text-lg pt-2 font-bold text-warm-grey-800 text-center border-r">{DateTime.fromISO(t.date_start).toLocaleString(DateTime.DATE_FULL)}</p>
                                    </div>
                                    <div class="w-1/2 overflow-hidden xl:my-6 xl:px-6">
                                    <p class="uppercase tracking-wide text-lg pt-2 font-bold text-warm-grey-800 text-center border-l">{DateTime.fromISO(t.date_end).toLocaleString(DateTime.DATE_FULL)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })

            }
        </div>
    </div>
        
        <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8 mt-12">
        <div class="lg:text-center">
                <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-warm-grey-900 sm:text-4xl mb-6">
                    Your Favorite Rides
                </p>
            </div>
            <div class="flex flex-wrap items-center justify-center">
                {
                    rideFavorites.map(rf => {
                        return <div class="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3">
                            <div class="bg-yellow-vivid-050 shadow-xl rounded-lg overflow-hidden" key={rf.id}>
                                <div class= "flex justify-between p-4 border-b">
                                    
                                    {
                                        (rf.favorite) 
                                        ? 
                                        <button onClick={() => {rideFavoriteAction(rf.ride_id, true)}}>
                                            <svg class="h-6 w-6 text-red-600 fill-current mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                            </svg>
                                        </button>
                                        :
                                        <button onClick={() => {rideFavoriteAction(rf.ride_id, true)}}>
                                            <svg class="text-warm-grey-500 h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                        
                                    }
                                    <p class="uppercase tracking-wide text-lg font-bold text-warm-grey-900">{rf.ride.name}</p>
                                    <Link to={`/rides/${rf.ride_id}`}><svg class="h-6 w-6 text-cyan-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg></Link>

                                </div>
                                <div class="flex flex-wrap overflow-hidden xl:-mx-2">
                                    <div class="w-full overflow-hidden xl:my-2 xl:px-2">
                                        {               
                                            (rf.ride.average_rating === null) ? 
                                            <p class="tracking-wide text-lg pt-2 font-bold text-warm-grey-700 text-center">Be the First to Review</p>
                                            : 
                                            <p class="uppercase tracking-wide text-4xl pt-2 font-bold text-warm-grey-700 text-center">{Math.round(rf.ride.average_rating).toFixed(1)}</p>

                                        }
                                        <div class="flex justify-center pt-1">
                                            {
                                                (rf.ride.average_rating === null) ? 
                                                ''
                                                :
                                                handleStars(Math.round(rf.ride.average_rating))
                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-center pt-1 mb-2">
                                            {
                                                (rf.ride_id.includes('Magic')) ? 
                                                <div class="text-xs px-3 bg-red-500 text-warm-grey-050 rounded-full p-0.5" >Magic Kingdom</div> 
                                                : 
                                                ''
                                            }
                                            {
                                                (rf.ride_id.includes('Animal')) ? 
                                                <div class="text-xs px-3 bg-lime-green-300 text-warm-grey-800 rounded-full p-0.5" >Animal Kingdom</div> 
                                                : 
                                                ''
                                            }
                                            {
                                                (rf.ride_id.includes('Epcot')) ? 
                                                <div class="text-xs px-3 bg-cyan-300 text-warm-grey-800 rounded-full p-0.5" >Epcot</div> 
                                                : 
                                                ''
                                            }
                                            {
                                                (rf.ride_id.includes('Hollywood')) ? 
                                                <div class="text-xs px-3 bg-yellow-vivid-300 text-warm-grey-800 rounded-full p-0.5" >Hollywood Studios</div> 
                                                : 
                                                ''
                                            }
                                        
                                        </div>
                            </div>
                        </div>
                        })
                }
            
        </div>
        
        </div>
        <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8 mt-12">
        <div class="lg:text-center">
                <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-warm-grey-900 sm:text-4xl mb-6">
                    Top Rated Rides
                </p>
            </div>
            <div class="flex items-center justify-center">
                {
                    sortedRides.map(r => {
                        return <div class="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3">
                            <div class="bg-yellow-vivid-050 shadow-xl rounded-lg overflow-hidden" key={r.ride}>
                                <div class= "flex justify-between p-4 border-b">
                                    
                                    {
                                        (rideFavorites.find(f => f.ride_id === r.ride)) 
                                        ? 
                                        <button onClick={() => {rideFavoriteAction(r.ride, true)}}>
                                            <svg class="h-6 w-6 text-red-600 fill-current mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                            </svg>
                                        </button>
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
                                            (r.average_rating === null) ? '' : <p class="uppercase tracking-wide text-4xl pt-2 font-bold text-warm-grey-700 text-center">{Math.round(r.average_rating).toFixed(1)}</p>

                                        }
                                        <div class="flex justify-center pt-1">
                                            {
                                                (r.average_rating === null) ? 
                                                <p class="tracking-wide text-lg pt-2 font-bold text-warm-grey-700 text-center">Be the First to Review</p>
                                                :
                                                handleStars(Math.round(r.average_rating))
                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-center pt-1 mb-2">
                                            {
                                                (r.ride.includes('Magic')) ? 
                                                <div class="text-xs px-3 bg-red-500 text-warm-grey-050 rounded-full p-0.5" >Magic Kingdom</div> 
                                                : 
                                                ''
                                            }
                                            {
                                                (r.ride.includes('Animal')) ? 
                                                <div class="text-xs px-3 bg-lime-green-300 text-warm-grey-800 rounded-full p-0.5" >Animal Kingdom</div> 
                                                : 
                                                ''
                                            }
                                            {
                                                (r.ride.includes('Epcot')) ? 
                                                <div class="text-xs px-3 bg-cyan-300 text-warm-grey-800 rounded-full p-0.5" >Epcot</div> 
                                                : 
                                                ''
                                            }
                                            {
                                                (r.ride.includes('Hollywood')) ? 
                                                <div class="text-xs px-3 bg-yellow-vivid-300 text-warm-grey-800 rounded-full p-0.5" >Hollywood Studios</div> 
                                                : 
                                                ''
                                            }
                                        
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