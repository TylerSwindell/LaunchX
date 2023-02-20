import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#999'
	},
	launchListContainer: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	},
	launchListItem: {
		width: Dimensions.get('window').width-20,
		marginTop: 5
	},
	listItems: {
		backgroundColor: '#eee',
		borderBottomColor: '#333',
		overflow: 'hidden',
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderRadius: 10,
		...padding(8)
		
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
		...margin(10)
	},
	itemDate: {
		fontSize: 11,
		color: 'white',
		fontWeight: 'bold',
		position: 'absolute',
		right: 0,
		bottom:Dimensions.get('window').height/-11,
		textAlign: 'right',
		...margin(10)
	},
	itemNumber: {
		fontSize: 11,
		color: 'white',
		fontWeight: 'bold',
		position: 'absolute',
		right: 0,
		bottom:Dimensions.get('window').height/-14,
		...margin(10)
	},
	itemCrew: {
		
	},
	noCrew: {
		fontWeight: 'bold',
	},
	lowerCard: {
		height: 100,
		backgroundColor: '#999',
		...padding(10),
		borderBottomStartRadius: 6,
		borderBottomEndRadius: 6,
	},
});

interface sides {
	all?: number,
	top?: number,
	right?: number,
	bottom?: number,
	left?: number,
};

export function padding(padding: sides | number) {

	if (typeof(padding) === 'number') return { 
		paddingTop: padding, 
		paddingRight: padding, 
		paddingBottom: padding, 
		paddingLeft: padding 
	}

	const {top, left, bottom, right} = padding
	return {
		paddingTop: top,
		paddingRight: right === undefined || right === null ? 0 : right,
		paddingBottom: bottom === undefined || bottom === null ? 0 : bottom,
		paddingLeft: left === undefined || left === null ? 0 : left
	}
}

export function margin(margins: sides | number) {

	if (typeof(margins) === 'number') return { 
		marginTop: margins, 
		marginRight: margins, 
		marginBottom: margins, 
		marginLeft: margins 
	}

	const {top, right, bottom, left} = margins	
	return {
		marginTop: top,
		marginRight: right === undefined || right === null ? 0 : right,
		marginBottom: bottom === undefined || bottom === null ? 0 : bottom,
		marginLeft: left === undefined || left === null ? 0 : left
	}
}