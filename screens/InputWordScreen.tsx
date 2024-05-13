import React, { useEffect, useState } from "react";
import { Button, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { RootStackPropsList } from "../navigation/AppNavigator";
import { RouteProp } from "@react-navigation/native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HeaderIcons from "../components/HeaderIcons";
import { styles } from "../styles/CommonStyles";



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


export default InputWordScreen;
