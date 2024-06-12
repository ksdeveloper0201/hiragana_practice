import { TouchableOpacity, View, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
    navigation: any
}

const HeaderIcons: React.FC<Props> = ({ navigation }) => {
    return (

        <>
            {/* メニューアイコン */}
            <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons name='arrow-left' size={48} color="black" />
            </TouchableOpacity>

            {/* ホームアイコン */}
            <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate("Home")}>
                <MaterialCommunityIcons name="home-circle" size={48} color="black" />
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    homeIcon: {
        position: 'absolute',
        top: 40,
        right: 32,
    },
    menuIcon: {
        position: 'absolute',
        top: 40,
        left: 32,
    },
}
)

export default HeaderIcons