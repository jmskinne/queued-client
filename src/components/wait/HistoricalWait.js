import React, {useContext, useEffect, useState} from 'react'
import {WaitContext} from "../wait/WaitProvider"


export const HistoricalWaits = (props) => {

    const {getAllWaitTimes, allWaitTimes, createHistoricalWait} = useContext(WaitContext)
    const [ran,setRun] = useState()

    const makeHistoricalWait = async (waits) => {
        await waits.forEach(ride => {
            createHistoricalWait({
                ride : ride.id,
                name : ride.name,
                wait : ride.waitTime
                        
            })
        })
    }

    // useEffect(() => {
    //     getAllWaitTimes()
    //     setRun(true)
    // }, [ran])

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setRun(false)
    //         makeHistoricalWait(allWaitTimes)
    //     }, 1800000)
    //     return () => clearInterval(interval)
    // })

    

    return (
        null
    )

}