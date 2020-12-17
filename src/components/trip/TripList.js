import React, {useContext, useEffect} from "react"
import {Link} from "react-router-dom"
import {TripContext} from "./TripProvider"

export const TripList = (props) => {
    const {trips, getTrips, deleteTrip} = useContext(TripContext)

    useEffect(() => {
        getTrips()
    }, [])

    return (
        <>
        <button onClick={() => {
            props.history.push({pathname : "trips/new"})
        }}>
            New Trip
        </button>
        <article className="trips">
            {
                trips.map(t => {
                    return <section key={`trip--${t.id}`} className="trip">
                        <div>
                            <Link to={`/trips/${t.id}`}>{t.name}</Link>
                        </div>
                        <div>{t.hotel}</div>
                        <div>{t.date_start}</div>
                        <div>{t.date_end}</div>
                        <button onClick={() => props.history.push(`/trips/edit/${t.id}`)}>Edit</button>
                        <button onClick={() => deleteTrip(t)}>Delete</button>
                    </section>
                })
            }
        </article>
        </>
    )
}

