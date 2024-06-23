import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PrepareNumberScreen from '@/screens/PrepareNumberScreen'; // 実際のファイルパスに変更してください

// Navigationのモックを作成
const mockNavigation = {
    navigate: jest.fn(),
};

describe('PrepareNumberScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { getByText, getByPlaceholderText } = render(<PrepareNumberScreen navigation={mockNavigation} />);
        expect(getByText('いくつまでかぞえる')).toBeTruthy();
        expect(getByPlaceholderText('すうじをいれる')).toBeTruthy();
    });

    it('allows numeric input only', () => {
        const { getByPlaceholderText } = render(<PrepareNumberScreen navigation={mockNavigation} />);
        const input = getByPlaceholderText('すうじをいれる');

        fireEvent.changeText(input, '123');
        expect(input.props.value).toBe('123');

        fireEvent.changeText(input, '123a');
        expect(input.props.value).toBe('123'); // '123a'は無視される

        fireEvent.changeText(input, '');
        expect(input.props.value).toBe(''); // 空の入力は許可
    });

    it('navigates to ShowWordList with correct parameters', () => {
        const { getByText, getByPlaceholderText } = render(<PrepareNumberScreen navigation={mockNavigation} />);
        const input = getByPlaceholderText('すうじをいれる');
        const button = getByText('かぞえる');

        fireEvent.changeText(input, '15');
        fireEvent.press(button);

        expect(mockNavigation.navigate).toHaveBeenCalledWith('ShowWordList', {
            wordList: expect.any(Array), // NUMBER_xの結果が配列であることを確認
            isRandom: false,
        });
    });
});
