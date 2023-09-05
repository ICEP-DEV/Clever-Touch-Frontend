import React from 'react';
import {Text,View,StyleSheet} from 'react-native';
import {FontAwesome5,MaterialIcons,AntDesign,Entypo,SimpleLineIcons,Feather,Ionicons} from 'react-native-vector-icons';
import { useNavigation } from "@react-navigation/native";
import NavBar from './navbar';


function Notes(){
    const navigation = useNavigation();
  return(
  
    <NavBar></NavBar>
  );

}
const styles = StyleSheet.create({
    header:{
        backgroundColor:"#007AFF",
    padding:10,
    paddingTop:40,
    flexDirection:'row',
       justifyContent:'space-between'
      },
});
export default Notes;