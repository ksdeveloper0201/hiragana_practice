import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
    navigation: any;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* メニューアイコン */}
            <TouchableOpacity style={styles.menuIcon} onPress={() => console.log("Menu pressed")}>
                <MaterialCommunityIcons name="menu" size={32} color="black" />
            </TouchableOpacity>

            {/* ホームアイコン */}
            <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate("Home")}>
                <MaterialCommunityIcons name="home-circle" size={36} color="black" />
            </TouchableOpacity>

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
    menuIcon: {
        position: "absolute",
        top: 10,
        left: 10,
    },
    homeIcon: {
        position: "absolute",
        top: 10,
        right: 10,
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
