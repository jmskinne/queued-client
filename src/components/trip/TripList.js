import React, {useContext, useEffect} from "react"
import {Link} from "react-router-dom"
import {TripContext} from "./TripProvider"
import {DateTime} from "luxon"

export const TripList = (props) => {
    const {trips, getTrips, deleteTrip} = useContext(TripContext)

    useEffect(() => {
        getTrips()
    }, [])

    return (
        <>
        <div class="bg-warm-grey-200 h-screen">
            <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
                <div class="lg:text-center">
                    <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-warm-grey-900 sm:text-4xl">
                        Upcoming Trips
                    </p>
                    <div class="rounded-md mt-4 mb-4">
                        <button onClick={() => {props.history.push({pathname : "trips/new"})
                            }} class="px-8 py-3 border-warm-grey-900 border-transparent text-base font-medium rounded-md text-warm-grey-900 bg-lime-green-400 hover:bg-lime-green-900 hover:text-warm-grey-050 md:py-4 md:text-lg md:px-10">
                            Get Started on Your Next Trip
                            </button>
                    </div>
                    
                </div>
                
                <div class="flex flex-wrap items-center justify-center">
                    {
                        trips.map(t => {
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
                                        <div class="flex flex-wrap overflow-hidden xl:-mx-1">
                                            <div class="w-5/12 overflow-hidden xl:my-1 xl:px-1">
                                            <p class="uppercase tracking-wide text-lg pt-2 font-bold text-warm-grey-500 text-center border-r">{DateTime.fromISO(t.date_start).toLocaleString(DateTime.DATE_FULL)}</p>
                                            </div>
                                            <div class="w-2/12 overflow-hidden xl:my-1 xl:px-1">
                                                <div class="flex flex-wrap overflow-hidden xl:-mx-1">

                                                    <div class="w-full overflow-hidden xl:my-1 xl:px-1 flex justify-center ">
                                                        <button onClick={() => props.history.push(`/trips/edit/${t.id}`)}>
                                                            <svg class="h6 w-6 text-cyan-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    <div class="w-full overflow-hidden xl:my-1 xl:px-1 flex justify-center">
                                                        <button onClick={() => deleteTrip(t)}>
                                                            <svg class="h6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                </div>
                                            
                                            </div>
                                            <div class="w-5/12 overflow-hidden xl:my-1 xl:px-1">
                                            <p class="uppercase tracking-wide text-lg pt-2 font-bold text-warm-grey-500 text-center border-l">{DateTime.fromISO(t.date_end).toLocaleString(DateTime.DATE_FULL)}</p>
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

