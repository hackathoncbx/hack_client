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
          <Text style={styles.alertDescriptions}>Type: {JSON.parse(this.context.socket.data).type }</Text>
          <Text style={styles.alertDescriptions}>Prénom: {JSON.parse(this.context.socket.data).firstName || "" }</Text>
          <Text style={styles.alertDescriptions}>Nom: {JSON.parse(this.context.socket.data).lastName || "" }</Text>
          <Text style={styles.alertDescriptions}>Sexe: {JSON.parse(this.context.socket.data).sexe || "" }</Text>
          <Text style={styles.alertDescriptions}>Téléphone: {JSON.parse(this.context.socket.data).phoneNumber || "" }</Text>
          <Text style={styles.alertDescriptions}>Groupe sanguin: {JSON.parse(this.context.socket.data).bloodType || "" }</Text>
          <Text style={styles.alertDescriptions}>Allergies: {JSON.parse(this.context.socket.data).allergies || "" }</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Ionicons
                name={'ios-navigate'}
                size={28}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Accepter</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Ionicons
                name={'ios-navigate'}
                size={28}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Rejeter</Text>
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
      body: JSON
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
  alertDescriptions: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'left',
  },
  pageContainer: {
    flex: 1
  }
})
