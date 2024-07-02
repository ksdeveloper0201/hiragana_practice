import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import InputWordScreen from '../screens/InputWordScreen';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="InputWord" component={InputWordScreen} />
    </Drawer.Navigator>
  );
};
