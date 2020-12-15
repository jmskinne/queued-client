import React from "react"
import { Route } from "react-router-dom"

import {TripProvider} from "./trip/TripProvider"
import {TripList} from "./trip/TripList"
import {TripDetail} from "./trip/TripDetail"
import {TripForm} from "./trip/TripForm"

export const ApplicationViews = (props) => {
    return (
        <>
        <TripProvider>
            <Route exact path ="/trips"> <TripList {...props} /> </Route>
            <Route exact path ="/trips/new"> <TripForm {...props} /> </Route>
            <Route exact path ="/trips/edit/:tripId(\d+)"> <TripForm {...props} /> </Route>
            <Route exact path = "/trips/:tripId(\d)" render={props => <TripDetail {...props} /> } />

        </TripProvider>
        </>
    )
}