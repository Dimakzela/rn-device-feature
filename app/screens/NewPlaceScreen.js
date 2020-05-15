import {Button, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import Colors from "../constants/colors";
import {useDispatch} from "react-redux";
import * as placesActions from '../store/places.action'
import ImageSelector from "../components/ImageSelect";

const NewPlaceScreen = (props) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');

    const titleChangeHandler = text => {
        setTitle(text);
    };

    const savePlace = () => {
        dispatch(placesActions.addPlace(title));
        props.navigation.goBack();
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={title}
                />
                <ImageSelector />
                <Button
                    title='Save Place'
                    color={Colors.primary}
                    onPress={savePlace}
                />
            </View>
        </ScrollView>
    );
};

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Place'
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlaceScreen;
