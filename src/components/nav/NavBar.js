import React, { useContext, useEffect} from "react"
import { Link } from "react-router-dom"

import {ProfileContext} from "../profile/ProfileProvider"

export const NavBar = (props) => {
    
    const {profile, getProfile} = useContext(ProfileContext)

    useEffect(() => {
        getProfile()
    }, [])
    
    return (
    <nav class="bg-red-500">
        <div class="max-w-max mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                
                <div class="sm:block sm:ml-6">
                <div class="flex space-x-4">
                    <div class="text-warm-grey-900 px-3 py-2 rounded-md text-sm font-bold mr-4">Welcome, {profile[0]?.user.username}</div>
                    <button class="text-warm-gray-900 hover:bg-yellow-vivid-050 hover:text-warm-grey-900 px-3 py-2 rounded-md text-sm font-bold"><Link to="/" >Home</Link></button>
                    <button class="text-warm-grey-900 hover:bg-yellow-vivid-050 hover:text-warm-grey-900 px-3 py-2 rounded-md text-sm font-bold"><Link to="/trips" >Trips</Link></button>
                    <button class="text-warm-grey-900 hover:bg-yellow-vivid-050 hover:text-warm-grey-900 px-3 py-2 rounded-md text-sm font-bold"><Link to="/waittimes" >Wait Times</Link></button>
                    <button class="text-warm-grey-900 hover:bg-yellow-vivid-050 hover:text-warm-grey-900 px-3 py-2 rounded-md text-sm font-bold"><Link to="/rides" >Rides</Link></button>
                    
                        {
                            (localStorage.getItem("q_token") !== null) ? 
                            <button onClick={() => {
                                localStorage.removeItem("q_token")
                                props.history.push({ pathname: "/" })
                            }} class="text-warm-grey-900 hover:bg-yellow-vivid-050 hover:text-warm-grey-900 px-3 py-2 rounded-md text-sm font-bold">Sign Out</button> 
                            : 
                            <>
                            <button class="text-warm-grey-900 hover:bg-yellow-vivid-050 hover:text-warm-grey-900 px-3 py-2 rounded-md text-sm font-bold"><Link to= "/login" >Login</Link></button>
                            <button class="text-warm-grey-900 hover:bg-yellow-vivid-050 hover:text-warm-grey-900 px-3 py-2 rounded-md text-sm font-bold"><Link to= "/register" >Register</Link></button>
                            </>
                        }
                        {
                            profile[0]?.profile_image_url === "" 
                            ?
                            // <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="Profile Img" />
                            ''
                            :
                            <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white " src={(`${profile[0]?.profile_image_url}`)} />  
                            
                            
                            
                        }
                                
                </div>
                </div>
            </div>
            </div>
            </div>
        
    </nav>
    )
}