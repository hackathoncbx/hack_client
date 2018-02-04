import React from 'react'
import PropTypes from 'prop-types';
import { Notifications } from 'expo'
import { StyleSheet, Text} from 'react-native'
import { Switch } from 'react-native-switch'

import ServerAPI from '../constants/ServerAPI'

export class FirstResponderToggle extends React.Component {
  state = {
    value: false,
    token: null,
    connection: null
  };

  static contextTypes = {
    toggleAlert: PropTypes.func,
    goHandle: PropTypes.func,
    socket: PropTypes.object,
  };

  componentWillMount() {
    Notifications.getExpoPushTokenAsync().then((resp) => {
      this.setState({ token: resp });
    });
    this.registerResponder = this.registerResponder.bind(this)
    console.log(this.context.toggleAlert)
  }

  render() {
    return (
      <Switch
        value={this.state.value}
        onValueChange={(value) => this.registerResponder(value)}
        activeText={'On'}
        inActiveText={'Off'}
        backgroundActive={'green'}
        backgroundInactive={'gray'}
        circleActiveColor={'#30a566'}
        circleInActiveColor={'#000000'}
      />
    );
  }

  async registerResponder(value) {
    if (value) {
      toggleAlert = this.context.toggleAlert
      goHandle = this.context.goHandle
      socket = this.context.socket
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var x = position.coords.longitude;
          var y = position.coords.latitude;
          this.state.connection = new WebSocket(ServerAPI.wsResponder + "?token=" + this.state.token + "&longitude=" + x + "&latitude=" + y);
          this.state.connection.onmessage = function(message) {
            // toggleAlert(message.data + "111");
            socket.data = message.data
            goHandle()
          }
        },
        (error) => { console.log("error", error); this.setState({ error: error.message }) },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    } else {
      if(this.state.connection) {
        this.state.connection.close();
      }
    }
  }
}
