import React, {useState} from 'react'


export const WaitContext = React.createContext()


export const WaitProvider = props => {
    const [mk, setMk] = useState([])
    const [epcot, setEpcot] = useState([])
    const [hs, setHs] = useState([])
    const [ak, setAk] = useState([])

    const cors = "https://cors-anywhere.herokuapp.com/"


    // const getParks = () => {
    //     return fetch("https://cors-anywhere.herokuapp.com/https://touringplans.com/magic-kingdom/attractions.json")
    //         .then(r => r.json())
            
        
    //         .then(setParks)
    // }

    const getMkWait = () => {
        return fetch(`${cors}https://api.themeparks.wiki/preview/parks/WaltDisneyWorldMagicKingdom/waittime`)
            .then(r => r.json())
            .then(setMk)
    }

    const getEpcotWait = () => {
        return fetch(`${cors}https://api.themeparks.wiki/preview/parks/WaltDisneyWorldEpcot/waittime`)
            .then(r => r.json())
            .then(setEpcot)
    }

    const getHsWait = () => {
        return fetch(`${cors}https://api.themeparks.wiki/preview/parks/WaltDisneyWorldHollywoodStudios/waittime`)
            .then(r => r.json())
            .then(setHs)
    }

    const getAkWait = () => {
        return fetch(`${cors}https://api.themeparks.wiki/preview/parks/WaltDisneyWorldAnimalKingdom/waittime`)
            .then(r => r.json())
            .then(setAk)
    }

    return (
       <WaitContext.Provider value={{
           mk,
           getMkWait,
           epcot,
           getEpcotWait,
           hs,
           getHsWait,
           ak,
           getAkWait
           
       }}>
           {props.children}
       </WaitContext.Provider>
    )
}