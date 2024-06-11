import { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Button } from "react-native";
import HeaderIcons from "../components/HeaderIcons";
import { styles } from "../styles/CommonStyles";
import { RouteProp } from "@react-navigation/native";
import { RootStackPropsList } from "../navigation/AppNavigator";
import { HIRAGANA_LIST, KANA_LIST } from "../enums/words-enum";
import * as ScreenOrientation from 'expo-screen-orientation';
import { GestureHandlerRootView, RectButton } from "react-native-gesture-handler";


type ShowWordListScreenRouteProp = RouteProp<RootStackPropsList, 'ShowWordList'>
interface ShowWordListScreenProps {
    route: ShowWordListScreenRouteProp
    navigation: any
}

const ShowWordListScreen: React.FC<ShowWordListScreenProps> = ({ navigation, route }) => {
    const [wordList, setWordList] = useState<string[]>([]);

    //選択中の文字（赤字にする文字）
    const [selectedLetters, setSelectedLetters] = useState<{ [key: string]: boolean }>({})
    //一行が終わっているかの判定
    const [isOverLine, setIsOverLine] = useState<boolean>(false)
    //画面に出力中の複数文字
    const [showingWords, setShowingWords] = useState<string>("")
    const [lineIndex, setLineIndex] = useState<number>(0)

    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

        // シャッフルされたリストを設定
        if (route.params.isRandom) {
            const shuffledList = shuffleArray(route.params.wordList);
            setWordList(shuffledList);
        } else {
            setWordList(route.params.wordList)
        }

        return () => {
            ScreenOrientation.unlockAsync();
        };
    }, [])

    const shuffleArray = (array: string[]) => {
        return array.sort(() => Math.random() - 0.5);
    }

    const renderOrderJapanese = () => {
        if (lineIndex === wordList.length) {
            console.log("its over")
            return (<Text style={{ ...styles.selectedLetter, color: "red" }}>よくできました</Text>
            )
        }
        if (!showingWords) setShowingWords(wordList[lineIndex])

        // 一文字の単語の場合
        if (wordList[lineIndex].length === 1) {
            return (
                <TouchableOpacity key={0} onPress={() => handleLetterPress(wordList[lineIndex], 0)}>
                    <Text style={{ ...styles.selectedLetter, color: selectedLetters[`${wordList[lineIndex]}0`] ? 'red' : 'black' }}>{wordList[lineIndex]}</Text>
                </TouchableOpacity>
            )
        }

        console.log(lineIndex)
        console.log(selectedLetters)
        console.log(wordList[lineIndex])
        return wordList[lineIndex].split("").map((letter: string, index: number) => (
            <TouchableOpacity key={index} onPress={() => handleLetterPress(letter, index)}>
                <Text style={{ ...styles.selectedLetter, color: selectedLetters[`${letter}${index}`] ? 'red' : 'black' }}>{letter}</Text>
            </TouchableOpacity >
        ))
    }


    const handleLetterPress = (letter: string, index: number) => {
        if (index == 0 || selectedLetters[`${showingWords[index - 1]}${index - 1}`] === true) {
            setSelectedLetters(prevState => ({
                ...prevState, [`${letter}${index}`]: true
            }))
            // 単語が一文字の場合、または最後の文字が選択された場合に行の終わりを設定
            if (showingWords.length === 1 || (index !== 0 && showingWords.length === index + 1)) {
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


    const initStates = () => {
        setSelectedLetters({})
        setIsOverLine(false)
        setShowingWords("")
        setLineIndex(0)
        if (route.params.isRandom) {
            const shuffledList = shuffleArray(route.params.wordList);
            setWordList(shuffledList);
        } else {
            setWordList(route.params.wordList)
        }
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <HeaderIcons navigation={navigation} />
            <Text style={styles.smallTitle}>こえにだしてよもう</Text>
            <View style={styles.showWord} >
                {renderOrderJapanese()}
            </View>
            <View style={{ ...styles.buttonContainer, width: '90%' }}>
                <RectButton style={{ ...styles.button, backgroundColor: '#58aef5' }} onPress={initStates}>
                    <Text style={styles.buttonText}>さいしょから</Text>
                </RectButton>
                <RectButton style={isOverLine ? { ...styles.button, backgroundColor: '#73fa73' } : { ...styles.button, backgroundColor: '#D3D3D3' }} enabled={isOverLine} onPress={initNextLine}>
                    <Text style={isOverLine ? styles.buttonText : { ...styles.buttonText, color: 'white' }}>つぎのぎょう</Text>
                </RectButton>
            </View>
        </GestureHandlerRootView>
    );
}


export default ShowWordListScreen;
