import {StyleSheet,Dimensions, 
    Image,Text, View, TouchableOpacity, Platform } from 'react-native';
import React from 'react'
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

import { LinearGradient } from 'expo-linear-gradient';


const Welcome = () => {
  return (
    <View style={styles.container}>

        {/* Image */}
        <View style={styles.imageContainer}>
            <Image source={require('../assets/welcome.jpg')} style={styles.image}/>
        </View>
        
        {/* Middle Text */}
        <View style={styles.middleTxtContainer}>
            <Text style={styles.middleTxt}>Let's Enjoy {'\n'}{'\t  '}Qatar</Text>
        </View>

        {/* Bottom Texts */}
        <View style={styles.bottomTxtContainer}>
            <Text style={styles.bottomTxt}>Discover wonderful places with{'\n'}{'\t\t    '}DiscoverQA</Text>
        </View>

        {/* Get Started Button */}
        <View style={styles.btnContainer}>

            <TouchableOpacity style={styles.btnStyle}>
               <Text style={styles.btnTxt}>Get Started</Text>
            </TouchableOpacity>

        </View> 

    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container:{
        width: screenWidth,
        height: screenHeight,
        // backgroundColor: 'red',
        // justifyContent: 'center',
        alignItems: 'center',
    },

    // image container 
    imageContainer:{
        marginTop: 80,
        backgroundColor: '#DCD4BF',
        width: screenWidth * 0.65,
        height: screenWidth * 0.65,
        borderRadius: screenWidth / 2,
        // marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },

    // Image size
    image:{
        width: 235,
        height: 190
    },

    // Middle text container
    middleTxtContainer:{
        width: screenWidth,
        height: screenHeight * 0.20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    // Middle text style
    middleTxt:{
        fontSize: screenWidth * 0.09,
        marginLeft: 10,
        fontWeight: 'bold',
        color: 'white'
    },

    // Bottom text container
    bottomTxtContainer:{
        width: screenWidth,
        height: screenHeight * 0.10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    // Bottom Text style
    bottomTxt:{
        fontSize: screenWidth * 0.04,
        marginLeft: 10,
        // fontWeight: 'bold',
    },

    // Button container
    btnContainer:{
        width: screenWidth,
        height: screenHeight * 0.10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Butting style
    btnStyle:{
        width: screenWidth * 0.5,
        height: screenHeight * 0.05,
        backgroundColor: '#2F7694',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Button Text style
    btnTxt:{
        color: 'white',
        // fontWeight: 'bold',
        fontSize: screenWidth * 0.04
    }
})