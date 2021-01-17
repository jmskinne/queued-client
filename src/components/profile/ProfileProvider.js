import React, {useEffect, useState} from "react"

export const ProfileContext = React.createContext()

export const ProfileProvider = (props) => {
    const [profile, setProfile] = useState({})

    const getProfile = () => {
        return fetch("https://queued-server-kft68.ondigitalocean.app/profile", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("q_token")}`
            }
        })
        .then(r => r.json())
        .then(setProfile)
    }

    

    return (
        <ProfileContext.Provider value={{
            profile,
            getProfile
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}