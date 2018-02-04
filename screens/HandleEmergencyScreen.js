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
                name={'ios-thumbs-up'}
                size={28}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Accepter</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Ionicons
                name={'ios-thumbs-down'}
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
    flex: 1
  },
  alertTitle: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  alertBody: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fefefe',
    borderWidth: 1,
    borderColor: '#999',
    flex: 1,
    margin: 20,
    paddingTop: 3,
  },
  buttonContainer: {
    alignItems: 'center',
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
    borderColor: '#ce2029',
    borderWidth: 4,
    borderRadius: 12,
    flex: 1,
    margin: 20,
    marginBottom: 100
  },
  warningButtonIcon: {
    color: '#ce2029',
    flex: 1,
    margin: 10
  },
  warningText: {
    alignItems: 'center',
    color: '#ce2029',
    flex: 4,
    textAlign: 'center'
  }
})
