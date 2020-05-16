import React, {useEffect, useState} from "react";
import {ActivityIndicator, Alert, Button, StyleSheet, Text, View} from "react-native";
import Colors from "../constants/colors";
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState(null);

    const mapPickedLocation = props.navigation.getParam('pickedLocation')

    const {onLocationPicked} = props;

    useEffect(() => {
        if(mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation);
        }
    },[mapPickedLocation, onLocationPicked])

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert('Insufficient permissions!',
                'Grand location permissions.',
                [{text: 'OK'}]);
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermissions = verifyPermissions();
        if (!hasPermissions) {
            return;
        }

        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({timeout: 5000,});
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
            props.onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
        } catch (err) {
            Alert.alert('Could not fetch location!',
                'Please try again.', [{text: 'OK'}]);
        }
        setIsFetching(false);
    };

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map');
    }

    return (
        <View style={styles.locationPicker}>
            <MapPreview onPress={pickOnMapHandler} style={styles.mapPreview} location={pickedLocation}>
                {isFetching ? <ActivityIndicator size='large' color={Colors.primary}/> :
                    <Text>No location chosen yet!</Text>}
            </MapPreview>
            <View style={styles.actions}>
                <Button
                    title='Get User Location'
                    color={Colors.primary}
                    onPress={getLocationHandler}
                />
                <Button
                    title='Pick on map'
                    color={Colors.primary}
                    onPress={pickOnMapHandler}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

export default LocationPicker;
