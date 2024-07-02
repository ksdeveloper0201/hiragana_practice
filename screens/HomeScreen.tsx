import * as React from 'react';
import { Text, View } from 'react-native';
import HeaderIcons from '../components/HeaderIcons';
import { styles } from '../styles/CommonStyles';
import { RectButton } from 'react-native-gesture-handler';

type Props = {
  navigation: any;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <HeaderIcons navigation={navigation} />
      <Text style={styles.title}>ひらがな</Text>

      <RectButton
        style={styles.button}
        onPress={() => navigation.navigate('InputWord')}
      >
        <Text style={styles.buttonText}>こえにだしてよもう</Text>
      </RectButton>

      <RectButton
        style={styles.button}
        onPress={() => navigation.navigate('Puzzle')}
      >
        <Text style={styles.buttonText}>あいうえおであそぶ</Text>
      </RectButton>

      <RectButton
        style={styles.button}
        onPress={() => navigation.navigate('MakeList')}
      >
        <Text style={styles.buttonText}>リストからあそぶ</Text>
      </RectButton>
    </View>
  );
};

export default HomeScreen;
