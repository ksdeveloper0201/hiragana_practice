import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import HeaderIcons from "../components/HeaderIcons";
import { styles } from "../styles/CommonStyles";
import { HIRAGANA_LIST, KANA_LIST } from "../enums/words-enum";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from "react";
import { GestureHandlerRootView, RectButton } from "react-native-gesture-handler";


type Props = {
    navigation: any;
};

const PuzzleScreen: React.FC<Props> = ({ navigation }) => {

    return (
        <GestureHandlerRootView style={styles.container}>
            <HeaderIcons navigation={navigation} />
            <Text style={styles.title}>あいうえお パズル</Text>
            <RectButton style={styles.button} onPress={() => navigation.navigate("ShowWordList", { wordList: HIRAGANA_LIST })}>
                <Text style={styles.buttonText}>あいうえお（ひらがな）</Text>
            </RectButton>
            <RectButton style={styles.button} onPress={() => navigation.navigate("ShowWordList", { wordList: KANA_LIST })}>
                <Text style={styles.buttonText}>あいうえお（カタカナ）</Text>
            </RectButton>
            <RectButton style={styles.button} onPress={() => navigation.navigate("RandomPuzzle")}>
                <Text style={styles.buttonText}>らんだむ</Text>
            </RectButton>

        </GestureHandlerRootView>

    );
};


export default PuzzleScreen;
