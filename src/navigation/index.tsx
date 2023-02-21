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
import FlightInfoModalScreen from '../screens/FlightInfoModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
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
