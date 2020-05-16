import * as FileSystem from 'expo-file-system'
import {fetchPlaces, insertPlace} from "../helpers/db";
import vars from "../../environment/env";

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACE = 'SET_PLACE';

export const addPlace = (title, image, location) => {
    return async dispatch => {

        const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
            location.lat
            },${location.lng}&key=${vars.googleApiKey}`
        );

        if(!res.ok) {
            throw new Error('Something went wrong');
        }
        
        const resData = await res.json();
        if(!resData.results) {
            throw new Error('Something went wrong');
        }
        let address = resData.results[0].formatted_address;
        const fileName = image.split('/').pop()
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(
                title,
                newPath,
                address,
                location.lat,
                location.lng);
            dispatch(
                {type: ADD_PLACE, placeData: {
                    id: dbResult.insertId,
                        title: title,
                        image: newPath,
                        address: address,
                        lat: location.lat,
                        lng: location.lng
                }
                }
            );
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            if(dbResult.rows._array.length > 0) {
                dispatch({
                    type: SET_PLACE, places: [dbResult.rows._array]
                });
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};
