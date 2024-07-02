import { RootStackPropsList } from "@/navigation/AppNavigator";
import ShowWordScreen from "@/screens/ShowWordScreen";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

const mockRoute = {
    params: {
        inputValue: 'あいう'
    },
} as RouteProp<RootStackPropsList, 'ShowWord'>

const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
}

const setup = () => {
    return render(
        <NavigationContainer>
            <ShowWordScreen route={mockRoute} navigation={mockNavigation} />
        </NavigationContainer>
    )
}

describe('ShowWordScreen', () => {
    it('renders correctly', () => {
        const { getByText } = setup()

        expect(getByText('こえにだしてよもう')).toBeTruthy();
        expect(getByText('あ')).toBeTruthy();
        expect(getByText('い')).toBeTruthy();
        expect(getByText('う')).toBeTruthy();

    })

    it('change letter color on press', async () => {
        const { getByText } = setup()
        await waitFor(() => {
            expect(getByText('あ').props.style.color).toBe('black')
        })
        fireEvent.press(getByText('あ'))

        await waitFor(() => {
            expect(getByText('あ').props.style.color).toBe('red')
        })

    })

    it('resets selected letters when "もういちど" is pressed', async () => {
        const { getByText } = setup()

        fireEvent.press(getByText('あ'));
        await waitFor(() => {
            expect(getByText('あ').props.style.color).toBe('red')
        })
        fireEvent.press(getByText('もういちど'));

        await waitFor(() => {
            expect(getByText('あ').props.style.color).toBe('black')
        })
    })







})