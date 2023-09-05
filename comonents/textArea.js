import React, { useState } from "react";
import { Text, View,TextInput, StyleSheet } from "react-native";
import { FontAwesome5, MaterialIcons, AntDesign, Entypo, SimpleLineIcons, Feather, Ionicons } from 'react-native-vector-icons';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './textField.css'
import { useNavigation } from "@react-navigation/native";
import NavBar from './navbar';


function TextField() {
  const navigation = useNavigation();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )

  return (
    <View>
    <View>
<NavBar/>
      </View>

      <TextInput
        style={styles.noteTitle}
        placeholder="Enter Notes Title"
       // value={noteTitle}
        //onChangeText={setTitle}
      />
      <div className="textField">
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            options: ['inline', 'fontSize', 'colorPicker', 'emoji', 'fontFamily', 'history']
          }}
        />
      </div>
    </View>
  )
}
export default TextField;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#007AFF",
    padding: 10,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textTitle: {
    padding: 5,
    marginBottom: 10,
    textAlign: 'center',
    alignContent: 'center',
  },
  noteTitle: {
    width: '50%',
    fontWeight: 'bold',
    height: 40,
    color: 'grey',
    backgroundColor: '#D9D9D9',
    marginBottom: 25,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft:20,
    
  },
})