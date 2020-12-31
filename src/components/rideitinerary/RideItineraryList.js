import React, {useContext, useEffect, useState} from "react"
import {RideItineraryContext} from "./RideItineraryProvider"
import {WaitContext} from "../wait/WaitProvider"

export const RideItineraryList = (props) => {
    const {createRideItinerary, deleteRideItinerary} = useContext(RideItineraryContext)
    const {mk, getMkWait} = useContext(WaitContext)

    const [count, setCount] = useState(0)

    const itineraryId = parseInt(props.match.params.itineraryId)

    useEffect(() => {
        getMkWait()
    }, [])

    return (
        <>
        
        <div>
            {
                mk.map(m => {
                    return <section key={m.id}>
                        <div>{m.name}</div>
                        <button type="submit" onClick={e => {
                            e.preventDefault()
                            createRideItinerary({
                                itinerary_id : itineraryId,
                                ride_id : m.id,
                                order : 1
                            })
                            setCount(count + 1)
                        }}>+</button>
                        <div>{count}</div>
                        <button>-</button>
                    </section>
                })
            }
        </div>
        </>
    )
}