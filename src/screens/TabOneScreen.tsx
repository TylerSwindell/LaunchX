import { View } from '../components/Themed'
import { RootTabScreenProps } from '../../types'
import { styles } from '../styles/styling'
import LaunchList from '../components/LaunchList'

import { useSelector } from 'react-redux'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
	const flightListState = useSelector(state => state.flightList)

  return (
    <View style={styles.container}>      
    	<LaunchList flightInfo={flightListState} navigation={navigation} />
    </View>
  );
}