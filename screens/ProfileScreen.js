import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { WebBrowser } from 'expo';

import {
  Button, Text, FormLabel, FormInput, FormValidationMessage
} from 'react-native-elements';

import { MonoText } from '../components/StyledText';
import { FirstResponderToggle } from '../components/FirstResponderToggle';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Layout = t.struct({
  nom: t.String,
  prenom: t.String,
  gender: t.enums({
    M: 'Male',
    F: 'Female'
  }),
  bloodType: t.String
});

const options = {
};

// <Form type={Layout}
//   value={this.state.values}
//   onChange={(values) => { this.setState({values}) }}
// />

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    text: '',
    values: {}
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log(this.state);
    alert("click submit");
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
