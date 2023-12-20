import * as React from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './src/App';

const darktheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF3434',
    background: '#121212',
    card: '#242424',
    text: '#FFFFFF',
    border: '#000000',
    notification: '#FFC107',
  },
  view: {
    ...DefaultTheme.colors,
    backgroundColor: '#131313',
    color: '#FFFFFF',
  }

};

export default function Main() {
  return (
      <PaperProvider theme={darktheme}>
        <App />
      </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
