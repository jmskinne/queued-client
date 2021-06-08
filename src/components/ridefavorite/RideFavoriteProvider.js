import React, {useState} from "react"

export const RideFavoriteContext = React.createContext()

export const RideFavoriteProvider = (props) => {
    const [rideFavorites, setRideFavorites] = useState([])

    const createRideFavorite = (newRideFavorite) => {
        return fetch("https://queued-server-qav5d.ondigitalocean.app/ridefavorites", {
            method : "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body : JSON.stringify(newRideFavorite)
        })
    }

    const updateRideFavorite = (rideFavoriteId, favorite) => {
        return fetch(`https://queued-server-qav5d.ondigitalocean.app/ridefavorites/${rideFavoriteId}`, {
            method : "PATCH",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body : JSON.stringify({favorite : favorite})
        })
    }

    const getRideFavoritesByBoolean = (trueOrFalse) => {
        return fetch(`https://queued-server-qav5d.ondigitalocean.app/ridefavorites?favorite=${trueOrFalse}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
            }
        })
        .then(r => r.json())
        .then(setRideFavorites)

    }

    const rideFavoriteAction = (ride_id, favorite) => {
        return fetch(`https://queued-server-qav5d.ondigitalocean.app/rides/${ride_id}/favorite`, {
            method : "POST",
            headers : {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body: JSON.stringify({favorite : favorite})
        }).then(() => getRideFavoritesByBoolean(1))
    }

    return (
        <RideFavoriteContext.Provider value={{
            rideFavorites,
            createRideFavorite,
            updateRideFavorite,
            getRideFavoritesByBoolean,
            rideFavoriteAction
        }}>
            {props.children}
        </RideFavoriteContext.Provider>
    )
}