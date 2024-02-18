import React, { useEffect } from 'react';
import { View,Text, StyleSheet, Dimensions } from 'react-native';
import MapView,{ Marker ,PROVIDER_GOOGLE } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import customMapStyle from './customMapStyle';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

export default function App() {
  const [pin, setPin]=React.useState({
    latitude: 43.770919, 
    longitude:11.270960,
  })
  useEffect(() => {
    (async() => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if ( status !== 'granted') {
        setErrorMsg('Permission to access Location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    })();
  }, []);

  const { width, height } = Dimensions.get("window");

  
  const destination = {
    latitude:43.766764, 

    longitude: 11.251349,
  };
  const origin = {
    latitude:43.766476, 
    longitude:11.250857,
  };
  
  const GOOGLE_MAPS_APIKEY = 'AIzaSyArDHKxkI_wPzZB71m3HUjZgIuiZrGfg-k';
  
  
  
  const Aspect_Ratio = width / height;
  const LATTUDE_DELTA = 0.2;
  const LONGITUDE_DELTA = LATTUDE_DELTA * Aspect_Ratio;
  const INITIAL_POSITION = {
    latitude: 43.770919, 
    longitude:11.270960,
    latitudeDelta: LATTUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <View style={styles.container}>
      <MapView
        followUserLocation={true}
        zoomEnabled={true}
        pitchEnabled={true}
        showsCompass={true}
        showsBuildings={true}
        showsTraffic={false}
        showsIndoors={true}
        customMapStyle={customMapStyle}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}

        showsUserLocation={true}
        onUserLocationChange={(e) => {
          console.log("onUserLocationChange", e.nativeEvent.coordinate);
        }}
      >
        <Marker
        
        coordinate={pin}
        title={"Pin"}
        description='pin description'
        >

        </Marker>
        <MapViewDirections
            origin={userLocation}
            destination={{ latitude: 35.736034, longitude: 10.724127 }}
            apikey={'YOUR_GOOGLE_MAPS_API_KEY'}
          />
        
      <View style={styles.searchContainer}>
        
          <GooglePlacesAutocomplete
            styles={{ textInput: styles.input }}
            placeholder={"Search"}
            fetchDetails
            onPress={(data, details = null) => {
              onPlaceSelected(details);
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
          />
      </View>

      <StatusBar style="auto" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    position: 'absolute',
    width: "90%",
    opacity: 1,
    top: Constants.statusBarHeight,
    backgroundColor: "transparent",

  },
  input: {
    borderColor: "#01F2CF",
    borderWidth: 1,
    backgroundColor: "transparent",
    color: '#01F2CF'
  }
});
