import React from "react";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import vars from "../../environment/env";

const MapPreview = (props) => {
    let imagePreviewUrl;

    if (props.location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
            props.location.lat
        },${
            props.location.lng
        }&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:red%7Clabel:A%${
            props.location.lat
        },${props.location.lng}&key=${vars.googleApiKey}`;
    }


    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={{...styles.mapPreview, ...props.style}}>
            {imagePreviewUrl ?
                <Image style={styles.mapImage} source={{uri: imagePreviewUrl}}/> :
                props.children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    mapImage: {
        width: '100%',
        height: '100%'
    }
});

export default MapPreview
