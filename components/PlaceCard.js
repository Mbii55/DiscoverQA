import {StyleSheet,Dimensions, Image,Text, View, TouchableOpacity, Platform, TextInput,ScrollView } from 'react-native';
import React from 'react'
import { AntDesign, MaterialIcons } from 'react-native-vector-icons'
import { Avatar, Card } from '@rneui/themed';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const PlaceCard = ( {place, navigation, addFav, icon, iconColor} ) => {

  
  return (

    <View style={styles.card}>
    
      <TouchableOpacity style={styles.imageContainer} onPress={()=>navigation.navigate('PlaceDetails', {place: place})}>
        <Image source={{uri: place.photos_sample[0].photo_url}} style={styles.image}/>
      </TouchableOpacity>
      
      <View style={styles.placeName}>
        <Text style={styles.title}>{place.name}</Text>
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={addFav}>
          <MaterialIcons name={icon} size={15} style={{color:iconColor}} />
        </TouchableOpacity>
      </View>
    </View>

  )
}

export default PlaceCard

const styles = StyleSheet.create({
  card:{
    backgroundColor: 'white',
    width: screenWidth * 0.25,
    height: screenHeight * 0.17,
    borderRadius: 4,
    margin: 10,
    marginTop: 20
  },
  imageContainer:{
    // backgroundColor: 'pink',
    width: '90%',
    height: '65%',
    borderRadius: 4,
    marginLeft: 5,
    marginTop: 3,
    overflow: 'hidden'
  },
  image:{
    width: 100,
    height: 110,
  },
  placeName:{
    marginTop: 4,
    // backgroundColor: 'pink',
    height: '20%'
  },
  title:{
    paddingLeft: 6,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#5A5A5A',
    // backgroundColor: 'tomato'
  },
  iconContainer:{
    // backgroundColor: 'red',
    alignItems: 'flex-end',
    marginRight: 4,
  },
})