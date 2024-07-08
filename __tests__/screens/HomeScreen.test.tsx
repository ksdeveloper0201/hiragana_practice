import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '@/screens/HomeScreen'; // HomeScreenのパスに合わせて変更してください
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PrepareNumberScreen from '@/screens/PrepareNumberScreen';

describe('HomeScreen', () => {
  const navigation = {
    navigate: jest.fn(),
  };

  it('renders correctly', () => {
    const { getByText } = render(<HomeScreen navigation={navigation} />);
    expect(getByText('ひらがな')).toBeTruthy();
    expect(getByText('こえにだしてよもう')).toBeTruthy();
    expect(getByText('ひらがなであそぶ')).toBeTruthy();
    expect(getByText('すうじであそぶ')).toBeTruthy();
    expect(getByText('リストからあそぶ')).toBeTruthy();
  });

  it("navigates to InputWord screen when 'こえにだしてよもう' button is pressed", () => {
    const { getByText } = render(<HomeScreen navigation={navigation} />);
    fireEvent.press(getByText('こえにだしてよもう'));
    expect(navigation.navigate).toHaveBeenCalledWith('InputWord');
  });

  it("navigates to Puzzle screen when 'ひらがなであそぶ' button is pressed", () => {
    const { getByText } = render(<HomeScreen navigation={navigation} />);
    fireEvent.press(getByText('ひらがなであそぶ'));
    expect(navigation.navigate).toHaveBeenCalledWith('Puzzle');
  });

  it("navigates to MakeList screen when 'すうじであそぶ' button is pressed", () => {
    const { getByText } = render(<HomeScreen navigation={navigation} />);

    fireEvent.press(getByText('すうじであそぶ'));
    expect(navigation.navigate).toHaveBeenCalledWith('PrepareNumber');
  });

  it("navigates to MakeList screen when 'リストからあそぶ' button is pressed", () => {
    const { getByText } = render(<HomeScreen navigation={navigation} />);
    fireEvent.press(getByText('リストからあそぶ'));
    expect(navigation.navigate).toHaveBeenCalledWith('MakeList');
  });


});
