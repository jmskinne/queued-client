import React, { useContext, useEffect, useState} from "react"
import { Link } from "react-router-dom"

import {ProfileContext} from "../profile/ProfileProvider"

export const NavBar = (props) => {
    
    const {profile, getProfile} = useContext(ProfileContext)
    const [showMobileMenu, setMobileShowMenu] = useState(false)

    useEffect(() => {
        getProfile()
    }, [])
    
    return (
    <nav class="bg-red-500">
        <div class="max-w-max mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        
                    <button onClick={() => setMobileShowMenu(!showMobileMenu)} class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
          
                            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
          
                            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                    </button>
                </div>
            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                
                <div class="hidden sm:block sm:ml-6">
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
            {
                showMobileMenu
                ?
                <div class="block sm:hidden">
                    <div class="px-2 pt-2 pb-3 space-y-1">
                        <div class="text-warm-grey-900 px-3 py-2 rounded-md text-sm font-bold mr-4 ">Welcome, {profile[0]?.user.username}</div>
                            <button class="text-warm-gray-900 hover:bg-yellow-vivid-050 hover:text-warm-grey-900 px-3 py-2 rounded-md text-sm font-bold "><Link to="/" >Home</Link></button>
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
            :
            ''

            }
            {/* <div class="hidden sm:hidden">
                <div class="px-2 pt-2 pb-3 space-y-1">
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
            </div> */}
        
    </nav>
    )
}