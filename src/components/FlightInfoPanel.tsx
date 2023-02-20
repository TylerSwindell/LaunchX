import { openBrowserAsync } from "expo-web-browser";
import { useState } from "react";
import { View, Text, Pressable, Dimensions, StyleSheet } from "react-native";
import { FlightInfoProps, FlightInfoSectionProps, FlightInfoSections } from "../../types";
import { padding } from "../styles/styling";
import FlightInfoSection from "./FlightInfoSection";

export default function FlightInfoPanel (flightInfoProps: FlightInfoProps) {
	const { DETAILS, CREW, ROCKET } = FlightInfoSections
	const [ visibleSection, setVisibleSection ] = useState<FlightInfoSections>(ROCKET)

	const { 
		name, id, number, 
		dateLocal, webcast, 
		missionDetails, crewList,
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
			backgroundColor: 'white',
			...padding({top:20, right:10, bottom: 25, left: 10})
		}}> 
			{/* Upper Section */}
			<View style={{
                flex: 1, 
                width: '100%',
                ...padding(10),
                justifyContent: 'center', 
                flexDirection: 'row',
                alignItems: 'center', 
            }}>
                <View style={{flex: 1}}>
                    <Text style={localStyles.name}>{ name }</Text>
                    <Pressable disabled={!isVideoAvaliable} onPress={() => {openBrowserAsync(webcast)}} > 
                        <Text style={localStyles.webcast}>{isVideoAvaliable ? 'Watch Launch' : 'No Video Avaliable'}</Text>
                    </Pressable>
                </View>
                <View></View>
			</View>

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
				...padding({top: 0, right: 10, bottom: 10, left: 10}),
				backgroundColor: 'white',
			}}>
				<Text style={localStyles.footerText}>Flight #{ number }</Text>
				<Text style={localStyles.footerText}>{ id }</Text>
				<Text style={localStyles.footerText}>{ dateLocal }</Text>
			</View>
		</View>
	)
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
		fontSize: 22,
        marginBottom: 10, 
		width: '70%'
	},
	id: { fontSize: 10, color: 'black' },
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
