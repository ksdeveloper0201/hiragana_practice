import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

type Props = {
    navigation: any;
};

const PuzzleScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View
            style={styles.container}
        >
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: { fontSize: 32, fontWeight: "bold", marginBottom: 15 },
    buttonView: {
        marginVertical: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin: 10,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 24
    }
});

export default PuzzleScreen;
