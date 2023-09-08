import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {FontAwesome5,MaterialIcons,AntDesign,Entypo,SimpleLineIcons,Feather,Ionicons} from 'react-native-vector-icons';
import { useNavigation } from "@react-navigation/native";


const ImagePicker = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigation = useNavigation();
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      console.log(
        file.name, // file name
        file.type, // mime type
        file.size // file size
      );

      setSelectedFile(file);

      // Create a URL for previewing the selected file
      const fileURL = URL.createObjectURL(file);
      setPreviewURL(fileURL);
    }
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
        <div>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && ( 
        <div>
          {/* <p>Selected File: {selectedFile.name}</p>
          <p>Mime Type: {selectedFile.type}</p>
          <p>File Size: {selectedFile.size} bytes</p> */}
        </div>
      )}
      {previewURL && (
        <div style={styles.imageContainer}>
          <p>Preview:</p>
          <img src={previewURL} alt="Selected File Preview" style={{ maxWidth: '900px', maxHeight: '550px' }} />
        </div>
      )}
    </div>
      </View>
      </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
    color: '#007AFF',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageContainer: {
    width: '80%',
    height: '40%',
    backgroundColor: '#f2f2f2',
    alignContent: 'center',
    alignItems: 'center',
  },
  
});
