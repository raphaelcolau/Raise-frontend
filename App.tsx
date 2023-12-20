import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './src/App';

const darktheme = {
  ...MD3DarkTheme,
  dark: true,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#FF3434',
    background: '#121212',
    card: '#242424',
    text: '#FFFFFF',
    border: '#000000',
    notification: '#FFC107',
  },
  view: {
    ...MD3DarkTheme.colors,
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
