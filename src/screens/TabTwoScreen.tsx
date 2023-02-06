import { CommonActions } from '@react-navigation/native';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FlightInformation, RocketStatus, RootTabScreenProps } from '../../types';
import LaunchList from '../components/LaunchList';

import { View } from '../components/Themed'
import { useGetAllLaunchesQuery } from '../redux/api/launchApi';
import { styles } from '../styles/styling';

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [flightInfo, setFlightInfo] = useState<FlightInformation[]>([])
  const { data: launches, isLoading, isError } = useGetAllLaunchesQuery()

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
