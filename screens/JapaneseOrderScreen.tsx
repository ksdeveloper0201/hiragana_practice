import { useEffect, useState } from "react";
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

    //選択中の文字（赤字にする文字）
    const [selectedLetters, setSelectedLetters] = useState<{ [key: string]: boolean }>({})
    //一行が終わっているかの判定
    const [isOverLine, setIsOverLine] = useState<boolean>(false)
    //画面に出力中の複数文字
    const [showingWords, setShowingWords] = useState<string>("")
    const [lineIndex, setLineIndex] = useState<number>(0)
    // const [letterIndex, setLetterIndex] = useState<number>(0)

    const renderOrderJapanese = () => {
        // orderedJapanese.map((line: any) => {
        if (lineIndex === orderedJapanese.length) {
            console.log("its over")
            return (<Text style={{ fontSize: 46, marginHorizontal: 8, marginTop: 24, color: 'red' }}>よくできました</Text>
            )
        }
        if (!showingWords) setShowingWords(orderedJapanese[lineIndex])

        console.log(lineIndex)
        console.log(selectedLetters)
        console.log(orderedJapanese[lineIndex])
        return orderedJapanese[lineIndex].split("").map((letter: string, index: number) => (
            <TouchableOpacity key={index} onPress={() => handleLetterPress(letter, index)}>
                <Text style={{ fontSize: 46, marginHorizontal: 8, marginTop: 24, color: selectedLetters[`${letter}${index}`] ? 'red' : 'black' }}>{letter}</Text>
            </TouchableOpacity >
        ))
    }


    const handleLetterPress = (letter: string, index: number) => {
        // setLetterIndex(index)
        if (index == 0 || selectedLetters[`${showingWords[index - 1]}${index - 1}`] === true) {
            setSelectedLetters(prevState => ({
                ...prevState, [`${letter}${index}`]: true
            }))
            if (index !== 0 && showingWords.length === index + 1) {
                setIsOverLine(true)
            }
        }
    }

    const initNextLine = () => {
        if (isOverLine && selectedLetters[`${showingWords[showingWords.length - 1]}${showingWords.length - 1}`] === true) {
            setLineIndex((prevNum) => {
                const newIndex = prevNum + 1
                setShowingWords(orderedJapanese[newIndex])
                return newIndex
            })
            setIsOverLine(false)
            setSelectedLetters({})
        }
    }


    const renderNextLineButton = () => {
        if (isOverLine) {
            return (
                <TouchableOpacity style={styles.showWordButton} onPress={initNextLine}>
                    <Text style={styles.showWordButtonText}>つぎのぎょう</Text>
                </TouchableOpacity>
            )
        } else {
            return null;
        }
    }

    const initStates = () => {
        setSelectedLetters({})
        setIsOverLine(false)
        setShowingWords("")
        setLineIndex(0)

        // const [selectedLetters, setSelectedLetters] = useState<{ [key: string]: boolean }>({})
        // //一行が終わっているかの判定
        // const [isOverLine, setIsOverLine] = useState<boolean>(false)
        //画面に出力中の複数文字
        // const [showingWords, setShowingWords] = useState<string>("")
        // const [lineIndex, setLineIndex] = useState<number>(0)
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
            <View>{renderNextLineButton()}</View>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={styles.showWordButton} onPress={initStates}>
                    <Text style={styles.showWordButtonText}>もういちど</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.showWordButton} onPress={() => navigation.navigate("Home",)}>
                    <Text style={styles.showWordButtonText}>ほーむ</Text>
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