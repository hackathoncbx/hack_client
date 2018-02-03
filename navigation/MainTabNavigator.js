import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import ProfileScreen from '../screens/ProfileScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default TabNavigator(
  {
    Profile: {
      screen: ProfileScreen,
    },
    Emergency: {
      screen: EmergencyScreen,
    },
    Settings: {
      screen: SettingsScreen,
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
          case 'Settings':
            iconName =
              Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options';
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
