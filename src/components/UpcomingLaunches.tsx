import { FlatList, Text, View, StyleSheet } from 'react-native'
import { launchApi, Launch } from '../store'
import {styles} from '../styles/styling'

export default function UpcomingLaunches() {
	
	const { data: launches } = launchApi.useGetAllQuery()

	return (
		<View>
            <View style={{
                height: 50, 
                borderBottomColor: '#000',
                borderBottomWidth: StyleSheet.hairlineWidth
            }}>
                <Text style={styles.textHeader}>Upcoming Flight List</Text>
            </View>

			<FlatList style={styles.launchListContainer} data={launches} renderItem={({item}) => (

				<View
					style={styles.listItems}>

					<Text style={styles.itemName}>{item.name}</Text>
					<Text style={styles.itemDate}>{item.date_local}</Text>

				</View>

			)} />
		</View>
	)
}

