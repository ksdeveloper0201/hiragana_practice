import * as React from "react";
import { StyleSheet, View, Text, Button } from "react-native";


type Props = {
    navigation: any;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View
            style={styles.container}
        >
            <Text style={{ fontSize: 32, fontWeight: "bold" }}>ひらがな</Text>
            <View style={styles.buttonView}>
                <Button
                    title="こえにだしてよむ"
                    onPress={() => navigation.navigate("InputWord")}
                />
            </View>
            <View style={styles.buttonView}>
                <Button
                    title="あいうえお ぱずる"
                    onPress={() => navigation.navigate("Puzzle")}
                />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonView: {
        marginVertical: 10
    },
    button: {
        fontSize: 24,
    }
});

export default HomeScreen;
