import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getApps, initializeApp } from "firebase/app";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Add_edit_Office from './components/Add_edit_Office';
import OfficeDetails from './components/OfficeDetails';
import OfficeList from './components/OfficeList';
import SettingsScreen from './components/SettingsScreen';
import LocationComponent from './components/LocationComponent';


export default function App() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
      apiKey: "AIzaSyBIimisdUN7nQXcUhUgJ-Nq7baeHuBeJ8U",
      authDomain: "innonytek.firebaseapp.com",
      projectId: "innonytek",
      storageBucket: "innonytek.appspot.com",
      messagingSenderId: "546596800895",
      appId: "1:546596800895:web:61d4387030e94313d7f24a",
      databaseURL: "https://innonytek-default-rtdb.europe-west1.firebasedatabase.app/"
    };
    if (getApps().length < 1) {
      initializeApp(firebaseConfig);
      console.log("Firebase On!");
      // Initialize other firebase products here
       }
  

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const StackNavigation = () => {
    return(
        <Stack.Navigator>
          <Stack.Screen name={'Office List'} component={OfficeList}/>
          <Stack.Screen name={'Office Details'} component={OfficeDetails}/>
          <Stack.Screen name={'Edit Office'} component={Add_edit_Office}/>
          <Stack.Screen name={'Settings'} component={SettingsScreen} />
          <Stack.Screen name={'Map Search'} component={LocationComponent} />
        </Stack.Navigator>
    )
  }



  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={'View Office list'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="search-outline" size={20} />),headerShown:null}}/>
        <Tab.Screen
        name={'Map Search'} // Add this line
        component={LocationComponent} // Add this line
        options={{
          tabBarIcon: () => <Ionicons name="map-outline" size={20} />, // Icon for the settings tab
        }}
      />
        <Tab.Screen name={'Add office listing'} component={Add_edit_Office} options={{tabBarIcon: () => ( <Ionicons name="add" size={20} />)}}/>
        <Tab.Screen
        name={'Settings'} // Add this line
        component={SettingsScreen} // Add this line
        options={{
          tabBarIcon: () => <Ionicons name="settings" size={20} />, // Icon for the settings tab
        }}
      />
    
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
