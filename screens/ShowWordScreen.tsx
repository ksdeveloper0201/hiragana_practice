import { RouteProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RootStackPropsList } from '../navigation/AppNavigator';
import HeaderIcons from '../components/HeaderIcons';
import { styles } from '../styles/CommonStyles';
import * as ScreenOrientation from 'expo-screen-orientation';
import { RectButton } from 'react-native-gesture-handler';

type ShowWordScreenRouteProp = RouteProp<RootStackPropsList, 'ShowWord'>;
interface ShowWordScreenProps {
  route: ShowWordScreenRouteProp;
  navigation: any;
}

const ShowWordScreen: React.FC<ShowWordScreenProps> = ({
  route,
  navigation,
}) => {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const [selectedLetters, setSelectedLetters] = useState<{
    [key: string]: boolean;
  }>({});

  const handleLetterPress = (letter: string, index: number) => {
    if (selectedLetters[`${letter}${index}`]) {
      return;
    }
    if (
      index == 0 ||
      Object.keys(selectedLetters).includes(
        `${route.params.inputValue[index - 1]}${index - 1}`
      )
    ) {
      setSelectedLetters((prevState) => ({
        ...prevState,
        [`${letter}${index}`]: !prevState[`${letter}${index}`],
      }));
    }
  };

  const renderLetters = () => {
    return route.params.inputValue.split('').map((letter, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleLetterPress(letter, index)}
      >
        <Text
          style={{
            ...styles.selectedLetter,
            color: selectedLetters[`${letter}${index}`] ? 'red' : 'black',
          }}
        >
          {letter}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <HeaderIcons navigation={navigation} />
      <Text style={styles.smallTitle}>こえにだしてよもう</Text>
      <View style={styles.showWord}>{renderLetters()}</View>
      <View style={{ ...styles.buttonContainer, width: '90%' }}>
        <RectButton
          style={{ ...styles.button, backgroundColor: '#58aef5' }}
          onPress={() => setSelectedLetters({})}
        >
          <Text style={styles.buttonText}>もういちど</Text>
        </RectButton>
        <RectButton
          style={{ ...styles.button, backgroundColor: '#73fa73' }}
          onPress={() => navigation.navigate('InputWord')}
        >
          <Text style={styles.buttonText}>つぎ</Text>
        </RectButton>
      </View>
    </View>
  );
};

export default ShowWordScreen;
