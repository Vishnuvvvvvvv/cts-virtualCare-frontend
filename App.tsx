// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./src/Navigation/RootNavigation";

import { UserProvider } from "./src/UserContext";

function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
