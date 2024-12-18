// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./src/Navigation/RootNavigation";

import { UserProvider } from "./src/UserContext";
// import  NotificationProvider  from "./src/context/NotificationContext";

import * as Notifications from "expo-notifications";
import { NotificationProvider } from "./src/context/NotificationContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function App() {
  return (
    <NotificationProvider>
      <UserProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </UserProvider>
    </NotificationProvider>
  );
}

export default App;
