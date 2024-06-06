import { Dimensions, StyleSheet } from "react-native";

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
        width: "80%",
        padding: 16,
        borderColor: "#4630eb",
        borderRadius: 4,
        borderWidth: 1,
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
    flexRow: {
        flexDirection: "row",
    },
    input: {
        borderColor: "#4630eb",
        borderRadius: 4,
        borderWidth: 1,
        flex: 1,
        height: 48,
        margin: 16,
        padding: 8,
    },
    sectionContainer: {
        marginBottom: 16,
        marginHorizontal: 16,
    },
    sectionHeading: {
        fontSize: 18,
        marginBottom: 8,
    },
    item: {
        backgroundColor: "#fff",
        padding: 8,
        margin: 8,
        marginVertical: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: Dimensions.get("window").width - 46,
        alignSelf: "center",
    },
    listArea: {
        backgroundColor: "#f0f0f0",
        flex: 1,
        paddingTop: 16,
    },
    itemText: {
        color: "#333",
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        padding: 8,
        marginVertical: 4,
    },
    deleteButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
