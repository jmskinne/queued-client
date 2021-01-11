import React, {useContext, useEffect, useState} from "react"
import {RideContext} from "./RideProvider"
import {ReviewContext} from "../review/ReviewProvider"
import {DateTime} from "luxon"
import {VictoryAxis, VictoryBar, VictoryChart} from 'victory'


import {ProfileContext} from "../profile/ProfileProvider"
import { WaitContext } from "../wait/WaitProvider"


export const RideDetail = (props) => {
    const {profile} = useContext(ProfileContext)
    const {getRideById} = useContext(RideContext)
    const {rideReviews, getReviewsByRide, deleteRideReview} = useContext(ReviewContext)
    const {historicalWait, getHistoricalWaitByRide} = useContext(WaitContext)
    
    
    const [ride, setRide] = useState({})
    
    const [loaded, setLoaded] = useState(false)
    const [waitTimes, setTimes] = useState([])

    const [showChart, setShowChart] = useState(false)
    const rideId = props.match.params.rideId
    
    useEffect(() => {
        
        getRideById(rideId).then(r => setRide(r))
        getReviewsByRide(rideId)
        
    }, [])

    useEffect(() => {
        getHistoricalWaitByRide(rideId).then(setLoaded(true))
    }, [])

    useEffect(() => {
        let tmp = {}
        historicalWait.forEach(item => {
            let obj = tmp[DateTime.fromISO(item.created_on).toLocaleString(DateTime.DATE_SHORT)] = tmp[DateTime.fromISO(item.created_on).toLocaleString(DateTime.DATE_SHORT)] || {count: 0, total : 0}
            if(item.wait !== null) {
            obj.count++
            obj.total += item.wait
            }
        })
        let res = Object.entries(tmp).map(entry => {
            return {date : entry[0], avg : entry[1].total / entry[1].count}
        }) || {}
        setTimes(res)
        console.log(tmp)
    }, [showChart])

    useEffect(() => {
        console.log(waitTimes)
    }, [waitTimes])

    return (
        <>
        <div class="bg-warm-grey-200">
            <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
                <div class="lg:text-center">
                    
                        <p class="text-2xl leading-8 font-extrabold  text-warm-grey-900 sm:text-4xl"> {ride.name} </p>
                        <div class="rounded-md mt-4 mb-4">
                        <button onClick={() => props.history.push(`/ridereviews/new/${props.match.params.rideId}`)
                            } class="px-8 py-3 border-warm-grey-900 border-transparent text-base font-medium rounded-md text-warm-grey-900 bg-lime-green-400 hover:bg-lime-green-900 hover:text-warm-grey-050 md:py-4 md:text-lg md:px-10">
                            Review This Ride
                            </button>
                        </div>
                        <div class="flex flex-wrap items-center justify-center xl:-mx-4">
                            
                            {
                                rideReviews.map(r => {
                                    return <div class="w-full sm:w-1/2 lg:w-1/2 py-6 px-3">
                                             <div class="bg-yellow-vivid-050 shadow-xl rounded-lg overflow-hidden"  key={r.id}>
                                                  <div class="flex flex-wrap overflow-hidden">
                                                    <div class="w-full overflow-hidden">  
                                                        <p class="tracking-wide text-lg  text-warm-grey-900 text-left p-3">{r.review}</p>
                                                    </div>
                                                    </div>
                                                    <div class="flex overflow-hidden border-t px-2 items-baseline mb-4">
                                                        <div class="w-4/12 overflow-hidden text-left">
                                                            {
                                                               (profile[0]?.user.id === r.reviewer?.user.id) 
                                                               ? 
                                                                <>
                                                                <button onClick={() => props.history.push(`/ridereviews/edit/${r.id}`)}>
                                                                    <svg class="h6 w-6 text-cyan-600 ml-3 mt-2 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    </svg>
                                                                </button>                                                    
                                                                <button onClick={() => deleteRideReview(r)}>
                                                                    <svg class="h6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                </button>
                                                                </>
                                                                :
                                                                ''
                                                            }
                                                    
                                                        </div>
                                                        <div class="w-4/12 overflow-hidden ">
                                                            <p class="tracking-wide text-2xl  font-bold text-warm-grey-600 text-center mt-2">Rating: {r.rating}</p>
                                                        </div>
                                                        <div class="w-4/12 overflow-hidden">
                                                            <div class="text-warm-grey-300 mt-2 "><span class="mr-1">{r.reviewer?.user.username} </span>
                                                            <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white mb-2" src={(`${profile[0]?.profile_image_url}`)} />
                                                            </div>
                                                            
                                                        </div>
    
                                                    </div>
                                                </div>
                                            </div>
                                })
                            }
                        </div>
                    <div>
                        <button class="bg-cyan-050 hover:bg-cyan-900 text-warm-grey-700 hover:text-warm-grey-050 font-bold py-2 px-4 rounded" onClick={() => props.history.push(`/rides`)}>Back</button>
                        <button class="px-5 py-2 border-warm-grey-900 border-transparent text-base font-medium ml-5 mr-5
                            rounded-md text-warm-grey-900 bg-cyan-400 hover:bg-cyan-900 hover:text-warm-grey-050"onClick={() => setShowChart(true)}>Show Chart</button>
                        <button class="px-5 py-2 border-warm-grey-900 border-transparent text-base font-medium 
                            rounded-md text-warm-grey-900 bg-yellow-vivid-400 hover:bg-yellow-vivid-900 hover:text-warm-grey-050" onClick={() => setShowChart(false)}>Hide Chart</button>
                    </div>
                    <div class="flex flex-wrap items-center justify-center max-w-2xl">
                        {
                            showChart ?
                                <VictoryChart domainPadding={{x:15}}>
                                    <VictoryBar 
                                        style={{
                                            data : {fill : "#0E7C86"},
                                            labels : {fontSize: 8},

                                        }}
                                        height={400}
                                        width={150}
                                        data={waitTimes}
                                        alignment="start"
                                        x="date"
                                        y="avg"
                            
                                                />
                                    <VictoryAxis label="date" style={{axisLabel: {padding: 20}}} />
                                    <VictoryAxis dependentAxis label="Average Wait" style={{axisLabel: {padding : 30}}} />
                                </VictoryChart>
                            :
                            ''
                                
                        }
                        
                    </div>
                    
                    
                </div>
            </div>
        </div>

        </>
    )

   
}