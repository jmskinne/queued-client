import React, {useContext, useEffect, useState} from "react"
import {RideItineraryContext} from "./RideItineraryProvider"
import {WaitContext} from "../wait/WaitProvider"
import {RideContext} from "../ride/RideProvider"
import {ItineraryContext} from "../itinerary/ItineraryProvider"

export const RideItineraryList = (props) => {
    const {createRideItinerary} = useContext(RideItineraryContext)
    const {getMkWait, getEpcotWait, getHsWait, getAkWait} = useContext(WaitContext)
    const {getRideById, addRideFromAPI} = useContext(RideContext)
    const {getItineraryById} = useContext(ItineraryContext)
    
    const itineraryId = parseInt(props.match.params.itineraryId)

    const [parkSelected, setParkSelected ] = useState([])
    const [waitTimes, setWaitTimes] = useState([])
    const [backButton, setBackButton] = useState({})

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

    useEffect(() => {
        getItineraryById(itineraryId).then(r => setBackButton(r))
    }, [])
    
    const rideCheckAndCreateRideItinerary = async (m) => {
        if (m) {
            const rideExists = await getRideById(m.id)
            if (rideExists === false) {
                addRideFromAPI({
                    id : m.id,
                    name : m.name,
                    lat : m.meta.latitude,
                    longitude : m.meta.longitude
                }).then(() => 
                        createRideItinerary({
                            itinerary_id : itineraryId,
                            ride_id : m.id,
                            order : 1
                }))
            } else {
                createRideItinerary({
                    itinerary_id : itineraryId,
                    ride_id : m.id,
                    order : 1
                
            })
            
        }
        
    }}

    return (
        <>
        <button onClick={() => setParkSelected(1)}>Mk</button>
        <button onClick={() => setParkSelected(2)}>EP</button>
        <button onClick={() => setParkSelected(3)}>HS</button>
        <button onClick={() => setParkSelected(4)}>AK</button>
        <div>
            {
                waitTimes.map(m => {
                    return <section key={m.id}>
                        <div>{m.name}</div>
                        <button type="submit" onClick={() => rideCheckAndCreateRideItinerary(m)}>+</button>
                        <button>-</button>
                        
                    </section>
                })
            }
        </div>
        <button onClick={() => props.history.push(`/trips/${backButton.trip_id}`)}>Back</button> 
        </>
    )
}

