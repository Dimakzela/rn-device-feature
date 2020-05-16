import React from 'react';
import PlacesNav from "./app/navigation/PlacesNavigation";
import {applyMiddleware, combineReducers, createStore} from "redux";
import placesReducer from './app/store/places.reducer'
import ReduxThunk from 'redux-thunk'
import {Provider} from "react-redux";
import {init} from "./app/helpers/db";

init().then(() => {
    console.log('init db success');
}).catch(err => {
    console.log(`init db failed: ${err}`);
});

const rootReducer = combineReducers({
    places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
    return (
        <Provider store={store}>
          <PlacesNav/>
        </Provider>
    );
}

