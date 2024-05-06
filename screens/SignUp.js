import {ActivityIndicator, KeyboardAvoidingView,StyleSheet,Dimensions, Image,Text, View, TouchableOpacity, Platform, TextInput,ScrollView, SafeAreaView } from 'react-native';
import React, { useState } from 'react'
import { AntDesign, FontAwesome, FontAwesome5 ,Feather, MaterialCommunityIcons, Ionicons, MaterialIcons } from 'react-native-vector-icons'
import { Input } from '@rneui/themed';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config'
import { doc, setDoc } from "firebase/firestore";
import { db } from '../config'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const SignUp = ( {navigation} ) => {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signedIn, setSignedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [errorMessage, setErrorMeassage] = useState('')
    const [fnameError, setFnameError] = useState('')
    const [lnameError, setLnameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const set = async() => {
        const docRef = doc(db, "users", email)
        await setDoc(docRef, { firstName: fname, lastName: lname, email: email, picture: "user.jpg", favourites: [] })
        .then(() => { console.log('data submitted') })
        .catch((error) => { console.log(error.message) })
    }

    const handleRegister = async() => {
        setIsLoading(true)
        setErrorMeassage('')
        setFnameError('')
        setLnameError('')
        setEmailError('')
        setPasswordError('')
        if (!fname || !lname || !email || !password) {
            setErrorMeassage('Please Fill in the required information')

            if (!fname) setFnameError('Enter your first name')
            if (!lname) setLnameError('Enter your last name')
            if (!email) setEmailError('Enter your Email')
            if (!password) setPasswordError('Enter a password')
            setIsLoading(false)
            return
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await set();
            console.log("registered")
            navigation.replace('Login')
            
        } catch (error) {
            console.log(error.message)

            if (error.code === 'auth/invalid-email') {
                setEmailError('Invalid email')
            } else if (error.code === 'auth/email-already-in-use') {
                setEmailError('Email already in Use')
            } else if (error.code === 'auth/weak-password') {
                setPasswordError('Password should be at least 6 characters')
            } else {
                setEmailError('Register failed')
                setPasswordError('Register failed')
            }
        } 
        setIsLoading(false)
    
    }
    
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" || Platform.OS === "android" ? "padding" : undefined}>
        
        <ScrollView>

        {/* SignUp Image */}
        <View style={styles.imageContainer}>
            <Image source={require('../assets/signUp.png')} style={styles.image}/>
        </View>

        {/* Sign Up Header */}
        <View style={styles.signUpHeader}>
            <Text style={styles.signUpHeaderTxt}>Sign Up</Text>
            {errorMessage && <Text style={{color: 'red', marginLeft: 20}}>{errorMessage}</Text>}
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>

            {/* First Name */}
            <View style={styles.userInfoHeaderContainer}>
                <Text style={styles.headerTxt}>First Name</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder='Eg: Mohamed' 
                    style={[styles.input, fnameError && { borderColor: 'red' }]}
                    onChangeText={text => setFname(text)}
                    value={fname}
                /> 
            </View>
            {fnameError && <View><Text style={{color: 'red', marginLeft: 20}}>{fnameError}</Text></View>}

            {/* Last Name */}
            <View style={styles.userInfoHeaderContainer}>
                <Text style={styles.headerTxt}>Last Name</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder='Eg: Hassan' 
                    style={[styles.input, lnameError && { borderColor: 'red' }]}
                    onChangeText={text => setLname(text)}
                    value={lname}
                />
            </View>
            {lnameError && <View><Text style={{color: 'red', marginLeft: 20}}>{lnameError}</Text></View>}

            {/* Email ID */}
            <View style={styles.userInfoHeaderContainer}>
                <Text style={styles.headerTxt}>Email ID</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    onChangeText={(txt)=> setEmail(txt)} 
                    inputMode='email' 
                    placeholder='example@hotmail.com'
                    autoCapitalize={'none'}
                    style={[styles.input, emailError && { borderColor: 'red' }]}
                />
            </View>
            {emailError && <View><Text style={{color: 'red', marginLeft: 20}}>{emailError}</Text></View>}

            {/* Password */}
            <View style={styles.userInfoHeaderContainer}>
                <Text style={styles.headerTxt}>Password</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    onChangeText={(txt)=> setPassword(txt)} 
                    placeholder='*********' 
                    secureTextEntry={true} 
                    style={[styles.input, passwordError && { borderColor: 'red' }]}
                />
            </View>
            {passwordError && <View><Text style={{color: 'red', marginLeft: 20}}>{passwordError}</Text></View>}

        </View>

        {/* Sign Up Button */}
        <View style={styles.signUpButtonContainer}>
            <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
                {isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.signUpTxt}>Create Account</Text>}
            </TouchableOpacity>
        </View>

        {/* sign In  Text*/}
        <View style={styles.SignInText}>
            <Text style={styles.signInOption}>Already have an Account?</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                <Text style={ [styles.signInOption, {color: '#0063E6'}] }>Sign In</Text>
            </TouchableOpacity>
        </View>

        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUp

const styles = StyleSheet.create({
    container:{
        // backgroundColor: 'white',
        alignItems: 'center',
        flex: 1,
        marginTop: 60
    },

    // Login Image
    imageContainer:{
        // backgroundColor: 'gray',
        width: screenWidth,
        height: screenHeight * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        marginTop: 20,
    },
    image:{
        width: '80%',
        height: '100%'
    },

    // Sign Up Header
    signUpHeader:{
        // backgroundColor: 'lightgray',
        width: screenWidth,
        height: screenHeight * 0.05,
        justifyContent: 'flex-end',
        ...Platform.select({android: {marginTop: 10}})
    },
    signUpHeaderTxt:{
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: 20
    },

    // User Inforamtion Inputs
    userInfo:{
        // backgroundColor: 'pink',
        width: screenWidth,
        height: screenHeight * 0.45,
        marginTop: 5,
        ...Platform.select({android: {height: screenHeight * 0.53}})
    },
    userInfoHeaderContainer:{
        // backgroundColor: 'gray',
        width: '100%',
        // height: '8%',
        marginTop: 10,
        paddingLeft: 20,
        justifyContent: 'center'
    },
    headerTxt:{
        fontSize: 17,
        paddingBottom: 5
    },
    inputContainer:{
        // backgroundColor: 'yellow',
        height: '15%',
        paddingLeft: 20,
    },
    input:{
        width: '90%',
        height: '85%',
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#b3b3b3',
        paddingLeft: 10,
    },

    // Sign Up Button
    signUpButtonContainer:{
        // backgroundColor: 'lightgray',
        width: screenWidth,
        height: screenHeight * 0.08,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 30,
        ...Platform.select({android: {marginTop: 50}})
    },
    signUpButton:{
        width: '80%',
        height: '75%',
        backgroundColor: '#2F7694',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpTxt:{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },

    // Sign Up Text
    SignInText:{
        // backgroundColor: 'gray',
        width: screenWidth,
        height: screenHeight * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInOption:{
        fontSize: 15,
        color: '#575757',
        margin: 3,
    },
})