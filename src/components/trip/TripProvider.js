import React, {useState} from "react"

export const TripContext = React.createContext()

export const TripProvider = (props) => {
    const [trips, setTrips] = useState([])


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
        })
    }

    const deleteTrip = (trip) => {
        return fetch(`http://localhost:8000/trips/${trip.id}`, {
            method : "DELETE",
            headers : {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,   
            }
        }).then(getTrips)
    }

    return (
        <TripContext.Provider value={{
            trips,
            getTrips,
            createTrip,
            updateTrip,
            deleteTrip,
            getTripById
        }}>
            {props.children}
        </TripContext.Provider>
    )

}