import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import UpdateHealth from '../screens/UpdateHealth/UpdateHealth';

export type stackScreens ={
  HomeScreen :undefined;
  updateHealth : undefined;
  Profile : undefined;
}

const Tab = createBottomTabNavigator<stackScreens>();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="updateHealth" component={UpdateHealth} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}