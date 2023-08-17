import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import Login from "./comonents/Login";
import Home from "./comonents/Home";
import Notes from "./comonents/Notes";


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Group>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
         <Stack.Screen name="Notes" component={Notes} />
     
     
      </Stack.Group>
      
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});