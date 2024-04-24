import { View, Text, Button } from "react-native";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PuzzleScreen from "../screens/PuzzleScreen";
import InputWordScreen from "../screens/InputWordScreen";
import ShowWordScreen from "../screens/ShowWordScreen";

export type RootStackPropsList = {
    Home: undefined;
    InputWord: undefined;
    Puzzle: undefined;
    Menu: undefined;
    ShowWord: { inputValue: string };
    // Select: undefined;
};

export const Stack = createNativeStackNavigator<RootStackPropsList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: "welcome to hiragana" }}
                />
                <Stack.Screen
                    name="InputWord"
                    component={InputWordScreen}
                    options={{ title: "れんしゅうすることばをいれてね" }}
                />
                <Stack.Screen
                    name="Puzzle"
                    component={PuzzleScreen}
                    options={{ title: "こーすをせんたくしてね" }}
                />
                <Stack.Screen
                    name="ShowWord"
                    component={ShowWordScreen}
                    options={{ title: "こえにだしてみよう" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
