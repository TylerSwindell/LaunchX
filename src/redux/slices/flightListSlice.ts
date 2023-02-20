import { createSlice } from "@reduxjs/toolkit";
import { FlightInformation, RocketStatus } from "../../../types";

const initialState = {
    list: <FlightInformation[]>[]
}

const flightListSlice = createSlice({
    name: 'flightList',
    initialState,
    reducers: {
        updateFlightList: (state, action) => {
            const {launches, isError} = action.payload
            try {
                if (!isError && launches !== undefined) {
                    let flightInfoList: FlightInformation[] = launches.map((flight: any) => {
                        const {name, id, flight_number, date_unix, links, crew} = flight
        
                        const spaceXTwitterPFP = 'https://pbs.twimg.com/profile_images/1082744382585856001/rH_k3PtQ_400x400.jpg'
        
                        // Parse patch data
                        let patch = {
                            default: (links.patch.small) ? false : true,
                            uri: links.patch.small ?? spaceXTwitterPFP,
                            size: {
                                width: 100,
                                height: 100
                            }
                        }
        
                        // Parse Crew List
                        const crewList = (
                            (crew?.length > 0) 
                                ? crew.map((crewMem:any, index:number) => {
                                    switch (index) {
                                        case 0: case 1: case 2: case 3: 
                                            return crewMem.role+'\n'
                                        case 4:
                                            return '...'
                                        default: return
                                    }
                                }) : 'No Crew'
                            )
                        
                        return ({
                            name, 
                            id, 
                            number: flight_number,
                            dateLocal: new Date(date_unix*1000).toLocaleDateString(), 
                            dateUnix: date_unix,
                            webcast: flight.links?.webcast,
                            missionDetails: flight.details ?? 'No Mission Details Recorded.',
                            rocketStatus: {
                                reused: flight.fairings?.reused ?? undefined,
                                recoveryAttempt: flight.fairings?.recovery_attempt ?? undefined,
                                recovered: flight.fairings?.recovered ?? undefined
                            } as RocketStatus,
                            patch,
                            crewList,
                            crew
                        })
                    })
                    state.list = flightInfoList
                    state.list.sort((a, b) => (a.dateUnix > b.dateUnix) ? -1 : 1)
                }
            } catch (err) { console.error(err) }
      
        },
        setFlightList: (state, action) : void => { state = action.payload },
        sortFlightList: (state) : void => {
            state.list.sort((a, b) => (a.dateUnix > b.dateUnix) ? -1 : 1)
        },
        logFlightList: (state, action) : void => {
            const { payload } = action
            const { logIndex } = payload

            console.log('flightList Log:', state.list[logIndex])
        },
        resetFlightList: (state) : void => {
            state.list = <FlightInformation[]>[]
        }
    }
})

export const {updateFlightList, setFlightList, logFlightList, resetFlightList, sortFlightList} = flightListSlice.actions

export default flightListSlice