import { Button, View, StyleSheet, TouchableOpacity, Text } from "react-native";

type Props = {
    navigation: any;
};

const PuzzleScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View
            style={styles.container}
        >
            <Text style={styles.title}>あいうえおぱずる</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("InputWord")}>
                <Text style={styles.buttonText}>あいうえおじゅん</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Puzzle")}>
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
    },
    buttonText: {
        fontSize: 24
    }
});

export default PuzzleScreen;
