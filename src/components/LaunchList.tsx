import { FlatList, Text, View, Pressable, Image } from 'react-native'
import {styles} from '../styles/styling'
import { FlightInformation } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useGetAllLaunchesQuery } from '../redux/api/launchApi'
import store from '../redux/store'
import { updateFlightList } from '../redux/slices/flightListSlice'


interface ItemProps {
	key: number,
	item: FlightInformation
};

function Item (itemProps: ItemProps) {
	const { 
		id, crewList, name, number, 
		dateLocal, patch
	} = itemProps.item

	let Image_Http_URL = { 
		uri: patch.uri, 
		width: 100, 
		height: 100, 
	}
 
	return (
		<View style={styles.listItems}> 
			<Text style={{...styles.listItem, ...styles.itemName}}>{name}</Text>
	
			<View style={styles.lowerCard}>
				<Text style={{...styles.listItem, ...styles.noCrew}}>{crewList}</Text>
				<Text style={{...styles.listItem, ...styles.itemId}}>{id}</Text>
				<Text style={{...styles.listItem, ...styles.itemDate}}>{dateLocal}</Text>
				<Text style={{...styles.listItem, ...styles.itemNumber}}>Flight #{number}</Text> 
			</View>
			<Image source={Image_Http_URL} 
				style={{
					position: 'absolute',
					right: 8,
					top: 50,
					borderRadius: ((patch.default) ? '100%' : 0),
				}} 
			/>

		</View>
	)
}

export default function LaunchList(props: any) {
	const {navigation} = props
	
	const { data: launches, isLoading, isError } = useGetAllLaunchesQuery()
	const flightList = useSelector((state:any) => state.flightList.list)
	
	const dispatch = useDispatch()
	
	useEffect(() => { 
		dispatch(updateFlightList({launches, isError})) 
	}, [launches])

	store.subscribe(() => { 
		console.log('Store Updated') 
	})

	return (
		<View>
			{ 
				!props.isLoading 
				&& <FlatList data={flightList}
				initialNumToRender={10}
				maxToRenderPerBatch={8}
				renderItem={ ({item, index}) => {
					//if (item.crew.length === 0) return

					return (
						<Pressable onPress={() => navigation.navigate('FlightInfoModal', {flightInfo: item})} 
						style={({ pressed }) => ( { opacity: pressed ? 0.5 : 1 } && styles.launchListItem)}>
							<Item key={index} item={item} />
						</Pressable>
					)
				}
				} />
			}
		</View>
	)
}