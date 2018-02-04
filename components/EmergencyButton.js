import React from 'react'
import { Notifications } from 'expo'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'

import ServerAPI from '../constants/ServerAPI'
import alarm from '../globals/Alarm'

export class EmergencyButton extends React.Component {
  constructor(props) {
    super(props);
    this._handleEmergencyPress = this._handleEmergencyPress.bind(this)
  }

  state = {
    token: null
  };

  componentWillMount() {
    Notifications.getExpoPushTokenAsync().then((resp) => {
      this.setState({ token: resp });
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={this._handleEmergencyPress}>
        <Image source={require('../assets/images/alert-icon-red.png')} style={styles.alert_img} />
      </TouchableOpacity>
    );
  }

  async _handleEmergencyPress() {
    console.log("coco");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var x = position.coords.longitude;
        var y = position.coords.lattitude;

         fetch(ServerAPI.alerts, {
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
           method: "POST",
           body: JSON.stringify({ position: { x: x, y: y }, token: this.state.token })
         });

         alarm.play()
         this.props.onClick()
      },
      (error) => { console.log("error", error); this.setState({ error: error.message }) },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
}

const styles = StyleSheet.create({
  alert_img: {
    width: 200,
    height: 200,
  },
});
