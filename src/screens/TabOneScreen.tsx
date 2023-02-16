import { View } from '../components/Themed'
import { RootTabScreenProps } from '../../types'
import { styles } from '../styles/styling'
import LaunchList from '../components/LaunchList'
import { useGetUpcomingLaunchesQuery } from '../redux/api/launchApi'
import { useEffect, useState } from 'react'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [flightInfo, setFlightInfo] = useState<FlightInformation[]>([])
  const { data: launches, isLoading, isError } = useGetUpcomingLaunchesQuery()

  useEffect( () => {
	try {
		if (!isError && launches !== undefined) {
			let flightInfoList: FlightInformation[] = launches.map((flight: any) => ({
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
		}
	} catch (err) { console.error(err) }
  }, [launches])


  return (
    <View style={styles.container}>      
    	<LaunchList flightInfo={flightInfo} navigation={navigation} />
    </View>
  );
}