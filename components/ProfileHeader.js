import {StyleSheet,Dimensions, Image,Text, View, TouchableOpacity, Platform, TextInput,ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react'
import { AntDesign, MaterialIcons } from 'react-native-vector-icons'
import { Avatar, Card } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../config';
import { doc, getDoc } from "firebase/firestore";
import { storage } from '../config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useFocusEffect } from '@react-navigation/native'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const ProfileHeader = () => {

  const navigation = useNavigation()

  const [fname, setFname] = useState()
  const [lname, setLname] = useState()
  const [email, setEmail] = useState(auth.currentUser.email)
  const [image, setImage] = useState()

  const read = async () => {
    const docRef = doc(db, "users", auth.currentUser.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFname(docSnap.data().firstName)
      setLname(docSnap.data().lastName)
      fetchImage(docSnap.data().picture)
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      read()
  },[])
)

  const fetchImage = async (imageName) => {
    const imgRef = ref(storage, imageName)
    await getDownloadURL(imgRef).then((x) => { setImage(x) })
    .catch((e) => alert(e.message))
  };


  return (
    <View style={styles.TopProfileAndSettingContainer}>
      
     {/* Profile pic container */}
     <View style={styles.profilePicContainer}>

         {/* Profile pic */} 
          <TouchableOpacity onPress={ ()=>navigation.navigate('EditProfile')}>
            <Avatar size={'medium'} rounded source={{uri: image}}/>
          </TouchableOpacity>
         {/* Welcoming text */}
         <Text style={styles.welcomeTxt}>Hi {fname}!</Text>
     </View>

     {/* Settigns icon */}
     <TouchableOpacity style={styles.settingsIcon} onPress={ ()=>navigation.navigate('Settings') }>
         <AntDesign name='setting' size={25} color={'#818181'}/>
     </TouchableOpacity>

    </View>

  )
}

export default ProfileHeader

const styles = StyleSheet.create({
  // Top page profile pic and setting icon styles
  TopProfileAndSettingContainer:{
    width: screenWidth,
    height: screenHeight * 0.09,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},

// Profile pic container
profilePicContainer:{
    // backgroundColor: 'gray',
    width: screenWidth * 0.7,
    height: screenWidth * 0.13,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
},

// Welcome text styles
welcomeTxt:{
    fontWeight: 'bold',
    color: 'white',
    // marginLeft: 5,
    fontSize: 23,
},

// Settings icon container
settingsIcon:{
    backgroundColor: 'white',
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    borderRadius: screenWidth / 2,
    marginRight: 25,
    justifyContent: 'center',
    alignItems: 'center',
},
})