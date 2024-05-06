import {Platform, KeyboardAvoidingView, Dimensions, ActivityIndicator, SafeAreaView, TouchableOpacity, StyleSheet, Text, ScrollView, View, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Card, Input } from '@rneui/themed';
import { Button } from '@rneui/base';
import { Feather, AntDesign } from "react-native-vector-icons";
import { auth } from '../config';
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from '../config'
import { getAuth, updateEmail, updatePassword} from 'firebase/auth'
import { storage } from '../config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker';

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height


const EditProfile = ({navigation}) => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [favourites, setFavourites] = useState([])
  const [password, setPassword] = useState()
  const [image, setImage] = useState()
  const [fileName, setFileName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [originalEmail, setOriginalEmail] = useState('')

  useEffect(() => {
    const read = async () => {
      const docRef = doc(db, "users", auth.currentUser.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
      setFname(docSnap.data().firstName)
      setLname(docSnap.data().lastName)
      setEmail(docSnap.data().email)
      setOriginalEmail(docSnap.data().email)
      setFavourites(docSnap.data().favourites)
      setFileName(docSnap.data().picture)
      fetchImage(docSnap.data().picture)
      } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      }
    }
    read()
  }, []);

  const fetchImage = async (imageName) => {
    const imgRef = ref(storage, imageName)
    await getDownloadURL(imgRef).then((x) => { setImage(x) })
    .catch((e) => alert(e.message))
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      });
      if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFileName(result.assets[0].uri.substring(result.assets[0].
          uri.toString().lastIndexOf('/') + 1))
      }; 
  }

  const uploadImage = async () => {
    const imgRef = ref(storage, fileName)
    const img = await fetch(image)
    const bytes = await img.blob()
    await uploadBytesResumable(imgRef, bytes)
  }

  const validate = () => {
    setIsLoading(true)
    if (!email || !fname || !lname || !password) {
      Alert.alert('Alert', 'Please make sure the fields are not empty!')
      setIsLoading(false)
      return
    }
    set()
  }

  const set = async() => {
    const auth = getAuth()
    const prevEmail = auth.currentUser.email
    const userDoc = doc(db, 'users', prevEmail)
    await deleteDoc(userDoc)
    const docRef = doc(db, "users", email)
    await setDoc(docRef, { firstName: fname, lastName: lname, email: email, picture: fileName, favourites: favourites })
    await uploadImage()
    await updateEmail(auth.currentUser, email)
    await updatePassword(auth.currentUser, password)
    .then(() => { console.log('data submitted')
    setPassword('')
    if (originalEmail !== email) {
      Alert.alert('Alert', 'Email has been updated, please log in again!', [{text: 'OK', onPress: () => navigation.replace('Login')}])
    } else {
      Alert.alert('Alert', 'User profile has been updated!', [{text: 'OK', onPress: () => navigation.navigate('Home')}]);
    }
  })
    .catch((error) => { console.log(error.message) })
    .finally(()=> {
      setIsLoading(false)
    })
  }
    

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>

    <ScrollView>
      <View style={styles.avatarContainer}>
          <Avatar
            size={"xlarge"}
            rounded
            source={{uri: image}}
          />
      </View>

      {/* Change Pic Botton Container */}
      <View style={styles.changePicBottonContainer}>
        <TouchableOpacity style={styles.changePicButton} onPress={() => pickImage()}>
          <Text style={styles.changePicTxt}>Change Picture</Text>
        </TouchableOpacity>
      </View>

    {/* User Info */}
    <View style={styles.userInfo}>

      <View style={styles.inputContainer}>

        {/* First Name */}
        <Input
          onChangeText={text => setFname(text)}
          value={fname}
          // placeholder={fname}
          label="First Name"
          rightIcon={<AntDesign name="edit" size={24} color="gray" />}
          labelStyle={styles.labelStyle}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
        />

        {/* Last Name */}
        <Input
          onChangeText={text => setLname(text)}
          value={lname}
          // placeholder={lname}
          label="Last Name"
          rightIcon={<AntDesign name="edit" size={24} color="gray" />}
          labelStyle={styles.labelStyle}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
        />

        {/* Email ID */}
        <Input
          onChangeText={text => setEmail(text)}
          value={email}
          // placeholder={email}
          label="Email ID"
          inputMode='email'
          autoCapitalize={'none'}
          rightIcon={<AntDesign name="edit" size={24} color="gray" />}
          labelStyle={styles.labelStyle}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
        />

        {/* Password */}
        <Input
          onChangeText={text => setPassword(text)}
          value={password}
          // placeholder={password}
          label="Password"
          secureTextEntry={true}
          rightIcon={<AntDesign name="edit" size={24} color="gray" />}
          labelStyle={styles.labelStyle}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
        />

      </View>
    </View>
      
      {/* Update Button */}
      <View style={styles.UpdateButtonContainer}>
        <TouchableOpacity style={styles.UpdateButton} onPress={()=>validate()}>
        {isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.UpdateTxt}>Update</Text>}
        </TouchableOpacity>
      </View>

    </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#e6e6e6",
    flex: 1,
    alignItems: "center",
    marginTop: 60
  },

  // Avatar Container
  avatarContainer: {
    // backgroundColor: 'tomato',
    width: screenWidth,
    height: screenHeight * 0.23,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  // Change Pic Button
  changePicBottonContainer: {
    // backgroundColor: 'gray',
    width: screenWidth,
    height: screenHeight * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  changePicButton: {
    backgroundColor: "#2F7694",
    width: "45%",
    height: "50%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  changePicTxt: {
    color: "white",
  },

  // User Information
  userInfo: {
    // backgroundColor: 'pink',
    width: screenWidth,
    height: screenHeight * 0.45,
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius:10,
  },

  text: {
    marginTop:8,
    marginLeft: 10,
  },

  labelStyle:{
    color: "black",
    // paddingBottom: screenWidth * 0.03,
    fontSize: 17,
    fontWeight: "400",
  },

  inputContainerStyle:{
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  containerStyle:{
    // backgroundColor: 'tomato',
    // paddingHorizontal: screenWidth * 0.02,
    width: screenWidth,
  },

  // Update Button
  UpdateButtonContainer:{
    // backgroundColor: 'gray', 
    width: screenWidth, 
    height: screenHeight * 0.1,
    justifyContent: "center",
    alignItems: "center",
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