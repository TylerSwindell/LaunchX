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

LaunchX utilizes Expo for it's React-Native build and configuration

### [SpaceX Api](https://github.com/r-spacex/SpaceX-API/blob/master/docs/README.md)

Public respository for all SpaceX api endpoints and documentation

### [Redux RTK](https://github.com/r-spacex/SpaceX-API/blob/master/docs/README.md)

Redux is utilized for state management and data api queries

### [Typescript](https://www.typescriptlang.org/docs/handbook/intro.html)


## Features to add:

1. Configure FlightInfoSection's contentSection variable to be an Element that can be styled in the switch statement that renders the content
2. Filter Modal
3. Filter by time / date
4. Filter by details (Crew count, crew name, etc.)
5. 