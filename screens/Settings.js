import {StyleSheet,Dimensions, Image,Text, View, TouchableOpacity, Platform, TextInput,ScrollView } from 'react-native';
import React from 'react'
import { AntDesign, Feather, MaterialCommunityIcons, Ionicons, MaterialIcons } from 'react-native-vector-icons'
import { Avatar, Card } from '@rneui/themed';
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider';
import GradientBackground from '../components/GradientBackground';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Settings = ({navigation}) => {
  return (
      <GradientBackground style={styles.container}>

        <ScrollView>
        
        <View style={styles.accountContainer}>

        {/* Account Header */}
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Account</Text>
      </View>

        {/* Account settings options */}
      <Card containerStyle={styles.CardContainer}>

        {/* Edit Profile */}
        <TouchableOpacity style={styles.options} onPress={()=>navigation.navigate('EditProfile')}>
            <Feather name={'user'} size={25} color={'#818181'}/>
            <Text style={styles.txt}>Edit Profile</Text>
        </TouchableOpacity>

        <CardDivider/>

        {/* Change Password */}
        <TouchableOpacity style={styles.options} onPress={()=>navigation.navigate('ChangePassword')}>
            <MaterialCommunityIcons name={'security'} size={25} color={'#818181'}/>
            <Text style={styles.txt}>Change Password</Text>
        </TouchableOpacity>

      </Card>
      </View>

        {/* ******************************************************************************** */}
                                    {/* Terms & About Section*/}

        <View style={styles.TermsContainer}>
        {/* Header */}
        <View style={styles.header}>
            <Text style={styles.headerTxt}>Terms & About</Text>
        </View>

        {/* Terms & About options */}
        <Card containerStyle={styles.CardContainer}>

            {/* About Us */}
            <TouchableOpacity style={[styles.options, {height: '42%'}]} onPress={()=>navigation.navigate('AboutUs')}>
                <AntDesign name={'infocirlceo'} size={25} color={'#818181'}/>
                <Text style={styles.txt}>About Us</Text>
            </TouchableOpacity>

            <CardDivider/>


            {/* Terms & Policies */}
            <TouchableOpacity style={[styles.options, {height: '42%'}]} onPress={()=>navigation.navigate('TermsAndPolicies')}>
                <Feather name={'file-text'} size={25} color={'#818181'}/>
                <Text style={styles.txt}>Terms & Policies</Text>
            </TouchableOpacity>
        </Card>
        </View>

        {/* ******************************************************************************** */}
                                    {/* Actions Section*/}

        <View style={styles.acctionsContainer}>
        {/* Header */}
        <View style={styles.header}>
            <Text style={styles.headerTxt}>Actions</Text>
        </View>

        {/* Support & About options */}
        <Card containerStyle={[styles.CardContainer, {height: '18%'}]}>

            {/* Log Out */}
            <TouchableOpacity onPress={()=>navigation.replace('Login')} style={[styles.options, {height: '100%'}]}>
                <MaterialIcons name={'logout'} size={25} color={'#818181'}/>
                <Text style={styles.txt}>Log Out</Text>
            </TouchableOpacity>

        </Card>
        </View>

        </ScrollView>
        
    </GradientBackground>
  )
}

export default Settings

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'yellow',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header:{
        width: screenWidth,
        height: screenHeight * 0.04,
        // backgroundColor: 'pink',
        marginTop: 8,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    headerTxt:{
        fontSize: 23,
        fontWeight: 'bold',
        color: 'white'
    },
    CardContainer:{
        width: screenWidth * 0.9,
        height: screenHeight * 0.13,
        backgroundColor: 'white',
        borderRadius: 7,
    },
    accountContainer:{
        // backgroundColor: 'tomato',
        height: screenHeight * 0.3,
        justifyContent: 'center',
    },
    TermsContainer:{
        // backgroundColor: 'gray',
        height: screenHeight * 0.24
    },
    acctionsContainer:{
        // backgroundColor: 'tomato',
        height: screenHeight * 0.4
    },
    options:{
        // backgroundColor: 'lightgray',
        height: '42%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt:{
        fontWeight: 'bold',
        paddingLeft: 15,
    },
})