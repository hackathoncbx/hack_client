import React from 'react'

import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


export default class HandleEmergencyScreen extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Ionicons
              name={'ios-navigate'}
              size={28}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Navigate</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Ionicons
              name={'ios-navigate'}
              size={28}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Navigate</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#fefefe',
    flex: 1,
    paddingTop: 3,
  },
  buttonContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex: 1,
    flexDirection: 'row'
  },
  buttonIcon: {
    color: '#999'
  },
  buttonText: {
    color: '#999',
    fontSize: 10
  },
})