import React, {useState} from "react"

export const RideContext = React.createContext()

export const RideProvider = (props) => {
    const [rides, setRides] = useState([])
    const [sortedRides, setSortedRides] = useState([])
    

    const getRides = () => {
        return fetch("https://queued-server-qav5d.ondigitalocean.app/rides", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
        .then(setRides)
    }

    const getRideById = (rideId) => {
        return fetch(`https://queued-server-qav5d.ondigitalocean.app/rides/${rideId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
    }

    const addRideFromAPI = (newRide) => {
        return fetch("https://queued-server-qav5d.ondigitalocean.app/rides", {
            method : "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body : JSON.stringify(newRide)
        }).then(() => getRideById(newRide.id))
    }

    const getRideBySearch = (search) => {
        return fetch(`https://queued-server-qav5d.ondigitalocean.app/rides?q=${search}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`
                }
            }).then(r => r.json())
            
            
    }

    const getSortedRides = () => {
        return fetch("https://queued-server-qav5d.ondigitalocean.app/rides", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
        .then(ridesToSort => {
            
            return ridesToSort.sort((a,b) => b.average_rating - a.average_rating).slice(0,3) || []
            
        })
        .then(setSortedRides)
        
    }

    return (
        <RideContext.Provider value={{
            rides,
            getRides,
            getRideById,
            addRideFromAPI,
            getRideBySearch,
            sortedRides,
            getSortedRides
            
        }}>
            {props.children}
        </RideContext.Provider>
    )


}