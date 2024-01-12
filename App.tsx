import * as React from 'react';
import { AppRegistry, StatusBar, StatusBarStyle } from 'react-native';
import { Provider as PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { name as appName } from './app.json';
import Router from './src/Router';
import { interceptor } from './src/adapters/interceptor';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const darktheme = {
  ...MD3DarkTheme,
  dark: true,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#FF3434',
    background: '#101010',
    onBackground: '#FFFFFF',
    card: '#242424',
    surface: '#242424',
    onSurface: '#DFDFDF',
    text: '#FFFFFF',
    error: '#D14E4E',
    border: '#000000',
    notification: '#FFC107',
    tertiary: '#1B9820',
    backdrop: '#000000B9',
  },
};

interceptor();

export default function Main() {
  const barStyle: StatusBarStyle = 'light-content';

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PaperProvider theme={darktheme}>
          <StatusBar barStyle={barStyle} backgroundColor={darktheme.colors.background} />
          <Router />
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(appName, () => Main);
