import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { WebBrowser, Notifications } from 'expo';

import { StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';

import {
  Button, Text, FormLabel, FormInput, FormValidationMessage
} from 'react-native-elements';

import { MonoText } from '../components/StyledText';
import { FirstResponderToggle } from '../components/FirstResponderToggle';
import t from 'tcomb-form-native';
import ServerAPI from '../constants/ServerAPI';

const Form = t.form.Form;

const Layout = t.struct({
  lastName: t.String,
  firstName: t.String,
  gender: t.enums({
    M: 'Male',
    F: 'Female'
  }),
  bloodType: t.String
});

const options = {
};

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    userFound: false,
    text: '',
    values: {}
  };

  getChildContext() {
    return {
      goHandle: this.goHandle
    };
  }
  static childContextTypes = {
    goHandle: PropTypes.func
  };

  goHandle() {
    this.props.navigation.navigate('HandleEmergency')
  }

  componentDidMount() {
    Notifications.getExpoPushTokenAsync().then((resp) => {
      this.setState({ token: resp });
      return fetch(ServerAPI.users + `/${this.state.token}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "GET"
      })
    }).then((res) => {
      return res.json();
    }).then((resp) => {
      this.setState({ userFound: true, values: resp, allergies: resp.allergies });
    }).catch(() => {
      // this is important... do not remove me please
    });
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goHandle = this.goHandle.bind(this);
  }

  handleSubmit() {
    return fetch(ServerAPI.users + `/${this.state.token}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: this.state.userFound ? "PUT" : "POST",
      body: JSON.stringify({
        lastName: this.state.values.lastName,
        firstName: this.state.values.firstName,
        gender: this.state.values.gender,
        bloodType: this.state.values.bloodType,
        allergies: this.state.allergies
      })
    }).then(() => {
      if (!this.state.userFound) { this.setState({ userFound: true }); };
      alert("saved!");
    }).catch((err) => {
      alert("an error happen!" + JSON.stringify(err));
      // this is important... do not remove me please
    });
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Mon profile</Text>
        </View>
        <View style={styles.profileContainer}>
          <FirstResponderToggle></FirstResponderToggle>

          <Form type={Layout}
            value={this.state.values}
            onChange={(values) => { this.setState({values}) }}/>

          <FormLabel>Allergies</FormLabel>
          <FormInput
            multiline={true}
            style={{height: 40}}
            onChangeText={(allergies) => this.setState({allergies})}
            value={this.state.allergies}/>

          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
           <Text style={styles.buttonText}>Soumettre</Text>
         </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginBottom: 20
  },
  button: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#6e8ab7',
    borderWidth: 1,
    borderColor: '#333',
    flex: 1,
    margin: 20,
    paddingTop: 3,
  },
  buttonText: {
    color: '#000',
    fontSize: 40
  },
  title: {
    fontSize: 30,
  }
});
