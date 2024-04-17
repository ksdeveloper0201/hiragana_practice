// In App.js in a new project

import * as React from "react";
import { Button, View, Text, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type NavigationProps = {
    navigation: any;
    route: any;
};

type DetailNavigationProps = {
    route: any;
    navigation: any;
};

function HomeScreen({ navigation, route }: NavigationProps) {
    React.useEffect(() => {
        if (route.params?.post) {
            // Post updated, do something with `route.params.post`
            // For example, send the post to the server
        }
    }, [route.params?.post]);

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Button
                title="Create Post"
                onPress={() => navigation.navigate("CreatePost")}
            />
            <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
        </View>
    );
}

type CreatePostScreenProps = {
    navigation: any;
    route: any;
};

function CreatePostScreen({ navigation, route }: CreatePostScreenProps) {
    const [postText, setPostText] = React.useState("");

    return (
        <>
            <TextInput
                multiline
                placeholder="Whats on your mind?"
                style={{ height: 200, padding: 10, backgroundColor: "white" }}
                value={postText}
                onChangeText={setPostText}
            />
            <Button
                title="Done"
                onPress={() => {
                    navigation.navigate({
                        name: "Home",
                        params: { post: postText },
                        merge: true,
                    });
                }}
            />
        </>
    );
}

function DetailsScreen({ route, navigation }: DetailNavigationProps) {
    const { itemId, otherParam } = route.params;
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Details Screen</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>otherParam: {JSON.stringify(otherParam)}</Text>
            <Button
                title="Go to Details... again"
                onPress={() =>
                    navigation.push("Details", {
                        itemId: Math.floor(Math.random() * 100),
                        otherParam: "more secondary",
                    })
                }
            />
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate("Home")}
            />
            <Button title="Go back" onPress={() => navigation.goBack()} />
            <Button
                title="Go back to first screen in stack"
                onPress={() => navigation.popToTop()}
            />
        </View>
    );
}

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="CreatePost" component={CreatePostScreen} />
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                    initialParams={{ itemId: 42 }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
