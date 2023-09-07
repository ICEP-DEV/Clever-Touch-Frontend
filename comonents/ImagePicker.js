import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {FontAwesome5,MaterialIcons,AntDesign,Entypo,SimpleLineIcons,Feather,Ionicons} from 'react-native-vector-icons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native";


const ImagePicker = () => {
  const [filePath, setFilePath] = useState(null);
  const navigation = useNavigation();
  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 4500,
      maxHeight: 3000,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled image picker');
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
      } else {
        console.log('uri -> ', response.uri);
        setFilePath(response.uri);
      }
    });
  };

  const viewImage = () => {
    // Implement the functionality to view the image in a larger size here
    // For example, you could navigate to a new screen that displays the image in a full-screen view
    // You'll need to implement the navigation and screen for this purpose.
  };

  return (
    
     <View>
          <View>
        <View style={styles.header}>
        <FontAwesome5 name="pen-nib" size={30} color="white" onPress={()=> navigation.navigate("Drawing")}/>
        <MaterialIcons name="text-fields" size={30} color="white" onPress={() => navigation.navigate("TextField")} />
        <AntDesign name="picture"  size={30} color="white" onPress={() => navigation.navigate("ImagePicker")}/>
        <SimpleLineIcons name="microphone" size={30} color="white" onPress={() => navigation.navigate("Recorder")}/>
        <Feather name="save" size={30} color="white" onPress={() => navigation.navigate("SaveScreen")}/>
        <Ionicons name="home-outline" size={30} color="white" onPress={() => navigation.navigate("Home")} />
        </View>
    </View>  
    <View style={styles.container}>
        <Text style={styles.titleText}>Select Image</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}>Choose Image</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {filePath && <Image source={{ uri: filePath }} style={styles.imageStyle} />}
        </View>
        {filePath && (
          <TouchableOpacity style={styles.viewButton} onPress={viewImage}>
            <Text style={styles.viewButtonText}>View Image</Text>
          </TouchableOpacity>
        )}
        </View>
      </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header:{
    backgroundColor:"#007AFF",
    padding:10,
    paddingTop:40,
    flexDirection:'row',
    justifyContent:'space-between'
    },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    color: '#007AFF',
  },
  textStyle: {
    padding: 10,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50%',
    backgroundColor: '#f2f2f2',
    marginBottom: 20,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  viewButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    position: 'absolute',
  },
  viewButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
