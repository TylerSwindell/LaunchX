import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image, Dimensions, useWindowDimensions } from 'react-native';
import { FlightInformation, ImageSize, ImageSource } from '../../types';

import { View } from '../components/Themed'
import { padding } from '../styles/styling';
import { useEffect, useState } from 'react';
import FlightInfoPanel from '../components/FlightInfoPanel';


const PATCH_ZOOM = 2

export default function FlightInfoModalScreen(props:any) {
	const flightInfo = props.route.params.flightInfo as FlightInformation
	const { patch } = flightInfo

	

	let cardBackground: ImageSource = {
		uri: 'https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/into-the-stars-2-ai-artisan.jpg',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height/2
	}

	// TODO DECOUPLE PATCH IMAGE PROCESSING FROM THIS COMPONENT

	const spaceXTwitterPFP = 'https://pbs.twimg.com/profile_images/1082744382585856001/rH_k3PtQ_400x400.jpg'

	const [patchSize, setPatchSize] = useState<ImageSize>({width: 200, height: 200})
	const [patchSource, setPatchSource] = useState<ImageSource | undefined>(undefined)
	const [isGettingSize, setIsGetingSize] = useState<boolean>(true)
	//const {width: windowWidth, height: windowHeight, scale: windowScale, fontScale} = useWindowDimensions()
	
	let patchImage: ImageSource = { 
		uri: patch.uri || spaceXTwitterPFP, 
		width: 0, 
		height: 0
	}

	useEffect(() => {
		if (isGettingSize) {
			Image.getSize(patchImage.uri, (width, height) => setPatchSize(() => {
				
				let imageSize:ImageSize = {width, height}

				if (width/height > 1) {
					// switch ({windowWidth, windowHeight}) {
	
					// }
				} else if (width/height === 1) {
					imageSize = {width: 250, height: 250}
				}

				

				// TODO: BUILD IMAGE RESIZER

				return imageSize
			}))
			setIsGetingSize(false)
			return
		}
		setPatchSource({...patchImage, width: patchSize.width/PATCH_ZOOM, height: patchSize.height/PATCH_ZOOM})
	}, [patchSize])

	return (
		<View style={localStyles.container}>
			<Image source={cardBackground} style={localStyles.cardBackground} />
			<FlightInfoPanel flightInfo={flightInfo} />
			<View style={{
				position: 'absolute', 
				top: 20, 
				right: 10, bottom: 0, 
				alignItems: 'center', 
				backgroundColor: 'rgba(0,0,0,0)',
				height: 0
			}}>
				<Image source={patchSource} style={{ borderRadius: ((patch.default) ? '100%' : 0) }} />
			</View>
			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
	);
}

const localStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		backgroundColor: 'white',
	},
	cardBackground: {
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: 'white',
	},
	name:{
		fontWeight: 'bold',
		color: 'black',
		fontSize: 18
	},
	id: { fontSize: 10, color: 'black', },
  	missionDetails: {
	  	fontSize: 12,
		color: 'black'
	},
	footerText: {
		fontSize: 10,
		color: 'black',
		backgroundColor: 'white',
		fontWeight: 'bold'
	},
	webcast: {
		fontSize: 15,
		marginBottom: 10,
		color: 'blue'
	},
  
});
