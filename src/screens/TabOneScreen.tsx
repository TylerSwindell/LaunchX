import { View } from '../components/Themed'
import UpcomingLaunches from '../components/UpcomingLaunches';
import { RootTabScreenProps } from '../../types'
import { styles } from '../styles/styling';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>      
      <UpcomingLaunches />
    </View>
  );
}