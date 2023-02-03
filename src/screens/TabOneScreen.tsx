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
          if (!isError && launches !== undefined) {
            let sortedLaunches: Launch[] = []
            launches.forEach((launch) => sortedLaunches.push(launch))

            sortedLaunches.sort((a,b) => (a.date_unix > b.date_unix) ? 1 : -1)
            setLaunchData(sortedLaunches)
          }
      } catch (err) { console.error(err) }
  }, [launches])


  return (
    <View style={styles.container}>      
      <LaunchList launchData={launchData} navigation={navigation} />
    </View>
  );
}