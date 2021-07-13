import React, { useContext, useRef, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Button, Image, Input } from '../components';
import { images } from '../utils/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import { login } from '../utils/firebase';
import { ProgressContext, UserContext } from '../contexts';
const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: ${({ theme }) => theme.errorText};
`;

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.background};
    padding: 0 20px;
    padding-top: ${({ insets: { top } }) => top}px;
    padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

const Login = () => {
    const passwordRef = useRef();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const insets = useSafeAreaInsets();
    const { spinner } = useContext(ProgressContext);
    const { dispatch } = useContext(UserContext)
    useEffect(() => {
        setDisabled(!(email && password && !errorMessage));
    }, [email, password, errorMessage]);

    const _handleEmailChange = email => {
        const changedEmail = removeWhitespace(email);
        setEmail(changedEmail);
        setErrorMessage(
            validateEmail(changedEmail) ? '' : 'Please verify your email.'
        );
    };

    const _handlePasswordChange = password => {
        setPassword(removeWhitespace(password));
    };

    const _handleLoginButtonPress = async () => {
        try {
            spinner.start();
            const user = await login({ email, password });
            dispatch(user, user);
            Alert.alert('Login Success', user.email);
        } catch (e) {
            Alert.alert('Logint Error', e.message);
        } finally {
            spinner.stop();
        }
    };
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            extraScrollHeight={20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container insets={insets}>
                    <Image
                        url={images.logo}
                        imageStyle={{ borderRadius: 8, marginBottom: 10 }}
                    />
                    <Input
                        label="Email"
                        value={email}
                        onChangeText={text => _handleEmailChange(text)}
                        onSubmitEditing={() => {
                            passwordRef.current.focus();
                        }}
                        placeholder="Email"
                        returnKeyType="next"
                    />

                    <Input
                        ref={passwordRef}
                        label="Password"
                        value={password}
                        onChangeText={text => _handlePasswordChange(text)}
                        onSubmitEditing={_handleLoginButtonPress}
                        placeholder="Password"
                        returnKeyType="done"
                        isPassword
                    />
                    <ErrorText>{errorMessage}</ErrorText>
                    <Button
                        title="Login"
                        onPress={_handleLoginButtonPress}
                        disabled={disabled}
                    />
                    <Button
                        title="Sign up with email"
                        onPress={() => {
                            navigation.navigate('Signup');
                        }}
                        isFilled={false}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

export default Login;
