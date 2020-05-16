import {FlatList} from "react-native";
import React, {useEffect} from "react";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import {useDispatch, useSelector} from "react-redux";
import PlaceItem from "../components/PlaceItem";
import * as placesActions from '../store/places.action'

const PlaceListScreen = (props) => {
    const dispatch = useDispatch();
    const places = useSelector(state => state.places.places);

    useEffect(() => {
        dispatch(placesActions.loadPlaces());
    }, [dispatch])

    return (
        <FlatList data={places} keyExtractor={item => item.id} renderItem={itemData =>
            <PlaceItem
                title={itemData.item.title}
                image={itemData.item.imageUri}
                address={itemData.item.address}
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

export default PlaceListScreen;

