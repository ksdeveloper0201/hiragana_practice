import { useState } from "react";
import { Button, View, Text, TextInput } from "react-native";

type Props = {
    navigation: any | undefined;
};

const InputWordScreen: React.FC<Props> = ({ navigation }) => {

    const [inputValue, setInputValue] = useState("");
    const handleInputChange = (text: string) => {
        setInputValue(text)
    }

    // const handleSubmit = () => {
    //     console.log("Submit value: ", inputValue)
    // }

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>こえにだしてよむ</Text>
            <TextInput placeholder="ひらがなをにゅうりょくしてね" value={inputValue} onChangeText={handleInputChange}></TextInput>
            <Button title="けってい" onPress={() => { navigation.navigate("ShowWord", { word: inputValue }) }} />
        </View>
    );
};

export default InputWordScreen;
