import './Drawing.css';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Dialog } from 'react-native-paper';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, AntDesign, SimpleLineIcons, Feather, Ionicons } from 'react-native-vector-icons';
import { useNavigation } from "@react-navigation/native";

const Drawing = () => {
  const navigation = useNavigation();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState('black');
  const [brushSize, setBrushSize] = useState(null); // State for the selected brush size
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.92;
    canvas.height = window.innerHeight * 0.80;

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = selectedColor;
    context.lineWidth = brushSize; // Use the selected brush size
    contextRef.current = context;
  }, [selectedColor, brushSize]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
    nativeEvent.preventDefault();
    const prevState = contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHistory((prevHistory) => [...prevHistory, prevState]);
    setRedoHistory([]);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const setToDraw = () => {
    contextRef.current.globalCompositeOperation = 'source-over';
  };

  const setToErase = () => {
    contextRef.current.globalCompositeOperation = 'destination-out';
  };

  const saveImageToLocal = (event) => {
    let link = event.currentTarget;
    link.setAttribute('download', 'canvas.png');
    let image = canvasRef.current.toDataURL('image/png');
    link.setAttribute('href', image);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleBrushSizeChange = (size) => {
    setBrushSize(size);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
    setRedoHistory([]);
  };

  const undo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setRedoHistory((prevRedoHistory) => [...prevRedoHistory, contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)]);
      contextRef.current.putImageData(lastState, 0, 0);
      setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
    }
  };

  const redo = () => {
    if (redoHistory.length > 0) {
      const nextState = redoHistory[redoHistory.length - 1];
      setHistory((prevHistory) => [...prevHistory, contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)]);
      contextRef.current.putImageData(nextState, 0, 0);
      setRedoHistory((prevRedoHistory) => prevRedoHistory.slice(0, prevRedoHistory.length - 1));
    }
  };
  
  return (
    <div>
      <View style={styles.header}>
        <FontAwesome5 name="pen-nib" size={30} color="white" onPress={() => navigation.navigate('Drawing')} />
        <MaterialIcons name="text-fields" size={30} color="white" onPress={() => navigation.navigate('TextField')} />
        <AntDesign name="picture" size={30} color="white" onPress={() => navigation.navigate('ImagePicker')} />
        <SimpleLineIcons name="microphone" size={30} color="white" onPress={() => navigation.navigate('Recorder')} />
        <Feather name="save" size={30} color="white" onPress={() => navigation.navigate('SaveScreen')} />
        <Ionicons name="home-outline" size={30} color="white" onPress={() => navigation.navigate('Home')} />
      </View>
      <View style={styles.container}>
        <canvas
          className="canvas-container"
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        ></canvas>
        <div>
          <FontAwesome5 name="paint-brush" size={50} color="#007AFF" style={styles.butDraw} onClick={setToDraw}></FontAwesome5>
          <Text style={styles.textDraw}>DRAW</Text>
          <FontAwesome5 name="eraser" size={50} color="#007AFF" style={styles.butErase} onClick={setToErase}></FontAwesome5>
          <Text style={styles.textErase}>ERASE</Text>
          <MaterialIcons name="delete-sweep" size={50} color="#007AFF" style={styles.butClear} onClick={clearCanvas}></MaterialIcons>
          <Text style={styles.textClear}>CLEAR</Text>
          <FontAwesome5 name="undo" size={45} color="#007AFF" style={styles.butUndo} onClick={undo}></FontAwesome5>
          <Text style={styles.textUndo}>UNDO</Text>
          <FontAwesome5 name="redo" size={45} color="#007AFF" style={styles.butRedo} onClick={redo}></FontAwesome5>
          <Text style={styles.textRedo}>REDO</Text>

          <Text style={styles.bruSize}>BRUSH <br></br> SIZE</Text>
          <input
            style={styles.brSize}
            type="number"
            min="1"
            value={brushSize}
            onChange={(e) => handleBrushSizeChange(parseInt(e.target.value))}
          />
          <Text style={styles.textColor}>COLOR</Text>
          <input
            style={styles.clrChange}
            type="color"
            value={selectedColor}
            onChange={(e) => handleColorChange(e.target.value)}
          />
          <Text style={styles.textSave}>SAVE</Text>
          <FontAwesome5 name="save" size={50} color="#007AFF" style={styles.butSave} id="download_image_link" href="download_link" onClick={saveImageToLocal}>
          </FontAwesome5>
          <Dialog visible={false}>
            <Dialog.Title>Select Color</Dialog.Title>
            <Dialog.Content>
            </Dialog.Content>
          </Dialog>
        </div>
      </View>
    </div>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#007AFF",
    padding: 10,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent:'space-between'
      },
    container:{
        paddingTop: 20,
        alignContent: 'center',
        justifyContent: 'center',
    },
    butSave:{
        paddingBottom: 10,
        paddingTop: 10,
        position: 'absolute',
        marginTop: 550,
        marginRight: 10,
        top: 0,
        right:0,
    },
    textSave:{
      color:'#007AFF',
      fontWeight: 'bold',
      paddingBottom: 10,
      paddingTop: 10,
      position: 'absolute',
      marginTop: 520,
      marginRight: 15,
      top: 0,
      right:0,
  },
    butErase:{
        paddingBottom: 10,
        paddingTop: 10,
        position: 'absolute',
        marginTop: 250,
        marginLeft: 10,
        top:0,
        left:0,
    },
    textErase:{
      color:'#007AFF',
      paddingBottom: 10,
      fontWeight: 'bold',
      paddingTop: 10,
      position: 'absolute',
      marginTop: 220,
      marginLeft: 15,
      top:0,
      left:0,
    },
    butClear:{
        paddingBottom: 10,
        paddingTop: 10,
        position: 'absolute',
        marginTop: 100,
        marginRight: 10,
        top:0,
        right:0,
    },
    textClear: {
      color:'#007AFF',
      fontWeight: 'bold',
      paddingBottom: 10,
      paddingTop: 10,
      position: 'absolute',
      marginTop: 70,
      marginRight: 15,
      top: 0,
      right:0,

    },
    butDraw:{
        paddingBottom: 10,
        paddingTop: 10,
        position: 'absolute',
        marginTop: 100,
        marginLeft: 10,
        top:0,
        left:0,
    },
    textDraw:{
      color:'#007AFF',
      paddingBottom: 10,
      fontWeight: 'bold',
      paddingTop: 10,
      position: 'absolute',
      marginTop: 70,
      marginLeft: 15,
      top:0,
      left:0,
    },
    butUndo:{
        paddingBottom: 10,
        paddingTop: 10,
        position: 'absolute',
        marginTop: 250,
        marginRight: 10,
        top:0,
        right:0,
    },
    textUndo:{
      color:'#007AFF',
      fontWeight: 'bold',
      paddingBottom: 10,
      paddingTop: 10,
      position: 'absolute',
      marginTop: 220,
      marginRight: 15,
      top: 0,
      right:0,
    },
    butRedo:{
        paddingBottom: 10,
        paddingTop: 10,
        position: 'absolute',
        marginTop: 400,
        marginRight: 10,
        top: 0,
        right:0,
    },
    textRedo: {
      color:'#007AFF',
      fontWeight: 'bold',
      paddingBottom: 10,
      paddingTop: 10,
      position: 'absolute',
      marginTop: 370,
      marginRight: 15,
      top: 0,
      right:0,
    },
    brSize:{
        paddingTop: 10,
        paddingBottom: 10,
        width: 50,
        position: 'absolute',
        marginTop: 400,
        marginLeft: 10,
        backgroundColor: 'white',
        color: '#007AFF',
        borderRadius: 5,
        borderColor: '#007AFF',
        top:0,
        left:0,
        textAlign:'center',
    },
    bruSize:{
      color:'#007AFF',
      paddingBottom: 10,
      fontWeight: 'bold',
      paddingTop: 10,
      position: 'absolute',
      marginTop: 350,
      marginLeft: 15,
      top:0,
      left:0,
    },
    clrChange:{
        height: 40,
        position: 'absolute',
        marginTop: 550,
        marginLeft: 10,
        width: 55,
        top:0,
        left:0,
        borderColor: '#007AFF',
    },
    textColor:{
      color:'#007AFF',
      paddingBottom: 10,
      fontWeight: 'bold',
      paddingTop: 10,
      position: 'absolute',
      marginTop: 510,
      marginLeft: 15,
      top:0,
      left:0,
    },
    

});
export default Drawing;

