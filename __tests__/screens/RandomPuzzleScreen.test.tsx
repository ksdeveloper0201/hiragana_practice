import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RandomPuzzleScreen from '@/screens/RandomPuzzleScreen';
import { HIRAGANA_LIST, KANA_LIST } from '@/enums/words-enum';

describe('PuzzleScreen', () => {
  const mockNavigation = { navigate: jest.fn() };

  it('正しく描画されているか', () => {
    const { getByText } = render(
      <RandomPuzzleScreen navigation={mockNavigation} />
    );

    expect(getByText('もじをさがそう')).toBeTruthy();
    expect(getByText('もういちど')).toBeTruthy();
  });

  it('もういちどボタンを押すとリセットメソッドが実行されること', async () => {
    const { getByText, getByRole } = render(
      <RandomPuzzleScreen navigation={mockNavigation} />
    );

    const resetButton = getByText('もういちど');
    fireEvent.press(resetButton);

    await waitFor(() => {
      const showingLetters = getByText(/もじをさがそう/);
      expect(showingLetters).toBeTruthy();
    });
  });
});
