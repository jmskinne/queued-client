import React, {useContext, useEffect, useState} from "react"
import {DateTime} from "luxon"

import {Link} from "react-router-dom"
import {TripContext} from "../trip/TripProvider"
import {RideContext} from "../ride/RideProvider"

export const LandingPage = (props) => {
    const {threeTrips, getThreeUpcomingTrips} = useContext(TripContext)
    const {sortedRides, getSortedRides} = useContext(RideContext)

    useEffect(() => {
        getThreeUpcomingTrips()
        getSortedRides()
        
    }, [])

    return (
        <>
        <div class="relative bg-white overflow-hidden">
            <div class="max-w-7xl mx-auto">
                <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <svg class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>
                    <span class="opacity-0">.</span>
                <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                    <div class="sm:text-center lg:text-left">
                        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span class="block xl:inline">Welcome to Queue</span>
                            <span class="block text-indigo-600 lg:inline"> Start Planning Now </span>
                        </h1>         
          
                        <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                            <div class="rounded-md shadow">
                                <button onClick={() => {props.history.push({pathname : "trips/new"})
                                }} class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
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
    <div class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="lg:text-center">
                <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Upcoming Trips
                </p>
                <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                    Get Ready! You're going on vacation!
                </p>
            </div>
        </div>
    </div>
    <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
        <div class="flex items-center justify-center">
            {
                threeTrips.map(t => {
                    return <div class="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3">
                            <div class="bg-yellow-100 shadow-xl rounded-lg overflow-hidden" key={t.id}>
                                <div class= "flex justify-between p-4 border-b">
                                    <p class="uppercase tracking-wide text-lg font-bold text-gray-700"><Link to={`/trips/${t.id}`}>{t.name}</Link></p>
                                    <div>{t.hotel}</div>
                                    <div>{t.date_start}</div>
                                    <div>{t.date_end}</div>
                                </div>
                            </div>
                            </div>
                        })
            }
        </div>
    </div>
        
        <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
            <div class="flex items-center justify-center">
                {
                    sortedRides.map(r => {
                        return <div class="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3">
                            <div class="bg-yellow-100 shadow-xl rounded-lg overflow-hidden" key={r.ride}>
                                <div class= "flex justify-between p-4 border-b">
                                    <p class="uppercase tracking-wide text-lg font-bold text-gray-700"><Link to={`/rides/${r.ride}`}>{r.name}</Link></p>
                                    <svg class="h-6 w-6 text-gray-600 fill-current mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                    </svg>
                                </div>
                                <div class="flex flex-wrap overflow-hidden xl:-mx-2">
                                    <div class="w-full overflow-hidden xl:my-2 xl:px-2">
                                        {               
                                            (r.average_rating === null) ? '' : <p class="uppercase tracking-wide text-4xl pt-2 font-bold text-gray-700 text-center">{(r.average_rating * 2).toFixed() / 2}</p>

                                        }
                                        <div class="flex justify-center pt-1">
                                            <svg class="h-6 w-6 text-gray-600 fill-current mr-3"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        })
                }
            
        </div>
        </div>
            
        
        </>
    )
    

}