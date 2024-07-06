import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import HeaderIcons from '../components/HeaderIcons';
import { styles } from '../styles/CommonStyles';
import { RectButton } from 'react-native-gesture-handler';
import { NUMBER_x } from '../enums/words-enum';

type Props = {
  navigation: any;
};

const PrepareNumberScreen: React.FC<Props> = ({ navigation }) => {
  const [preparedNumber, setPreparedNumber] = useState<string>('10');
  // const [items, setItems] = useState<ItemProps[] | null>(null);

  function isNumeric(input: string) {
    const regex = /^\d+$/;
    return regex.test(input);
  }

  return (
    <View style={styles.container}>
      <HeaderIcons navigation={navigation} />
      <Text style={styles.subtitle}>いくつまでかぞえる</Text>
      <View style={styles.flexRow}>
        <TextInput
          style={styles.input}
          value={preparedNumber}
          placeholder="すうじをいれる"
          onChangeText={(text) => {
            if (isNumeric(text) || text === '') {
              setPreparedNumber(text);
            }
          }}
        />
      </View>

      <RectButton
        style={styles.button}
        onPress={() =>
          navigation.navigate('ShowWordList', {
            wordList: NUMBER_x(parseInt(preparedNumber)),
            listCategory: 'numbers',
          })
        }
      >
        <Text style={styles.buttonText}>かぞえる</Text>
      </RectButton>
    </View>
  );
};

export default PrepareNumberScreen;
