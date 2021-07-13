import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Profile, ChannelList } from '../screens'
import { MaterialIcons } from '@expo/vector-icons'
import { ThemeContext } from 'styled-components/native'
import { useNavigation, useRoute } from '@react-navigation/native'
const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name }) => {
    const theme = useContext(ThemeContext);
    return (<MaterialIcons name={name} size={26} color={focused ? theme.tabActiveColor : theme.tabInactiveColor} />);
}

const MainTab = ({ }) => {
    const theme = useContext(ThemeContext);
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        const titles = route.state?.routeNames || ['Channels'];
        const index = route.state?.index || 0;
        navigation.setOptions({ headerTitle: titles[index] })
    }, [route])

    return (
        <Tab.Navigator
            tabBarOptions={{ activeTintColor: theme.tabActiveColor, inactiveTintColor: theme.tabInactiveColor }}
        >
            <Tab.Screen name="Channel List" component={ChannelList}
                options={{ tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={focused ? 'chat-bubble' : 'chat-bubble-outline'} /> }} />
            <Tab.Screen name="Profile" component={Profile}
                options={{ tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={focused ? 'person' : 'person-outline'} /> }} />
        </Tab.Navigator>
    );

}

export default MainTab;
