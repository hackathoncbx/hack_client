import React from 'react';
import _ from 'lodash';
import ServerAPI from '../constants/ServerAPI';
import alarm from '../globals/Alarm';

import { StyleSheet, Image, TouchableHighlight, } from 'react-native';

export default class BodyPartsScreen extends React.Component {
  constructor(props) {
    super(props)
    this._handleBodyClick = this._handleBodyClick.bind(this)

    this.bodyParts = {
      all: {
        src: require('../assets/images/body.jpeg')
      },
      head: {
        src: require('../assets/images/body-head.jpeg'),
        xrange: { min: 109, max: 181},
        yrange: { min: 21, max: 79}
      },
      torso: {
        src: require('../assets/images/body-torso.jpeg'),
        xrange: { min: 104, max: 204},
        yrange: { min: 110, max: 249}
      },
      "arm-left": {
        src: require('../assets/images/body-arm-left.jpeg'),
        xrange: { min: 204, max: 301},
        yrange: { min: 125, max: 260}
      },
      "arm-right": {
        src: require('../assets/images/body-arm-right.jpeg'),
        xrange: { min: 24, max: 86},
        yrange: { min: 125, max: 260}
      },
      "leg-left": {
        src: require('../assets/images/body-leg-left.jpeg'),
        xrange: { min: 168, max: 215},
        yrange: { min: 272, max: 457}
      },
      "leg-right": {
        src: require('../assets/images/body-leg-right.jpeg'),
        xrange: { min: 81, max: 140},
        yrange: { min: 272, max: 457}
      }
    }
  }

  componentDidMount() {
    this.setState({ bodySelection: this.bodyParts['all']['src'] })
  }

  state = {
    bodySelection: null
  }

  render() {
    return (
      <TouchableHighlight style={styles.container} onPress={this._handleBodyClick}>
        <Image source={this.state.bodySelection} style={styles.image}/>
      </TouchableHighlight>
    );
  }

  _handleBodyClick(evt) {
    const x = evt.nativeEvent.locationX
    const y = evt.nativeEvent.locationY
    /*            X         Y
    head:         109-181   21-79
    torso:        104-204   110-249
    left-a:       204-301   125-260
    right-a:      24-86     125-260
    left-l:       168-215   272-457
    right-l:      81-140    272-457
    */

    let selected = _.findKey(this.bodyParts, (part) => {
      if (part.xrange) {
        if (x > part.xrange.min && x < part.xrange.max && y > part.yrange.min && y < part.yrange.max) {
          return true
        }
      }

      return false;
    })

    if (selected) {
      this.setState({ bodySelection: this.bodyParts[selected]['src'] });

     fetch(ServerAPI.alerts + `/${alarm.id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify({ category: selected })
    });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1,
    resizeMode: 'stretch',
    height: '100%',
    width: '100%',
  }
});
