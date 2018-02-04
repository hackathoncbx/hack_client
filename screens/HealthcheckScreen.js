import React from 'react'

import { StyleSheet, Text, TouchableWithoutFeedback, View, } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ServerAPI from '../constants/ServerAPI';
import alarm from '../globals/Alarm';

export default class HeatlhcheckScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this._handleEmergencySituation}>
          <View style={styles.category}>
            <Text style={styles.title}>
              TRAUMATISME
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this._handleEmergencySituation}>
          <View style={styles.category}>
            <Text style={styles.title}>
              MÉDICALE
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  _handleEmergencySituation = () => {
    fetch(ServerAPI.alerts + `/${alarm.id}`, {
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     method: "PUT",
     body: JSON.stringify({ token: alarm.token })
   }).then(() => {
     this.props.navigation.navigate('BodyParts');
   });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  category: {
    borderStyle: 'solid',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    height: "50%",
  },
  title:{
    textAlign: 'center',
    width: "100%",
  }
});
