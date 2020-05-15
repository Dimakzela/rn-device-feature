import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import Colors from "../constants/colors";

const isAndroid = Platform.OS === 'android';

const PlacesNav = createStackNavigator({
    Place: PlacesListScreen,
    PlaceDetails: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: isAndroid? Colors.primary: ''
        },
        headerTintColor: isAndroid? 'white': Colors.primary
    }
});

export default createAppContainer(PlacesNav);
