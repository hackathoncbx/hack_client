import React from 'react'

import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';


export default class HandleEmergencyScreen extends React.Component {

  static contextTypes = {
    socket: PropTypes.object,
  };

  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.alertContainer}>
          <Text>Insert some shit here...</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Ionicons
                name={'ios-navigate'}
                size={28}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Accepter # {this.context.socket.data }</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Ionicons
                name={'ios-navigate'}
                size={28}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Rejeter # {this.context.socket.data }</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  _acceptEmergency() {
    fetch(ServerAPI.acceptEmergency, {
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify()
    }).then((resp) => { return resp.json()}).then((resp) => { Object.assign(alarm, resp); });
  }

  _rejectEmergency() {

  }
}

const styles = StyleSheet.create({
  alertContainer: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 50
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fefefe',
    flex: 1,
    paddingTop: 3,
  },
  buttonContainer: {
    alignItems: 'center',
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
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  pageContainer: {
    flex: 1
  }
})
