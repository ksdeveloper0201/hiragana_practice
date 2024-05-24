import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderIcons from "../components/HeaderIcons";
import { styles } from "../styles/CommonStyles";

type Props = {
    navigation: any;
};

const MenuScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <HeaderIcons navigation={navigation} />
            <Text style={styles.title}>ひらがな</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MakeWordList")}>
                <Text style={styles.buttonText}>ことばリストをつくる</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Puzzle")}>
                <Text style={styles.buttonText}>あいうえお パズル</Text>
            </TouchableOpacity>
        </View>
    );
};


export default MenuScreen;
