import React, { useContext} from "react"
import { Link } from "react-router-dom"

import {ProfileContext} from "../profile/ProfileProvider"

export const NavBar = (props) => {
    
    const {profile} = useContext(ProfileContext)
    
    return (
    <nav class="bg-red-500">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex-shrink-0 flex items-center">
                {/* <img class="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" /> */}
                <img class="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" />
                </div>
                <div class="sm:block sm:ml-6">
                <div class="flex space-x-4">
                    <div class="text-warm-grey-900 px-3 py-2 rounded-md text-sm font-medium mr-4">Welcome, {profile[0]?.user.username}</div>
                    <a href="#" class="text-warm-gray-900 hover:bg-yellow-vivid-050 hover:text-warm-grey-900 px-3 py-2 rounded-md text-sm font-medium"><Link to="/" >Home</Link></a>
                    <a href="#" class="text-warm-grey-900 hover:bg-yellow-vivid-050 hover:text-warm-grey-900 px-3 py-2 rounded-md text-sm font-medium"><Link to="/trips" >Trips</Link></a>
                    <a href="#" class="text-warm-grey-900 hover:bg-yellow-vivid-050 hover:text-warm-grey-900 px-3 py-2 rounded-md text-sm font-medium"><Link to="/waittimes" >Wait Times</Link></a>
                    <a href="#" class="text-warm-grey-900 hover:bg-yellow-vivid-050 hover:text-warm-grey-900 px-3 py-2 rounded-md text-sm font-medium"><Link to="/rides" >Rides</Link></a>
                    
                        {
                            (localStorage.getItem("q_token") !== null) ? 
                            <button onClick={() => {
                                localStorage.removeItem("q_token")
                                props.history.push({ pathname: "/" })
                            }} class="text-warm-grey-900 hover:bg-yellow-vivid-050 hover:text-warm-grey-900 px-3 py-2 rounded-md text-sm font-medium">Sign Out</button> 
                            : 
                            <>
                            <a href="#" class="text-warm-grey-900 hover:bg-yellow-vivid-050 hover:text-warm-grey-900 px-3 py-2 rounded-md text-sm font-medium"><Link to= "/login" >Login</Link></a>
                            <a href="#" class="text-warm-grey-900 hover:bg-yellow-vivid-050 hover:text-warm-grey-900 px-3 py-2 rounded-md text-sm font-medium"><Link to= "/register" >Register</Link></a>
                            </>
                        }
                        
                        {/* <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white " src={(`${profile[0]?.profile_image_url}`)} /> */}          
                </div>
                </div>
            </div>
            </div>
            </div>
        
    </nav>
    )
}