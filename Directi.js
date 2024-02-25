import React, {useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import {Marker, Polyline} from "react-native-maps";

const Directi = () => {

    const GOOGLE_MAPS_APIKEY = 'AIzaSyArDHKxkI_wPzZB71m3HUjZgIuiZrGfg-k';

    const [coordinates] = useState([
        {
          latitude: 48.8587741,
          longitude: 2.2069771,
        },
        {
          latitude: 48.8323785,
          longitude: 2.3361663,
        },
      ]);
    return(
        <View>
            <MapViewDirections
            origin={coordinates[0]}
            destination={coordinates[1]}
            apikey={GOOGLE_MAPS_APIKEY} // insert your API Key here
            strokeWidth={4}
            strokeColors="#111111"
            />
            <Marker coordinate={coordinates[0]} />
            <Marker coordinate={coordinates[1]} />
            <Polyline
            coordinates={coordinates}
            strokeColor="#ffffff" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={['#7F0000']}
            strokeWidth={6}
            />
            </View>
    )
}
export default Directi;
