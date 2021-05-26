import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import EmergencyScreen from '../screens/EmergencyScreen';
import AddInfoScreen from '../screens/AddInfoScreen';


export const AppTabNavigator = createBottomTabNavigator({
  DonateBooks : {
    screen:  EmergencyScreen,
    navigationOptions :{
      //tabBarIcon : <Image source={require("../assets/request-list.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Emergency",
    }
  },
  BookRequest: {
    screen: AddInfoScreen,
    navigationOptions :{
     // tabBarIcon : <Image source={require("../assets/request-book.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Information",
    }
  }
});