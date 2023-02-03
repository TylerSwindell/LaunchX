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
		borderBottomColor: '#555',
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderRadius: 5,
		...padding(20, 10, 20, 10)
	},
	itemName: {
		fontWeight: 'bold',
		color: '#000',
		fontSize: 20,
		marginBottom: 5
	},
	itemDate: {

	},
	itemId: {

	},
	itemNumber: {
		color: '#888',
		position: 'absolute',
		right: 0,
		bottom: 0,
		textAlign: 'right',
		...margin(10, 10, 10, 10)
	},
	itemCrew: {

	},
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