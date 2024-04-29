import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const HIRAGANA = "あいうえおかきくけこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをん"
const DAKUTEN = "ざじずぜぞだぢづでどはびぶべぼ"
const HANDAKUTEN = "ぱぴぷぺぽ"
const JAPANESE = HIRAGANA + DAKUTEN + HANDAKUTEN
const randomHiraganas = Array.from(Array(10)).map(() => JAPANESE[Math.floor(Math.random() * JAPANESE.length)]).join('')

type RandomPuzzleScreenProps = {
    navigation: any
}

const RandomPuzzleScreen: React.FC<RandomPuzzleScreenProps> = ({ navigation }) => {

    const [selectedLetters, setSelectedLetters] = useState<{ [key: string]: boolean }>({})
    const [showingLetters, setShowingLetters] = useState()


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
        return randomHiraganas.split('').map((letter, index) => (
            <TouchableOpacity key={index} onPress={() => handleLetterPress(letter, index)}>
                <Text style={{ fontSize: 46, marginHorizontal: 8, marginTop: 24, color: selectedLetters[`${letter}${index}`] ? 'red' : 'black' }}>{letter}</Text>
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
            <Text style={styles.smallTitle}>もじをさがそう</Text>
            <Text style={styles.smallTitle}>{showingLetters}</Text>
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
        </View>);
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

export default RandomPuzzleScreen;