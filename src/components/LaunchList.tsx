import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FlatList, Text, View, Pressable, Image, Dimensions } from 'react-native'
import { Launch } from '../redux/types'
import {styles} from '../styles/styling'
import Filter from './Filter'
import { createIconSet } from '@expo/vector-icons'



function Item (props: any) {
	const { id, crew, name, flight_number, date_local, date_unix, links } = props.item

	const crewList = (crew.length > 0) ? crew.map((crewMem:any, index:number) => <Text key={index}>{crewMem.role}</Text>) : <Text style={{...styles.listItem, ...styles.noCrew}}>No Crew</Text>
	
	const date = new Date(date_unix*1000)

	let Image_Http_URL = { 
		uri: links.patch.small || 'https://pbs.twimg.com/profile_images/1082744382585856001/rH_k3PtQ_400x400.jpg', 
		resizeMode : 'stretch',
		width: 100, 
		height: 100, 
	}

 
	return (
		<View style={styles.listItems}> 
			<Text style={{...styles.listItem, ...styles.itemName}}>{name}</Text>
	
			<View style={styles.crewList}>
				{crewList}
				<Text style={{...styles.listItem, ...styles.itemId}}>{id}</Text>
				<Text style={{...styles.listItem, ...styles.itemDate}}>{date.toLocaleDateString("en-US")}</Text>
				<Text style={{...styles.listItem, ...styles.itemNumber}}>Flight #{flight_number}</Text>
			</View>
			<Image source={Image_Http_URL} style={{
				position: 'absolute',
				right: Dimensions.get('window').width/20,
				top: Dimensions.get('window').height/12,
				borderRadius: ((links.patch.small) ? 0 : '100%'),
				
			}} />

		</View>
	)
}

export default function LaunchList(props: any) {
	const {launchData, navigation} = props

	return (
		<View>
			{ 
				!props.isLoading && launchData?.length > 0 
				&& <FlatList data={launchData}
				keyExtractor={launchData => launchData.id}
				initialNumToRender={10}
				renderItem={ ({item}) => {
					/* if (item.crew?.length === 0) return */
					return (
						<Pressable onPress={() => navigation.navigate('FlightInfoModal', {item: item})} 
						style={({ pressed }) => ( { opacity: pressed ? 0.5 : 1 } && styles.launchListItem)}>
							<Item key={item.id} item={item} />
						</Pressable>
					)
				}
				} />
			}
		</View>
	)
}