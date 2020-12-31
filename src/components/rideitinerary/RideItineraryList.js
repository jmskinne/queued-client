import React, {useContext, useEffect, useState} from "react"
import {RideItineraryContext} from "./RideItineraryProvider"
import {WaitContext} from "../wait/WaitProvider"
import {RideContext} from "../ride/RideProvider"

export const RideItineraryList = (props) => {
    const {createRideItinerary, deleteRideItinerary} = useContext(RideItineraryContext)
    const {mk, getMkWait} = useContext(WaitContext)
    const {getRideById, addRideFromAPI} = useContext(RideContext)

    const [count, setCount] = useState(0)

    const itineraryId = parseInt(props.match.params.itineraryId)

    useEffect(() => {
        getMkWait()
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
        
        <div>
            {
                mk.map(m => {
                    return <section key={m.id}>
                        <div>{m.name}</div>
                        <button type="submit" onClick={() => rideCheckAndCreateRideItinerary(m)}>+</button>
                        
                        <button>-</button>
                    </section>
                })
            }
        </div>
        </>
    )
}

//working
// return (
//     <>
    
//     <div>
//         {
//             mk.map(m => {
//                 return <section key={m.id}>
//                     <div>{m.name}</div>
//                     <button type="submit" onClick={e => {
//                         e.preventDefault()
//                         createRideItinerary({
//                             itinerary_id : itineraryId,
//                             ride_id : m.id,
//                             order : 1
//                         })
//                         setCount(count + 1)
//                     }}>+</button>
//                     <div>{count}</div>
//                     <button>-</button>
//                 </section>
//             })
//         }
//     </div>
//     </>
// 