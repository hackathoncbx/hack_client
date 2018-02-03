import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import ServerAPI from '../constants/ServerAPI'
import { EmergencyButton } from '../components/EmergencyButton';

export default class EmergencyScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <EmergencyButton/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 20,
  },
});
