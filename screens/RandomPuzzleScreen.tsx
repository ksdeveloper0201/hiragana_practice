import { useEffect, useState } from "react"
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
    const [forSelectLetters, setForSelectedLetters] = useState<string>("")

    const [srcLetters, setSrcLetters] = useState<string>("")
    const [showingLetters, setShowingLetters] = useState<string>("")
    const [showingIndex, setShowingIndex] = useState<number>(0)


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



    // const checkLetter = (letter, index) => {
    //     if (index = )
    // }


    const handleLetterPress = (letter: string, index: number) => {
        console.log('handleletter')
        if (letter == showingLetters) {
            console.log("onaji")
            setSelectedLetters(prevState => ({
                ...prevState, [`${letter}${index}`]: !prevState[`${letter}${index}`]
            }))

            const updatedSrcLetters = srcLetters.replace(showingLetters, "")
            setSrcLetters(updatedSrcLetters)
            console.log("updatedSrc", srcLetters)
            setShowingLetters(() => srcLetters[Math.floor(Math.random() * srcLetters.length)])
            console.log("showingLetters", showingLetters)
        }
        console.log("updatedSrc", srcLetters)
    }

    const renderLetters = () => {
        return forSelectLetters.split('').map((letter, index) => (
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