import React from "react"
import { Route } from "react-router-dom"

import {TripProvider} from "./trip/TripProvider"
import {TripList} from "./trip/TripList"
import {TripDetail} from "./trip/TripDetail"
import {TripForm} from "./trip/TripForm"

import {WaitProvider} from "./wait/WaitProvider"
import {WaitList} from "./wait/WaitList"

import { RideProvider } from "./ride/RideProvider"
import {RideDetail} from "./ride/RideDetail"

import {ReviewProvider} from "./review/ReviewProvider"
import { ReviewForm } from "./review/ReviewForm"

export const ApplicationViews = (props) => {
    return (
        <>
        <TripProvider>
            <Route exact path ="/trips"> <TripList {...props} /> </Route>
            <Route exact path ="/trips/new"> <TripForm {...props} /> </Route>
            <Route exact path ="/trips/edit/:tripId(\d+)" render={props => <TripForm {...props} /> } />
            <Route exact path = "/trips/:tripId(\d+)" render={props => <TripDetail {...props} /> } />

        </TripProvider>
        <WaitProvider>
            <RideProvider>
                <ReviewProvider>
                    <Route exact path = "/waittimes" render={props => <WaitList {...props} /> } />
                    <Route exact path = "/rides/:rideId(\w+\d+)" render={props => <RideDetail {...props} /> } />
                    <Route exact path ="/ridereviews/new/:rideId(\w+\d+)" render={props => <ReviewForm {...props} /> } />
                    <Route exact path ="/ridereviews/edit/:reviewId(\d+)" render={props => <ReviewForm {...props} /> } />                
                </ReviewProvider>
            </RideProvider>
        </WaitProvider>
        </>
    )
}