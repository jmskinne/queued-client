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

    //logic to saveTrip if(edit) update : create
}