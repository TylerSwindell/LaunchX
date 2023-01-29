import { Octicons } from '@expo/vector-icons'; 
import { View } from 'react-native';
import { styles } from '../styles/styling';

export default function Header() {
    return (
        <View style={styles.header}>
            <Octicons name="feed-rocket" size={15} color="black" />
        </View>
    )
}
