import React, {useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import MapView,{Polyline, Marker ,PROVIDER_GOOGLE } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import customMapStyle from './customMapStyle';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import Directi from './Directi';

export default function App() {

  

  const [pin, setPin]= React.useState({
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
  }, [pin]);

  const { width, height } = Dimensions.get("window");

  
  const destination = {
    latitude:43.766764, 

    longitude: 11.251349,
  };
  
  const GOOGLE_MAPS_APIKEY = 'AIzaSyArDHKxkI_wPzZB71m3HUjZgIuiZrGfg-k';
  
  



  
  const Aspect_Ratio = width / height;
  const LATTUDE_DELTA = 0.2;
  const LONGITUDE_DELTA = LATTUDE_DELTA * Aspect_Ratio;
  const INITIAL_POSITION = {
    latitude: 43.766764, 
    longitude:11.251349,
    latitudeDelta: LATTUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <SafeAreaView style={styles.container}>
      
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
        <Directi />
        
        
        
        <Marker
        
        coordinate={pin}
        title={"Pin"}
        description='pin description'
        >

        </Marker>
        
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            styles={{ textInput: styles.input }}
            placeholder={"Search"}
            fetchDetails
            onPress={(data, details = null) => {
              onPlaceSelected(data, details);
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
          />
        

      <StatusBar style="auto" />
      
        </View>
      </MapView>
    </SafeAreaView>
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
