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
            <Text style={styles.title}>あいうえお ぱずる</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("JapaneseOrder")}>
                <Text style={styles.buttonText}>あいうえお じゅん</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("RandomPuzzle")}>
                <Text style={styles.buttonText}>らんだむ</Text>
            </TouchableOpacity>

        </View>

    );
};


export default PuzzleScreen;
