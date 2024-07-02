import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InputWordScreen from '@/screens/InputWordScreen'; // パスを適切に変更してください
import HeaderIcons from '@/components/HeaderIcons';

jest.mock('@/components/HeaderIcons', () => {
  return jest.fn(() => null);
});

const mockNavigation = {
  navigate: jest.fn(),
  addListener: jest.fn((event, callback) => {
    if (event === 'blur') {
      callback();
    }
    return jest.fn();
  }),
};

describe('InputWordScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('ただしく描画されているか', () => {
    const { getByPlaceholderText, getByText } = render(
      <InputWordScreen navigation={mockNavigation} />
    );

    expect(getByText('こえにだしてよもう')).toBeTruthy();
    expect(getByPlaceholderText('ひらがな')).toBeTruthy();
    expect(getByText('けってい')).toBeTruthy();
  });

  it('Input要素へ値を入力する', () => {
    const { getByPlaceholderText } = render(
      <InputWordScreen navigation={mockNavigation} />
    );

    const input = getByPlaceholderText('ひらがな');
    fireEvent.changeText(input, 'テスト');

    expect(input.props.value).toBe('テスト');
  });

  it('ShowWord screenに遷移し、値を渡せる', () => {
    const { getByPlaceholderText, getByText } = render(
      <InputWordScreen navigation={mockNavigation} />
    );

    const input = getByPlaceholderText('ひらがな');
    fireEvent.changeText(input, 'テスト');

    const button = getByText('けってい');
    fireEvent.press(button);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('ShowWord', {
      inputValue: 'テスト',
    });
  });

  it('値が空の場合でもShowWord screenに遷移し、値を渡せる', () => {
    const { getByText } = render(
      <InputWordScreen navigation={mockNavigation} />
    );

    const button = getByText('けってい');
    fireEvent.press(button);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('ShowWord', {
      inputValue: 'ひらがな',
    });
  });

  it('clears input value when screen blurs', () => {
    const { getByPlaceholderText } = render(
      <InputWordScreen navigation={mockNavigation} />
    );

    const input = getByPlaceholderText('ひらがな');
    fireEvent.changeText(input, 'テスト');

    mockNavigation.addListener.mock.calls[0][1]();

    expect(input.props.value).toBe('');
  });
});
