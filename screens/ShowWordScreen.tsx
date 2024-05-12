import { RouteProp } from "@react-navigation/native";
import { useState } from "react";
import { Button, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { RootStackPropsList } from "../navigation/AppNavigator";
import HeaderIcons from "../components/HeaderIcons";

type ShowWordScreenRouteProp = RouteProp<RootStackPropsList, 'ShowWord'>

interface ShowWordScreenProps { route: ShowWordScreenRouteProp, navigation: any }

const ShowWordScreen: React.FC<ShowWordScreenProps> = ({ route, navigation }) => {
    const [selectedLetters, setSelectedLetters] = useState<{ [key: string]: boolean }>({})

    const handleLetterPress = (letter: string, index: number) => {
        if (selectedLetters[`${letter}${index}`]) {
            return
        }
        if (index == 0 || Object.keys(selectedLetters).includes(`${route.params.inputValue[index - 1]}${index - 1}`)) {
            setSelectedLetters(prevState => ({
                ...prevState, [`${letter}${index}`]: !prevState[`${letter}${index}`]
            }))
        }
    }

    const renderLetters = () => {
        return route.params.inputValue.split('').map((letter, index) => (
            <TouchableOpacity key={index} onPress={() => handleLetterPress(letter, index)}>
                <Text style={{ fontSize: 46, marginHorizontal: 8, marginTop: 24, color: selectedLetters[`${letter}${index}`] ? 'red' : 'black' }}>{letter}</Text>
            </TouchableOpacity>
        ))
    }

    return (
        <View style={styles.container}>
            <HeaderIcons navigation={navigation} />
            <Text style={styles.smallTitle}>こえにだしてよむ</Text>
            <View >
                <Text style={styles.showWord}>
                    {renderLetters()}
                </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={styles.showWordButton} onPress={() => setSelectedLetters({})}>
                    <Text style={styles.showWordButtonText}>もういちど</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.showWordButton} onPress={() => navigation.navigate("InputWord",)}>
                    <Text style={styles.showWordButtonText}>つぎ</Text>
                </TouchableOpacity>
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
    smallTitle: { fontSize: 16, fontWeight: "bold" },
    showWord: {
        fontSize: 58,
        margin: 24
    },
    showWordButton: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 5,
        margin: 10,
        borderRadius: 25,
    },
    showWordButtonText: {
        fontSize: 20,
        paddingHorizontal: 5
    },
    inputForm: { margin: 10, fontSize: 24, width: '40%' }
});

export default ShowWordScreen
