import React, {useState} from "react"

export const ItineraryContext = React.createContext()

export const ItineraryProvider = (props) => {
    const [itineraries, setItineraries] = useState([])

    const getAllItineraries = () => {
        return fetch("http://localhost:8000/itineraries", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
        .then(setItineraries)
    }

    const getItineraryById = (itineraryId) => {
        return fetch(`http://localhost:8000/itineraries/${itineraryId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
    }

    const getItinerariesByTrip = (tripId) => {
        return fetch(`http://localhost:8000/itineraries?trip_id=${tripId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
        
    }

    const createItinerary = (newItinerary) => {
        return fetch("http://localhost:8000/itineraries", {
            method : "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body : JSON.stringify(newItinerary)
        }).then(() => getItinerariesByTrip(newItinerary.trip_id))
    }

    const updateItinerary = (itineraryId, newItinerary) => {
        return fetch(`http://localhost:8000/itineraries/${itineraryId}`, {
            method : "PUT",
            headers : {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body: JSON.stringify(newItinerary)
        })
    }

    const deleteItinerary = (itinerary) => {
        return fetch(`http://localhost:8000/itineraries/${itinerary.id}`, {
            method : "DELETE",
            headers : {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
            }
        }).then(() => getItinerariesByTrip(itinerary.trip_id))
    }

    return (
        <ItineraryContext.Provider value={{
            itineraries,
            getAllItineraries,
            getItineraryById,
            getItinerariesByTrip,
            createItinerary,
            updateItinerary,
            deleteItinerary
        }}
    )
}