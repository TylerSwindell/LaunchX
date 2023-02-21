import { FlatList, Text, View, Pressable, Image, StyleProp, StyleSheet } from 'react-native'
import {styles} from '../styles/styling'
import { FlightInformation } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useGetAllLaunchesQuery } from '../redux/api/launchApi'
import store from '../redux/store'
import { updateFlightList } from '../redux/slices/flightListSlice'
import config from '../config'


interface ItemProps {
	key: number,
	item: FlightInformation
};

function Item (itemProps: ItemProps) {
	const { 
		id, crewList, name, number, 
		dateLocal, patch
	} = itemProps.item

	const {size} = patch

	if (config.developmentMode) console.log(name, patch.default, size)

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
			<View style={ (patch.default) ? (localStyles.imageViewCircle) : (localStyles.imageViewDefault) } >
				<Image source={Image_Http_URL} />
			</View>

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
		if (config.developmentMode) console.log('Store Updated') 
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

const localStyles = StyleSheet.create({
	imageViewDefault: {
		position: 'absolute',
		right: 8,
		top: 35,
		borderRadius: 0
	},
	imageViewCircle: {
		position: 'absolute',
		right: 8,
		top: 35,
		borderRadius: 100,
		overflow: 'hidden'
	}
})