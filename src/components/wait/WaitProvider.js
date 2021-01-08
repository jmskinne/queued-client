import React, {useState} from 'react'


export const WaitContext = React.createContext()


export const WaitProvider = props => {
    const cors = "https://blooming-gorge-83806.herokuapp.com/"
    const [allWaitTimes, setWaitTimes] = useState([])

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

    const getAllWaitTimes = () => {
        const urls = [
            `${cors}https://api.themeparks.wiki/preview/parks/WaltDisneyWorldMagicKingdom/waittime`,
            `${cors}https://api.themeparks.wiki/preview/parks/WaltDisneyWorldEpcot/waittime`,
            `${cors}https://api.themeparks.wiki/preview/parks/WaltDisneyWorldHollywoodStudios/waittime`,
            `${cors}https://api.themeparks.wiki/preview/parks/WaltDisneyWorldAnimalKingdom/waittime`
        ]
        Promise.all(urls.map(url => 
            fetch(url)
                .then(rep => rep.json())
        ))
        .then(r => {
            let test1 = r[0]
            let test2 = r[1]
            let test3 = r[2]
            let test4 = r[3]
            let testArr = [...test1, ...test2, ...test3, ...test4]
            return testArr
        }).then(setWaitTimes)
    }

    return (
       <WaitContext.Provider value={{     
           getMkWait,
           getEpcotWait,
           getHsWait,
           getAkWait,
           getAllWaitTimes,
           allWaitTimes
       }}>
           {props.children}
       </WaitContext.Provider>
    )
}
