import React, {useContext, useEffect, useRef, useState} from "react"
import {TripContext} from "./TripProvider"

export const TripForm = (props) => {
    const {createTrip, updateTrip, getTripById} = useContext(TripContext)

    const [trip, setTrip] = useState({})


    const name = useRef(null)
    const hotel = useRef(null)
    const date_start = useRef(null)
    const date_end = useRef(null)

    const editMode = props.match.params.hasOwnProperty("tripId")

    useEffect(() => {
        if(editMode) {
            const tripId = parseInt(props.match.params.tripId)
            getTripById(tripId).then(r => setTrip(r))
        }
    }, [])

    const tripHandler = (e) => {
        const newTrip = {...trip}
        newTrip[e.target.name] = e.target.value
        setTrip(newTrip)
    }

   const saveTrip = () => {
       if(editMode) {
           updateTrip(parseInt(props.match.params.tripId), {
               name : trip.name,
               hotel : trip.hotel,
               date_start : trip.date_start,
               date_end : trip.date_end,
               vacationer_id : trip.vacationer_id
           }).then(props.history.push(`/trips/${trip.id}`))
       } else {
           createTrip({
                name : trip.name,
                hotel : trip.hotel,
                date_start : trip.date_start,
                date_end : trip.date_end
           }).then(props.history.push("/trips"))
       }
   }

   return (
    <div class="bg-warm-grey-200">
    <div class="text-center">
        <p class="text-warm-grey-900 text-4xl font-bold pt-3">Start Your Next Vacation</p>
    </div>
    <div class="flex flex-wrap items-center justify-center">
        <form class="w-full max-w-lg mt-12">
            
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-warm-grey-700 text-xs font-bold mb-2" for="name">
                    Trip Name
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name" type="text" ref={name} name="name" value={trip.name} onChange={tripHandler} />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-warm-grey-700 text-xs font-bold mb-2" for="hotel">
                    Hotel
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                id="hotel" type="text" ref={hotel} name="hotel" value={trip.hotel} onChange={tripHandler}  />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-warm-grey-700 text-xs font-bold mb-2" for="date_start">
                    Arrival
                </label>
                <input class="w-full pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium" 
                id="date_start" type="date" ref={date_start} name="date_start" value={trip.date_start} onChange={tripHandler}  />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-warm-grey-700 text-xs font-bold mb-2" for="date_end">
                    Departure
                </label>
                <input class="w-full pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium" 
                id="date_end" type="date" ref={date_end} name="date_end" value={trip.date_end} onChange={tripHandler}  />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3 flex justify-center">
                <button class="px-8 py-3 border-warm-grey-900 border-transparent text-base font-medium 
                rounded-md text-warm-grey-900 bg-lime-green-400 hover:bg-lime-green-900 hover:text-warm-grey-050" 
                type="submit" onClick={e => {
                    e.preventDefault()
                    saveTrip()
                }}>
                    {editMode ? "Update Trip" : "Submit Trip"}
                </button>
                
                
            </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3 flex justify-center">
            <button class="bg-cyan-050 hover:bg-cyan-900 text-warm-grey-700 hover:text-warm-grey-050 font-bold py-2 px-4 rounded" 
            onClick={() => {
                if(editMode) {
                    props.history.push(`/trips/${trip.id}`)
                } else {
                props.history.push(`/trips`)}
            }}
                >Back</button>
            </div>
            </div>
        </form>
    </div>
</div>
   )
}