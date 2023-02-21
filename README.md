# LaunchX

LaunchX is built to keep you up to date with details about upcoming and past SpaceX launches.

## Tech Stack

### Expo

Expo provides simple setup and build tools on top of the React-Native framework. With Expo we can easily boot multiple emulation enviroments or test directly on your device with Expo Go.


To get started with development clone the git repository:

```bash
$ git clone git@github.com:TylerSwindell/LaunchX.git
```

Next navigate to root folder and install all NPM packages:

```bash
$ cd ./LaunchX
$ npm install
```

While inside the project root folder run the start command npx

```bash
$ npx expo start
```

You can run the app through the metro bundler using a: android or i: iPhone.
Be sure to setup the emulators:

[Android Studio](https://docs.expo.dev/workflow/android-studio-emulator/) | [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)

### [Expo](https://docs.expo.dev/get-started/installation/)

LaunchX utilizes Expo for it's [React-Native](https://reactnative.dev/docs/getting-started) build and configuration.
Expo provides an on device method of testing called [Expo Go](https://docs.expo.dev/workflow/expo-go/) which can be live reloaded in app requiring no building to preview.

### [SpaceX Api](https://github.com/r-spacex/SpaceX-API/blob/master/docs/README.md)

Public respository for all SpaceX api endpoints and documentation

### [Redux RTK](https://redux-toolkit.js.org/)

Redux is utilized for state management and data api queries with [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)

### [Typescript](https://docs.expo.dev/guides/typescript/)


## Features to add:

1. Configure FlightInfoSection's contentSection variable to be an Element that can be styled in the switch statement that renders the content
2. Filter Modal
3. Filter by time / date
4. Filter by details (Crew count, crew name, etc.)
5. Decouple image sizing from redered components