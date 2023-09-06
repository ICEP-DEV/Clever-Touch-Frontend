import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableHighlight,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

const ConfiguringImage = () => {
  //const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [PreviewImage, setPreviewImage] = useState(null);
  const [PreviewFileImage, setPreviewFileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      // if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
      //}
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result);

      console.log(result)
    }
  };

  // declare an overall function for the image upload
  const uploadImage = async () => {
    // setLoading(true);
    // lets check the image via condition
    if (image !== null) {
      let filename = image.uri.split("/").pop();
      let filetype = filename.split(".").pop();
      let uri = image.uri;
      // lets add a try loop to keep checking everything is in order



      try {
        // lets define some variables
        //const user = auth.currentUser;
        const response = await fetch(uri);
        const file = await response.blob();
        console.log(response);
        console.log(image);
        console.log(file);
        setPreviewFileImage(require(file))
        var imageName = image.uri.substr(image.uri.lastIndexOf("/") + 1);
        const storageRef = ref(storage, `/assets/${imageName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        /* uploadTask.on(
           "state_changed",
           (snapshot) => {
             const prog = Math.round(
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100
             );
             //setprogressImage(prog);
           },
           (err) => console.log(err),
           () => {
             getDownloadURL(uploadTask.snapshot.ref).then((url) => {
               return console.log(url);
             });
           }
         );*/
      } catch (error) {
        console.log(error);
        alert("Please Try Again");
      }
    } else {
      setLoading(false);
      if (image === null) {
        alert("Image Required");
      }
    }
  };

  return (
    <View>
      <TouchableHighlight onPress={pickImage}>
        <Text>select image</Text>
      </TouchableHighlight>

      <Button
        title="Upload image"
        style={styles.addButton}
        margin={30}
        onPress={uploadImage}
      />
      <View >
        <Image
          style={styles.tinyLogo}
          source={require('../assets/favicon.png')}
        />
      </View>
       <View>
       <Image
          style={styles.tinyLogo}
          source={{PreviewFileImage}}
        />
      </View> 
      <View>
       {/* <Image
          style={styles.tinyLogo}
          source={require({PreviewFileImage})}
        /> */}
      </View> 
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
export default ConfiguringImage;
