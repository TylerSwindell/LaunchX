import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { setFlightList, getFlightList ,resetFlightList } from '../redux/slices/flightListSlice';
import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'

export default function FilterModalScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Modal</Text>
			<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
			{/* <EditScreenInfo path="/screens/ModalScreen.tsx" /> */}
			<Pressable onPress={() => {
				console.log(getFlightList())
			}}>
				<Text>Press Me</Text>
			</Pressable>

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
