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
          <View style={styles.alertTitle}>
            <Ionicons
              name={'ios-warning'}
              size={56}
              style={styles.warningButtonIcon}
            />
            <Text style={styles.warningText}>Insert some title here...</Text>
            <Ionicons
              name={'ios-warning'}
              size={56}
              style={styles.warningButtonIcon}
            />
          </View>
          <View style={styles.alertBody}>
            <Text style={styles.warningText}>The alert body goes here...</Text>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Ionicons
                name={'ios-thumbs-up'}
                size={28}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Accepter # {this.context.socket.data }</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Ionicons
                name={'ios-thumbs-down'}
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
