import { Button, View } from "react-native";

type Props = {
    navigation: any;
};

const InputWordScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default InputWordScreen;
