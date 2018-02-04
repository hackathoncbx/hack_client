import React from 'react'
import { Notifications } from 'expo'
import { StyleSheet, Text} from 'react-native'
import { Switch } from 'react-native-switch'

import ServerAPI from '../constants/ServerAPI'

export class FirstResponderToggle extends React.Component {
  state = {
    value: true,
    token: null
  };

  componentWillMount() {
    Notifications.getExpoPushTokenAsync().then((resp) => {
      this.setState({ token: resp });
    });
  }

  render() {
    return (
      <Switch
        value={this.state.value}
        onValueChange={(value) => this.toto(value)}
        activeText={'On'}
        inActiveText={'Off'}
        backgroundActive={'green'}
        backgroundInactive={'gray'}
        circleActiveColor={'#30a566'}
        circleInActiveColor={'#000000'}
      />
    );
  }

  async toto(value) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var x = position.coords.longitude;
        var y = position.coords.lattitude;
        var connection = new WebSocket("ws://127.0.0.1:3000?token=" + this.state.token + "&x=" + x + "&y=" + y);
           connection.onmessage = function(message) {
           console.log(message + "111");
         }
      },
      (error) => { console.log("error", error); this.setState({ error: error.message }) },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
}
