
import React, {useContext, useEffect, useState} from "react"
import {Link} from "react-router-dom"
import { RideFavoriteContext } from "../ridefavorite/RideFavoriteProvider"
import {RideContext} from "./RideProvider"


export const RideList = (props) => {
    const {rides, getRides, getRideBySearch} = useContext(RideContext)
    const {rideFavoriteAction, getRideFavoritesByBoolean, rideFavorites} = useContext(RideFavoriteContext)
    const [filteredRides, setFilteredRides] = useState([])
    const [searchRides, setRideSearch] = useState('')
    
    useEffect(() => {
        getRides()
    }, [])

    useEffect(() => {
        getRideFavoritesByBoolean(1)
    },[])

    useEffect(() => {
        if (searchRides !== "") {
            getRideBySearch(searchRides).then(r => setFilteredRides(r))
        
        } else {
            setFilteredRides(rides)
        }
    }, [searchRides, rides])

    return (
        <>
        <div>
        Ride Search:
        <input type="text" className="ride__search"
        onKeyUp={e => setRideSearch(e.target.value)}
        placeholder="Search for an attraction" />
        </div>
        
        
        <article className="attractions">
            {
                filteredRides.map(r => {
                    return <section key={r.ride} className="attraction">
                        <Link to={`/rides/${r.ride}`}>{r.name}</Link>
                        <div>Rating Placeholder</div>
                        {
                            (r.average_rating === null) ? '' : <div>{(r.average_rating * 2).toFixed() / 2}</div>
                        }
                        {
                           (rideFavorites.find(f => f.ride_id === r.ride)) ?
                            <button onClick={() => {rideFavoriteAction(r.ride, true)}}>UnFav</button>
                            :
                            <button onClick={() => {rideFavoriteAction(r.ride, true)}}>Favorite Ride</button>
                        }
                    </section>
                })
            }
        </article>
        </>
    )



}

