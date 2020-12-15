import React, {useContext, useEffect, useState} from 'react'
import {TripContext} from "./TripProvider"

export const TripDetail = (props) => {
    const {getTripById} = useContext(TripContext)

    const [trip, setTrip] = useState({})

    useEffect(() => {
        const tripId = parseInt(props.match.params.tripId)
        
        getTripById(tripId).then(setTrip)
    }, [])

    useEffect(() => {
        console.log(trip)
    })

    return (
        <div>
            <h1>{trip.name}</h1>
            <div>{trip.hotel}</div>
            <div>{trip.date_start}</div>
            <div>{trip.date_end}</div>
        </div>
    )
}