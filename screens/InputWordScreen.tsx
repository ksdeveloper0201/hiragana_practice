import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import HeaderIcons from '../components/HeaderIcons';
import { styles } from '../styles/CommonStyles';
import { RectButton } from 'react-native-gesture-handler';

type Props = {
  navigation: any | undefined;
};

const InputWordScreen: React.FC<Props> = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setInputValue('');
    });
    return unsubscribe;
  }, [navigation]);

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  return (
    <View style={styles.container}>
      <HeaderIcons navigation={navigation} />
      <Text style={styles.subtitle}>こえにだしてよもう</Text>
      <TextInput
        placeholder="ひらがな"
        value={inputValue}
        onChangeText={handleInputChange}
        style={styles.inputForm}
      ></TextInput>
      <RectButton
        style={styles.button}
        onPress={() => {
          navigation.navigate('ShowWord', {
            inputValue: inputValue !== '' ? inputValue : 'ひらがな',
          });
        }}
      >
        <Text style={styles.buttonText}>けってい</Text>
      </RectButton>
    </View>
  );
};

export default InputWordScreen;
