import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ccc'
	},
	launchListContainer: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	},
	launchListItem: {
		width: Dimensions.get('window').width-20,
		...margin(5, 10, 0, 10),
	},
	listItems: {
		backgroundColor: '#fff',
		borderBottomColor: '#333',
		overflow: 'hidden',
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderRadius: 10,
		...padding(20,10,10,10)
		
	},
	listItem: {
		height: Dimensions.get('window').height/8,
	},
	itemName: {
		fontWeight: 'bold',
		color: '#000',
		fontSize: 20,
		marginBottom: 10
	},
	itemId: {
		fontSize: 11,
		color: 'white',
		position: 'absolute',
		right: 0,
		bottom:Dimensions.get('window').height/-9,
		...margin(10, 10, 10, 10)
	},
	itemDate: {
		fontSize: 11,
		color: 'white',
		fontWeight: 'bold',
		position: 'absolute',
		right: 0,
		bottom:Dimensions.get('window').height/-11,
		textAlign: 'right',
		...margin(10, 10, 10, 10)
	},
	itemNumber: {
		fontSize: 11,
		color: 'white',
		fontWeight: 'bold',
		position: 'absolute',
		right: 0,
		bottom:Dimensions.get('window').height/-14,
		...margin(10, 10, 10, 10)
	},
	itemCrew: {
		
	},
	noCrew: {
		fontWeight: 'bold',
	},
	lowerCard: {
		height: 100,
		backgroundColor: '#999',
		...padding(10,10,10,10),
		borderBottomStartRadius: 6,
		borderBottomEndRadius: 6,
	}
});

export function padding(top: number, right?: number, bottom?: number, left?: number) {
	return {
		paddingTop: top,
		paddingRight: right === undefined || right === null ? 0 : right,
		paddingBottom: bottom === undefined || bottom === null ? 0 : bottom,
		paddingLeft: left === undefined || left === null ? 0 : left
	}
}

export function margin(top: number, right?: number, bottom?: number, left?: number) {
	return {
		marginTop: top,
		marginRight: right === undefined || right === null ? 0 : right,
		marginBottom: bottom === undefined || bottom === null ? 0 : bottom,
		marginLeft: left === undefined || left === null ? 0 : left
	}
}