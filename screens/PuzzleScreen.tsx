import { Button, View } from "react-native";

type Props = {
    navigation: any;
};

const PuzzleScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Button
                title="あいうえおじゅん"
                onPress={() => navigation.navigate("InputWord")}
            />
            <Button
                title="らんだむ"
                onPress={() => navigation.navigate("Puzzle")}
            />
        </View>
    );
};

export default PuzzleScreen;
