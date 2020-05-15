import React from "react";
import {Alert, Button, Image, StyleSheet, Text, View} from "react-native";
import Colors from "../constants/colors";
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

const ImageSelector = () => {

    const verifyPermissions =async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if(result.status !== 'granted') {
            Alert.alert('Insufficient permissions!',
                'Grand camera permissions.',
                [{text: 'OK'}]);
            return false;
        }
        return true;
    };
    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission) {
            return;
        }
        ImagePicker.launchCameraAsync().then();
    };

    return(
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {<Text>No image picked yet.</Text>}
                <Image style={styles.image} />
            </View>
            <Button
                title='Take Image'
                color={Colors.primary}
                onPress={takeImageHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center'
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default ImageSelector;
