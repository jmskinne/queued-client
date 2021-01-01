import React, {useState} from "react"

export const RideFavoriteContext = React.createContext()

export const RideFavoriteProvider = (props) => {
    const [rideFavorites, setRideFavorites] = useState([])

    const createRideFavorite = (newRideFavorite) => {
        return fetch("http://localhost:8000/ridefavorites", {
            method : "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body : JSON.stringify(newRideFavorite)
        })
    }

    const updateRideFavorite = (rideFavoriteId, favorite) => {
        return fetch(`http://localhost:8000/ridefavorites/${rideFavoriteId}`, {
            method : "PATCH",
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
                "Content-Type" : "application/json "
            },
            body : JSON.stringify({favorite : favorite})
        })
    }

    const getRideFavoritesByBoolean = (trueOrFalse) => {
        return fetch(`http://localhost:8000/ridefavorites?favorite=${trueOrFalse}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`,
            }
        })
        .then(r => r.json())
        .then(setRideFavorites)

    }

    return (
        <RideFavoriteContext.Provider value={{
            rideFavorites,
            createRideFavorite,
            updateRideFavorite,
            getRideFavoritesByBoolean
        }}>
            {props.children}
        </RideFavoriteContext.Provider>
    )
}