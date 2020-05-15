import {FlatList, StyleSheet} from "react-native";
import React from "react";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import {useSelector} from "react-redux";
import PlaceItem from "../components/PlaceItem";

const PlaceListScreen = (props) => {
    const places = useSelector(state => state.places.places);
    return (
        <FlatList data={places} renderItem={itemData =>
            <PlaceItem
                title={itemData.item.title}
                image={null}
                address={null}
                onSelect={() => {
                    props.navigation.navigate('PlaceDetails', {
                        id: itemData.item.id,
                        title: itemData.item.title
                    });
                }}
            />
        }/>
    );
};

PlaceListScreen.navigationOptions = navData => {
    return{
        headerTitle: 'All Places',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Add Place'
                    iconName={Platform.OS === "android"? 'md-add': 'ios-add'}
                    onPress={() => {
                        navData.navigation.navigate('NewPlace');
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({});

export default PlaceListScreen;

