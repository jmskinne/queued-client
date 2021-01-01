import React, {useState} from "react"

export const ProfileContext = React.createContext()

export const ProfileProvider = (props) => {
    

    const getProfile = () => {
        return fetch("http://localhost:8000/profile", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
        
    }

    return (
        <ProfileContext.Provider value={{
            
            getProfile
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}