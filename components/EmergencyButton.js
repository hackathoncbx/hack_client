import React from 'react'
import { Notifications } from 'expo'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'

import ServerAPI from '../constants/ServerAPI'
import alarm from '../globals/Alarm'

export class EmergencyButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this._handleEmergencyPress}>
        <Image source={require('../assets/images/alert-icon-red.png')} style={styles.alert_img} />
      </TouchableOpacity>
    );
  }

  async _handleEmergencyPress() {
    let token = await Notifications.getExpoPushTokenAsync();

    fetch(ServerAPI.alerts, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token
      }),
    });

    alarm.play()
  }
}

const styles = StyleSheet.create({
  alert_img: {
    width: 200,
    height: 200,
  },
});