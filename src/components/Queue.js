import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./AppView"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

import {ProfileProvider} from "./profile/ProfileProvider"

export const Queue = (props) => (
    <>
    
        <Route render={() => {
            if (localStorage.getItem("q_token")) {
                return <>
                <ProfileProvider>
                    
                    
                    
                    <Route render={props => <NavBar {...props} /> } />
                    <Route render={props => <ApplicationViews {...props} />} />
                </ProfileProvider>
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />
    
        <Route path="/login" render={Login} />
        <Route path="/register" render={Register} />
        
    </>
)