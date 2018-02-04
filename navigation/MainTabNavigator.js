import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import ProfileScreen from '../screens/ProfileScreen';
import EmergencyStack from '../stacks/EmergencyStack';
import CartographyScreen from '../screens/CartographyScreen';

export default TabNavigator(
  {
    Profile: {
      screen: ProfileScreen,
    },
    Emergency: {
      screen: EmergencyStack,
    },
    Cartography: {
      screen: CartographyScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Profile':
            iconName =
              Platform.OS === 'ios'
                ? `ios-person${focused ? '' : '-outline'}`
                : 'md-information-circle';
            break;
          case 'Emergency':
            iconName = Platform.OS === 'ios' ? `ios-pulse${focused ? '' : '-outline'}` : 'md-pulse';
            break;
          case 'Cartography':
            iconName =
              Platform.OS === 'ios' ? `ios-map${focused ? '' : '-outline'}` : 'md-map';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    initialRouteName: 'Emergency',
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
