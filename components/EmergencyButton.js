import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'

export class EmergencyButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this._handleEmergencyPress}>
        <Image source={require('../assets/images/alert-icon-red.png')} style={styles.alert_img} />
      </TouchableOpacity>
    );
  }

  _handleEmergencyPress() {
    fetch(ServerAPI.alert, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      }),
    });
  }
}

const styles = StyleSheet.create({
  alert_img: {
    width: 200,
    height: 200,
  },
});