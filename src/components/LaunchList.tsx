import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FlatList, Text, View, Pressable, Image, Dimensions, TabBarIOSItem } from 'react-native'
import { Launch } from '../redux/types'
import {styles} from '../styles/styling'
import Filter from './Filter'
import { createIconSet } from '@expo/vector-icons'
import { FlightInformation } from '../../types'
import { copyWithStructuralSharing } from '@reduxjs/toolkit/dist/query'


interface ItemProps {
	key: number,
	item: FlightInformation
};

function Item (itemProps: ItemProps) {
	const { 
		id, crew, name, number, 
		dateLocal, patch 
	} = itemProps.item

	const crewList = (
		(crew?.length > 0) 
			? crew.map((crewMem:any, index:number) => {
				switch (index) {
					case 0: case 1: case 2: case 3: 
						return <Text key={index}>{crewMem.role}</Text>
					case 4:
						return <Text key={index}>...</Text>
					default: return
				}
			}) : <Text style={{...styles.listItem, ...styles.noCrew}}>No Crew</Text>
		)
		

	let Image_Http_URL = { 
		uri: patch || 'https://pbs.twimg.com/profile_images/1082744382585856001/rH_k3PtQ_400x400.jpg', 
		resizeMode : 'stretch',
		width: 100, 
		height: 100, 
	}
 
	return (
		<View style={styles.listItems}> 
			<Text style={{...styles.listItem, ...styles.itemName}}>{name}</Text>
	
			<View style={styles.lowerCard}>
				{crewList}
				<Text style={{...styles.listItem, ...styles.itemId}}>{id}</Text>
				<Text style={{...styles.listItem, ...styles.itemDate}}>{dateLocal}</Text>
				<Text style={{...styles.listItem, ...styles.itemNumber}}>Flight #{number}</Text> 
			</View>
			<Image source={Image_Http_URL} style={{
				position: 'absolute',
				right: Dimensions.get('window').width/20,
				top: Dimensions.get('window').height/12,
				borderRadius: ((patch) ? 0 : '100%'),
				
			}} />

		</View>
	)
}

export default function LaunchList(props: any) {
	const {flightInfo, navigation} = props

	return (
		<View>
			{ 
				!props.isLoading && flightInfo?.length > 0 
				&& <FlatList data={flightInfo}
				initialNumToRender={100}
				renderItem={ ({item, index}) => {
					if (item.crew.length === 0) return

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