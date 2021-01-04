import React, {useContext, useEffect, useState} from "react"
import {DateTime} from "luxon"

import {Link} from "react-router-dom"
import {TripContext} from "../trip/TripProvider"
import {RideContext} from "../ride/RideProvider"

export const LandingPage = (props) => {
    const {threeTrips, getThreeUpcomingTrips} = useContext(TripContext)
    const {sortedRides, getSortedRides} = useContext(RideContext)

    useEffect(() => {
        getThreeUpcomingTrips()
        getSortedRides()
        
    }, [])

    return (
        <>
        <h1>Welcome</h1>
        <div>Start Planning Your Next Trip</div>
        <button onClick={() => {
            props.history.push({pathname : "trips/new"})
        }}>
            New Trip
        </button>
        <h3>Upcoming Trips</h3>
        <article className="trips">
            {
                threeTrips.map(t => {
                    return <section key={`trip--${t.id}`} className="trip">
                        <div>
                            <Link to={`/trips/${t.id}`}>{t.name}</Link>
                        </div>
                        <div>{t.hotel}</div>
                        <div>{t.date_start}</div>
                        <div>{t.date_end}</div>
                    </section>
                    
                      
                    
                })
            }
        </article>
        <h3>Top 3 Rides</h3>
        <article>
            {
                sortedRides.map(r => {
                    return <section key={r.ride} className="attraction">
                    <Link to={`/rides/${r.ride}`}>{r.name}</Link>
                    {
                        (r.average_rating === null) ? '' : <div>{(r.average_rating * 2).toFixed() / 2}</div>
                    }
                </section>
                })
            }
            
        </article>
            
        
        </>
    )
}