import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { Spinner } from '../components';
import { ProgressContext } from '../contexts';
import MainStack from './MainStack';

const Navigation = () => {
    const { inProgress } = useContext(ProgressContext);
    return (
        <NavigationContainer>
            {/* <AuthStack /> */}
            <MainStack />
            {inProgress && <Spinner />}
        </NavigationContainer>
    );
};

export default Navigation;
