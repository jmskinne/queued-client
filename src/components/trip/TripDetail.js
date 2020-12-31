import {DateTime, Interval} from "luxon"
import React, {useContext, useEffect, useState} from 'react'
import {TripContext} from "./TripProvider"
import {ItineraryContext} from "../itinerary/ItineraryProvider"

import {RideItineraryContext} from "../rideitinerary/RideItineraryProvider"


export const TripDetail = (props) => {
    const {getRideItinerariesByItineraryId, rideItinerariesByDailyItinerary, deleteRideItinerary} = useContext(RideItineraryContext)
    const {getTripById} = useContext(TripContext)
    const {getItinerariesByTrip, tripItineraries, createItinerary} = useContext(ItineraryContext)

    const [trip, setTrip] = useState({})
    const [tripDates, setTripDates] = useState([])
    const [selectedDate, setDateFilter] = useState(0)
    const [check, setCheck] = useState([])

    const tripId = parseInt(props.match.params.tripId)

    useEffect(() => {
        getTripById(tripId).then(setTrip)
        getItinerariesByTrip(tripId)
    }, [])

    useEffect(() => {
        if(selectedDate != "0") {
            getRideItinerariesByItineraryId(parseInt(selectedDate))
        }
    }, [selectedDate])

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

    

    useEffect(() => {
        const checkDates = tripDates.filter(d => tripItineraries.some(i => DateTime.fromISO(i.park_date).toLocaleString() === d))
        setCheck(checkDates)
    }, [tripDates])


    useEffect(() => {
        if (check.length !== tripDates.length) {
            tripDates.forEach(d => {
                createItinerary({
                    park_date : new Date(d),
                    trip_id : parseInt(props.match.params.tripId)
                    })
                })
            } else {
                console.log("equal") 
        }
                    
          
    },[check])

    return (
        <>
        <div>
            <h1>{trip.name}</h1>
            <div>{trip.hotel}</div>
            <div>{trip.date_start}</div>
            <div>{trip.date_end}</div>
        </div>
        
            <article>
                    <h3>Park Days</h3>
                    <div>
                        <button onClick={() => props.history.push(`/rideitineraries/itinerary/${selectedDate}`)}>Add Rides</button>
                        <select className="date_filter" onChange={e => {
                            //filter is the itinerary id
                            const filter = e.target.value
                            setDateFilter(filter)
                        }}>
                            <option value="0">Select Park Date</option>
                            {
                                tripItineraries.map(t => (
                                    <option key={t.id} value={t.id}>
                                        {DateTime.fromISO(t.park_date).toLocaleString()}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    {
                    rideItinerariesByDailyItinerary.map(r => {
                        return <section key={r.id}>
                            <div>{r.ride.name}</div>
                            <div>{r.order}</div>
                            <button onClick={() => deleteRideItinerary(r)}>Delete</button>
                    </section>
                })
            }
                    
            </article>
        </>
    )
}





