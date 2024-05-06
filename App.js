import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet,Dimensions, 
  Image,Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import {Ionicons} from "react-native-vector-icons";
import { useState } from 'react';
import Welcome from './screens/Welcome';
import Home from './screens/Home';
import Favorites from './screens/Favorites';
import PlaceCard from './components/PlaceCard';
import GradientBackground from './components/GradientBackground';
import Settings from './screens/Settings';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import EventDetails from './screens/EventDetails';
import PlaceDetails from './screens/PlaceDetails';
import EditProfile from './screens/EditProfile';
import AboutUs from './screens/AboutUs';
import TermsAndPolicies from './screens/TermsAndPolicies';
import ChangePassword from './screens/ChangePassword';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator()

const Tab = createBottomTabNavigator()

import TestDetails from './TestDetails';

function MainAppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline'
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: '#2F7694',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Settings" component={Settings}/>
    </Tab.Navigator>
  )
}
export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />

        <Stack.Screen name="EventDetails" 
          component={EventDetails} 
          options={{headerTransparent: true, title:'Event Details', headerTintColor: 'white'}}/>

        <Stack.Screen name="PlaceDetails" 
          component={PlaceDetails} 
          options={{headerTransparent: true, title:'Place Details', headerTintColor: 'white'}}/>

        <Stack.Screen name="MainApp" component={MainAppTabs} options={{ headerShown: false, title:'Home' }} />

        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerTransparent: true,title:'Edit Profile'}} />

        <Stack.Screen name="AboutUs" component={AboutUs} options={{title:'About Us'}} />

        <Stack.Screen name="TermsAndPolicies" component={TermsAndPolicies} options={{title:'Terms And Policies'}} />
        
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerTransparent: true, title:'Change Password'}} />

      </Stack.Navigator>
    </NavigationContainer>

    // <EditProfile2/>
    // <EditProfile/>
    // <TestDetails/>
    // <PlaceDetails/>
    // <ChangePassword/>
      
)}

const styles = StyleSheet.create({
});
