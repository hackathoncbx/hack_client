import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import _map from 'lodash/map';
import _each from 'lodash/each';
import ServerAPI from '../constants/ServerAPI';
import Expo from 'expo';


import {
  Button
} from 'react-native-elements';

export default class WikiScreen extends React.Component {
  state = {
    help: []
  };

  constructor(){
    super()
    this._handleClick = this._handleClick.bind(this)
  }

  componentDidMount() {
    return fetch(ServerAPI.helps, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "GET"
    }).then((res) => {
      return res.json();
    }).then((resp) => {
      this.setState({ helps: resp });
    }).catch(() => {
      // this is important... do not remove me please
    });
  }

  render() {
    return (
      <View style={styles.container}>
        { _map(this.state.helps, (elm, i) => {
           return (
             <View style={styles.buttonContainer} key={i}>
               <TouchableOpacity style={styles.button} onPress={(value) =>{ this._handleClick(elm); }}>
                <Text style={styles.buttonText}>{elm.category}</Text>
              </TouchableOpacity>
             </View>
           );
        })}
      </View>
    );
  }

  _handleClick(elm){
    _each(elm.helpsteps, (helpset) => {
      Expo.Speech.speak(helpset.data, { language: "fr" });
    })

    console.log(elm);
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row'
  },


  // _map(elm.helpsteps, (helpstep, j) => {
  //   return (
  //     <View style={styles.buttonContainer} key={j}>
  //       <Text>
  //         {helpstep.data}
  //       </Text>
  //     </View>
  //   )
  // });
});
