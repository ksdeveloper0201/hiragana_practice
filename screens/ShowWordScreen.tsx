import { RouteProp } from "@react-navigation/native";
import { useState } from "react";
import { Button, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { RootStackPropsList } from "../navigation/AppNavigator";
import HeaderIcons from "../components/HeaderIcons";
import { styles } from "../styles/CommonStyles";

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
                <TouchableOpacity style={styles.button} onPress={() => setSelectedLetters({})}>
                    <Text style={styles.buttonText}>もういちど</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("InputWord",)}>
                    <Text style={styles.buttonText}>つぎ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default ShowWordScreen
