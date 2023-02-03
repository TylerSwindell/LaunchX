import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { RootTabScreenProps } from '../../types';
import LaunchList from '../components/LaunchList';

import { View } from '../components/Themed'
import { useGetAllLaunchesQuery } from '../redux/api/launchApi';
import { Launch } from '../redux/types';
import { styles } from '../styles/styling';

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [launchData, setLaunchData] = useState<Launch[]>([])
  const { data: launches, isLoading, isError } = useGetAllLaunchesQuery()

  useEffect( () => {
      try {
          if (!isError && launches !== undefined) 
          setLaunchData(launches)
          console.log(launchData)
      } catch (err) { console.error(err) }
  }, [launches])


  return (
    <View style={styles.container}>      
      <LaunchList launchData={launchData} navigation={navigation} />
    </View>
  );
}
