import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FlatList, Text, View, Pressable } from 'react-native'
import { Launch } from '../redux/types'
import {styles} from '../styles/styling'
import Filter from './Filter'



function Item (props: any) {
	const { item } = props

	const crewList = (item.crew.length > 0) ? item.crew.map((crewMem:any) => <Text>{crewMem.role}</Text>) : 'No Crew'
	
	return (
		<View style={styles.listItems}> 
			<Text style={styles.itemName}>{item.name}</Text>
			<Text style={styles.itemDate}>{item.date_local}</Text>
			<Text style={styles.itemId}>{item.id}</Text>
			<Text style={styles.itemNumber}>Flight #{item.flight_number}</Text>
			<Text style={styles.itemCrew}>{(item.crew.length > 0 && 'Multiple Crew') || 'No Crew'}</Text>
		</View>
	)
}

export default function LaunchList(props: any) {
	const {launchData, navigation} = props
	const itemsPerPage = 5

	return (
		<View>
			{ 
				!props.isLoading && launchData?.length > 0 
				&& <FlatList data={launchData}
				keyExtractor={launchData => launchData.id}
				renderItem={ ({item}) => (
					<Pressable onPress={() => navigation.navigate('FlightInfoModal', {item: item})} 
							style={({ pressed }) => ( { opacity: pressed ? 0.5 : 1 } && styles.launchListItem)}>
						<Item item={item} />
					</Pressable>
				)} />
			}
		</View>
	)
}