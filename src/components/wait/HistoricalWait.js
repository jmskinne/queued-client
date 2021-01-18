import React, {useContext, useEffect, useState} from 'react'
import {WaitContext} from "../wait/WaitProvider"

// hacky chron job type request
// Interval is set to every 30 minutes getAllWaitTimes from ThemeParksAPI
// Then POST request for each item in the array is sent to my server
// created_on field from my django model saves when the request was saved to the server
// Interval is reset each time you move pages in the application

export const HistoricalWaits = (props) => {

    const {getAllWaitTimes, allWaitTimes, createHistoricalWait} = useContext(WaitContext)
    const [ran,setRun] = useState()

    const makeHistoricalWait = async (waits) => {
        await waits.forEach(ride => {
            createHistoricalWait({
                ride : ride.id,
                wait : ride.waitTime
                        
            })
        })
    }

    useEffect(() => {
        getAllWaitTimes()
        setRun(true)
    }, [ran])

    useEffect(() => {
        const interval = setInterval(() => {
            setRun(false)
            makeHistoricalWait(allWaitTimes)
        }, 1800000)
        return () => clearInterval(interval)
    })

    

    return (
        null
    )

}