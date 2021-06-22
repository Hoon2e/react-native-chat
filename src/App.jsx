import React, { useState } from 'react';
import { Image, StatusBar, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { theme } from './theme';
import Navigation from './navigations';
import { images } from './utils/images';
import { ProgressProvider } from './contexts';
const cacheImages = images => {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
};

const cacheFonts = fonts => {
    return fonts.map(font => Font.loadAsync(font));
};

const App = () => {
    const [isReady, setIsReady] = useState(false);
    const _loadAssets = async () => {
        const imageAssets = cacheImages([
            require('../assets/background.png'),
            ...Object.values(images),
        ]);
        const fontAssets = cacheFonts([]);
        await Promise.all([...imageAssets, ...fontAssets]);
    };
    return isReady ? (
        <ThemeProvider theme={theme}>
            <ProgressProvider>
                <StatusBar barStyle="light-content" />
                <Navigation />
            </ProgressProvider>
        </ThemeProvider>
    ) : (
        <AppLoading
            startAsync={_loadAssets}
            onFinish={() => setIsReady(true)}
            onError={console.warn}
        />
    );
};

export default App;