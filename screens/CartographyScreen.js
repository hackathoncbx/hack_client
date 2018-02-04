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
const destination = '46.540816, -72.748414';
const APIKEY = 'AIzaSyAwk_xItQdpLFBWhBrk4crbmUhVHOjjrbI';
const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

export default class CartographyScreen extends React.Component {

  constructor(props) {
    super(props)
    this.onPressMarker = this.onPressMarker.bind(this)
  }

  static navigationOptions = {
    title: 'Map'
  };

  state = {
    initial: null,
    openIndex: null,
    render: false,
    show: false,
    overlayImage: false,
    routeCoords: [],
    coords: {
      left: new Animated.Value(0),
      top: new Animated.Value(0),
      width: new Animated.Value(0),
      height: new Animated.Value(0),
    },
    transition: {},
    markers: this.getMarkersByType(),
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

  onPressMarker(e) {
    this.getDirections(origin, e.nativeEvent.coordinate.latitude + ',' + e.nativeEvent.coordinate.longitude)
  }

  async getDirections(startLoc, destLoc) {
      if (startLoc != destLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destLoc }`)
            let respJson = await resp.json();
            let points = this.decode(respJson.routes[0].overview_polyline.points);

            let coords = points.map((point, index) => {
              return  {
                  latitude : point.latitude,
                  longitude : point.longitude
              }
            })

            let arStartLoc = startLoc.split(',')
            coords.unshift({latitude: Number(arStartLoc[0]), longitude: Number(arStartLoc[1])});

            let arDestLoc = destLoc.split(',')
            coords.push({latitude: Number(arDestLoc[0]), longitude: Number(arDestLoc[1])});

            this.setState({routeCoords: coords})
            return coords
        } catch(error) {
            alert(error)
            return error
        }
      }
  }

  getMarkersByType(markerTypes) {
    let markers = [
      {
        coordinate: {
          latitude: 46.540816,
          longitude: -72.748414,
        },
        title: "You are here!",
        pinColor: "#FF0000"
      }
    ];

    if (typeof(markerTypes === undefined) || markerTypes.includes("defibrilators")) {
      markers = markers.concat(this.getDefibrilators());
    }

    if (typeof(markerTypes === undefined) || markerTypes.includes("hospitals")) {
      markers = markers.concat(this.getHospitals());
    }

    if (typeof(markerTypes === undefined) || markerTypes.includes("drugStores")) {
      markers = markers.concat(this.getDrugStores());
    }

    return markers;
  }

  getDefibrilators() {
    return [
      {
        coordinate: {
          latitude: 46.547874,
          longitude: -72.744969,
        },
        title: "Centre Gervais Auto",
        description: "Where hockey is played",
        type: "Defibrilator",
        pinColor: "#0000FF"
      },
    ]
  }

  getHospitals() {
    return [
      {
        coordinate: {
          latitude: 46.525606,
          longitude: -72.743024,
        },
        title: "Centre hospitalier du Centre-de-la-mauricie",
        type: "Hospitals",
        pinColor: "#00FF00"
      },
    ]
  }

  getDrugStores() {
    return [
      {
        coordinate: {
          latitude: 46.622916,
          longitude: -72.698892,
        },
        title: "Uniprix Philippe Germain et David Trépanier - Pharmacie affiliée",
        type: "Hospitals",
        pinColor: "#00FFFF"
      },
    ]
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={this.state.region}
        >
        {this.state.markers.map((marker, index) => {
            return (
              <Marker key={index}
                coordinate={marker.coordinate}
                title={marker.title}
                pinColor={marker.pinColor}
                onPress={this.onPressMarker}
                >
              </Marker>
            );
          })}
          <Polyline
        		coordinates={[
              ...this.state.routeCoords
            ]}
        		strokeColor="#0000FF" // fallback for when `strokeColors` is not supported by the map-provider
        		strokeWidth={6}
        	/>
        </MapView>

    );
  }
}
