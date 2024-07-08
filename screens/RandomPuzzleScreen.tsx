import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import HeaderIcons from '@/components/HeaderIcons';
import { styles } from '@/styles/CommonStyles';
import { HIRAGANA_JAPANESE } from '@/enums/words-enum';
import * as ScreenOrientation from 'expo-screen-orientation';
import { RectButton } from 'react-native-gesture-handler';

interface RandomPuzzleScreenProps {
  navigation: any;
}

const RandomPuzzleScreen: React.FC<RandomPuzzleScreenProps> = ({
  navigation,
}) => {
  const [selectedLetters, setSelectedLetters] = useState<{ [key: string]: boolean }>({});
  const [forSelectLetters, setForSelectLetters] = useState<string>('');
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [showingLetters, setShowingLetters] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const randomHiraganas = generateUniqueRandomHiraganas(10);
    setForSelectLetters(randomHiraganas);
    setShuffledLetters(shuffleHiraganas(randomHiraganas.split('')));
  }, []);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  useEffect(() => {
    if (shuffledLetters.length > 0) {
      const newShowingLetter = shuffledLetters[0];
      setShowingLetters(newShowingLetter);
    }
  }, [shuffledLetters]);

  const handleLetterPress = (letter: string, index: number) => {
    if (letter === showingLetters) {
      setSelectedLetters((prevState) => ({
        ...prevState,
        [`${letter}${index}`]: true,
      }));

      const updatedShuffledLetters = shuffledLetters.slice(1);
      setShuffledLetters(updatedShuffledLetters);

      if (updatedShuffledLetters.length === 0) {
        setGameOver(true);
        setShowingLetters('よくできました');
      } else {
        const newShowingLetter = updatedShuffledLetters[0];
        setShowingLetters(newShowingLetter);
      }
    }
  };

  const renderLetters = () => {
    return forSelectLetters.split('').map((letter, index) => (
      <TouchableOpacity key={index} onPress={() => handleLetterPress(letter, index)}>
        <Text
          style={
            gameOver
              ? styles.smallTitle
              : {
                ...styles.selectedLetter,
                fontSize: 40,
                marginTop: 0,
                marginBottom: 0,
                color: selectedLetters[`${letter}${index}`] ? 'red' : 'black',
              }
          }
        >
          {letter}
        </Text>
      </TouchableOpacity>
    ));
  };

  function generateUniqueRandomHiraganas(count: number): string {
    const uniqueChars: Set<string> = new Set<string>();
    while (uniqueChars.size < count) {
      const randomIndex = Math.floor(Math.random() * HIRAGANA_JAPANESE.length);
      uniqueChars.add(HIRAGANA_JAPANESE[randomIndex]);
    }
    return Array.from(uniqueChars).join('');
  }

  function shuffleHiraganas(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }

  const resetGame = () => {
    const newRandomHiraganas = generateUniqueRandomHiraganas(10);
    setForSelectLetters(newRandomHiraganas);
    setShuffledLetters(shuffleHiraganas(newRandomHiraganas.split('')));
    setSelectedLetters({});
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <HeaderIcons navigation={navigation} />
      <Text style={styles.smallTitle}>もじをさがそう</Text>
      <Text style={gameOver ? styles.gameOver : { ...styles.showWord, fontSize: 52 }}>
        {showingLetters}
      </Text>
      {!gameOver && (
        <View>
          <Text style={styles.showWord}>{renderLetters()}</Text>
        </View>
      )}
      <View style={{ flexDirection: 'row' }}>
        <RectButton style={{ ...styles.button, backgroundColor: '#58aef5' }} onPress={resetGame}>
          <Text style={styles.buttonText}>もういちど</Text>
        </RectButton>
      </View>
    </View>
  );
};

export default RandomPuzzleScreen;
