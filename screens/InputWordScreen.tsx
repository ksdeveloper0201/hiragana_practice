import { useEffect, useState } from "react";
import { Button, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { RootStackPropsList } from "../navigation/AppNavigator";
import { RouteProp } from "@react-navigation/native";


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
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={styles.subtitle}>こえにだしてよむ</Text>
            <TextInput placeholder="ひらがなをにゅうりょくしてね" value={inputValue} onChangeText={handleInputChange} style={styles.inputForm}></TextInput>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("ShowWord", { inputValue }) }}>
                <Text style={styles.buttonText}>けってい</Text>
            </TouchableOpacity>

            {/* <Button title="けってい" onPress={() => { navigation.navigate("ShowWord", { word: inputValue }) }} /> */}
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
    },
    buttonText: {
        fontSize: 24
    },
    inputForm: { margin: 20, fontSize: 24, width: '40%', borderColor: "gray" }
});

export default InputWordScreen;
