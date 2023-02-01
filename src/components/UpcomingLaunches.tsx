import { FlatList, Text, View, StyleSheet, Pressable } from 'react-native'
import { useGetUpcomingLaunchesQuery } from '../features/launchApi'
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
			<FlatList style={styles.launchListContainer} 
				data={launches} 
				renderItem={({item}) => (
					<Pressable style={({ pressed }) => ({ opacity: pressed ? 1 : .85 })}>
						<Item item={item} />
					</Pressable>
			)} />
		</View>
	)
}
