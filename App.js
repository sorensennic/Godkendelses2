import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getApps, initializeApp } from "firebase/app";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Add_edit_Car from './components/Add_edit_Car';
import CarDetails from './components/CarDetails';
import CarList from './components/CarList';
import Ionicons from "react-native-vector-icons/Ionicons";



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
          <Stack.Screen name={'Car List'} component={CarList}/>
          <Stack.Screen name={'Car Details'} component={CarDetails}/>
          <Stack.Screen name={'Edit Car'} component={Add_edit_Car}/>
        </Stack.Navigator>
    )
  }



  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={'Home'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="home" size={20} />),headerShown:null}}/>
        <Tab.Screen name={'Add'} component={Add_edit_Car} options={{tabBarIcon: () => ( <Ionicons name="add" size={20} />)}}/>
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
