// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/Navigation/RootNavigation';




function App() {
  return (
        <NavigationContainer>
            <RootNavigation/>
        </NavigationContainer>
  );
}

export default App;