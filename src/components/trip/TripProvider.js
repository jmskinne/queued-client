import React, {useState} from "react"
import {DateTime} from "luxon"


export const TripContext = React.createContext()

export const TripProvider = (props) => {
    const theTimeIsNow = DateTime.local().toISODate()
    const [trips, setTrips] = useState([])
    const [threeTrips, setThreeTrips] = useState([])


    const getTrips = () => {
        return fetch("http://localhost:8000/trips", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
        .then(setTrips)
    }

    const getTripById = (tripId) => {
        return fetch(`http://localhost:8000/trips/${tripId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
    }

    const createTrip = (newTrip) => {
        return fetch("http://localhost:8000/trips", {
            method : "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body : JSON.stringify(newTrip)
        }).then(getTrips)
    }

    const updateTrip = (tripId, newTrip) => {
        return fetch(`http://localhost:8000/trips/${tripId}`, {
            method : "PUT",
            headers : {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body : JSON.stringify(newTrip)
        }).then(() => getTripById(tripId))
    }

    const deleteTrip = (trip) => {
        return fetch(`http://localhost:8000/trips/${trip.id}`, {
            method : "DELETE",
            headers : {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,   
            }
        }).then(getTrips)
    }

    const getThreeUpcomingTrips = () => {
        return fetch("http://localhost:8000/trips", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
        .then(tripsToSort => {
            return tripsToSort.filter(t => t.date_start >= theTimeIsNow).slice(0,3)
        })
        .then(setThreeTrips)
    }



    return (
        <TripContext.Provider value={{
            trips,
            getTrips,
            createTrip,
            updateTrip,
            deleteTrip,
            getTripById,
            threeTrips,
            getThreeUpcomingTrips
        }}>
            {props.children}
        </TripContext.Provider>
    )

}