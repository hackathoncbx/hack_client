import React from 'react'
import { StyleSheet } from 'react-native'
import { StackNavigator } from 'react-navigation'

import EmergencyScreen from '../screens/EmergencyScreen'
import HealthcheckScreen from '../screens/HealthcheckScreen'

const EmergencyStack = StackNavigator(
  {
    Emergency: {
      screen: EmergencyScreen
    },
    Healthcheck: {
      screen: HealthcheckScreen
    },
  },
  {
    initialRouteName: 'Emergency',
    headerMode: 'none',
  }
)

export default EmergencyStack

