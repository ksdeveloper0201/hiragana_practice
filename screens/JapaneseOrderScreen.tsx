import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

type JapaneseOrderScreenProps = {
    navigation: any
}

const orderedJapanese = [
    "あいうえお",
    "かきくけこ",
    "さしすせそ",
    "たちつてと",
    "なにぬねの",
    "はひふへほ",
    "まみむめも",
    "やゆよ",
    "らりるれろ",
    "わをん",
]

const JapaneseOrderScreen: React.FC<JapaneseOrderScreenProps> = ({ navigation }) => {

    const [selectedLetters, setSelectedLetters] = useState<{ [key: string]: boolean }>({})

    const renderOrderJapanese = () => {
        return orderedJapanese.map((line: any) => {
            line.split("").map((letter: string, index: number) => {
                <TouchableOpacity key={index} onPress={() => handleLetterPress(letter, index)}>
                    <Text style={{ fontSize: 46, marginHorizontal: 8, marginTop: 24, color: selectedLetters[`${letter}${index}`] ? 'red' : 'black' }}>{letter}</Text>
                </TouchableOpacity >
            })
        })
    }

    const handleLetterPress = (letter: string, index: number) => {
        if (index == 0) {
            setSelectedLetters(prevState => ({
                ...prevState, [`${letter}${index}`]: true
            }))
        }

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
                    {renderOrderJapanese()}
                </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={styles.showWordButton} onPress={null}>
                    <Text style={styles.showWordButtonText}>もういちど</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.showWordButton} onPress={() => navigation.navigate("InputWord",)}>
                    <Text style={styles.showWordButtonText}>つぎ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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

export default JapaneseOrderScreen;