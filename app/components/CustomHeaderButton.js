import React from "react";
import {StyleSheet, Platform} from "react-native";
import Color from "../constants/Color";
import {HeaderButton} from "react-navigation-header-buttons";
import {Ionicons} from "@expo/vector-icons";


const CustomHeaderButton = props => {
    return <HeaderButton {...props}
                         IconComponent={Ionicons}
                         iconSize={23}
                         color={Platform.OS === 'android'? 'white' : Color.primaryColor}
    />;
};

const styles = StyleSheet.create({});

export default CustomHeaderButton;