import { View } from '../components/Themed'
import { RootTabScreenProps } from '../../types'
import { styles } from '../styles/styling'
import LaunchList from '../components/LaunchList'
import { useGetUpcomingLaunchesQuery } from '../redux/api/launchApi'
import { useEffect, useState } from 'react'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  return (
    <View style={styles.container}>      
    	<LaunchList navigation={navigation} />
    </View>
  );
}