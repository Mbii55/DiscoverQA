import {Image,Platform, KeyboardAvoidingView, Dimensions, ActivityIndicator, SafeAreaView, TouchableOpacity, StyleSheet, Text, ScrollView, View, TextInput, Alert } from 'react-native'
import React from 'react'
import { Avatar, Card, Input } from '@rneui/themed';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AboutUs = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image source={require('../assets/Buildings.png')} style={styles.image}/>
      </View>
      
      {/* About Us Header */}
      <View style={styles.AboutUsHeder}>
        <Text style={styles.aboutUsHeaderTxt}>About Us</Text>
      </View>

      {/* About Us Container */}
      <View style={styles.aboutUsContainer}>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTxt}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. </Text>

        </View>
      </View>
      
      </ScrollView>
    </SafeAreaView>
  )
}

export default AboutUs

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#f2f2f2',
    flex: 1
  },

  imageContainer:{
    // backgroundColor: 'tomato',
    width: screenWidth,
    height: screenHeight * 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image:{
    width: '90%',
    height: '90%'
  },

  AboutUsHeder:{
    // backgroundColor: 'lightgray',
    width: screenWidth,
    height: screenHeight * 0.08,
    justifyContent: 'center',
  },
  aboutUsHeaderTxt:{
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10
  },

  aboutUsContainer:{
    // backgroundColor: 'gray',
    width: screenWidth,
    height: screenHeight * 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer:{
    backgroundColor: 'white',
    width: '90%',
    height: '90%',
    borderRadius: 20
  },
  infoTxt:{
    fontSize: 18,
    margin: 10,
    lineHeight: 30
  },

})