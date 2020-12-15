import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./AppView"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const Queue = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("q_token")) {
                return <>
                    <Route render={NavBar} />
                    <Route render={props => <ApplicationViews {...props} />} />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={Login} />
        <Route path="/register" render={Register} />
    </>
)