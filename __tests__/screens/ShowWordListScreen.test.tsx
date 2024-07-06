import { RootStackPropsList } from '@/navigation/AppNavigator';
import ShowWordListScreen from '@/screens/ShowWordListScreen';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { lockAsync, unlockAsync } from 'expo-screen-orientation';

// Mock the ScreenOrientation module
// jest.mock('expo-screen-orientation', () => ({
//     lockAsync: jest.fn(),
//     unlockAsync: jest.fn(),
// }));

const mockRoute = {
  key: 'mockKey',
  name: 'ShowWordList' as 'ShowWordList',
  params: {
    wordList: ['あいう', 'かきく'],
    listCategory: 'order',
  },
} as RouteProp<RootStackPropsList, 'ShowWordList'>;

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  // 他の必要なメソッドをモック
};

const setup = () => {
  return render(
    <NavigationContainer>
      <ShowWordListScreen navigation={mockNavigation} route={mockRoute} />
    </NavigationContainer>
  );
};

describe('ShowWordListScreen', () => {
  it('initializes with correct letters', async () => {
    const { getByText } = setup();
    expect(getByText('こえにだしてよもう')).toBeTruthy();
  });

  it('displays words in the correct order', async () => {
    const { getByText, getAllByText } = setup();

    await waitFor(() => {
      expect(getByText('あ')).toBeTruthy();
    });
    fireEvent.press(getByText('あ'));

    await waitFor(() => {
      expect(getByText('い')).toBeTruthy();
    });
    fireEvent.press(getByText('い'));

    await waitFor(() => {
      expect(getByText('う')).toBeTruthy();
    });
  });

  it('disables "つぎ" button if line is not over', async () => {
    const { getByText, getByRole } = setup();

    expect(getByText('つぎ')).toBeTruthy();
    const nextButton = getByText('つぎ');
    console.log('nextButton color', nextButton.props.style.backgroundColor);
  });
});
