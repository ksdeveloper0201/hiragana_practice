import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type RootStackPropsList = {
    Home: undefined;
    InputWord: undefined;
    Puzzle: undefined;
    Menu: undefined;
    // Select: undefined;
};

type HomeScreenProps = {
    navigation: any;
};

type InputWordScreenProps = {
    navigation: any;
};

type PuzzleScreenProps = {
    navigation: any;
};
// type ProfileScreenProps = {
//     navigation: any;
//     route: RouteProp<RootStackPropsList, "Profile">;
// };

function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>ひらがな</Text>
            <Button
                title="こえにだしてよむ"
                onPress={() => navigation.navigate("InputWord")}
            />
            <Button
                title="あいうえお ぱずる"
                onPress={() => navigation.navigate("Puzzle")}
            />
        </View>
    );
}

function InputWordScreen({ navigation }: InputWordScreenProps) {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

function PuzzleScreen({ navigation }: PuzzleScreenProps) {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Button
                title="あいうえおじゅん"
                onPress={() => navigation.navigate("InputWord")}
            />
            <Button
                title="らんだむ"
                onPress={() => navigation.navigate("Puzzle")}
            />
        </View>
    );
}

const Stack = createNativeStackNavigator<RootStackPropsList>();

function App() {
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
