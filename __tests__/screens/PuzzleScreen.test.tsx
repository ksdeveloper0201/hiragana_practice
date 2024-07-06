import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PuzzleScreen from '@/screens/PuzzleScreen';
import { HIRAGANA_LIST, KANA_LIST } from '@/enums/words-enum';

describe('PuzzleScreen', () => {
  const mockNavigation = { navigate: jest.fn() };

  it('正しく描画されているか', () => {
    const { getByText } = render(<PuzzleScreen navigation={mockNavigation} />);

    expect(getByText('あいうえおであそぶ')).toBeTruthy();
    expect(getByText('あいうえお（ひらがな）')).toBeTruthy();
    expect(getByText('あいうえお（カタカナ）')).toBeTruthy();
    expect(getByText('ランダム（ひらがな）')).toBeTruthy();
    expect(getByText('すうじ')).toBeTruthy();
  });

  it('あいうえお（ひらがな）ボタンを押下', () => {
    const { getByText } = render(<PuzzleScreen navigation={mockNavigation} />);

    fireEvent.press(getByText('あいうえお（ひらがな）'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ShowWordList', {
      wordList: HIRAGANA_LIST,
      listCategory: 'order',

    });
  });

  it('あいうえお（カタカナ）ボタンを押下', () => {
    const { getByText } = render(<PuzzleScreen navigation={mockNavigation} />);

    fireEvent.press(getByText('あいうえお（カタカナ）'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ShowWordList', {
      wordList: KANA_LIST,
      listCategory: 'order',

    });
  });

  it('ランダム（ひらがな）ボタンを押下', () => {
    const { getByText } = render(<PuzzleScreen navigation={mockNavigation} />);

    fireEvent.press(getByText('ランダム（ひらがな）'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('RandomPuzzle');
  });

  it('すうじボタンを押下', () => {
    const { getByText } = render(<PuzzleScreen navigation={mockNavigation} />);

    fireEvent.press(getByText('すうじ'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('PrepareNumber');
  });
});
