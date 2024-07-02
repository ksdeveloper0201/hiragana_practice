import { View, Text, Button } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PuzzleScreen from '../screens/PuzzleScreen';
import InputWordScreen from '../screens/InputWordScreen';
import ShowWordScreen from '../screens/ShowWordScreen';
import RandomPuzzleScreen from '../screens/RandomPuzzleScreen';
import MenuScreen from '../screens/MenuScreen';
import MakeListScreen from '../screens/MakeList';
import MakeListsWordsScreen from '../screens/MakeListsWords';
import ShowWordListScreen from '../screens/ShowWordListScreen';
import PrepareNumberScreen from '../screens/PrepareNumberScreen';

export type RootStackPropsList = {
  Home: undefined;
  InputWord: { inputValue: string } | undefined;
  Puzzle: undefined;
  Menu: undefined;
  ShowWord: { inputValue: string };
  RandomPuzzle: undefined;
  ShowWordList: { wordList: string[]; isRandom?: boolean };
  MakeList: undefined;
  MakeListsWords: { listId: number; listName: string };
  PrepareNumber: undefined;
  // Select: undefined;
};

export const Stack = createNativeStackNavigator<RootStackPropsList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'welcome to hiragana', headerShown: false }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ title: 'welcome to hiragana', headerShown: false }}
        />
        <Stack.Screen
          name="InputWord"
          component={InputWordScreen}
          options={{
            title: 'れんしゅうすることばをいれてね',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Puzzle"
          component={PuzzleScreen}
          options={{ title: 'こーすをせんたくしてね', headerShown: false }}
        />
        <Stack.Screen
          name="ShowWord"
          component={ShowWordScreen}
          options={{ title: 'こえにだしてみよう', headerShown: false }}
        />
        <Stack.Screen
          name="RandomPuzzle"
          component={RandomPuzzleScreen}
          options={{ title: 'もじをさがそう', headerShown: false }}
        />
        <Stack.Screen
          name="ShowWordList"
          component={ShowWordListScreen}
          options={{ title: 'もじをさがそう', headerShown: false }}
        />
        <Stack.Screen
          name="MakeList"
          component={MakeListScreen}
          options={{ title: 'リストをつくる', headerShown: false }}
        />
        <Stack.Screen
          name="MakeListsWords"
          component={MakeListsWordsScreen}
          options={{ title: 'リストに単語を保存する', headerShown: false }}
        />
        <Stack.Screen
          name="PrepareNumber"
          component={PrepareNumberScreen}
          options={{ title: '数字を用意する', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
