import React, {useState} from "react"

export const RideItineraryContext = React.createContext()


export const RideItineraryProvider = (props) => {
    const [rideItinerariesByDailyItinerary, setRideItineraries] = useState([])


    const createRideItinerary = (newRideItinerary) => {
        return fetch("http://localhost:8000/rideitineraries", {
            method : "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body : JSON.stringify(newRideItinerary)
        })
    }

    const deleteRideItinerary = (rideItinerary) => {
        return fetch(`http://localhost:8000/rideitineraries/${rideItinerary.id}`, {
            method : "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                
            }
            
        }).then(() => getRideItinerariesByItineraryId(rideItinerary.itinerary_id))
       
    }

    const getRideItineraryById = (rideItineraryId) => {
        return fetch(`http://localhost:8000/rideitineraries/${rideItineraryId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
            }
        })
        .then(r => r.json())
    }

    const getRideItinerariesByItineraryId = (itineraryId) => {
        return fetch(`http://localhost:8000/rideitineraries?itinerary_id=${itineraryId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
            }
        })
        .then(r => r.json())
        .then(setRideItineraries)
    }

    const updateRideItinerary = (rideItineraryId, rideOrder) => {
        return fetch(`http://localhost:8000/rideitineraries${rideItineraryId}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body : JSON.stringify({order : rideOrder})
        })
        
    }

    // const getMkRides = () => {
    //     return fetch(`${cors}https://api.themeparks.wiki/preview/parks/WaltDisneyWorldMagicKingdom/waittime`)
    //         .then(r => r.json())
    //         .then(
    //             (data) => {
    //                 const MkRides = data.map(rides => {
    //                     return {
    //                         id : rides.id,
    //                         name : rides.name
    //                     }
    //                 })
    //                 setMkRides(MkRides)
    //             }
    //         )
    // }


    return (
        <RideItineraryContext.Provider value={{
            rideItinerariesByDailyItinerary,
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