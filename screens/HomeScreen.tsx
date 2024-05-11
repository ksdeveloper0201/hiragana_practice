import * as React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



type Props = {
    navigation: any;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <>
            <View>
                <TouchableOpacity onPress={navigation.navigate("Home")}>
                    <MaterialCommunityIcons style={styles.leftIconContainer} name="home-circle" size={36} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={navigation.navigate("Home")}>
                    <MaterialCommunityIcons style={styles.rightIconContainer} name="microsoft-xbox-controller-menu" size={36} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>ひらがな</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("InputWord")}>
                    <Text style={styles.buttonText}>こえにだしてよむ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Puzzle")}>
                    <Text style={styles.buttonText}>あいうえお ぱずる</Text>
                </TouchableOpacity>
            </View>
        </>

    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    rightIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    leftIconContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    title: { fontSize: 36, fontWeight: "bold", marginBottom: 15 },
    buttonView: {
        marginVertical: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        margin: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 25
    },
    buttonText: {
        fontSize: 24
    }
});

export default HomeScreen;
