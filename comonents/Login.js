
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
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
   login: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 50, 
    padding: 30
  },
   studentNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#011D57',
    marginBottom: 20,
  },
   password: {
    fontSize:16,
    fontWeight: 'bold',
    color: '#011D57',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    fontWeight: 'bold',
    height: 40,
    backgroundColor: '#D9D9D9',
    marginBottom: 25,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    color:'white',
    width: '300%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginLeft:'auto',
    marginRight:'auto',
    
  },
buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



export default LoginPage;
