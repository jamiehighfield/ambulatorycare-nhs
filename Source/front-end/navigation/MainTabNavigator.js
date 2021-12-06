import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, HeaderBackButton } from 'react-navigation'
import TabBarIcon from '../components/TabBarIcon'
import SettingsScreen from '../screens/SettingsScreen'
import SupportScreen from '../screens/SupportScreen'
import ContactScreen from '../screens/ContactScreen'
import AccountNavigator from './AccountNavigator'
import UserAccountScreen from '../screens/UserAccountScreen'
import IntakeNavigator from '../navigation/IntakeNavigator'

const MainMenuStack = createStackNavigator({
  Account: {
    screen: IntakeNavigator,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
})

MainMenuStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
  headerLeft: <HeaderBackButton />
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
})

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
}

const SupportStack = createStackNavigator({
  Support: SupportScreen
})

SupportStack.navigationOptions = {
  tabBarLabel: 'Support',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-information-circle-outline' : 'md-information-circle-outline'}
    />
  )
}

const ContactStack = createStackNavigator({
  Contact: ContactScreen
})

ContactStack.navigationOptions = {
  tabBarLabel: 'Contact',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'}
    />
  )
}

const AccountStack = createStackNavigator({
  Account: {
    screen: AccountNavigator,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
})

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-person${focused ? '' : '-outline'}`
          : 'md-person'
      }
    />
  ),
  headerLeft: <HeaderBackButton />
}

const UserAccountStack = createStackNavigator({
  UserAccount: UserAccountScreen
})

export default createBottomTabNavigator({
  MainMenuStack,
  SupportStack,
  ContactStack,
  AccountStack
})
