import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { FontAwesome5, MaterialIcons, AntDesign, SimpleLineIcons, Feather, Ionicons } from 'react-native-vector-icons';
import { useNavigation } from "@react-navigation/native";

const Recorder = () => {
  const navigation = useNavigation();
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);
  const mimeType = "audio/mp3";
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [recordings, setRecordings] = useState([]); // Added state for recordings

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
      setRecordings([...recordings, audioUrl]); // Add the recording URL to the list
    };
  };

  const downloadRecording = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.mp3";
    a.click();
  };

  return (
    <View>
      <View>
        <View style={styles.header}>
          <FontAwesome5 name="pen-nib" size={30} color="white" onPress={() => navigation.navigate("Drawing")} />
          <MaterialIcons name="text-fields" size={30} color="white" onPress={() => navigation.navigate("TextField")} />
          <AntDesign name="picture" size={30} color="white" onPress={() => navigation.navigate("ImagePicker")} />
          <SimpleLineIcons name="microphone" size={30} color="white" />
          <Feather name="save" size={30} color="white" onPress={() => navigation.navigate("SaveScreen")} />
          <Ionicons name="home-outline" size={30} color="white" onPress={() => navigation.navigate("Home")} />
        </View>
      </View>
      <View>
        <Text style={styles.title}>Voice Recorder</Text>
        {!permission ? (
          <button style={styles.perm} onClick={getMicrophonePermission} type="button">
            Get Microphone
          </button>
        ) : null}
        <View>
          {permission && recordingStatus === "inactive" ? (
            <button style={styles.startRec} onClick={startRecording} type="button">
              Start Recording
            </button>
          ) : null}
        </View>
        <View>
          {recordingStatus === "recording" ? (
            <button style={styles.stopRec} onClick={stopRecording} type="button">
              Stop Recording
            </button>
          ) : null}
        </View>
        <View>
          {audio ? (
            <button style={styles.saveRec} className="audio-player">
              <audio src={audio} controls></audio>
              <div>
                <li>
                  Play Record
                </li>
                {/* <button style={styles.download} onClick={() => downloadRecording(audio)}>
                  Download
                </button> */}
              </div>
            </button>
          ) : null}
        </View>
        <View>
          <h3 style={styles.recListHeader}>Recordings</h3>
          <ul>
            {recordings.map((recording, index) => (
              <Text key={index}>
                <button style={styles.downRec} onClick={() => downloadRecording(recording)}>Download Recording {index + 1}</button> <br>
                </br> <br>
                </br> <br>
                </br> 
              </Text>
            ))}
          </ul>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#007AFF",
    padding: 10,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  recListHeader: {
    padding: 5,
    textAlign: 'center',
    alignContent: 'center',
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 25,
  },
  downRec: {
    
    right: 100,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 4,
    color: 'white',
    marginVertical: 10,
    width: 200,
    left: 200,
    border: 'none',
  },
  perm: {
    border: 'none',
    color: 'blue',
  },
  startRec: {
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#DDDDDD',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: 'none',
    color: 'green',
    width: 300,
  },
  stopRec: {
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#DDDDDD',
    padding: 10,
    border: 'none',
    color: 'red',
    width: 300,
  },
  saveRec: {
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    padding: 10,
    border: 'none',
    width: 300,
  },
  download: {
    marginTop: 30,
    padding: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
});

export default Recorder;
