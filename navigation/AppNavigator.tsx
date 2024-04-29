import { View, Text, Button } from "react-native";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PuzzleScreen from "../screens/PuzzleScreen";
import InputWordScreen from "../screens/InputWordScreen";
import ShowWordScreen from "../screens/ShowWordScreen";
// import RecordVoiceScreen from "../screens/RecordVoiceScreen";

export type RootStackPropsList = {
    Home: undefined;
    InputWord: { inputValue: string } | undefined;
    Puzzle: undefined;
    Menu: undefined;
    ShowWord: { inputValue: string };
    // RecordVoice: undefined;
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
                    options={{ title: "welcome to hiragana", headerShown: false }}
                />
                <Stack.Screen
                    name="InputWord"
                    component={InputWordScreen}
                    options={{ title: "れんしゅうすることばをいれてね", headerShown: false }}
                />
                <Stack.Screen
                    name="Puzzle"
                    component={PuzzleScreen}
                    options={{ title: "こーすをせんたくしてね", headerShown: false }}
                />
                <Stack.Screen
                    name="ShowWord"
                    component={ShowWordScreen}
                    options={{ title: "こえにだしてみよう", headerShown: false }}
                />
                {/* <Stack.Screen
                    name="RecordVoice"
                    component={RecordVoiceScreen}
                    options={{ title: "こえにだしてみよう" }}
                /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
