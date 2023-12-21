import * as React from 'react';
import { AppRegistry, StatusBar, StatusBarStyle } from 'react-native';
import { Provider as PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './src/App';

const darktheme = {
  ...MD3DarkTheme,
  dark: true,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#FF3434',
    background: '#101010',
    card: '#242424',
    surface: '#242424',
    onSurface: '#DFDFDF',
    text: '#FFFFFF',
    error: '#CF6679',
    border: '#000000',
    notification: '#FFC107',
  },
};

export default function Main() {
  const barStyle: StatusBarStyle = 'light-content';

  return (
      <PaperProvider theme={darktheme}>
        <StatusBar barStyle={barStyle} backgroundColor={darktheme.colors.background} />
        <App />
      </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
