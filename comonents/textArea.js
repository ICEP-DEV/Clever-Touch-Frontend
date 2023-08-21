import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import {FontAwesome5,MaterialIcons,AntDesign,Entypo,SimpleLineIcons,Feather,Ionicons} from 'react-native-vector-icons';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './textField.css'
import { useNavigation } from "@react-navigation/native";


function TextField() {
const navigation = useNavigation();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )

  return (
    <View>
    <View style={styles.header}>
    <FontAwesome5 name="pen-nib" size={30} color="white" />
    <MaterialIcons name="text-fields" size={30} color="white" onPress={() => navigation.navigate("TextField")} />
    <AntDesign name="picture"  size={30} color="white" onPress={() => navigation.navigate("ImagePicker")}/>
    <Entypo name="link" size={30} color="white" onPress={() => navigation.navigate("hypeLink")}/>
    <SimpleLineIcons name="microphone" size={30} color="white" onPress={() => navigation.navigate("Recorder")}/>
    <Feather name="save" size={30} color="white" onPress={() => navigation.navigate("SaveScreen")}/>
    <Ionicons name="home-outline" size={30} color="white" onPress={() => navigation.navigate("Home")} />
    </View>

    <div className="textField">
    <Editor
  editorState={editorState}
  onEditorStateChange={setEditorState}
  wrapperClassName="wrapper-class"
  editorClassName="editor-class"
  toolbarClassName="toolbar-class"
  toolbar={{
    options: ['inline' , 'fontSize' , 'colorPicker', 'emoji', 'fontFamily', 'history']
  }}
/>
    </div>
    </View>
  )
}
export default TextField;

const styles = StyleSheet.create({
    header:{
        backgroundColor:"#007AFF",
        padding:10,
        paddingTop:40,
        flexDirection:'row',
         justifyContent:'space-between'
        },   
})