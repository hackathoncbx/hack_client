import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Polyline } from 'react-native-maps';

const mode = 'driving'; // 'walking';
const origin = '46.540816, -72.748414';
const destination = '46.545595, -72.749890';
const APIKEY = 'AIzaSyAwk_xItQdpLFBWhBrk4crbmUhVHOjjrbI';
const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

export default class CartographyScreen extends React.Component {
  static navigationOptions = {
    title: 'Map'
  };

  state = {
    initial: null,
    openIndex: null,
    render: false,
    show: false,
    overlayImage: false,
    toto: [],
    coords: {
      left: new Animated.Value(0),
      top: new Animated.Value(0),
      width: new Animated.Value(0),
      height: new Animated.Value(0),
    },
    transition: {},
    markers: [
      {
        coordinate: {
          latitude: 46.540816,
          longitude: -72.748414,
        },
        title: "Cognibox HQ",
        description: "Where contractors are managed",
        pinColor: "#0000FF"
      },{
        coordinate: {
          latitude: 46.545595,
          longitude: -72.749890,
        },
        title: "DigiHub Shawinigan",
        description: "Where no sleeping happens",
        pinColor: "#0000FF"
      },
    ],
    region: {
      latitude: 46.5429,
      longitude: -72.748,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0005,
    }
  };

  componentWillMount() {
    this.index = 0;
    this.images = {};
    this.animation = new Animated.Value(0);
    this.opacityAnimation = new Animated.Value(0);
  }
  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });

    this.getDirections(origin, destination);
  }

  decode = (t,e) => {for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}
  // transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates

  async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            let respJson = await resp.json();
            let points = this.decode(respJson.routes[0].overview_polyline.points);

            let coords = points.map((point, index) => {
              return  {
                  latitude : point.latitude,
                  longitude : point.longitude
              }
            })
            this.setState({toto: coords})
            return coords
        } catch(error) {
            alert(error)
            return error
        }
    }


  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={this.state.region}
        >
        {this.state.markers.map((marker, index) => {
            return (
              <Marker key={index} coordinate={marker.coordinate} title={marker.title} pinColor={marker.pinColor}>
              </Marker>
            );
          })}
          <Polyline
        		coordinates={[
              {latitude: this.state.markers[0].coordinate.latitude, longitude: this.state.markers[0].coordinate.longitude}, // optional
              ...this.state.toto,
              {latitude: this.state.markers[1].coordinate.latitude, longitude: this.state.markers[1].coordinate.longitude}, // optional
            ]}
        		strokeColor="#0000FF" // fallback for when `strokeColors` is not supported by the map-provider
        		strokeWidth={6}
        	/>
        </MapView>

    );
  }
}
