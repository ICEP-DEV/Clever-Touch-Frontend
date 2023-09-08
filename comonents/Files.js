import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {Ionicons,SimpleLineIcons,AntDesign,FontAwesome5} from 'react-native-vector-icons';
import { useNavigation } from "@react-navigation/native";

const Files = () => {
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
  <View style={styles.header}> 
    <View>
    <Ionicons name="home-outline" size={30} color="white" onPress={() => navigation.navigate("Home")}/>
    <Text style={styles.texticon}>Home</Text>
    </View>
      <View>
      <SimpleLineIcons name="note" size= {30} color="white" onPress={() => navigation.navigate("Notes")}/>
     <Text style={styles.texticon}>Notes</Text>
      </View>
     <View>
     <AntDesign name="file1" size= {30} color="white"/>
    <Text style={styles.texticon}>File</Text>
     </View>
     
    </View>
    
    <div style={styles.button}>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          <p>Mime Type: {selectedFile.type}</p>
          <p>File Size: {selectedFile.size} bytes</p>
        </div>
      )}
    </div>
    </View>
  );
};
const styles = StyleSheet.create({
  header:{
    backgroundColor:"#007AFF",
padding:10,
paddingTop:40,
flexDirection:'row',
   justifyContent:'space-between'
  },
  title: {
    padding: 5,
    marginBottom: 20,
    textAlign: 'center',
    alignContent: 'center',
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 30,
  },
  texticon:{
    color:'white',
  },
  button: {
    paddingTop: 20,
    paddingLeft: 20,
    alignItems: 'center',

  }

})
export default Files;
