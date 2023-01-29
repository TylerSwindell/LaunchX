import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { ApiProvider } from '@reduxjs/toolkit/query/react'

import Home from './src/components/Home'
import Header from './src/components/Header'
import Footer from './src/components/Footer'
import { launchApi } from './src/store'

import { styles } from './src/styles/styling'
import UpcomingLaunches from './src/components/UpcomingLaunches'


export default function App() {

	return (
		<ApiProvider api={launchApi}>
			<View style={styles.header}></View>
			<View style={styles.container}>
				<UpcomingLaunches />
				{/* <Home />
				<StatusBar style="auto" /> */}
			</View>
			<View style={styles.footer}></View>
			</ApiProvider>
	);
}