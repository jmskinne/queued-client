import React, { useContext} from "react"
import { Link } from "react-router-dom"

import {ProfileContext} from "../profile/ProfileProvider"

export const NavBar = (props) => {
    
    const {profile} = useContext(ProfileContext)
    
    return (
        <>
        <ul className="navbar">
            <li className="navbar__item">
                <Link to= "/trips" >Trips</Link>
            </li>
            <li className="navbar__item">
                <Link to= "/waittimes" >Wait Times</Link>
            </li>
            <li className="navbar__item">
                <Link to= "/rides" >Rides</Link>
            </li>
            {/* <li className="navbar__item">
                <Link to= "/ridereviews" >Ride Reviews</Link>
            </li> */}
            <li>{profile[0]?.user?.username}</li>
            {
                
                    (localStorage.getItem("q_token") !== null) ?
                        <li className="nav-item">
                            <button className="nav-link fakeLink"
                                onClick={() => {
                                    localStorage.removeItem("q_token")
                                    props.history.push({ pathname: "/" })
                                }}
                            >Logout</button>
                        </li> :
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>
            }
        </ul>
        </>
    )
}