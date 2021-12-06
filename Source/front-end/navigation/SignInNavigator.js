import React from 'react'
import { Button } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import IntroScreen from '../screens/intro/IntroScreen'
import SignInScreen from '../screens/account/signin/SignInScreen'
import Step1PatientVerificationScreen from '../screens/account/registration/Step1PatientVerificationScreen'
import Step2UsernamePasswordScreen from '../screens/account/registration/Step2UsernamePasswordScreen'

// This acts as a stack navigator so there can be multiple screens within the single tab screen.
export default createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    header: null
  },
  Intro: {
    screen: IntroScreen,
    header: null
  },
  Step1PatientVerification: {
    screen: Step1PatientVerificationScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Patient Verification',
      headerLeft: (
        <Button title='Cancel' onPress={() => {
          // Go back to the previous screen.
          navigation.goBack()
        }} />
      )
    })
  },
  Step2UsernamePassword: {
    screen: Step2UsernamePasswordScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Patient Verification',
      headerLeft: (
        <Button title='Cancel' onPress={() => {
          // Go back to the previous screen.
          navigation.goBack()
        }} />
      )
    })
  }
})
