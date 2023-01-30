import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 8,
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 15,
		backgroundColor: '#fff',
		borderBottomColor: '#1F1F1F',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	footer: {
		flex: 1,
		backgroundColor: 'black',
	},
	launchListContainer: {
		width: 350,
		maxWidth: 350
	},
	listItems: {
		backgroundColor: '#B1B1B1',
		borderBottomColor: '#fff',
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderRadius: 5,
		marginTop: 2,
		marginBottom: 2,
		...padding(20, 10, 20, 10)
	},
	itemName: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: 20,
		marginBottom: 5
	},
	itemDate: {

	},
	textHeader: {
		fontWeight: 'bold',
		fontSize: 20, 
		marginTop: 'auto',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: 'auto',
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