import React, { useContext} from "react"
import { Link } from "react-router-dom"

import {ProfileContext} from "../profile/ProfileProvider"

export const NavBar = (props) => {
    
    const {profile} = useContext(ProfileContext)
    
    // return (
    //     <>
    //     <ul className="navbar">
    //         <li className="navbar__item">
    //             <Link to= "/" >Home</Link>
    //         </li>
    //         <li className="navbar__item">
    //             <Link to= "/trips" >Trips</Link>
    //         </li>
    //         <li className="navbar__item">
    //             <Link to= "/waittimes" >Wait Times</Link>
    //         </li>
    //         <li className="navbar__item">
    //             <Link to= "/rides" >Rides</Link>
    //         </li>
    //         {/* <li className="navbar__item">
    //             <Link to= "/ridereviews" >Ride Reviews</Link>
    //         </li> */}
    //         <li>{profile[0]?.user?.username}</li>
    //         {
                
    //                 (localStorage.getItem("q_token") !== null) ?
    //                     <li className="nav-item">
    //                         <button className="nav-link fakeLink"
    //                             onClick={() => {
    //                                 localStorage.removeItem("q_token")
    //                                 props.history.push({ pathname: "/" })
    //                             }}
    //                         >Logout</button>
    //                     </li> :
    //                     <>
    //                         <li className="nav-item">
    //                             <Link className="nav-link" to="/login">Login</Link>
    //                         </li>
    //                         <li className="nav-item">
    //                             <Link className="nav-link" to="/register">Register</Link>
    //                         </li>
    //                     </>
    //         }
    //     </ul>
    //     </>
    // )
    return (
    <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex-shrink-0 flex items-center">
                {/* <img class="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" /> */}
                <img class="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" />
                </div>
                <div class="sm:block sm:ml-6">
                <div class="flex space-x-4">
                    <div class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium mr-4">Welcome, {profile[0]?.user.username}</div>
                    <a href="#" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"><Link to= "/" >Home</Link></a>
                    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"><Link to= "/trips" >Trips</Link></a>
                    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"><Link to= "/waittimes" >Wait Times</Link></a>
                    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"><Link to= "/rides" >Rides</Link></a>
                    
                        {
                            (localStorage.getItem("q_token") !== null) ? 
                            <button onClick={() => {
                                localStorage.removeItem("q_token")
                                props.history.push({ pathname: "/" })
                            }} class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign Out</button> 
                            : 
                            <>
                            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"><Link to= "/login" >Login</Link></a>
                            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"><Link to= "/register" >Register</Link></a>
                            </>
                        }
                        
                        
                        
                    
                </div>
                </div>
            </div>
            </div>
            </div>
        
    </nav>
    )
}