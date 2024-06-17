import { Text } from "react-native";
import HeaderIcons from "../components/HeaderIcons";
import { styles } from "../styles/CommonStyles";
import { HIRAGANA_LIST, KANA_LIST } from "../enums/words-enum";

import { GestureHandlerRootView, RectButton } from "react-native-gesture-handler";


type Props = {
    navigation: any;
};

const PuzzleScreen: React.FC<Props> = ({ navigation }) => {

    return (
        <GestureHandlerRootView style={styles.container}>
            <HeaderIcons navigation={navigation} />
            <Text style={{ ...styles.title, fontSize: 36 }}>あいうえおであそぶ</Text>
            <RectButton style={styles.button} onPress={() => navigation.navigate("ShowWordList", { wordList: HIRAGANA_LIST, isRandom: false })}>
                <Text style={styles.buttonText}>あいうえお（ひらがな）</Text>
            </RectButton>
            <RectButton style={styles.button} onPress={() => navigation.navigate("ShowWordList", { wordList: KANA_LIST, isRandom: false })}>
                <Text style={styles.buttonText}>あいうえお（カタカナ）</Text>
            </RectButton>
            <RectButton style={styles.button} onPress={() => navigation.navigate("RandomPuzzle")}>
                <Text style={styles.buttonText}>ランダム（ひらがな）</Text>
            </RectButton>
            <RectButton style={styles.button} onPress={() => navigation.navigate("PrepareNumber")}>
                <Text style={styles.buttonText}>すうじ</Text>
            </RectButton>

        </GestureHandlerRootView>

    );
};


export default PuzzleScreen;
