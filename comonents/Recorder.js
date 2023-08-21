import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesome5,MaterialIcons,AntDesign,Entypo,SimpleLineIcons,Feather,Ionicons} from 'react-native-vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useState, useRef } from "react";

const Recorder = () => {
  const navigation = useNavigation();
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);
  const mimeType = "audio/mp3";
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };
  const startRecording = async () => {
    setRecordingStatus("recording");
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };
  const stopRecording = () => {
    setRecordingStatus("inactive");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
  };

  return (
    <View> 
    <View>
        <View style={styles.header}>
        <FontAwesome5 name="pen-nib" size={30} color="white" />
        <MaterialIcons name="text-fields" size={30} color="white" onPress={() => navigation.navigate("TextField")} />
        <AntDesign name="picture"  size={30} color="white" onPress={() => navigation.navigate("ImagePicker")}/>
        <Entypo name="link" size={30} color="white" onPress={() => navigation.navigate("hypeLink")}/>
        <SimpleLineIcons name="microphone" size={30} color="white"/>
        <Feather name="save" size={30} color="white" onPress={() => navigation.navigate("SaveScreen")}/>
        <Ionicons name="home-outline" size={30} color="white" onPress={() => navigation.navigate("Home")} />
        </View>
  
    </View>  
     <div>
      <h2>Audio Recorder</h2>
      <main>
        <div className="audio-controls">
          {!permission ? (
            <button onClick={getMicrophonePermission} type="button">
              Get Microphone Permission
            </button>
          ) : null}
          {permission && recordingStatus === "inactive" ? (
            <button style={styles.startRec} onClick={startRecording} type="button">
              Start Recording
            </button>
          ) : null}
          {recordingStatus === "recording" ? (
            <button style={styles.stopRec} onClick={stopRecording} type="button">
              Stop Recording
            </button>
          ) : null}
        </div>
        {audio ? (
          <div style={styles.downRec} className="audio-player">
            <audio src={audio} controls></audio>
            <a download href={audio}>
              Download Recording
            </a>
          </div>
        ) : null}
      </main>
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
  startRec: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  stopRec: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  downRec: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },

});
export default Recorder;
