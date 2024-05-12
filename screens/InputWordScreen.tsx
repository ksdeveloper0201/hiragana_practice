import React, { useEffect, useState } from "react";
import { Button, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { RootStackPropsList } from "../navigation/AppNavigator";
import { RouteProp } from "@react-navigation/native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



type Props = {
    navigation: any | undefined;
};

const InputWordScreen: React.FC<Props> = ({ navigation }) => {

    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const unsubscribe = navigation.addListener("blur", () => {
            setInputValue("");
        })
        return unsubscribe;
    }, [navigation])

    const handleInputChange = (text: string) => {
        setInputValue(text)
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate("Home")}>
                <MaterialCommunityIcons name="menu" size={36} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate("Home")}>
                <MaterialCommunityIcons name="home-circle" size={36} color="black" />
            </TouchableOpacity>

            <Text style={styles.subtitle}>こえにだしてよむ</Text>
            <TextInput placeholder="ひらがな" value={inputValue} onChangeText={handleInputChange} style={styles.inputForm}></TextInput>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("ShowWord", { inputValue: inputValue !== "" ? inputValue : "ひらがな" }) }}>
                <Text style={styles.buttonText}>けってい</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    homeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    menuIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    title: { fontSize: 36, fontWeight: "bold", marginBottom: 15 },
    buttonView: {
        marginVertical: 10
    },
    subtitle: { fontSize: 24, fontWeight: "bold", margin: 10 },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin: 10,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 24,
        paddingHorizontal: 5
    },
    inputForm: { margin: 44, fontSize: 24, width: '40%', borderColor: "gray" }
});

export default InputWordScreen;
