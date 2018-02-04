import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { EmergencyButton } from '../components/EmergencyButton';

export default class EmergencyScreen extends React.Component {
  constructor(){
    super()
    this._handleClick = this._handleClick.bind(this)
  }
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <EmergencyButton onClick={this._handleClick}/>
      </View>
    );
  }

  _handleClick(){
    this.props.navigation.navigate('Healthcheck');
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
