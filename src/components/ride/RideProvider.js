import React, {useState} from "react"

export const RideContext = React.createContext()

export const RideProvider = (props) => {
    const [rides, setRides] = useState([])
    

    const getRides = () => {
        return fetch("http://localhost:8000/rides", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
        .then(setRides)
    }

    const getRideById = (rideId) => {
        return fetch(`http://localhost:8000/rides/${rideId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
    }

    const addRideFromAPI = (newRide) => {
        return fetch("http://localhost:8000/rides", {
            method : "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body : JSON.stringify(newRide)
        }).then(() => getRideById(newRide.id))
    }

    const getRideBySearch = (search) => {
        return fetch(`http://localhost:8000/rides?q=${search}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`
                }
            }).then(r => r.json())
            
            
    }

    return (
        <RideContext.Provider value={{
            rides,
            getRides,
            getRideById,
            addRideFromAPI,
            getRideBySearch,
            
        }}>
            {props.children}
        </RideContext.Provider>
    )


}