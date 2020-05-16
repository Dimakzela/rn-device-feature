import {StyleSheet} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import MapView, {Marker} from "react-native-maps";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import colors from "../constants/colors";

const MapScreen = (props) => {
    const readOnly = props.navigation.getParam('readOnly');
    const initialLocation = props.navigation.getParam('initialLocation');
    const [selectLocation, setSelectedLocation] = useState(initialLocation);
    const [picked, setPicked] = useState(false);

    const mapRegion = {
        latitude: initialLocation? initialLocation.lat: 37.5,
        longitude: initialLocation? initialLocation.lng: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    const selectLocationHandler = (event) => {
        if(readOnly) {
            return;
        }
        setPicked(true);
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude,
        });
    }

    let markerCoordinates;

    if (selectLocation) {
        markerCoordinates = {
            latitude: selectLocation.lat,
            longitude: selectLocation.lng,
        };
    }

    const saveLocation = useCallback(() => {
        if(!selectLocation) {
            return;
        }
        props.navigation.navigate('NewPlace', { pickedLocation: selectLocation });
    }, [setSelectedLocation, selectLocation]);

    useEffect(() => {
        props.navigation.setParams({save: saveLocation, picked: picked});
    }, [saveLocation, picked]);

    return (
        <MapView style={styles.map} region={mapRegion} onPress={selectLocationHandler}>
            {(markerCoordinates) &&
            <Marker title='Picked Location' coordinate={markerCoordinates}/>
            }
        </MapView>
    );
};

MapScreen.navigationOptions = navData => {
    const save = navData.navigation.getParam('save');
    const picked = navData.navigation.getParam('picked');
    return {
        headerTitle: 'Map',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                {picked && <Item
                    style={styles.save}
                    title='Save'
                    onPress={save}
                />}
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    save: {
        fontSize: 16,
        color: Platform.OS === "android" ? 'white' : colors.primary
    }
});

export default MapScreen;
