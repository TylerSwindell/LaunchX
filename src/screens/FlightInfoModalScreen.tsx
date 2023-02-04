import {openBrowserAsync} from 'expo-web-browser';
import { StatusBar } from 'expo-status-bar';
import { Button, Platform, StyleSheet, Image, Dimensions, ImageStyle } from 'react-native';
import { FlightInformation, RocketStatus } from '../../types';

import { Text, View } from '../components/Themed'
import { margin, padding } from '../styles/styling';

interface FlightInfoProps {
	flightInfo: FlightInformation
};

function FlightInfo (flightInfoProps: FlightInfoProps) {

	const { 
		name, id, number, 
		dateLocal, webcast, 
		missionDetails, crew,
		rocketStatus, patch 
	} = flightInfoProps.flightInfo

	const isVideoAvaliable = webcast ? true : false

	return (
		<View style={{
			flex: 0,
			alignItems: 'center',
			height: Dimensions.get('window').height - 250,
			borderTopRightRadius: 15,
			borderTopLeftRadius: 15,
			...padding(105,10,80,10)
		}}> 
			<Text style={localStyles.name}>{ name }</Text>
			<Button title={isVideoAvaliable ? 'Watch Launch' : 'No Video Avaliable'} disabled={!isVideoAvaliable} onPress={() => {openBrowserAsync(webcast)}} />
			<View style={localStyles.detailsView}>
				<Text style={localStyles.date}>{ dateLocal }</Text>
				<Text style={{fontWeight: 'bold'}}>Details:</Text>
				<Text style={localStyles.missionDetails}>{missionDetails}</Text>
			</View>
			<Text style={localStyles.id}>{ id }</Text>
		</View>
	)
}


export default function FlightInfoModalScreen(props:any) {
	const flightInfo = props.route.params.flightInfo as FlightInformation
	const { patch } = flightInfo

	let cardBackground = {
		uri: 'https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/into-the-stars-2-ai-artisan.jpg',
		resizeBy: 'stretch',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height/2
	}

	const spaceXTwitterPFP = 'https://pbs.twimg.com/profile_images/1082744382585856001/rH_k3PtQ_400x400.jpg'
	let patchImage = { 
		uri: patch || spaceXTwitterPFP, 
		resizeMode : 'stretch',
		width: 200, 
		height: 200, 
	}

	return (
		<View style={localStyles.container}>
			<Image source={cardBackground} style={localStyles.cardBackground} />
			<FlightInfo flightInfo={flightInfo} />
			<Image source={patchImage} 
				style={{ 
					position: 'absolute',
					top: 0,
					left: Dimensions.get('window').width/4.25,
					borderRadius: ((patch) ? 0 : '100%'),
					marginTop: 50
				}} />
			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
	);
}

const localStyles = StyleSheet.create({
  container: {
	flex: 1,
	justifyContent: 'flex-end',
	backfaceVisibility: 'hidden',
	width: Dimensions.get('window').width,
	height: Dimensions.get('window').height
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  cardBackground: {
	position: 'absolute',
	top: 0,
	left: 0
  },
  name:{
	fontWeight: 'bold',
	fontSize: 20
  },
  id: {
	position: 'absolute',
	bottom: 0,
	margin: 12
  },
  date: {
	position: 'absolute',
	right: 0,
	margin: 5,
	fontSize: 10,
	color: 'white',
	fontWeight: 'bold'
  },
  	missionDetails: {
		flex: 1,
		flexDirection: 'column',
	  	fontSize: 10,
	},
	detailsView: {
		backgroundColor: '#ccc',
		minHeight: 210,
		width: '100%',
		borderRadius: 10,
		flex: 1,
	  	flexDirection: 'column',
	  	justifyContent: 'flex-end',
		...padding(10,10,10,10)
	}
  
});
