import React, {useContext, useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {WaitContext} from "./WaitProvider"
import {RideContext} from "../ride/RideProvider"

export const WaitList = (props) => {
    const {getMkWait, getEpcotWait, getHsWait, getAkWait} = useContext(WaitContext)
    const {getRideById, addRideFromAPI} = useContext(RideContext)

    const [parkSelected, setParkSelected ] = useState([])
    const [waitTimes, setWaitTimes] = useState([])

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
        <>
        <button onClick={() => setParkSelected(1)}>Mk</button>
        <button onClick={() => setParkSelected(2)}>EP</button>
        <button onClick={() => setParkSelected(3)}>AK</button>
        <button onClick={() => setParkSelected(4)}>HS</button>
        <article>
            {
                waitTimes.map(m => {
                    return <section key={`ride--${m.id}`}>
                        <div><Link to={`/rides/${m.id}`} onClick={() => {rideCheck(m)}}>{m.name}</Link></div>
                        <div>{m.waitTime}</div>
                    </section>
                })
            }
        </article>
        </>
    )
}

