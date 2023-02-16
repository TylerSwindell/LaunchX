/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Octicons, AntDesign, Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { ColorSchemeName, Text, Image, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import FilterModalScreen from '../screens/FilterModalScreen';
import FlightInfoModalScreen from '../screens/FlightInfoModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import LinkingConfiguration from './LinkingConfiguration';

import { FlightInformation, RocketStatus } from '../../types';
import flightListSlice, { setFlightList, sortFlightList } from '../redux/slices/flightListSlice';


import { useGetAllLaunchesQuery } from '../redux/api/launchApi';
import { useDispatch } from 'react-redux';
import { styles } from '../styles/styling';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {

	const dispatch = useDispatch()
	const { data: launches, isLoading, isError } = useGetAllLaunchesQuery()

	// TODO: Move this to it's own file
	useEffect( () => {
	  try {
		  if (!isError && launches !== undefined) {
			
			  let flightInfoList: FlightInformation[] = launches.map((flight: any) => {
				
				const {name, id, flight_number, date_unix, links, crew} = flight

				let patch = {
					default: (links.patch.small) ? false : true,
					uri: links.patch.small ?? 'https://pbs.twimg.com/profile_images/1082744382585856001/rH_k3PtQ_400x400.jpg',
					size: {
						width: 100,
						height: 100
					}
				}

					// Move this to index.tsx
				const crewListEle = (
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
				
				return ({
					name, 
					id, 
					number: flight_number,
					dateLocal: new Date(date_unix*1000).toLocaleDateString(), 
					dateUnix: date_unix,
					webcast: flight.links?.webcast,
					missionDetails: flight.details ?? 'No Mission Details Recorded.',
					rocketStatus: {
						reused: flight.fairings?.reused ?? undefined,
						recoveryAttempt: flight.fairings?.recovery_attempt ?? undefined,
						recovered: flight.fairings?.recovered ?? undefined
					} as RocketStatus,
					patch,
					crew: flight?.crew,
					crewListEle
			  })
		  })
		  dispatch(setFlightList(flightInfoList))
		  dispatch(sortFlightList())
		}
	  } catch (err) { console.error(err) }
	}, [launches])


	return (
		<NavigationContainer
		linking={LinkingConfiguration}
		theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
		<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
			<Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name="FilterModal" options={{title:'Filter Launches'}} component={FilterModalScreen} />
				<Stack.Screen name="FlightInfoModal" options={{title:'Flight Info'}} component={FlightInfoModalScreen} />
			</Stack.Group>
		</Stack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="TabTwo"
			screenOptions={{
			tabBarActiveTintColor: Colors[colorScheme].tint,
			tabBarShowLabel: false
		}}>
			<BottomTab.Screen
				name="TabOne"
				component={TabOneScreen}
				options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
					title: 'Upcoming Flights',
					tabBarIcon: ({ color }) => <Octicons name="feed-rocket" size={35} color={color}  style={{marginBottom: 0}}/>,
					// headerRight: () => (
					// 	<Pressable onPress={() => navigation.navigate('FilterModal')}
					// 		style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
					// 		<FontAwesomeIcon name="filter" size={25} />
					// 	</Pressable>
					// )
				})}
			/>
		<BottomTab.Screen
			name="TabTwo"
			component={TabTwoScreen}

			options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
				title: 'About the Developer',
				tabBarIcon: ({ color }) => <Entypo name="info-with-circle" size={35} color={color} />,
				// headerRight: () => (
				// 	<Pressable onPress={() => navigation.navigate('FilterModal')}
				// 		style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
				// 		<FontAwesomeIcon name="filter" size={25} />
				// 	</Pressable>
				// )
			})}
		/>
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -2 }} {...props} />;
}
