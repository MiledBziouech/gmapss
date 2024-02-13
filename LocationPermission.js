import React, { useState } from "react";
import Geolocation from '@react-native-community/geolocation';
import {PermissionAndroid, TouchableOpacity} from 'react-native';
import {View ,StyleSheet, Linking} from 'react-native'


const LocationPermission = async () => {
        try{
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_LOCATION,
                {
                    title: 'Cool App Location Permission',
                    message: 
                    'Cool App needs access to your Location',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK'
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED){
                console.log('you can use the Location');
                getCurrentLocation()
            } else {
                console.log('Location permission denied');
            }
        } catch (err){
            console.warn(err);
        }
    };
    const [currentLocation, setCurrentLocation] = useState(null)

    const getCurrentLocation = () =>{
        Geolocation.getCurrentPosition(
            position=> {
                const {latitude,longitude} = position.coords;
                setCurrentLocation({latitude,longitude})
                console.log(latitude,longitude)
            },
            error => alert('Error', error.message),
            {enableHighAccuracy: true, timeout: 15000, maximusage: 10000}
        )
    }

    const openMaps = () => {
        const {latitude,longitude} = currentLocation
        if (latitude, longitude){
            const url = 'https://www.google.com/maps/search/?api=1&query=${latitude,${longitude}'
            Linking.openURL(url)
        }
        else{
            alert('location not available')
        }
    
    return(
        <View>
            <Text>Get coords</Text>
            <View style={{
                backgroundColor:'white',
                padding:10,
                margin:10,
                alignItems: 'center'
            }}>
                <Text>Latiitude : {currentLocation ? currentLocation.latitude : ' Loading...'}</Text>
                <Text>Longitude : {currentLocation ? currentLocation.longitude : ' Loading...'}</Text>
            </View>

            {currentLocation ? (
                <>
                <TouchableOpacity onPress={openMaps}><TouchableOpacity onPress={Permission}>
                        <View style={{
                            backgroundColor:'red',
                            padding:10,
                            margin:10,
                            alignItems: 'center'
                        }}>
                            <Text>Open Maps</Text>
                        </View>
                    </TouchableOpacity></TouchableOpacity>
                </>
            ):(
                <>
                    <TouchableOpacity onPress={LocationPermission}>
                        <View style={{
                            backgroundColor:'green',
                            padding:10,
                            margin:10,
                            alignItems: 'center'
                        }}>
                            <Text>Get Location</Text>
                        </View>
                    </TouchableOpacity>
                </>
            )}

        </View>    
    )
}

export default LocationPermission;