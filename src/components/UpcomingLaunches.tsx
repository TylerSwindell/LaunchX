import { FlatList, Text, View } from 'react-native'
import { launchApi, Launch } from '../store'
import {styles} from '../styles/styling'


export default function UpcomingLaunches() {
	const { data: launches } = launchApi.useGetAllQuery()

	return (
		<View>
			<FlatList style={styles.launchListContainer} data={launches} renderItem={({item}) => (

				<View
					style={styles.listItems}>

					<Text style={styles.itemName}>{item.name}</Text>
					<Text style={styles.itemDate}>{item.rocket}</Text>

				</View>

			)} />
		</View>
	)
}