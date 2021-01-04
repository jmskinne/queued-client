import {DateTime, Interval} from "luxon"
import React, {useContext, useEffect, useState} from 'react'
import {TripContext} from "./TripProvider"
import {ItineraryContext} from "../itinerary/ItineraryProvider"

import {RideItineraryContext} from "../rideitinerary/RideItineraryProvider"

import {RideFavoriteContext} from "../ridefavorite/RideFavoriteProvider"

import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

import "./Trip.css"


export const TripDetail = (props) => {
    const {getRideItinerariesByItineraryId, rideItinerariesByDailyItinerary, deleteRideItinerary, updateRideItinerary} = useContext(RideItineraryContext)
    const {getTripById} = useContext(TripContext)
    const {getItinerariesByTrip, tripItineraries, createItinerary} = useContext(ItineraryContext)
    const {createRideFavorite, getRideFavoritesByBoolean, rideFavorites, updateRideFavorite, rideFavoriteAction} = useContext(RideFavoriteContext)

    const [trip, setTrip] = useState({})
    const [tripDates, setTripDates] = useState([])
    const [selectedDate, setDateFilter] = useState(0)
    const [check, setCheck] = useState([])
    const [tripLength, setTripLength] = useState(0)
    const [rideOrder, updateRideOrder] = useState([])
   

    

    const tripId = parseInt(props.match.params.tripId)

    useEffect(() => {
        getTripById(tripId).then(setTrip)
        getItinerariesByTrip(tripId).then(setTripLength(tripItineraries.length))
        
    }, [tripId])

    useEffect(() => {
        getRideItinerariesByItineraryId(parseInt(selectedDate)).then(r => updateRideOrder(r))
    },[selectedDate])

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
        //not really necessary b/c was taken care of on the backend
        const checkDates = tripDates.filter(d => !tripItineraries.some(i => DateTime.fromISO(i.park_date).toLocaleString() === d))
        setCheck(checkDates)
    }, [tripDates])


    useEffect(() => {
        if (check.length !== tripDates.length && tripLength === 0) {
            tripDates.forEach(d => {
                createItinerary({
                    park_date : new Date(d),
                    trip_id : parseInt(props.match.params.tripId)
                    })
                })
            } 
    },[tripDates])

    useEffect(() => {
        getRideFavoritesByBoolean(1)
    }, [rideItinerariesByDailyItinerary])

    const handleDragEnd = (result) => {
        if(!result.destination) return;
        const items = Array.from(rideOrder)
        const [rideReordered] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, rideReordered)
        updateRideOrder(items)
    }

    const handleSaveOrder = async (r, index) => {
        await updateRideItinerary(r.id, index + 1)
    }

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
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="theRide">
                            {(provided) => (
                                <div className="ride_order" {...provided.droppableProps} ref={provided.innerRef}>
                                    {
                                        rideOrder.map((r, index) => {
                                            return <Draggable key={r.id} draggableId={r.ride_id} index={index} onClick={handleSaveOrder(r, index)}>
                                                {(provided) => (
                                                    <section className="ride" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <div>{r.ride.name}</div>
                                                        <button onClick={() => deleteRideItinerary(r).then(() => getRideItinerariesByItineraryId(selectedDate)).then(r => updateRideOrder(r))}>Delete</button>
                                                        
                                                        {
                                                            (r.ride?.average_rating === null) ? <div></div> : <div>Rating: {(r.ride?.average_rating * 2).toFixed() / 2}</div>
                                                        }
                                                        
                                                        {
                                                            rideFavorites.find(f => f.ride_id === r.ride_id) ?
                                                            <button onClick={() => {rideFavoriteAction(r.ride_id, true).then(() => getRideItinerariesByItineraryId(selectedDate)).then(r => updateRideOrder(r))}}>UnFav</button>
                                                            :
                                                            <button onClick={() => {rideFavoriteAction(r.ride_id, true).then(() => getRideItinerariesByItineraryId(selectedDate)).then(r => updateRideOrder(r))}}>Favorite Ride</button>
                                                        }
                                                        
                                
                                                    </section>
                                    
                                                )}
                                            </Draggable>
                                            })
                            
                                    }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                    
            </article>
            
        </>
    )
}









