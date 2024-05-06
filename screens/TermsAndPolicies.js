import {Image,Platform, KeyboardAvoidingView, Dimensions, ActivityIndicator, SafeAreaView, TouchableOpacity, StyleSheet, Text, ScrollView, View, TextInput, Alert } from 'react-native'
import React from 'react'
import { Avatar, Card, Input } from '@rneui/themed';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const TermsAndPolicies = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
        
        <ScrollView>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image source={require('../assets/terms.png')} style={styles.image}/>
      </View>
      
      {/* terms Header */}
      <View style={styles.termsHeder}>
        <Text style={styles.termsHeaderTxt}>Terms And Policies</Text>
      </View>

      {/* terms Container */}
      <View style={styles.termsContainer}>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTxt}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.</Text>

        </View>
      </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default TermsAndPolicies

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
    width: '100%',
    height: '100%',
  },

  termsHeder:{
    // backgroundColor: 'lightgray',
    width: screenWidth,
    height: screenHeight * 0.08,
    justifyContent: 'center',
  },
  termsHeaderTxt:{
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20
  },

  termsContainer:{
    // backgroundColor: 'gray',
    width: screenWidth,
    height: screenHeight * 0.9,
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