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
       <form className="tripForm">
           <fieldset>
               <div>
                   <label htmlFor="name">Trip Name:</label>
                   <input type="text" ref={name} name="name" required autoFocus value={trip.name} onChange={tripHandler} />
               </div>
           </fieldset>
           <fieldset>
               <div>
                   <label htmlFor="hotel">Hotel:</label>
                   <input type="text" ref={hotel} name="hotel" required autoFocus value={trip.hotel} onChange={tripHandler} />
               </div>
           </fieldset>
           <fieldset>
               <div>
                   <label htmlFor="date_start">Vacation Start:</label>
                   <input type="date" ref={date_start} name="date_start" required autoFocus value={trip.date_start} onChange={tripHandler} />
               </div>
           </fieldset>
           <fieldset>
               <div>
                   <label htmlFor="date_end">Vacation End:</label>
                   <input type="date" ref={date_end} name="date_end" required autoFocus value={trip.date_end} onChange={tripHandler} />
               </div>
           </fieldset>
           <button type="submit"
                onClick={e => {
                    e.preventDefault()
                    saveTrip()
                }}
                className="btn btn-form">

                    {editMode ? "Update Trip" : "Save Trip" }
            </button>
           
           
           
       </form>
   )
}