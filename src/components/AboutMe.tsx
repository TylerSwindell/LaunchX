import React from 'react'
import { Dimensions, StyleSheet, Text, View} from 'react-native'
import { margin } from '../styles/styling'

export default function AboutMe() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tyler Swindell</Text>
      <View style={styles.separator} />
      
    </View>
  )
}

const styles = StyleSheet.create({
  empty :{},
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eee',
    height: '100%',
    width: '100%',
    marginTop: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})