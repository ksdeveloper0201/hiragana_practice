import { useState } from "react";
import { Button, View } from "react-native";

type Props = {
    inputValue: any;
};

const ShowWordScreen: React.FC<Props> = ({ inputValue }) => {
    const [selected, setSeledted] = useState(false)

    const handleTextPress = () => {
        setSeledted(!selected)
    }

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
        </View>
    );
};

export default ShowWordScreen;
