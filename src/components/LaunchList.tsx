import { FlatList, Text, View, Pressable, Image, Dimensions } from 'react-native'
import {styles} from '../styles/styling'
import { FlightInformation } from '../../types'
import { useSelector } from 'react-redux'
import flightListSlice from '../redux/slices/flightListSlice'


interface ItemProps {
	key: number,
	item: FlightInformation
};

function Item (itemProps: ItemProps) {
	const { 
		id, crew, name, number, 
		dateLocal, patch, crewListEle
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
		uri: patch.uri, 
		width: 100, 
		height: 100, 
	}
 
	return (
		<View style={styles.listItems}> 
			<Text style={{...styles.listItem, ...styles.itemName}}>{name}</Text>
	
			<View style={styles.lowerCard}>
				{crewListEle}
				<Text style={{...styles.listItem, ...styles.itemId}}>{id}</Text>
				<Text style={{...styles.listItem, ...styles.itemDate}}>{dateLocal}</Text>
				<Text style={{...styles.listItem, ...styles.itemNumber}}>Flight #{number}</Text> 
			</View>
			<Image source={Image_Http_URL} style={{
				position: 'absolute',
				right: 0,
				top: 0,
				borderRadius: ((patch.default) ? '100%' : 0),
				
			}} />

		</View>
	)
}

export default function LaunchList(props: any) {
	const {navigation} = props
	const flightList = useSelector((state) => state.flightList)

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