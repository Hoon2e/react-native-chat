import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native'


const Container = styled.View`
    flex:1;
    background-color: ${({ theme }) => theme.background};
`;

const Channel = () => {
    return (
        <Container>
            <Text style={{ fontSize: 24 }}>Channel</Text>
        </Container>
    )
}

export default Channel;
