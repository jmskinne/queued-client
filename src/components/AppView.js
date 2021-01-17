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
import {RideList} from "./ride/RideList"


import {ReviewProvider} from "./review/ReviewProvider"
import { ReviewForm } from "./review/ReviewForm"


import {ItineraryProvider} from "./itinerary/ItineraryProvider"
import {RideItineraryProvider} from "./rideitinerary/RideItineraryProvider"
import { RideItineraryList } from "./rideitinerary/RideItineraryList"

import {RideFavoriteProvider} from "./ridefavorite/RideFavoriteProvider"

import {LandingPage} from "./landing/LandingPage"
import { HistoricalWaits } from "./wait/HistoricalWait"

export const ApplicationViews = (props) => {
    return (
        <>
        
        <TripProvider>
            <ItineraryProvider>
                    <RideItineraryProvider>
                        <WaitProvider>
                            <RideProvider>
                                <RideFavoriteProvider>
                                    <Route exact path ="/trips"> <TripList {...props} /> </Route>
                                    <Route exact path ="/trips/new"> <TripForm {...props} /> </Route>
                                    <Route exact path ="/trips/edit/:tripId(\d+)" render={props => <TripForm {...props} /> } />
                                    <Route exact path = "/trips/:tripId(\d+)" render={props => <TripDetail {...props} /> } />
                                    <Route exact path = "/rideitineraries/itinerary/:itineraryId(\d+)" render={props => <RideItineraryList {...props} />} />
                                    <Route exact path = "/" render={props => <LandingPage {...props} /> } />
                                    {/* <HistoricalWaits /> */}
                                </RideFavoriteProvider>
                            </RideProvider>
                        </WaitProvider>
                </RideItineraryProvider>
            </ItineraryProvider>
        </TripProvider>
        
        
        <WaitProvider>
            <RideProvider>
                <ReviewProvider>
                    <RideFavoriteProvider>
                        <Route exact path = "/rides" render={props => <RideList {...props} />} />
                        <Route exact path = "/waittimes" render={props => <WaitList {...props} /> } />
                        <Route exact path = "/rides/:rideId(\w+\d+)" render={props => <RideDetail {...props} /> } />
                        <Route exact path ="/ridereviews/new/:rideId(\w+\d+)" render={props => <ReviewForm {...props} /> } />
                        <Route exact path ="/ridereviews/edit/:reviewId(\d+)" render={props => <ReviewForm {...props} /> } />
                        
                    </RideFavoriteProvider>  
                </ReviewProvider>
            </RideProvider>
        </WaitProvider>
        
        </>
    )
}