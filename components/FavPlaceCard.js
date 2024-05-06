import {StyleSheet,Dimensions, Image,Text, View, TouchableOpacity, Platform, TextInput,ScrollView } from 'react-native';
import React from 'react'
import { AntDesign, MaterialIcons } from 'react-native-vector-icons'
import { Avatar, Card } from '@rneui/themed';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const FavPlaceCard = ( {place, navigation} ) => {

  
  return (

    <View style={styles.card}>
      <TouchableOpacity style={styles.imageContainer} onPress={()=>navigation.navigate('PlaceDetails', {place: place})}>
        <Image source={{uri: place.photos_sample[0].photo_url}} style={styles.image}/>
      </TouchableOpacity>
      
      <View style={styles.placeName}>
        <Text style={styles.title}>{place.name}</Text>
      </View>
    </View>

  )
}

export default FavPlaceCard

const styles = StyleSheet.create({
  card:{
    backgroundColor: 'white',
    width: screenWidth * 0.75,
    height: screenHeight * 0.4,
    borderRadius: 10,
    margin: 10,
  },
  imageContainer:{
    width: '90%',
    height: '80%',
    borderRadius: 4,
    marginLeft: 16,
    marginTop: 16,
    overflow: 'hidden'
  },
  image:{
    width: '100%',
    height: '100%',
  },
  placeName:{
    // backgroundColor: 'tomato',
    marginTop: 15,
    height: '10%',
    alignSelf:'center',
    ...Platform.select({android: {marginTop: 10}})
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5A5A5A',
  },
})