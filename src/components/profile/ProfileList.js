import React, {useContext, useEffect} from "react"

import {ProfileContext} from "./ProfileProvider"

export const ProfileList = (props) => {
    const {profile, getProfile} = useContext(ProfileContext)

    useEffect(() => {
        getProfile()
    }, [])

    useEffect(() => {
        console.log(profile)
    })

    return (
        <>
        <div>{profile[0].user.username}</div>
        </>
    )
}
