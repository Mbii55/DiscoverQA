import {StyleSheet,Dimensions, Image,Text, View, TouchableOpacity, Platform, TextInput,ScrollView } from 'react-native';
    
import React, {useState, useEffect} from 'react'
import { AntDesign, MaterialIcons } from 'react-native-vector-icons'
import { Avatar, Card } from '@rneui/themed';
import EventCard from '../components/EventCard';
import FavPlaceCard from '../components/FavPlaceCard'
import ProfileHeader from '../components/ProfileHeader';
import GradientBackground from '../components/GradientBackground';
import { auth } from '../config';
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from '../config'
import { useFocusEffect } from '@react-navigation/native'


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Favorites = ({ route, navigation }) => {

  const [favourites, setFavourites] = useState([])
  const [flag, setFlag] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

    const read = async () => {
        const docRef = doc(db, "users", auth.currentUser.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
        setFavourites(docSnap.data().favourites)
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

const filteredFavourites = favourites.filter((place) => place.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <GradientBackground style={styles.container}>

        {/* Profile and settigns header  */}
        <ProfileHeader/>

        {/* Header container */}
        <View style={styles.headerContainer}>
            <Text style={styles.headerTxt}>Here Are Your {'\n'}Favorites Places!</Text>
        </View>

        {/* Search box container */}
        <View style={styles.searchContainer}>
            <View style={styles.inputIconContainer}>
                <AntDesign name='search1' size={19} color={'#BABABA'} style={styles.searchIcon}/>
                <TextInput 
                    placeholder='Search a My Favorites ...' 
                    value={searchQuery} 
                    style={styles.searchBox}
                    onChangeText={setSearchQuery}
                />
            </View>
        </View>
        
        <View style={styles.favoritePlacesContainer}>
            {/* <View style={styles.favorites}> */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filteredFavourites.length > 0 ? (
                filteredFavourites.map((place, index) => (
                    <FavPlaceCard key={index} place={place} navigation={navigation} />
                ))
            ) : (
                <View style={styles.noFavoritesContainer}>
                    <Image source={require('../assets/no_favorites.png')} style={styles.noFavoritesImage}/>
                    <Text style={styles.noFavoritesText}>You have no favorites yet!</Text>
                </View>
            )}
            </ScrollView>
            {/* </View> */}

        </View>
    </GradientBackground>
  )
}

export default Favorites

const styles = StyleSheet.create({
    container:{
        width: screenWidth,
        height: screenHeight,
        // backgroundColor: 'yellow',
        // justifyContent: 'center',
        alignItems: 'center',
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

    // Header Container
    headerContainer:{
        // backgroundColor: 'gray',
        width: screenWidth,
        height: screenHeight * 0.13,
        justifyContent: 'center'
    },
    headerTxt:{
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 25,
    },

    // Search container
    searchContainer:{
        // backgroundColor: 'pink',
        width: screenWidth,
        height: screenHeight * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputIconContainer:{
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: 'white',
        width: screenWidth * 0.83,
        borderRadius: 10,
    },
    searchIcon: {
        marginLeft: 10,
    },    
    searchBox:{
        // backgroundColor: 'white',
        width: screenWidth * 0.78,
        height: screenHeight * 0.056,
        borderRadius: 10,
        paddingLeft: 10,
    },

    // Favorite Places Container
    favoritePlacesContainer:{
        // backgroundColor: 'gray',
        width: screenWidth,
        height: screenHeight * 0.6,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },

    // No favorites section
    noFavoritesContainer:{
        // backgroundColor: 'yellow',
        width: screenWidth,
        height: screenHeight * 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noFavoritesImage:{
        width: '80%',
        height: '80%'
    },
    noFavoritesText:{
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white'
    }
})
