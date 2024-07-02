import AppNavigator from './navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // この行を追加
import React from 'react';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
};

export default App;
