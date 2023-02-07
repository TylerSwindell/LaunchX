import { useSelector } from 'react-redux';
import { RootTabScreenProps } from '../../types';
import LaunchList from '../components/LaunchList';

import { View } from '../components/Themed'
import { styles } from '../styles/styling';

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
	const flightListState = useSelector(state => state.flightList)

  return (
    <View style={styles.container}>      
    	<LaunchList flightInfo={flightListState} navigation={navigation} />
    </View>
  )
}
