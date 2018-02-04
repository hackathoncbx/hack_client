import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import ProfileScreen from '../screens/ProfileScreen';
import EmergencyStack from '../stacks/EmergencyStack';
import CartographyScreen from '../screens/CartographyScreen';
import WikiScreen from '../screens/WikiScreen';

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
    Wiki: {
      screen: WikiScreen,
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let isIOS = () => { return Platform.OS === 'ios'; };
        let iconName;
        switch (routeName) {
          case 'Profile':
            iconName = isIOS() ? `ios-person${focused ? '' : '-outline'}` : 'md-information-circle';
            break;
          case 'Emergency':
            iconName = isIOS() ? `ios-pulse${focused ? '' : '-outline'}` : 'md-pulse';
            break;
          case 'Wiki':
            iconName = isIOS() ? `ios-book${focused ? '' : '-outline'}` : 'md-book';
            break;
          case 'Cartography':
            iconName = isIOS() ? `ios-map${focused ? '' : '-outline'}` : 'md-map';
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
