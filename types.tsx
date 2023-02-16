/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReactNode } from 'react';
import { useWindowDimensions } from 'react-native';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  AboutMeModal: undefined,
  FlightInfoModal: undefined,
  FilterModal: undefined,
  NotFound: undefined
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined,
  TabTwo: undefined
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export interface RocketStatus {
	reused: boolean | null, 
	recoveryAttempt: boolean | null, 
	recovered: boolean | null
};

export interface FlightInformation {
	name: string,
	id: string,
  number: number,
	dateLocal: string,
  dateUnix: number,
	webcast: string,
  missionDetails: string,
	rocketStatus: RocketStatus
  patch: {
    uri: string,
    size: {
      width: number,
      height: number
    }
  },
  crew: string[],
  crewList: ReactNode
};


// Enums
export enum FlightInfoSections{ DETAILS = "DETAILS", CREW = "CREW", ROCKET = "ROCKET" }

// Props
export interface FlightInfoProps { flightInfo: FlightInformation };
export interface FlightInfoSectionProps {
	visiblityState: {
		visibleSection: FlightInfoSections,
		setVisibleSection: React.Dispatch<React.SetStateAction<FlightInfoSections>>
	}, 
	sectionName: FlightInfoSections,
	flightInfo: FlightInformation
};