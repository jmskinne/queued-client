import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./AppView"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

import {ProfileProvider} from "../components/profile/ProfileProvider"

export const Queue = (props) => (
    <>
    <ProfileProvider>
        <Route render={() => {
            if (localStorage.getItem("q_token")) {
                return <>
                    
                    
                    
                    <Route render={props => <NavBar {...props} /> } />
                    <Route render={props => <ApplicationViews {...props} />} />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={Login} />
        <Route path="/register" render={Register} />
        </ProfileProvider>
    </>
)