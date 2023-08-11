
import React from "react";
import { Text ,View,StyleSheet} from "react-native";
import {AntDesign,Ionicons,MaterialIcons,Fontisto} from  'react-native-vector-icons';
import { useNavigation } from "@react-navigation/native";

function SaveScreen (){
  
    const navigation = useNavigation();
    return(
        <View style={styles.container} >
<View style={styles.nav}>
    <View >
    <AntDesign name="left" size={30}  color="#007AFF" onPress={() => navigation.navigate("Notes")}/>
<Text >back</Text>
    </View>
    

<Ionicons name="home-outline" size={30} color="#007AFF" onPress={() => navigation.navigate("Home")}/>
</View>

<View> 
</View> 

<View style={styles.maincontent}>
<MaterialIcons name="save-alt"  size ={30}  color="#007AFF"/> <Text>Save</Text>

<AntDesign name="save" size ={30}  color="#007AFF" />
<Text>Save As</Text>
<Fontisto name="onedrive"  size ={30}  color="#007AFF" />
<Text>OneDrive</Text>
<Fontisto name="onenote" size ={30}  color="#007AFF" />
<Text>OneNote</Text>
</View>




</View>

    )
}

const styles = StyleSheet.create({
    nav:{
        
        padding:10,
        paddingTop:40,
        flexDirection:'row',
        justifyContent:'space-between'  
    },
maincontent:
{

marginLeft:30,
fontSize:17,

},
container:
{
backgroundColor:'white',
}
})
export default SaveScreen ;

