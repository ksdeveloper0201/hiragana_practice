import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderIcons from "../components/HeaderIcons";

type Props = {
    navigation: any;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <HeaderIcons navigation={navigation} />

            <Text style={styles.title}>ひらがな</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("InputWord")}>
                <Text style={styles.buttonText}>こえにだしてよむ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Puzzle")}>
                <Text style={styles.buttonText}>あいうえお ぱずる</Text>
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

    title: {
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 15,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        margin: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 24,
    },
});

export default HomeScreen;
