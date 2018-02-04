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
    userFinded: false,
    text: '',
    values: {}
  };

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
    }).then((resp) => {
      this.setState({ userFinded: false, values: resp.json() });
      console.log(resp.json());
      if (resp.json().length) this.setState({values: resp.json()["gender"] });
    });
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    return fetch(ServerAPI.users + `/${this.state.token}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: this.state.userFinded ? "PUT" : "POST",
      body: JSON.stringify({ lastName: this.state.lastName,
      firstName: this.state.firstName,
      gender: this.state.gender,
      bloodType: this.state.bloodType })
    }).then(() => {
      if (!this.state.userFinded) { this.setState({ userFinded: true }); }
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
            onChangeText={(allergy) => this.setState({allergy})}
            value={this.state.allergy}/>

          <Button
            title="Soumettre"
            onPress={this.handleSubmit}
          />
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
  title: {
    fontSize: 30,
  }
});
