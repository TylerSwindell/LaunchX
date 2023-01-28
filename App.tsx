import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

import Home from './src/components/Home'
import useFetch from './src/hooks/useFetch'

export default function App() {
  const data = useFetch('https://api.spacexdata.com/v5/launches')
  console.log(data)

  return (
    <View style={styles.container}>
      <Home />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
