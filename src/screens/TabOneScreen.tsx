import { View } from '../components/Themed'
import { RootTabScreenProps } from '../../types'
import { styles } from '../styles/styling'
import LaunchList from '../components/LaunchList'
import { useGetAllLaunchesQuery, useGetUpcomingLaunchesQuery } from '../redux/api/launchApi'
import { useEffect, useState } from 'react'
import { Launch } from '../redux/types'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [launchData, setLaunchData] = useState<Launch[]>([])
  const { data: launches, isError } = useGetUpcomingLaunchesQuery()

  useEffect( () => {
      try {
          if (!isError && launches !== undefined) setLaunchData(launches)
      } catch (err) { console.error(err) }
  }, [launches])


  return (
    <View style={styles.container}>      
      <LaunchList launchData={launchData} navigation={navigation} />
    </View>
  );
}