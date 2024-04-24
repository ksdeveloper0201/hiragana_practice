import { RouteProp } from "@react-navigation/native";
import { useState } from "react";
import { Button, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { RootStackPropsList } from "../navigation/AppNavigator";

type ShowWordScreenRouteProp = RouteProp<RootStackPropsList, 'ShowWord'>

interface ShowWordScreenProps { route: ShowWordScreenRouteProp, navigation: any }

const ShowWordScreen: React.FC<ShowWordScreenProps> = ({ route, navigation }) => {
    const [selectedLetters, setSelectedLetters] = useState<{ [key: string]: boolean }>({})

    const handleLetterPress = (letter: string, index: number) => {
        console.log(letter, index)
        setSelectedLetters(prevState => ({
            ...prevState, [`${letter}${index}`]: !prevState[`${letter}${index}`]
        }))
    }

    const renderLetters = () => {
        return route.params.inputValue.split('').map((letter, index) => (
            <TouchableOpacity key={index} onPress={() => handleLetterPress(letter, index)}>
                <Text style={{ marginHorizontal: 8, marginTop: 24, color: selectedLetters[`${letter}${index}`] ? 'red' : 'black' }}>{letter}</Text>
            </TouchableOpacity>
        ))
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={styles.smallTitle}>こえにだしてよむ</Text>
            <View >
                <Text style={styles.showWord}>

                    {renderLetters()}
                </Text>
            </View>
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
    smallTitle: { fontSize: 16, fontWeight: "bold", margin: 10 },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin: 10,
    },
    showWord: {
        fontSize: 58
    },
    buttonText: {
        fontSize: 24
    },
    inputForm: { margin: 10, fontSize: 24, width: '40%' }
});

export default ShowWordScreen
