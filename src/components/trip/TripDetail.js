import {DateTime, Interval} from "luxon"
import React, {useContext, useEffect, useState} from 'react'
import {TripContext} from "./TripProvider"
import {ItineraryContext} from "../itinerary/ItineraryProvider"

export const TripDetail = (props) => {
    const {getTripById} = useContext(TripContext)
    const {createItinerary, updateItinerary, getItineraryById} = useContext(ItineraryContext)

    const [trip, setTrip] = useState({})
    const [tripDates, setTripDates] = useState([])
    const [itinerary, setItinerary] = useState({})

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

    const editMode = props.match.params.hasOwnProperty("itineraryId")

    useEffect(() => {
        if(editMode) {
            const itineraryId = parseInt(props.match.params.itineraryId)
            getItineraryById(itineraryId).then(r => setItinerary(r))
        }
    }, [])

    const itineraryHandler = (e) => {
        const newItinerary = {...itinerary}
        newItinerary[e.target.name] = e.target.value
        setItinerary(newItinerary)
    }

    const saveItinerary = () => {
        if(editMode) {
            updateItinerary(parseInt(props.match.params.itineraryId), {
                park_date : itinerary.park_date,
                trip_id : itinerary.trip_id,
            }).then(props.history.push(`/trips/${itinerary.trip_id}`))
        } else {
            const testDate = new Date(itinerary.park_date)
            createItinerary({
                
                park_date : testDate.toISOString(),
                trip_id : parseInt(props.match.params.tripId)
            }).then(props.history.push(`/trips/${parseInt(props.match.params.tripId)}`))
        }
    }
    
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
                    <select name="park_date" value={itinerary.park_date} onChange={itineraryHandler}>
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
                <button type="submit" onClick={e => {e.preventDefault() 
                    saveItinerary()}}>{editMode ? "Update" : "Save"}</button>
            </form>
        </>
    )
}