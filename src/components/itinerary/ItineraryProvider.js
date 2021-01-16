import React, {useState} from "react"

export const ItineraryContext = React.createContext()

export const ItineraryProvider = (props) => {
    const [itineraries, setItineraries] = useState([])
    const [tripItineraries, setTripItineraries] = useState([])

    const getAllItineraries = () => {
        return fetch("https://queued-server-tv5uq.ondigitalocean.app/itineraries", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
        .then(setItineraries)
    }

    const getItineraryById = (itineraryId) => {
        return fetch(`https://queued-server-tv5uq.ondigitalocean.app/itineraries/${itineraryId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
    }

    const getItinerariesByTrip = (tripId) => {
        return fetch(`https://queued-server-tv5uq.ondigitalocean.app/itineraries?trip_id=${tripId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
        .then(setTripItineraries)
    }

    const createItinerary = (newItinerary) => {
        return fetch("https://queued-server-tv5uq.ondigitalocean.app/itineraries", {
            method : "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body : JSON.stringify(newItinerary)
        }).then(() => getItinerariesByTrip(newItinerary.trip_id))
    }

    const updateItinerary = (itineraryId, newItinerary) => {
        return fetch(`https://queued-server-tv5uq.ondigitalocean.app/itineraries/${itineraryId}`, {
            method : "PUT",
            headers : {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body: JSON.stringify(newItinerary)
        })
    }

    const deleteItinerary = (itinerary) => {
        return fetch(`https://queued-server-tv5uq.ondigitalocean.app/itineraries/${itinerary.id}`, {
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
            tripItineraries,
            getItinerariesByTrip,
            createItinerary,
            updateItinerary,
            deleteItinerary
        }}>
            {props.children}
        </ItineraryContext.Provider>
    )
}