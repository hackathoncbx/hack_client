import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { FirstResponderToggle } from '../components/FirstResponderToggle';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.profileContainer}>
            <Text style={styles.title}>Mon profile</Text>
          </View>
          <View style={styles.profileContainer}>
            <FirstResponderToggle></FirstResponderToggle>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
  }
});
