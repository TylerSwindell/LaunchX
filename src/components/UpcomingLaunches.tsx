import { FlatList, Text, View, StyleSheet } from 'react-native'
import { useGetUpcomingLaunchesQuery } from '../features/launchApi'
import { Launch } from '../redux/types'
import {styles} from '../styles/styling'



 function Item (props: any) {
	const { item } = props
  return (
	<View style={styles.listItems}>
		<Text style={styles.itemName}>{item.name}</Text>
		<Text style={styles.itemDate}>{item.date_local}</Text>
	</View>
  )
}


export default function UpcomingLaunches() {	
	const { data: launches } = useGetUpcomingLaunchesQuery()

	return (
		<View>
            <View style={{
                height: 50, 
                borderBottomColor: '#000',
                borderBottomWidth: StyleSheet.hairlineWidth
            }}>
                <Text style={styles.textHeader}>Upcoming Flight List</Text>
            </View>

			<FlatList style={styles.launchListContainer} 
				data={launches} 
				renderItem={({item}) => (
				<Item item={item} />
			)} />
		</View>
	)
}
