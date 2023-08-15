import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";

import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

const LoginPage = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    console.log('Logging in with:', username, password);
  };

  return (
    <View style={styles.container}>
       <Text style={styles.login}>LOGIN</Text>
       <Text style={styles.studentNumber}>STUDENT NUMBER</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Student Number"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.password}>PASSWORD</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
     
         <View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}
        title="Login">
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
    
       </View>
      
    
  );
};

const styles = StyleSheet.create({
  container: {
   marginLeft:'auto',
   marginRight:'auto',
    backgroundColor: 'white',
    width:800,
    height:800,
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    marginTop:30,
    fontFamily: 'Jockey One',
  },
   login: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 50, 
    padding: 30,
    textAlign:'center',
  },
   studentNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#011D57',
    marginBottom: 20,
    marginLeft:200,
   
  },
   password: {
    fontSize:16,
    fontWeight: 'bold',
    color: '#011D57',
    marginBottom: 20,
    marginLeft:200,
   
  },
  input: {
    width: '50%',
    fontWeight: 'bold',
    height: 40,
    backgroundColor: '#D9D9D9',
    marginBottom: 25,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft:200,
   
  },
  button: {
    backgroundColor: '#007AFF',
    color:'white',
    width: '25%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:50,
    
  },
buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
  },
});
export default LoginPage;
