import { View, Text, StyleSheet } from "react-native";
import { FlightInfoSectionProps, FlightInfoSections } from "../../types";
import { padding } from "../styles/styling";

const EMPTY_STRING = ''

function collapseStyles(visibleSection: FlightInfoSections, sectionName:FlightInfoSections , visible: object, hidden: object) {
    return visibleSection === sectionName ? visible : hidden
}

export default function FlightInfoSection({ visiblityState, sectionName, flightInfo }: FlightInfoSectionProps) {
	const { missionDetails, crewList, rocketStatus } = flightInfo,
	{ visibleSection, setVisibleSection } = visiblityState;


    let sectionContent: string = EMPTY_STRING
    switch (sectionName) {
        case FlightInfoSections.CREW:
            sectionContent = (crewList.length > 0) ? 'Crew Section' : 'No Crew Aboard.'
        break
        case FlightInfoSections.ROCKET:

            let undefinedCount = 0

            for (const statusName of Object.keys(rocketStatus)) {
                const statusValue = rocketStatus[statusName]
                const statusNameString = (statusName === 'recoveryAttempt') 
                    ? "Recovery Attempted" 
                    : statusName.charAt(0).toUpperCase() + statusName.slice(1)

                if (statusValue === undefined) {
                    undefinedCount++
                    sectionContent += `${statusNameString}: No records avaliable\n`
                } else {
                    sectionContent += `${statusNameString}: ${statusValue}\n`
                }
                
            }

            if (undefinedCount === 3) sectionContent = 'No rocket data recorded.'

        break
        case FlightInfoSections.DETAILS:
            sectionContent = missionDetails
        break
        default: 
    }

	const formattedSectionTitle = sectionName.charAt(0) + sectionName.slice(1).toLowerCase();

	return (
		// <View style={visibleSection === sectionName ? localStyles.sectionView : localStyles.sectionViewHidden}>
		<View style={collapseStyles(visibleSection, sectionName, localStyles.sectionView, localStyles.sectionViewHidden)}>
			<View style={(visibleSection === sectionName) ? localStyles.sectionHeader : localStyles.sectionHeaderHidden} onTouchEnd={() => setVisibleSection(sectionName)}>				
				<Text style={localStyles.sectionTitle}>
					{ formattedSectionTitle }
				</Text>
			</View>
            <View style={collapseStyles(visibleSection, sectionName, { minHeight: '45%' }, { maxHeight: 0})}>
                <Text ellipsizeMode="tail" style={localStyles.missionDetails}> 
                    { visibleSection === sectionName ? sectionContent : EMPTY_STRING } 
                </Text>
            </View>
		</View>
	)
}

const localStyles = StyleSheet.create({
    sectionTitle: { fontWeight: 'bold', color: 'black', fontSize: 20},
    sectionHeader: { backgroundColor: 'rgba(0,0,0,0)', ...padding(8, 0, 10,0) },
    sectionHeaderHidden: { height: '100%', justifyContent: 'center'},
    missionDetails: {
        fontSize: 12,
        color: 'black'
    },
    sectionView: {
        backgroundColor: '#ccc',
        minHeight: 250,
        width: '100%',
        borderRadius: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 10,
        ...padding(10,10,10,10)
    },
    sectionViewHidden: {
        backgroundColor: '#ccc',
        color: 'black',
        maxHeight: 60,
        height: 60,
        width: '100%',
        borderRadius: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 10,
        ...padding(10,10,10,10)
    },
})