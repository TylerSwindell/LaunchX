import {openBrowserAsync} from 'expo-web-browser';
import { StatusBar } from 'expo-status-bar';
import { Button, Platform, Pressable, StyleSheet, Image } from 'react-native';

import { Text, View } from '../components/Themed'
import { useState } from 'react';
import { Launch } from '../redux/types';


function FlightInfo (props: any) {
	const {item} = props
	const {name, id, date_local, links} = item

	const isVideoAvaliable = links.webcast ? true : false

	let Image_Http_URL = { 
		uri: links.patch.small || 'https://pbs.twimg.com/profile_images/1082744382585856001/rH_k3PtQ_400x400.jpg', 
		resizeMode : 'stretch',
		width: 200, 
		height: 200, 
	}

	return (
		<View> 
			<Text>{name}</Text>
			<Text>{id}</Text>
			<Text>{date_local}</Text>
			<Image source={Image_Http_URL} 
				style={{ 
					borderRadius: ((links.patch.small) ? 0 : '100%'),
					margin: 5 
				}} />
			<Button title={isVideoAvaliable ? 'Watch Launch' : 'No Video Avaliable'} disabled={!links.webcast} onPress={() => {openBrowserAsync(links.webcast)}} />
		</View>
	)
}


export default function FlightInfoModalScreen(props:any) {

  return (
    <View style={styles.container}>
      <FlightInfo item={props.route.params.item} />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  
});
