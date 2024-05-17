import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    // title
    title: {
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 15,
    },
    subtitle: { fontSize: 24, fontWeight: "bold", margin: 10 },
    smallTitle: { fontSize: 20, fontWeight: "bold" },
    // button
    buttonView: {
        marginVertical: 10,
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
        paddingHorizontal: 5,
    },
    inputForm: {
        margin: 44,
        fontSize: 24,
        width: "40%",
        borderColor: "gray",
        borderStyle: "solid",
    },
    // inputword
    showWord: {
        fontSize: 58,
        margin: 24,
    },
    showWordButtonText: {
        fontSize: 20,
        paddingHorizontal: 5,
    },
    gameOver: {
        fontSize: 48,
        fontWeight: "bold",
        color: "blue",
        marginVertical: 20,
    },
});
