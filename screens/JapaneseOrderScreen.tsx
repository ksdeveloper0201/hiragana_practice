import { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import HeaderIcons from "../components/HeaderIcons";
import { styles } from "../styles/CommonStyles";
import { RouteProp } from "@react-navigation/native";
import { RootStackPropsList } from "../navigation/AppNavigator";
import { HIRAGANA_LIST, KANA_LIST } from "../enums/words-enum";

type JapaneseOrderScreenRouteProp = RouteProp<RootStackPropsList, 'JapaneseOrder'>
interface JapaneseOrderScreenProps {
    route: JapaneseOrderScreenRouteProp
    navigation: any
}

const JapaneseOrderScreen: React.FC<JapaneseOrderScreenProps> = ({ navigation, route }) => {
    const wordList = route.params.wordList;

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
        if (lineIndex === wordList.length) {
            console.log("its over")
            return (<Text style={{ fontSize: 46, marginHorizontal: 8, marginTop: 24, color: 'red' }}>よくできました</Text>
            )
        }
        if (!showingWords) setShowingWords(wordList[lineIndex])

        console.log(lineIndex)
        console.log(selectedLetters)
        console.log(wordList[lineIndex])
        return wordList[lineIndex].split("").map((letter: string, index: number) => (
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
                setShowingWords(wordList[newIndex])
                return newIndex
            })
            setIsOverLine(false)
            setSelectedLetters({})
        }
    }


    const renderNextLineButton = () => {
        if (isOverLine) {
            return (
                <TouchableOpacity style={styles.button} onPress={initNextLine}>
                    <Text style={styles.buttonText}>つぎのぎょう</Text>
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
    }


    return (
        <View style={styles.container}>
            <HeaderIcons navigation={navigation} />
            <Text style={styles.smallTitle}>こえにだしてよむ</Text>
            <View >
                <Text style={styles.showWord}>
                    {renderOrderJapanese()}
                </Text>
            </View>
            <View>{renderNextLineButton()}</View>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={styles.button} onPress={initStates}>
                    <Text style={styles.buttonText}>さいしょから</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default JapaneseOrderScreen;