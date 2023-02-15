import { RootTabScreenProps } from '../../types';

import { View } from '../components/Themed'
import {SafeAreaView} from 'react-native'
import { styles } from '../styles/styling';
import AboutMe from '../components/AboutMe';

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  return (
    <SafeAreaView style={{...styles.container}}>      
    	<AboutMe />
    </SafeAreaView>
  )
}
