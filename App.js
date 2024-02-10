import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';

export default function App() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const MyCustomMarkerView = () => {
    return (
      <ImageBackground
        source={require('./assets/Ellipse.png')}
        style={{ height: 60, width: 60, justifyContent: 'center' }}
      >
        <Image
          style={{
            width: 54,
            height: 35,
          }}
          source={require('./assets/bicycle.png')}
        />
      </ImageBackground>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {userLocation && (
        <MapView
          style={styles.map}
          region={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker
            draggable={true}
            coordinate={userLocation}
            onDragEnd={(e) => {
              console.log('Marker dragged to:', e.nativeEvent.coordinate);
            }}
          >
            <MyCustomMarkerView />
          </Marker>
          <MapViewDirections
            origin={userLocation}
            destination={{ latitude: 35.736034, longitude: 10.724127 }}
            apikey={'YOUR_GOOGLE_MAPS_API_KEY'}
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
