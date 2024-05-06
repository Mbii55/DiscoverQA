import {Image,Platform, KeyboardAvoidingView, Dimensions, ActivityIndicator, SafeAreaView, TouchableOpacity, StyleSheet, Text, ScrollView, View, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Card, Input } from '@rneui/themed';
import { Feather, AntDesign } from "react-native-vector-icons";

import { getAuth, updateEmail, updatePassword } from 'firebase/auth'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ChangePassword  = ({navigation}) => {

    const [newPassword, setNewPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handelPasswordUpdate = async () => {
        if (newPassword !== repeatPassword) {
            Alert.alert("Passwords do not match!")
            return
        }
        const auth = getAuth()
        setIsLoading(true)
        await updatePassword(auth.currentUser, newPassword)
        .then(() => {
            Alert.alert('Success', 'Your password has been updated', [{text: 'OK', onPress: () => navigation.navigate('Home')}])
        })
        .catch((error) => {
            console.log(error.message)
            if (error.code === 'auth/weak-password') {
                Alert.alert('Password should be at least 6 characters')
            }
        })
        .finally(() => {
        setIsLoading(false);
        })
      }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView>

      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image source={require('../assets/change_password.png')} style={styles.image}/>
      </View>
      
      {/* Header */}
      <View style={styles.AboutUsHeder}>
        <Text style={styles.aboutUsHeaderTxt}>Change your password</Text>
      </View>

      {/* password Container */}
      <View style={styles.aboutUsContainer}>

        <Input
          onChangeText={setNewPassword}
          value={newPassword}
          label="New Password"
          secureTextEntry={true}
          rightIcon={<AntDesign name="edit" size={24} color="gray" />}
          labelStyle={styles.labelStyle}
        />
        <Input
            onChangeText={setRepeatPassword}
            value={repeatPassword}
            label="Repeat Password"
            secureTextEntry={true}
            rightIcon={<AntDesign name="edit" size={24} color="gray" />}
            labelStyle={styles.labelStyle}
        />

      </View>

      {/* Update Button */}
      <View style={styles.UpdateButtonContainer}>
        <TouchableOpacity style={styles.UpdateButton} onPress={handelPasswordUpdate}>
        {isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.UpdateTxt}>Update</Text>}
        </TouchableOpacity>
      </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#f2f2f2',
    flex: 1,
    marginTop: 60
  },

  imageContainer:{
    // backgroundColor: 'tomato',
    width: screenWidth,
    height: screenHeight * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
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
    height: screenHeight * 0.3,
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
  // Update Button
  UpdateButtonContainer:{
    // backgroundColor: 'gray', 
    width: screenWidth, 
    height: screenHeight * 0.1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  UpdateButton: {
    width: "80%",
    height: "60%",
    backgroundColor: "#2F7694",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  UpdateTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

})