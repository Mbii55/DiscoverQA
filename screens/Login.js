import {Alert,KeyboardAvoidingView,ActivityIndicator,StyleSheet,Dimensions, Image,Text, View, TouchableOpacity, Platform, TextInput,ScrollView, SafeAreaView } from 'react-native';
import React, { useState } from 'react'
import { AntDesign, FontAwesome, FontAwesome5 ,Feather, MaterialCommunityIcons, Ionicons, MaterialIcons } from 'react-native-vector-icons'
import { Input, Button } from '@rneui/themed';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../config'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Login = ( {navigation} ) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signedIn, setSignedIn] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = () => {
        setIsLoading(true)
        setEmailError('')
        setPasswordError('')
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
        console.log('Logged in')
        setSignedIn(true)
        navigation.replace('MainApp')
        })
        .catch((error) => {
            console.log(error.message);
            if (error.code === 'auth/invalid-email') {
                setEmailError('Invalid email')
            } 
            else if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
                setPasswordError('Invalid password')
            } 
            else if (error.code === 'auth/missing-password'){
                setPasswordError('Please Enter a Passowrd')
            }
            else if (error.code === 'auth/user-not-found'){
                setEmailError('User Does not exist')
            }
            else{
                setEmailError('Login failed')
                setPasswordError('Login failed')
            }
            setSignedIn(false)
            setIsLoading(false)
        })
    }

    const handlePasswordReset = () => {
        if (!email) {
            setEmailError('Please enter your email')
            return
        }
        sendPasswordResetEmail(auth, email)
        .then(() => {Alert.alert('Check your email', 'A link to reset your password has been sent to your email.')})
        .catch((error) => {
            console.log(error)
            if (error.code === 'auth/user-not-found') {
                setEmailError('User Does not exist')
                
            } else if (error.code === 'auth/invalid-email') {
                setEmailError('Invalid email')

            } else {
                setEmailError('Failed to send reset email')
            }
        });
    }    
    
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" || Platform.OS === "android" ? "padding" : undefined}>
        
        <ScrollView>
        {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image source={require('../assets/login.png')} style={styles.image}/>
      </View>

        {/* Login Text Header */}
        <View style={styles.loginHeader}>
            <Text style={styles.loginHeaderTxt}>Log In</Text>
        </View>
        
        {/* User Info */}
        <View style={styles.userInfo}>
            
            {/* Email */}
            <View style={styles.EmailContainer}>

                <Input
                    label="Email ID"
                    placeholder="Example@hotmail.com"
                    inputMode='email'
                    onChangeText={setEmail}
                    autoCapitalize={'none'}
                    inputContainerStyle={[styles.input, emailError && { borderColor: 'red' }]}
                    labelStyle={styles.headerTxt}
                    rightIcon={<MaterialCommunityIcons name={'email-outline'} size={23} color={'gray'} style={{paddingRight: 10}}/>}
                />
            </View>
            {emailError && <View><Text style={{color: 'red', marginLeft: 15}}>{emailError}</Text></View>}

            {/* Password */}
            <View style={styles.passwordContainer}>

                <Input
                    label="Password"
                    placeholder="**********"
                    onChangeText={setPassword}
                    inputContainerStyle={[styles.input, passwordError && { borderColor: 'red' }]}
                    labelStyle={styles.headerTxt}
                    secureTextEntry
                    rightIcon={<MaterialCommunityIcons name={'form-textbox-password'} size={23} color={'gray'} style={{paddingRight: 10}}/>}
                />
            </View>
            {passwordError && <View><Text style={{color: 'red', marginLeft: 15}}>{passwordError}</Text></View>}

        </View>

        {/* Forget Password Text */}
        <View style={styles.forgetPasswordContainer}>
            <TouchableOpacity onPress={handlePasswordReset}>
                <Text style={styles.forgetPasswordTxt}>Forget Password ?</Text>
            </TouchableOpacity>
        </View>

        {/* Login Button */}
        <View style={styles.loginButtonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                {isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.loginTxt}>Login</Text>}
            </TouchableOpacity>
        </View>

        {/* or Text Dividor */}
        <View style={styles.orDividerContainer}>
            <View style={styles.line}/>
            <Text style={styles.orText}>Or</Text>
            <View style={styles.line}/>
        </View>

        {/* Social Media Icons */}
        <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialMediaIcons}>
                <AntDesign name={'instagram'} size={35} color={'#858484'}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialMediaIcons}>
                <AntDesign name={'google'} size={35} color={'#858484'}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialMediaIcons}>
                <FontAwesome5  name={'facebook'} size={35} color={'#858484'}/>
            </TouchableOpacity>
        </View>

        {/* sign Up  Text*/}
        <View style={styles.signUpTextContainer}>
            <Text style={styles.signUpTxt}>Don't have an account?</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                <Text style={ [styles.signUpTxt, {color: '#0063E6'}] }>Sign Up</Text>
            </TouchableOpacity>
        </View>

        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        height: screenHeight,
        width: screenWidth,
        // backgroundColor: 'white',
        marginTop: 60 
    },

    // Image
    imageContainer:{
        width: screenWidth,
        height: screenHeight * 0.25,
        // backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        marginTop: 20,
    },
    image:{
        width: '80%',
        height: '100%'
    },

    // Login Header Text
    loginHeader:{
        width: screenWidth,
        height: screenHeight * 0.06,
        // backgroundColor: 'lightgray',
        justifyContent: 'center'
    },
    loginHeaderTxt:{
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: 20
    },

    // User Information inputs
    userInfo:{
        // backgroundColor: 'pink',
        width: screenWidth,
        height: screenHeight * 0.25,
        ...Platform.select({android: {height: screenHeight * 0.3}})
    },
    headerTxt:{
        fontSize: 17,
        paddingBottom: 10,
        // fontWeight: 'bold',
        color: 'gray'
    },
    input:{
        width: '90%',
        height: '46%',
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        // borderColor: 'lightgray',
        paddingLeft: 10,
        margin: 3
    },

    EmailContainer:{
        // backgroundColor: 'tomato',
        width: '100%',
        height: '40%',
        marginTop: 20
    },
    passwordContainer:{
        // backgroundColor: 'tomato',
        width: '100%',
        height: '40%',
        marginTop: 20
    },

    // Forget Password Text
    forgetPasswordContainer:{
        width: screenWidth,
        height: screenHeight * 0.03,
        // backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 5,
    },
    forgetPasswordTxt:{
        fontSize: 17, 
        color: '#0063E6', 
        paddingRight: 25
    },

    // Login Button
    loginButtonContainer:{
        width: screenWidth,
        height: screenHeight * 0.1,
        // backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButton:{
        width: '70%',
        height: '55%',
        backgroundColor: '#2F7694',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginTxt:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },

    // Or Text Divider
    orDividerContainer:{
        width: screenWidth,
        height: screenHeight * 0.035,
        // backgroundColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#6D6D6D',
    },
    orText: {
        width: '10%',
        textAlign: 'center',
        fontSize: 16, 
    },

    // Social Media Icons
    socialIcons:{
        width: screenWidth,
        height: screenHeight * 0.06,
        // backgroundColor: 'pink',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    socialMediaIcons:{
        // backgroundColor: 'red',
        width: '13%',
        height: '80%',
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#858484',
        justifyContent: 'center',
        alignItems: 'center'
    },

    // Sign Up Text
    signUpTextContainer:{
        width: screenWidth,
        height: screenHeight * 0.05,
        // backgroundColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    signUpTxt:{
        marginLeft: 25,
        fontSize: 15,
        color: '#575757'
    },
})