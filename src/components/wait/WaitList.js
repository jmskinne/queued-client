import React, {useContext, useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {WaitContext} from "./WaitProvider"
import {RideContext} from "../ride/RideProvider"

export const WaitList = (props) => {
    const {getMkWait, getEpcotWait, getHsWait, getAkWait} = useContext(WaitContext)
    const {getRideById, addRideFromAPI} = useContext(RideContext)

    const [parkSelected, setParkSelected ] = useState([])
    const [waitTimes, setWaitTimes] = useState([])

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

    

    const rideCheck = async (m) => {
        if (m) {
            const rideExists = await getRideById(m.id)
            if (rideExists === false) {
                addRideFromAPI({
                    id : m.id,
                    name : m.name,
                    lat : m.meta.latitude,
                    longitude : m.meta.longitude
                    
                }).then(props.history.push(`/rides/${m.id}`))
            } else {
                props.history.push(`/rides/${m.id}`)
            }
            
        }
        
    }

    return (
        <>
        <div class="bg-warm-grey-050">
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
                                                    <p class="uppercase tracking-wide text-lg font-bold text-warm-grey-900">{w.name}</p>
                                                    <Link to={`/rides/${w.id}`} onClick={() => {rideCheck(w)}}>
                                                        <svg class="h-6 w-6 text-cyan-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                                <div class="flex flex-wrap overflow-hidden xl:-mx-2">
                                                    <div class="w-full overflow-hidden xl:my-2 xl:px-2">
                                                    {
                                                       (w.status === "Closed")
                                                        ?
                                                        <div class="bg-red-700">
                                                            <p class="text-warm-grey-900 text-lg font-bold uppercase">Closed</p>
                                                        </div>
                                                        :
                                                        <p class="uppercase tracking-wide text-lg pt-2 font-bold text-warm-grey-700 text-center">{w.waitTime}</p>
                                                    }
                                                </div>
                                                </div>
                                            </div> 
                                    </div>
                            })
                        }
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}

