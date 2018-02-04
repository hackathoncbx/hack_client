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

  confirmCall(locations) {
    console.log(locations);
    console.log(token);
  }

  async toto(value) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Johny Bravo!", position);
      },
      (error) => { console.log("error", error); this.setState({ error: error.message }) },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
   // var connection = new WebSocket('ws://127.0.0.1:3000?token=pew&x=46.5555495&y=-72.7408941');
   //    connection.onmessage = function(message) {
   //    console.log(message + "111");
   //  }
   //
   //  fetch(ServerAPI.alerts, {
   //    headers: {
   //      'Accept': 'application/json',
   //      'Content-Type': 'application/json'
   //    },
   //    method: "POST",
   //    body: JSON.stringify({ position: { x: 46.5221586, y: -72.7448679, token: token } })
   //  });
  }
}
