import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { FlightInformation, RocketStatus } from "../../types";
import { useGetAllLaunchesQuery } from "../redux/api/launchApi";

interface FlightInfoContext {
    flightInfo: FlightInformation[] | null,
    setFlightInfo: Dispatch<SetStateAction<FlightInformation[]>> | null
}

let flightInfoList: FlightInformation[] = []

export const LaunchContext = createContext(flightInfoList)

export function useLaunch() {
    return useContext(LaunchContext)
}

let value: FlightInfoContext = {
    flightInfo: [],
    setFlightInfo: null
}

export function LaunchContextProvider({ children }: {children: any}) {
    const { data: launches, isLoading, isError } = useGetAllLaunchesQuery()

    const [flightInfo, setFlightInfo] = useState<FlightInformation[]>([])

    useEffect(() => {
        console.log('LaunchContext: USE EFFECT')
        
        try {
            if (!isError && launches !== undefined) {
                console.log("LaunchContext: No Error")
                flightInfoList = launches.map((flight: any) => ({
                    name: flight.name, 
                    id: flight.id, 
                    number: flight.flight_number,
                    dateLocal: new Date(flight.date_unix*1000).toLocaleDateString(), 
                    webcast: flight.links?.webcast,
                    missionDetails: flight.details ?? 'No Mission Details Recorded.',
                    rocketStatus: {
                        reused: flight.fairings?.reused ?? undefined,
                        recoveryAttempt: flight.fairings?.recovery_attempt ?? undefined,
                        recovered: flight.fairings?.recovered ?? undefined
                    } as RocketStatus,
                    patch: flight.links?.patch.small,
                    crew: flight?.crew
                })
            )
            setFlightInfo(flightInfoList)
            value = { flightInfo, setFlightInfo }
            console.log("LaunchContext: After setFlightInfo")
            }
        } catch (err) { console.error('LaunchContext:',err) }
      }, [launches, isLoading])
    
      

    return (
        <LaunchContext.Provider value={ value }>
            {children}
        </LaunchContext.Provider>
    )
}
