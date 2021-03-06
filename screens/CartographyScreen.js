import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Switch } from 'react-native-switch';
import MapView, { Marker, Polyline } from 'react-native-maps';
import openMap from 'react-native-open-maps';

import { Ionicons } from '@expo/vector-icons';

import ServerAPI from '../constants/ServerAPI'

const origin = '46.540816,-72.748414';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#fefefe',
    flex: 1,
    paddingTop: 3,
  },
  buttonContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex: 1,
    flexDirection: 'row'
  },
  buttonIcon: {
    color: '#999'
  },
  buttonText: {
    color: '#999',
    fontSize: 10
  },
  filtersDropdown: {
    backgroundColor: '#fefefe',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    flex: 1,
    height: 175,
    padding: 10,
    position: 'absolute',
    right: 0,
    top: 0,
    width: Dimensions.get('window').width  / 2,
    zIndex: 1
  }
})

export default class CartographyScreen extends React.Component {

  constructor(props) {
    super(props)
    this.onPressButton = this.onPressButton.bind(this)
    this.onPressFilter = this.onPressFilter.bind(this)
    this.onPressMarker = this.onPressMarker.bind(this)
    this.buttonText = this.buttonText.bind(this)
    //this.updateActiveMarkerTypes = this.updateActiveMarkerTypes.bind(this)
  }

  state = {
    render: false,
    show: false,
    showFilterDropdown: false,
    overlayImage: false,
    routeCoords: [],
    coords: {
      left: new Animated.Value(0),
      top: new Animated.Value(0),
      width: new Animated.Value(0),
      height: new Animated.Value(0),
    },
    transition: {},
    markers: [],
    activeMarkerTypes: {
      defibrillators: true,
      hospitals: true,
      drugStores: true
    },
    region: {
      latitude: 46.5429,
      longitude: -72.748,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0005,
    },
    switchStatesDefibrillators: true,
    switchStatesHospitals: true,
    switchStatesDrugStores: true
  };

  buttonText() {
    if (!!this.state.selectedMarkerCoordinates) {
      return {
        color: '#999',
        fontSize: 10
      };
    } else {
      return {
        color: '#eee',
        fontSize: 10
      };
    }
  }

  buttonIcon() {
    if (!!this.state.selectedMarkerCoordinates) {
      return {
        color: '#999'
      };
    } else {
      return {
        color: '#eee'
      };
    }
  }

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

    this.getMarkersByType(this.state.activeMarkerTypes);
  }

  decode = (t,e) => {for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}
  // transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates

  onPressMarker(e) {
    this.setState({selectedMarkerCoordinates: e.nativeEvent.coordinate});
    this.getDirections(origin, e.nativeEvent.coordinate.latitude + ',' + e.nativeEvent.coordinate.longitude)
  }

  onPressButton(e) {
    if (this.state.selectedMarkerCoordinates) {
      openMap({
        latitude: this.state.selectedMarkerCoordinates.latitude,
        longitude: this.state.selectedMarkerCoordinates.longitude,
        provider: 'google'
      });
    }
  }

  onPressFilter(e) {
    this.setState({showFilterDropdown: !this.state.showFilterDropdown});
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

  async getMarkersByType(activeMarkerTypes) {
    let markers = [
      {
        coordinate: {
          latitude: 46.540816,
          longitude: -72.748414,
        },
        title: "Vous êtes ici!",
        pinColor: "#FF0000"
      }
    ];

    if (activeMarkerTypes.defibrillators) {
      markers = markers.concat(await this.getDefibrillators());
    }

    if (activeMarkerTypes.hospitals) {
      markers = markers.concat(await this.getHospitals());
    }

    if (activeMarkerTypes.drugStores) {
      markers = markers.concat(await this.getDrugStores());
    }

    this.setState({markers: markers})
    return markers;
  }

  async getDefibrillators() {

    let resp = await fetch(ServerAPI.defibrillators, {
      method: 'GET'
    });

    let defibrillators = await resp.json();

    let defibrillatorMarkers = defibrillators.map((defibrillator, _index) => {
      return {
          coordinate: {
            latitude : defibrillator.coordinates.latitude,
            longitude : defibrillator.coordinates.longitude
          },
          title: 'Défribrillateur',
          pinColor: "#0000FF"
      }
    })

    return defibrillatorMarkers;
  }

  async getHospitals() {
    let resp = await fetch(ServerAPI.hospitals, {
      method: 'GET'
    });

    let hospitals = await resp.json();

    let hospitalMarkers = hospitals.map((hospital, _index) => {
      return  {
          coordinate: {
            latitude : hospital.coordinates.latitude,
            longitude : hospital.coordinates.longitude
          },
          title: 'Hôpital',
          pinColor: "#00FF00"
      }
    })

    return hospitalMarkers;
  }

  async getDrugStores() {
    let resp = await fetch(ServerAPI.drugStores, {
      method: 'GET'
    });

    let drugStores = await resp.json();

    let drugStoreMarkers = drugStores.map((drugStore, _index) => {
      return {
          coordinate: {
            latitude : drugStore.coordinates.latitude,
            longitude : drugStore.coordinates.longitude
          },
          title: 'Pharmacie',
          pinColor: "#00FFFF"
      }
    });

    return drugStoreMarkers;
  }

  updateActiveMarkerTypes(markerTypesChanges) {
    var mthis = this
    markerTypesChanges.forEach(function (markerTypeChange) {
      mthis.state.activeMarkerTypes[markerTypeChange.markerType] = markerTypeChange.value;
      mthis.getMarkersByType(mthis.state.activeMarkerTypes);
    });
  }

  _renderFilterDropdown() {
    if (this.state.showFilterDropdown) {
      return (
        <View style={styles.filtersDropdown} >
          <View style={{flex: 1}}>
            <Text>Défibrillateurs</Text>
            <Switch
              onValueChange={(value) => this.updateActiveMarkerTypes([{markerType: 'defibrillators', value: value}])}
              value={this.state.switchStatesDefibrillators}
            />
          </View>
          <View style={{flex: 1}}>
            <Text>Hôpitaux</Text>
            <Switch
              onValueChange={(value) => this.updateActiveMarkerTypes([{markerType: 'hospitals', value: value}])}
              value={this.state.switchStatesHospitals}
            />
          </View>
          <View style={{flex: 1}}>
            <Text>Pharmacies</Text>
            <Switch
              onValueChange={(value) => this.updateActiveMarkerTypes([{markerType: 'drugStores', value: value}])}
              value={this.state.switchStatesDrugStores}
            />
          </View>
        </View>
      );
    } else {
        return null;
    }
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <View style={{ flex: 1, flexDirection: 'row'}}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity disabled={!this.state.selectedMarkerCoordinates} style={styles.button} onPress={this.onPressButton}>
              <Ionicons
                name={'ios-navigate'}
                size={28}
                style={this.buttonIcon()}
              />
              <Text style={this.buttonText()}>Naviguer</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={this.onPressFilter}>
              <Ionicons
                name={'ios-funnel'}
                size={28}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Filtrer</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 11 }}>
          {this._renderFilterDropdown()}
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
                strokeColor="#0000FF"
                strokeWidth={4}
              />
          </MapView>
        </View>
      </View>
    );
  }
}
