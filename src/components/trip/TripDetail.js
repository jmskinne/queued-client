import {DateTime, Interval} from "luxon"
import React, {useContext, useEffect, useState} from 'react'
import { unstable_concurrentAct } from "react-dom/test-utils"


import {TripContext} from "./TripProvider"

export const TripDetail = (props) => {
    const {getTripById} = useContext(TripContext)

    const [trip, setTrip] = useState({})
    const [tripDates, setTripDates] = useState([])

    useEffect(() => {
        const tripId = parseInt(props.match.params.tripId)
        getTripById(tripId).then(setTrip)
    }, [])

    

    useEffect(() => {
        function* days(interval) {
            let cursor = interval.start?.startOf("day")
            while (cursor < interval.end + 1) {
                yield cursor
                cursor = cursor.plus({days : 1})
            }
        }
        const start = DateTime.fromISO(`${trip.date_start}`)
        const end = DateTime.fromISO(`${trip.date_end}`)
        let interval = Interval.fromDateTimes(start,end)
        
        let dateArr = []
        for (var d of days(interval)) {
            dateArr.push(d.toLocaleString())
        }
        setTripDates(dateArr)
    }, [trip])
    
    return (
        <>
        <div>
            <h1>{trip.name}</h1>
            <div>{trip.hotel}</div>
            <div>{trip.date_start}</div>
            <div>{trip.date_end}</div>
        </div>
        <h3>Daily Itinerary</h3>
            <form>
                <fieldset>
                    <label htmlFor="park_date">Trip Date:</label>
                    <select name="park_date" value={trip.park_date} >
                        <option value="0">Select Date</option>
                    
                        {
                            tripDates.map(d => {
                                return <option value={d}>
                                    {d}
                                </option>
                                })
                        }
                    </select>
                </fieldset>
            </form>
        </>
    )
}