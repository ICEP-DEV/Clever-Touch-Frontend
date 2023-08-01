import React from 'react';
import {Text,View,StyleSheet} from 'react-native';
import {FontAwesome5,MaterialIcons,AntDesign,Entypo,SimpleLineIcons,Feather,Ionicons} from 'react-native-vector-icons';
import { useNavigation } from "@react-navigation/native";

function Notes(){
    const navigation = useNavigation();
  return(
    
    <View>
        <View style={styles.header}>
        <FontAwesome5 name="pen-nib" size={30} color="white" />
        <MaterialIcons name="text-fields" size={30} color="white"  />
        <AntDesign name="picture"  size={30} color="white"/>
        <Entypo name="link" size={30} color="white"/>
        <SimpleLineIcons name="microphone" size={30} color="white"/>
        <Feather name="save" size={30} color="white"/>
        <Ionicons name="home-outline" size={30} color="white" onPress={() => navigation.navigate("Home")} />
        </View>
  
    </View>
  
    
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