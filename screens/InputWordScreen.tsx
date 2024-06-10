import React, { useEffect, useState } from "react";
import { Button, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { RootStackPropsList } from "../navigation/AppNavigator";
import { RouteProp } from "@react-navigation/native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HeaderIcons from "../components/HeaderIcons";
import { styles } from "../styles/CommonStyles";
import { GestureHandlerRootView, RectButton } from "react-native-gesture-handler";




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
        <GestureHandlerRootView style={styles.container}>
            <HeaderIcons navigation={navigation} />
            <Text style={styles.subtitle}>こえにだしてよもう</Text>
            <TextInput placeholder="ひらがな" value={inputValue} onChangeText={handleInputChange} style={styles.inputForm}></TextInput>
            <RectButton style={styles.button} onPress={() => { navigation.navigate("ShowWord", { inputValue: inputValue !== "" ? inputValue : "ひらがな" }) }}>
                <Text style={styles.buttonText}>けってい</Text>
            </RectButton>
        </GestureHandlerRootView>
    );
};


export default InputWordScreen;
