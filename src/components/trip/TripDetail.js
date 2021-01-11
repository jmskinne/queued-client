import {DateTime, Interval} from "luxon"
import React, {useContext, useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import api from "../../Settings.js"
import {TripContext} from "./TripProvider"
import {ItineraryContext} from "../itinerary/ItineraryProvider"


import {RideItineraryContext} from "../rideitinerary/RideItineraryProvider"

import {RideFavoriteContext} from "../ridefavorite/RideFavoriteProvider"

import {WaitContext} from "../wait/WaitProvider"

import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

import "./Trip.css"


export const TripDetail = (props) => {
    const {getRideItinerariesByItineraryId, rideItinerariesByDailyItinerary, deleteRideItinerary, updateRideItinerary} = useContext(RideItineraryContext)
    const {getTripById} = useContext(TripContext)
    const {getItinerariesByTrip, tripItineraries, createItinerary} = useContext(ItineraryContext)
    const {getRideFavoritesByBoolean, rideFavorites, rideFavoriteAction} = useContext(RideFavoriteContext)
    const {getAllWaitTimes, allWaitTimes, createHistoricalWait} = useContext(WaitContext)

    const [trip, setTrip] = useState({})
    const [tripDates, setTripDates] = useState([])
    const [selectedDate, setDateFilter] = useState(0)
    const [check, setCheck] = useState([])
    const [tripLength, setTripLength] = useState(0)
    const [rideOrder, updateRideOrder] = useState([])
    const theTimeIsNow = DateTime.local()
    const [countDown, setCountDown] = useState([])

    const [showMap, setShowMap] = useState(false)
    const [parsedMap, setParsedMap] = useState('')
    

    const tripId = parseInt(props.match.params.tripId)

    useEffect(() => {
        getTripById(tripId).then(setTrip)
        getItinerariesByTrip(tripId).then(setTripLength(tripItineraries.length))
        getAllWaitTimes()
    }, [tripId])

    useEffect(() => {
        getRideItinerariesByItineraryId(parseInt(selectedDate)).then(r => updateRideOrder(r))
        
    },[selectedDate])

    useEffect(() => {
            if (rideOrder.length === 1) {
                let origin = `${rideOrder[0].ride.lat},${rideOrder[0].ride.longitude}`
                let mapUrl =`https://www.google.com/maps/embed/v1/place?key=${api.mapped}${`\u0026`}q=${origin}`
                let mapHTML = <iframe width="600" height="450" src={(`${mapUrl}`)} />
                setParsedMap(mapHTML)
            } else if(rideOrder.length === 2 ) {
                let origin = `${rideOrder[0].ride.lat},${rideOrder[0].ride.longitude}`
                let destination = `${rideOrder[rideOrder.length - 1].ride.lat},${rideOrder[rideOrder.length - 1].ride.longitude}`
                let mapUrl =`https://www.google.com/maps/embed/v1/directions?key=${api.mapped}&mode=walking${`\u0026`}origin=${origin}${`\u0026`}destination=${destination}`
                let mapHTML = <iframe width="600" height="450" src={(`${mapUrl}`)} />
                setParsedMap(mapHTML)
            } else if(rideOrder.length >= 3) {
                let origin = `${rideOrder[0].ride.lat},${rideOrder[0].ride.longitude}`
                let destination = `${rideOrder[rideOrder.length - 1].ride.lat},${rideOrder[rideOrder.length - 1].ride.longitude}`
                let ways = rideOrder.map(w => `${w.ride.lat},${w.ride.longitude}`).slice(1, rideOrder.length - 1).join("|").split().toString()
                let mapUrl =`https://www.google.com/maps/embed/v1/directions?key=${api.mapped}&mode=walking${`\u0026`}origin=${origin}${`\u0026`}destination=${destination}${`\u0026`}waypoints=${ways}`
                let mapHTML = <iframe width="600" height="450" src={(`${mapUrl}`)} />
                setParsedMap(mapHTML)
            }
        
    }, [selectedDate, rideOrder])

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
        let daysTillVacation = Interval.fromDateTimes(theTimeIsNow, start).toDuration().toObject()
        
        let dateArr = []
        for (var d of days(interval)) {
            dateArr.push(d.toLocaleString())
        }
        setTripDates(dateArr)
        setCountDown(daysTillVacation) 
        
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
        <div class="bg-warm-grey-200">
            
                <div class="text-center">
                    <p class="text-warm-grey-900 text-4xl font-bold pt-3">{trip.name}</p>
                    <p class="text-warm-grey-900 text-2xl font-bold pt-3 text-center"><span class="text-lime-green-600">{Math.round(countDown.milliseconds / (60*60*24*1000))}</span> Days until Vacation</p>
                </div>
            <div class="flex flex-wrap items-center justify-center">
                <div class="w-full overflow-hidden">
                    <p class="text-warm-grey-900 text-2xl font-bold pt-3 text-center">{trip.hotel}</p>
                </div>
                <div class="w-full overflow-hidden">
                    <p class="text-lg pt-2 font-bold text-warm-grey-800 text-center">
                        From {DateTime.fromISO(trip.date_start).toLocaleString(DateTime.DATE_FULL)} 
                        <span> to</span> {DateTime.fromISO(trip.date_end).toLocaleString(DateTime.DATE_FULL)}
                        </p>
                </div>
                <div class="w-full overflow-hidden m-5">
                    <p class="text-warm-grey-900 text-2xl font-bold pt-3 text-center">Plan Your Park Days</p>
                </div>

                <div class="flex flex-wrap items-center justify-center mx-5">
                    <div class="w-1/2 overflow-hidden my-5 px-5">
                        <select class="text-center" className="date_filter" onChange={e => {
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
                    <div class="w-1/2 overflow-hidden my-5 px-5">
                        <button class="px-5 py-2 border-warm-grey-900 border-transparent text-base font-medium 
                        rounded-md text-warm-grey-900 bg-lime-green-400 hover:bg-lime-green-900 hover:text-warm-grey-050" onClick={() => props.history.push(`/rideitineraries/itinerary/${selectedDate}`)}>Add Rides</button>
                    </div>
                </div>
                <div>
                    {
                        (selectedDate == 0)
                        ?
                        ''
                        :
                        <>
                        <button class="px-5 py-2 border-warm-grey-900 border-transparent text-base font-medium mr-5
                        rounded-md text-warm-grey-900 bg-cyan-400 hover:bg-cyan-900 hover:text-warm-grey-050"onClick={() => setShowMap(true)}>Show Map</button>
                        <button class="px-5 py-2 border-warm-grey-900 border-transparent text-base font-medium 
                        rounded-md text-warm-grey-900 bg-yellow-vivid-400 hover:bg-yellow-vivid-900 hover:text-warm-grey-050" onClick={() => setShowMap(false)}>Hide Map</button>
                        </>
                    } 
                </div>
                
                
            </div>
            <div class="flex flex-wrap items-center justify-center">
                { showMap ?
                    parsedMap
                     :
                    ''
                }
            </div>
            
            <div class="max-w">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="theRide">
                        {(provided) => (
                            <div class="ride_order items-center h-screen" {...provided.draggableProps} ref={provided.innerRef}>
                               
                    {
                        rideOrder.map((r, index) => {
                            const theWait = allWaitTimes.find(w => w.id === r.ride_id) || {}
                            return <Draggable key={r.id} draggableId={r.ride_id} index={index} onClick={handleSaveOrder(r, index)}>
                                {(provided) => (
                                    <div class="my-2 px-2 w-lg overflow-hidden m-52">
                                        <div class="bg-yellow-vivid-050 shadow-xl rounded-lg overflow-hidden py-6 mb-2"
                                            {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <div class= "flex justify-evenly overflow-hidden xl:-mx-3">
                                            {
                                                (rideFavorites.find(f => f.ride_id === r.ride_id)) 
                                                ? 
                                                <button onClick={() => {rideFavoriteAction(r.ride_id, true).then(() => getRideItinerariesByItineraryId(selectedDate)).then(r => updateRideOrder(r))}}>
                                                <svg class="h-6 w-6 text-red-600 fill-current mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                                </svg></button>
                                                :
                                        
                                                <button onClick={() => {rideFavoriteAction(r.ride_id, true).then(() => getRideItinerariesByItineraryId(selectedDate)).then(r => updateRideOrder(r))}}>
                                                    <svg class="text-warm-grey-500 h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                </button>
                                        
                                            }

                                            <p class="uppercase tracking-wide text-lg font-bold text-warm-grey-900">{r.ride.name}</p>
                                
                                            <Link to={`/rides/${r.ride_id}`}><svg class="h-6 w-6 text-cyan-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg></Link>

                                            
                                           
                                             <p class="text-md font-bold text-warm-grey-700 text-center">Order: {index + 1}</p>
                                             {
                                                 (theWait.status === "Closed" || theWait.status === "Refurbishment")
                                                 ?
                                                 
                                                <p class="text-red-900 text-lg font-bold uppercase">Closed</p>
                                                
                                                 :
                                                 <p class="text-md font-bold text-warm-grey-700 text-center">{theWait.waitTime} mintues</p>
                                             }

                                             <button onClick={() => deleteRideItinerary(r).then(() => getRideItinerariesByItineraryId(selectedDate)).then(r => updateRideOrder(r))}>
                                                <svg class="h5 w-5 text-red-600 ml-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    </div>
                                    
                                )}
                            </Draggable>
                        })

                    }
                    {provided.placeholder}
                
                </div>
                )}
            </Droppable>
        </DragDropContext>
            </div>
            
            
            </div>
            
        
        
    )
}









