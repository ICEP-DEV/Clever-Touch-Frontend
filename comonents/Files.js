import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { useNavigation } from "@react-navigation/native";

const FilePicker = () => {
    const navigation = useNavigation();
    const [selectedFile, setSelectedFile] = useState(null);
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log(
        result.uri,
        result.type, // mime type
        result.name,
        result.size
      );

      // Save the selected file to a local path (e.g., Documents directory)
      const fileName = `selected_file_${Date.now()}.${result.name.split('.').pop()}`;
      const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      await RNFS.copyFile(result.uri, destPath);

      setSelectedFile(destPath);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User canceled the picker
      } else {
        // Handle other errors
        console.error(error);
      }
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={pickDocument}>
        <Text>Choose File</Text>
      </TouchableOpacity>
      {selectedFile && (
        <Text>Selected File: {selectedFile}</Text>
      )}
    </View>
  );
};

export default FilePicker;
