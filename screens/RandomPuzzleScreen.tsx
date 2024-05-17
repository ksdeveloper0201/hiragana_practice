import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import HeaderIcons from "../components/HeaderIcons"
import { styles } from "../styles/CommonStyles";
import { RouteProp } from "@react-navigation/native";
import { RootStackPropsList } from "../navigation/AppNavigator";
import { HIRAGANA_JAPANESE } from "../enums/words-enum";



const randomHiraganas = Array.from(Array(10)).map(() => HIRAGANA_JAPANESE[Math.floor(Math.random() * HIRAGANA_JAPANESE.length)]).join('')

interface RandomPuzzleScreenProps { navigation: any }

const RandomPuzzleScreen: React.FC<RandomPuzzleScreenProps> = ({ navigation }) => {
    const [selectedLetters, setSelectedLetters] = useState<{ [key: string]: boolean }>({})
    const [forSelectLetters, setForSelectedLetters] = useState<string>("")

    const [srcLetters, setSrcLetters] = useState<string>("")
    const [showingLetters, setShowingLetters] = useState<string>("")
    const [gameOver, setGameOver] = useState<boolean>()


    useEffect(() => {
        const HIRAGANA = "あいうえおかきくけこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをん"
        const DAKUTEN = "ざじずぜぞだぢづでどはびぶべぼ"
        const HANDAKUTEN = "ぱぴぷぺぽ"
        const JAPANESE = HIRAGANA + DAKUTEN + HANDAKUTEN
        const randomHiraganas = Array.from(Array(10)).map(() => JAPANESE[Math.floor(Math.random() * JAPANESE.length)]).join('')

        setSrcLetters(randomHiraganas)
        setForSelectedLetters(randomHiraganas)
    }, [])

    useEffect(() => {
        if (srcLetters) {
            const newShowingLetter = srcLetters[Math.floor(Math.random() * srcLetters.length)];
            setShowingLetters(newShowingLetter);
            console.log("New showingLetters:", newShowingLetter);
        }
    }, [srcLetters]);

    const shuffleHiraganas = randomHiraganas.split('').sort(() => Math.random() - 0.5).join('');



    const handleLetterPress = (letter: string, index: number) => {
        console.log('handleletter')
        if (letter == showingLetters) {
            console.log("onaji")
            setSelectedLetters(prevState => ({
                ...prevState, [`${letter}${index}`]: true
            }))

            const updatedSrcLetters = srcLetters.replace(showingLetters, "")
            setSrcLetters(updatedSrcLetters)
            console.log("updatedSrc", srcLetters)

            if (updatedSrcLetters.length === 0) {
                console.log("All letters selected!");
                setGameOver(true)
                setShowingLetters("よくできました")
            } else {
                const randomIndex = Math.floor(Math.random() * srcLetters.length)
                const newShowingLetter = updatedSrcLetters[randomIndex]
                setShowingLetters(newShowingLetter)
                console.log("showingLetters", newShowingLetter)
            }
        }
        console.log("updatedSrc", srcLetters)
    }

    const renderLetters = () => {
        return forSelectLetters.split('').map((letter, index) => (
            <TouchableOpacity key={index} onPress={() => handleLetterPress(letter, index)}>
                <Text style={gameOver ? styles.smallTitle : { fontSize: 46, marginHorizontal: 8, marginTop: 24, color: selectedLetters[`${letter}${index}`] ? 'red' : 'black' }}>{letter}</Text>
            </TouchableOpacity>
        ))
    }

    const resetGame = () => {
        const newRandomHiraganas = Array.from(Array(10)).map(() => HIRAGANA_JAPANESE[Math.floor(Math.random() * HIRAGANA_JAPANESE.length)]).join('')
        setSrcLetters(newRandomHiraganas)
        setForSelectedLetters(newRandomHiraganas)
        setSelectedLetters({})
        setShowingLetters(newRandomHiraganas[Math.floor(Math.random() * newRandomHiraganas.length)]);
        setGameOver(false);
    }

    return (
        <View style={styles.container}>
            <HeaderIcons navigation={navigation} />
            <Text style={styles.smallTitle}>もじをさがそう</Text>
            <Text style={gameOver ? styles.gameOver : styles.showWord}>{showingLetters}</Text>
            {!gameOver &&
                (<View>
                    <Text style={styles.showWord}>
                        {renderLetters()}
                    </Text>
                </View>
                )}
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={styles.button} onPress={resetGame}>
                    <Text style={styles.buttonText}>もういちど</Text>
                </TouchableOpacity>
            </View>
        </View>);
}

export default RandomPuzzleScreen;