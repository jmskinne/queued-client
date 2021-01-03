
import React, {useContext, useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {RideContext} from "./RideProvider"


export const RideList = (props) => {
    const {rides, getRides, getRideBySearch} = useContext(RideContext)
    const [filteredRides, setFilteredRides] = useState([])
    const [searchRides, setRideSearch] = useState('')
    
    useEffect(() => {
        getRides()
    }, [])

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
                    </section>
                })
            }
        </article>
        </>
    )



}

