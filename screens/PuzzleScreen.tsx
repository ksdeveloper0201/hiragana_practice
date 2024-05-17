import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import HeaderIcons from "../components/HeaderIcons";
import { styles } from "../styles/CommonStyles";

type Props = {
    navigation: any;
};

const PuzzleScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <HeaderIcons navigation={navigation} />
            <Text style={styles.title}>あいうえお パズル</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("JapaneseOrder", { isKana: false })}>
                <Text style={styles.buttonText}>あいうえお（ひらがな）</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("JapaneseOrder", { isKana: true })}>
                <Text style={styles.buttonText}>あいうえお（カタカナ）</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("RandomPuzzle")}>
                <Text style={styles.buttonText}>らんだむ</Text>
            </TouchableOpacity>

        </View>

    );
};


export default PuzzleScreen;
