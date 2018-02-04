import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';

import StatusBarAlert from 'react-native-statusbar-alert';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  constructor(props) {
    super(props)
    this.onHand = this.onHand.bind(this)
    this.socket = {}
  }

  getChildContext() {
    return {
      toggleAlert: this.toggleAlert,
      socket: this.socket
    };
  }
  static childContextTypes = {
    toggleAlert: PropTypes.func,
    socket: PropTypes.object
  };

  toggleAlert = (customAlert) => {
    this.setState({
      alert: !this.state.alert,
      customAlert
    });
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
          <StatusBar
            barStyle={this.state.alert ? 'light-content' : 'dark-content'}
          />
          <StatusBarAlert
            visible={this.state.alert}
            message="Alert!"
            backgroundColor="#bf7030"
            color="white"
            height={50}
            style={styles.alert}
          >
            <View style={styles.notif_image}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Un signal de détresse a été activé dans votre secteur</Text>
              </View>
            </View>
          </StatusBarAlert>
          <RootNavigation />
        </View>
      );
    }
  }

  onHand = (customAlert) => {
    // this.toggleAlert(customAlert)
    console.log(this.props)
    this.props.navigation.navigate('Cartography')
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  alert: {
    paddingTop: 15,
  },
  text: {
    color: 'white',
    // fontFamily: 'Arial',
    paddingLeft: 15,
    width: '70%',
  },
  right: {
    height: 60,
    alignItems: 'center',
    paddingBottom: 30,
    paddingRight: 30
  }
});
