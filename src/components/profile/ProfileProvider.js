import React, {useEffect, useState} from "react"

export const ProfileContext = React.createContext()

export const ProfileProvider = (props) => {
    const [profile, setProfile] = useState({events:[]})

    const getProfile = () => {
        return fetch("http://localhost:8000/profile", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
        .then(setProfile)
    }

    useEffect(getProfile, [])

    return (
        <ProfileContext.Provider value={{
            profile,
            getProfile
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}