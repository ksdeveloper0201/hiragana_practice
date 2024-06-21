import "react-native-gesture-handler/jestSetup";

// Mocking dependencies
jest.mock("react-native-gesture-handler", () => {
    const gestureHandler = jest.requireActual("react-native-gesture-handler");
    return {
        ...gestureHandler,
        GestureHandlerRootView: jest.fn((props) => {
            return <div {...props} />;
        }),
    };
});
