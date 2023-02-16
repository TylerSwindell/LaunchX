import { View } from '../components/Themed'
import { RootTabScreenProps } from '../../types'
import { styles } from '../styles/styling'
import LaunchList from '../components/LaunchList'
import { useGetAllLaunchesQuery } from '../redux/api/launchApi'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  return (
    <View style={styles.container}>      
    	<LaunchList navigation={navigation} />
    </View>
  );
}