import React from 'react'
import { StyleSheet } from 'react-native'
import { StackNavigator } from 'react-navigation'

import BodyPartsScreen from '../screens/BodyPartsScreen'
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
    BodyParts: {
      screen: BodyPartsScreen
    }
  },
  {
    initialRouteName: 'Emergency',
    headerMode: 'none',
  }
)

export default EmergencyStack

