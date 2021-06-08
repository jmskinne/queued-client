import React, {useState} from "react"

export const RideItineraryContext = React.createContext()


export const RideItineraryProvider = (props) => {
    // const [rideItinerariesByDailyItinerary, setRideItineraries] = useState([])


    const createRideItinerary = (newRideItinerary) => {
        return fetch("https://queued-server-qav5d.ondigitalocean.app/rideitineraries", {
            method : "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body : JSON.stringify(newRideItinerary)
        })
    }

    const deleteRideItinerary = (rideItinerary) => {
        return fetch(`https://queued-server-qav5d.ondigitalocean.app/rideitineraries/${rideItinerary.id}`, {
            method : "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                
            }
            
        })
        // .then(() => getRideItinerariesByItineraryId(rideItinerary.itinerary_id))
       
    }

    const getRideItineraryById = (rideItineraryId) => {
        return fetch(`https://queued-server-qav5d.ondigitalocean.app/rideitineraries/${rideItineraryId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
            }
        })
        .then(r => r.json())
    }

    const getRideItinerariesByItineraryId = (itineraryId) => {
        return fetch(`https://queued-server-qav5d.ondigitalocean.app/rideitineraries?itinerary_id=${itineraryId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
            }
        })
        .then(r => r.json())
        // .then(setRideItineraries)
    }

    const updateRideItinerary = (rideItineraryId, rideOrder) => {
        return fetch(`https://queued-server-qav5d.ondigitalocean.app/rideitineraries/${rideItineraryId}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body : JSON.stringify({order : rideOrder})
        })
        
    }

    return (
        <RideItineraryContext.Provider value={{
            // rideItinerariesByDailyItinerary,
            createRideItinerary,
            deleteRideItinerary,
            getRideItineraryById,
            getRideItinerariesByItineraryId,
            updateRideItinerary,
           
        }}>
            {props.children}
        </RideItineraryContext.Provider>
    )
}