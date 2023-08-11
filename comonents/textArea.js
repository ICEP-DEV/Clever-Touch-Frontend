
import React,{useState} from "react";
import { TextInput,View ,StyleSheet} from "react-native";
import { useNavigation } from "@react-navigation/native";


function TextField (){
  const navigation = useNavigation();
  const [textarea, setTextArea] = useState('');
    return(
        <View style={styles.textAreaContainer}>
 <TextInput
      style={styles.textArea}
      underlineColorAndroid="transparent"
      placeholder="Type something"
      placeholderTextColor="grey"
      numberOfLines={11}
      multiline={true}
    />

        </View>

    )
}
export default TextField;


  const styles = StyleSheet.create({
    textAreaContainer: {
      borderColor: 'grey',
      borderWidth: 1,
      padding: 5
    },
    textArea: {
      height: 150,
      justifyContent: "flex-start",
     width:1000,
    }
  })
   
