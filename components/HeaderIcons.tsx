import { TouchableOpacity, View, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
    navigation: any
}

const HeaderIcons: React.FC<Props> = ({ navigation }) => {
    return (

        <>
            {/* メニューアイコン */}
            <TouchableOpacity style={styles.menuIcon} onPress={() => console.log("Menu pressed")}>
                <MaterialCommunityIcons name="menu" size={36} color="black" />
            </TouchableOpacity>

            {/* ホームアイコン */}
            <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate("Home")}>
                <MaterialCommunityIcons name="home-circle" size={36} color="black" />
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    homeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    menuIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
}
)

export default HeaderIcons