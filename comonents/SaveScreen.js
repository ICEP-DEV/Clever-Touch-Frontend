
import React from "react";
import { Text ,View,StyleSheet} from "react-native";
import {AntDesign,Ionicons,MaterialIcons,Fontisto} from  'react-native-vector-icons';
import { useNavigation } from "@react-navigation/native";

function SaveScreen() {

    const navigation = useNavigation();
    return (
        <View style={styles.container} >
            <View style={styles.nav}>
                <View >
                    <AntDesign name="left" size={30} color="white" onPress={() => navigation.navigate("Notes")}><Text style={styles.nav_text}> back</Text></AntDesign>

                </View>


                <Ionicons name="home-outline" size={30} color="white" onPress={() => navigation.navigate("Home")} />
            </View>

            <View>
            </View>

            <View style={styles.maincontent}>
                <MaterialIcons name="save-alt" size={30} color="#007AFF"> <Text style={styles.text}>SAVE</Text></MaterialIcons>

                <AntDesign name="save" size={30} color="#007AFF" > <Text style={styles.text}> SAVE AS</Text></AntDesign>

                <Fontisto name="onedrive" size={30} color="#007AFF" ><Text style={styles.text}> OneDrive</Text></Fontisto>

                <Fontisto name="onenote" size={30} color="#007AFF" ><Text style={styles.text}> OneNote</Text></Fontisto>

            </View>




        </View>

    )
}

const styles = StyleSheet.create({
    nav: {

        padding: 10,
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        backgroundColor: '#007AFF'
    },
    maincontent:
    {

        marginLeft: 30,
        fontSize: 17,
        justifyContent: 'space-between',

        backgroundColor: 'white',
        width: 500,
        height: 500,


    },
    container:
    {
        backgroundColor: 'white',

    },
    text: {
        fontSize: 16,
        color: "black"
    },
    nav_text: {
        color: 'white',
        fontSize: 18,

    }
})
export default SaveScreen;

