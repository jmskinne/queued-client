import React, {useContext, useEffect} from "react"
import {Link} from "react-router-dom"
import {WaitContext} from "./WaitProvider"
import {RideContext} from "../ride/RideProvider"

export const WaitList = (props) => {
    const {mk, getMkWait} = useContext(WaitContext)
    const {getRideById, addRideFromAPI} = useContext(RideContext)

    useEffect(() => {
        getMkWait()
    }, [])

    const rideCheck = async (m) => {
        if (m) {
            const rideExists = await getRideById(m.id)
            if (rideExists === false) {
                addRideFromAPI({
                    id : m.id,
                    name : m.name,
                    lat : m.meta.latitude,
                    longitude : m.meta.longitude
                })
            } else {
                props.history.push(`/rides/${m.id}`)
            }
            
        }
        
    }

    return (
        <article>
            {
                mk.map(m => {
                    return <section key={`ride--${m.id}`}>
                        <div><Link to={`/rides/${m.id}`} onClick={() => {rideCheck(m)}}>{m.name}</Link></div>
                        <div>{m.waitTime}</div>
                    </section>
                })
            }
        </article>
    )
}

