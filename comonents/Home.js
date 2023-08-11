import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import {Ionicons,SimpleLineIcons,AntDesign,FontAwesome5} from 'react-native-vector-icons';
import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";

function Home() {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime,setCurrentTime]= useState('');
  useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var Year = new Date().getFullYear();
    var Hours = new Date().getHours();
    var mins = new Date().getMinutes();
    setCurrentDate(date + '/' + month + '/' + Year + ' ');
    setCurrentTime(Hours + ':' + mins);
    
  });

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.home}>
        <View style={styles.header}> 
        <View>
        <Ionicons name="home-outline" size={30} color="white" />
        <Text style={styles.texticon}>Home</Text>
        </View>
          <View>
          <SimpleLineIcons name="note" size= {30} color="white" onPress={() => navigation.navigate("Notes")}
        title="Homes"/>
         <Text style={styles.texticon}>Notes</Text>
          </View>
         <View>

         <AntDesign name="file1" size= {30} color="white"/>
        <Text style={styles.texticon}>File</Text>
         </View>
         
        </View>
        <Text style={styles.logo}>
          {' '}
          <FontAwesome5 name="pen" size={50} /> {'\n'} SmartNote
        </Text>

        <View>
          <Text style={styles.clock}>{currentTime} </Text>
     
        </View>
        <View>
          <Text style={styles.date}> {currentDate} </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // SafeAreaView on Android devices
    paddingTop: Constants.statusBarHeight,
  },
  logo: {
    color: '#011D57',
    marginTop: 250,
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  clock: {
    color: '#007AFF',
    marginTop: 200,
    fontSize: 50,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: "right" ,
  },
  date: {
    color: '#007AFF',
    fontSize: 50,
    fontWeight: 'bold',
    textTransform: 'uppercase',
     textAlign: "right" ,
  },

  home: {
    color: '#7339ac',
    backgroundColor: 'white',
  },
  header:{
    backgroundColor:"#007AFF",
padding:10,
paddingTop:40,
flexDirection:'row',
   justifyContent:'space-between'
  },
  texticon:{
    color:'white',
  }
});

export default Home;
