import {openBrowserAsync} from 'expo-web-browser';
import { StatusBar } from 'expo-status-bar';
import { Button, Platform, StyleSheet, Image, Dimensions, ImageStyle, Pressable } from 'react-native';
import { FlightInformation, RocketStatus } from '../../types';

import { Text, View } from '../components/Themed'
import { margin, padding } from '../styles/styling';
import { useEffect, useState } from 'react';

const EMPTY_STRING: string = ''

const PATCH_ZOOM = 2.75

interface FlightInfoProps {
	flightInfo: FlightInformation
};

enum FlightInfoSections{ DETAILS= "DETAILS", CREW = "CREW", ROCKET = "ROCKET"}


interface FlightInfoSectionProps {
	visiblityState: {
		visibleSection: FlightInfoSections,
		setVisibleSection: React.Dispatch<React.SetStateAction<FlightInfoSections>>
	}, 
	sectionName: FlightInfoSections,
	flightInfo: FlightInformation
};

function FlightInfoSection({visiblityState, sectionName, flightInfo}: FlightInfoSectionProps) {
	const {missionDetails} = flightInfo
	const {visibleSection, setVisibleSection} = visiblityState

	const missionDetailText = () => missionDetails ?? 'No Mission Details Recorded...'

	const sectionContent = missionDetailText()

	return (
		<View style={visibleSection === sectionName ? localStyles.sectionView : localStyles.sectionViewHidden}>
			<View style={localStyles.sectionHeader} onTouchEnd={() => setVisibleSection(sectionName)}>				
				<Text style={{fontWeight: 'bold'}}>{sectionName} Details</Text>
			</View>
			<Text ellipsizeMode="tail" style={localStyles.missionDetails}> 
				{ visibleSection === sectionName ? sectionContent : EMPTY_STRING } 
			</Text>
		</View>
	)
}

function FlightInfo (flightInfoProps: FlightInfoProps) {
	const { DETAILS, CREW, ROCKET } = FlightInfoSections
	const [ visibleSection, setVisibleSection ] = useState<FlightInfoSections>(DETAILS)

	const { 
		name, id, number, 
		dateLocal, webcast, 
		missionDetails, crew,
		rocketStatus, patch 
	} = flightInfoProps.flightInfo

	const isVideoAvaliable = webcast ? true : false

	return (
		<View style={{
			flex: 1,
			marginTop: 60,
			alignItems: 'center',
			borderTopRightRadius: 15,
			borderTopLeftRadius: 15,
			...padding(70,10,25,10)
		}}> 
			{/* Upper Section */}
			<Text style={localStyles.name}>{ name }</Text>
			<Pressable disabled={!isVideoAvaliable} onPress={() => {openBrowserAsync(webcast)}} > 
				<Text style={localStyles.webcast}>{isVideoAvaliable ? 'Watch Launch' : 'No Video Avaliable'}</Text>
			</Pressable>

			<FlightInfoSection flightInfo={flightInfoProps.flightInfo}
				visiblityState={{visibleSection, setVisibleSection}} 
				sectionName={CREW} />
			<FlightInfoSection flightInfo={flightInfoProps.flightInfo}
				visiblityState={{visibleSection, setVisibleSection}} 
				sectionName={ROCKET} />
			<FlightInfoSection flightInfo={flightInfoProps.flightInfo}
				visiblityState={{visibleSection, setVisibleSection}} 
				sectionName={DETAILS} />

			{/* Footer Section */}
			<View style={{
				position: 'absolute',
				bottom: 11,
				flex: 1,
				flexDirection: 'row',
				justifyContent: 'space-between',
				width: '100%',
				...padding(0, 5, 0, 5),
			}}>
				<Text style={localStyles.footerText}>Flight #{ number }</Text>
				<Text style={localStyles.footerText}>{ id }</Text>
				<Text style={localStyles.footerText}>{ dateLocal }</Text>
			</View>
		</View>
	)
}


export default function FlightInfoModalScreen(props:any) {
	const flightInfo = props.route.params.flightInfo as FlightInformation
	const { patch } = flightInfo

	interface ImageSource {
		uri: string, 
		resizeMode: string,
		width: number,
		height: number
	};

	interface ImageSize { width: number, height: number };

	let cardBackground: ImageSource = {
		uri: 'https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/into-the-stars-2-ai-artisan.jpg',
		resizeMode: 'stretch',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height/2
	}

	// TODO DECOUPLE PATCH IMAGE PROCESSING FROM THIS COMPONENT

	const spaceXTwitterPFP = 'https://pbs.twimg.com/profile_images/1082744382585856001/rH_k3PtQ_400x400.jpg'

	const [patchSize, setPatchSize] = useState<ImageSize>({width: 400, height: 400})
	const [patchSource, setPatchSource] = useState<ImageSource | undefined>(undefined)
	const [isGettingSize, setIsGetingSize] = useState<boolean>(true)
	
	let patchImage: ImageSource = { 
		uri: patch || spaceXTwitterPFP, 
		resizeMode : 'stretch',
		width: 0,
		height: 0
	}

	useEffect(() => {
		if (isGettingSize) {
			Image.getSize(patchImage.uri, (width, height) => setPatchSize({width, height}))
			setIsGetingSize(false)
			return
		}
		setPatchSource({...patchImage, width: patchSize.width/PATCH_ZOOM, height: patchSize.height/PATCH_ZOOM})
	}, [patchSize])

	return (
		<View style={localStyles.container}>
			<Image source={cardBackground} style={localStyles.cardBackground} />
			<FlightInfo flightInfo={flightInfo} />
			<View style={{position: 'absolute', top: 20, left: 0, right: 0, bottom: 0, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0)'}}>
				<Image source={patchSource} 
					style={{ 
						borderRadius: ((patch) ? 0 : '100%'),
					}} />
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
		height: Dimensions.get('window').height
	},
	cardBackground: {
		position: 'absolute',
		top: 0,
		left: 0
	},
	name:{
		fontWeight: 'bold',
		fontSize: 18
	},
	id: {
		fontSize: 10,
		color: 'black',
	},
	date: {
		fontSize: 10,
		color: 'black',
	},
  	missionDetails: {
	  	fontSize: 12,
	},
	sectionHeader: {
		backgroundColor: 'rgba(0,0,0,0)',
	},
	sectionView: {
		backgroundColor: '#ccc',
		minHeight: 250,
		width: '100%',
		borderRadius: 10,
		flex: 1,
	  	flexDirection: 'column',
	  	justifyContent: 'flex-start',
		marginBottom: 10,
		...padding(10,10,10,10)
	},
	sectionViewHidden: {
		backgroundColor: '#ccc',
		maxHeight: 35,
		width: '100%',
		borderRadius: 10,
		flex: 1,
	  	flexDirection: 'column',
	  	justifyContent: 'flex-start',
		marginBottom: 10,
		...padding(10,10,10,10)
	},
	footerText: {
		fontSize: 10,
		color: 'black',
		fontWeight: 'bold'
	},
	webcast: {
		fontSize: 15,
		marginBottom: 10,
		color: 'blue'
	},
  
});
