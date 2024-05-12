import React, { useEffect, useState } from "react";
import { Button, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { RootStackPropsList } from "../navigation/AppNavigator";
import { RouteProp } from "@react-navigation/native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HeaderIcons from "../components/HeaderIcons";



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
            <HeaderIcons navigation={navigation} />
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
