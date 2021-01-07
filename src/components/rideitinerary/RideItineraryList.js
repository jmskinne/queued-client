import React, {useContext, useEffect, useState} from "react"
import {RideItineraryContext} from "./RideItineraryProvider"
import {WaitContext} from "../wait/WaitProvider"
import {RideContext} from "../ride/RideProvider"
import {ItineraryContext} from "../itinerary/ItineraryProvider"
import {Link} from "react-router-dom"

export const RideItineraryList = (props) => {
    const {createRideItinerary} = useContext(RideItineraryContext)
    const {getMkWait, getEpcotWait, getHsWait, getAkWait} = useContext(WaitContext)
    const {getRideById, addRideFromAPI} = useContext(RideContext)
    const {getItineraryById} = useContext(ItineraryContext)
    
    const itineraryId = parseInt(props.match.params.itineraryId)

    const [parkSelected, setParkSelected ] = useState([])
    const [waitTimes, setWaitTimes] = useState([])
    const [backButton, setBackButton] = useState({})

    useEffect(() => {
        if (parkSelected === 1) {
            getMkWait().then(r => setWaitTimes(r))
        }
        else if (parkSelected === 2) {
            getEpcotWait().then(r => setWaitTimes(r))
        }
        else if (parkSelected === 3) {
            getHsWait().then(r => setWaitTimes(r))
        }
        else if (parkSelected === 4) {
            getAkWait().then(r => setWaitTimes(r))
        }
        else if (parkSelected === 0) {
            getMkWait().then(r => setWaitTimes(r))
        }
        
    }, [parkSelected])

    useEffect(() => {
        getItineraryById(itineraryId).then(r => setBackButton(r))
    }, [])
    
    const rideCheckAndCreateRideItinerary = async (m) => {
        if (m) {
            const rideExists = await getRideById(m.id)
            if (rideExists === false) {
                addRideFromAPI({
                    id : m.id,
                    name : m.name,
                    lat : m.meta.latitude,
                    longitude : m.meta.longitude
                }).then(() => 
                        createRideItinerary({
                            itinerary_id : itineraryId,
                            ride_id : m.id,
                            order : 1
                }))
            } else {
                createRideItinerary({
                    itinerary_id : itineraryId,
                    ride_id : m.id,
                    order : 1
                
            })
            
        }
        
    }}

    return (
        <>
        <div class="bg-warm-grey-200">
            <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
                <div class="lg:text-center">
                    <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-warm-grey-900 sm:text-4xl">
                        Wait Times
                    </p>
                    <div class="rounded-md mt-4 mb-4">
                        <button onClick={() => setParkSelected(1)} 
                            class="mr-4 px-8 py-3 border-warm-grey-900 border-transparent text-base font-medium rounded-md text-warm-grey-900 bg-lime-green-400 hover:bg-lime-green-900 hover:text-warm-grey-050 md:py-4 md:text-lg md:px-10">
                            Magic Kingdom
                        </button>
                        <button onClick={() => setParkSelected(2)} 
                            class="mr-4 px-8 py-3 border-warm-grey-900 border-transparent text-base font-medium rounded-md text-warm-grey-900 bg-lime-green-400 hover:bg-lime-green-900 hover:text-warm-grey-050 md:py-4 md:text-lg md:px-10">
                            Epcot
                        </button>
                        <button onClick={() => setParkSelected(3)} 
                            class="mr-4 px-8 py-3 border-warm-grey-900 border-transparent text-base font-medium rounded-md text-warm-grey-900 bg-lime-green-400 hover:bg-lime-green-900 hover:text-warm-grey-050 md:py-4 md:text-lg md:px-10">
                            Hollywood Studios
                        </button>
                        <button onClick={() => setParkSelected(4)} 
                            class="mr-4 px-8 py-3 border-warm-grey-900 border-transparent text-base font-medium rounded-md text-warm-grey-900 bg-lime-green-400 hover:bg-lime-green-900 hover:text-warm-grey-050 md:py-4 md:text-lg md:px-10">
                            Animal Kingdom
                        </button>
                    </div>
                    <div class="flex flex-wrap items-center justify-center">
                        {
                            waitTimes.map(w => {
                                return <div class="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3">
                                           <div class="bg-yellow-vivid-050 shadow-xl rounded-lg overflow-hidden" key={w.id}>
                                                <div class= "flex justify-between p-4 border-b">
                                                    <p class="uppercase tracking-wide text-lg font-bold text-warm-grey-900 text-center">{w.name}</p>
                                                    
                                                </div>
                                                <div class="flex flex-wrap overflow-hidden xl:-mx-3">
                                                    <div class="w-1/2 overflow-hidden xl:my-3 xl:px-3">
                                                        {
                                                       (w.status === "Closed")
                                                        ?
                                                        <div class="bg-red-700">
                                                            <p class="text-warm-grey-100 text-lg font-bold uppercase">Closed</p>
                                                        </div>
                                                        :
                                                        <p class="uppercase tracking-wide text-lg pt-2 font-bold text-warm-grey-700 text-center">{w.waitTime}</p>
                                                    }
                                                        
                                                    </div>
                                                    <div class="w-1/2 overflow-hidden xl:my-3 xl:px-3">
                                                        <button type="submit" onClick={() => rideCheckAndCreateRideItinerary(w)}>
                                                            <svg class="h6 w-6 text-cyan-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </button>
                                                    
                                                    </div>
                                                </div>
                                            </div> 
                                    </div>
                            })
                        }
                    </div>
                    <button class="bg-cyan-050 hover:bg-cyan-900 text-warm-grey-700 hover:text-warm-grey-050 font-bold py-2 px-4 rounded" onClick={() => props.history.push(`/trips/${backButton.trip_id}`)}>Back</button>
                </div>

            </div>
        </div>
        </>

    )
}

