import {StyleSheet, Text, View} from "react-native";
import React from "react";

const PlaceDetailScreen = () => {
    return (
        <View>
            <Text>PlacesDetailsScreen</Text>
        </View>
    );
};

PlaceDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('title'),
    };
};

const styles = StyleSheet.create({});

export default PlaceDetailScreen;
