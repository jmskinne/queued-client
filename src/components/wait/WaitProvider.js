import React from 'react'


export const WaitContext = React.createContext()


export const WaitProvider = props => {
    const cors = "https://blooming-gorge-83806.herokuapp.com/"

    const getMkWait = () => {
        return fetch(`${cors}https://api.themeparks.wiki/preview/parks/WaltDisneyWorldMagicKingdom/waittime`)
            .then(r => r.json())
            
    }

    const getEpcotWait = () => {
        return fetch(`${cors}https://api.themeparks.wiki/preview/parks/WaltDisneyWorldEpcot/waittime`)
            .then(r => r.json())
            
    }

    const getHsWait = () => {
        return fetch(`${cors}https://api.themeparks.wiki/preview/parks/WaltDisneyWorldHollywoodStudios/waittime`)
            .then(r => r.json())
           
    }

    const getAkWait = () => {
        return fetch(`${cors}https://api.themeparks.wiki/preview/parks/WaltDisneyWorldAnimalKingdom/waittime`)
            .then(r => r.json())
            
    }

    return (
       <WaitContext.Provider value={{
           
           getMkWait,
           
           getEpcotWait,
           
           getHsWait,
           
           getAkWait
           
       }}>
           {props.children}
       </WaitContext.Provider>
    )
}
