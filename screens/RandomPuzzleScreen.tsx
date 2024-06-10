import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import HeaderIcons from "../components/HeaderIcons"
import { styles } from "../styles/CommonStyles";
import { RouteProp } from "@react-navigation/native";
import { RootStackPropsList } from "../navigation/AppNavigator";
import { HIRAGANA_JAPANESE } from "../enums/words-enum";
import * as ScreenOrientation from 'expo-screen-orientation';
import { GestureHandlerRootView, RectButton } from "react-native-gesture-handler";




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
        const randomHiraganas = generateUniqueRandomHiraganas(10)

        setSrcLetters(randomHiraganas)
        setForSelectedLetters(randomHiraganas)
    }, [])

    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

        return () => {
            ScreenOrientation.unlockAsync();
        };
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
                <Text style={gameOver ? styles.smallTitle : { ...styles.selectedLetter, marginTop: 0, marginBottom: 0, color: selectedLetters[`${letter}${index}`] ? 'red' : 'black' }}>{letter}</Text>
            </TouchableOpacity>
        ))
    }

    function generateUniqueRandomHiraganas(count: number): string {
        const uniqueChars: Set<string> = new Set<string>();

        while (uniqueChars.size < count) {
            const randomIndex = Math.floor(Math.random() * HIRAGANA_JAPANESE.length);
            uniqueChars.add(HIRAGANA_JAPANESE[randomIndex]);
        }

        return Array.from(uniqueChars).join('');
    }


    const resetGame = () => {
        const newRandomHiraganas = generateUniqueRandomHiraganas(10)
        setSrcLetters(newRandomHiraganas)
        setForSelectedLetters(newRandomHiraganas)
        setSelectedLetters({})
        setShowingLetters(newRandomHiraganas[Math.floor(Math.random() * newRandomHiraganas.length)]);
        setGameOver(false);
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <HeaderIcons navigation={navigation} />
            <Text style={styles.smallTitle}>もじをさがそう</Text>
            <Text style={gameOver ? styles.gameOver : { ...styles.showWord, fontSize: 52 }}>{showingLetters}</Text>
            {!gameOver &&
                (<View>
                    <Text style={styles.showWord}>
                        {renderLetters()}
                    </Text>
                </View>
                )}
            <View style={{ flexDirection: "row" }}>
                <RectButton style={{ ...styles.button, backgroundColor: '#58aef5' }} onPress={resetGame}>
                    <Text style={styles.buttonText}>もういちど</Text>
                </RectButton>
            </View>
        </GestureHandlerRootView>);
}

export default RandomPuzzleScreen;