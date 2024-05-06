import {StyleSheet, Dimensions, View, TouchableOpacity, Platform, ScrollView, Image, Text, Linking}  from "react-native";
import {FontAwesome6, Feather, Ionicons, SimpleLineIcons, Entypo} from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import GradientBackground from "../components/GradientBackground";

import { ListItem, Rating } from "@rneui/themed";
import MapView, { Marker } from 'react-native-maps';

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const PlaceDetails = ({ route, navigation }) => {

  const { place } = route.params

  const [expandedTime, setExpandedTime] = useState()
  const [expandedRatings, setExpandedRatings] = useState()

  // Function to Open URLs
  const openURL = async (url) => {
    const supported = await Linking.canOpenURL(url);
  
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }

  return (
    <GradientBackground style={styles.container}>

      {/* Place Image and location */}
      <View style={styles.PlaceCardContainer}>

        <LinearGradient
        colors={['#1C5E85', '#5D8FAD']}
        style={styles.gradient}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
      >

        {/* Place Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: place.photos_sample[0].photo_url }} style={styles.image} />
        </View>

        {/* Place Name Container*/}
        <View style={styles.placeNameContainer}>

          <View style={styles.placeName}>
            <FontAwesome6 name={"building-columns"} size={20} color={"white"} style={{ margin: 10 }}/>
            <Text style={styles.placeNameText}>{place.name}</Text>
          </View>

        </View>
        
        {/* Place Contact Inforamtion */}
        <View style={styles.contactInfoContainer}>
            <TouchableOpacity style={styles.website} onPress={()=>openURL(place.website)}>
              <Feather name={"globe"} size={17} color={'white'} style={{ margin: 10 }}/>
              <Text style={styles.contactInfoTxt}>{place.website ? place.website : 'Not Available'}</Text>
            </TouchableOpacity>

            <View style={styles.phoneNumber}>
              <Feather name={"phone-forwarded"} color={'white'} size={15} style={{ margin: 10 }}/>
              <Text style={styles.contactInfoTxt}>{place.phone_number ? place.phone_number : 'Not availabe'}</Text>
            </View>
        </View>
      </LinearGradient>
      </View>
      <ScrollView>

      {/* About The Place */}
      <View style={styles.AboutPlaceContainer}>

        <View style={styles.aboutePlaceHeader}>
          <Text style={styles.headerTxtStyle}>About This Place</Text>
          <Entypo name={'info'} size={17} color={'white'} style={{paddingLeft: 5}}/>
        </View>

        <View style={styles.description}>
          {place.about && place.about.summary ? (
            <Text style={styles.desctiptionText}>{place.about.summary}</Text>
            ) : (
            <Text style={styles.desctiptionText}>No summary available for this place.</Text>
          )}
        </View>
      </View>

      <View style={styles.placeDetails}>

        {/* Worikign Hourse */}
        <ListItem.Accordion
            containerStyle={styles.accordion}
            content={
                <>
                <Feather name="clock" size={25} style={{padding: 10}}/>
                <ListItem.Content>
                    <ListItem.Title style={{ color: 'black' }}>Working Hours</ListItem.Title>
                </ListItem.Content>
                </>
            }
            isExpanded={expandedTime}
            onPress={() => setExpandedTime(!expandedTime)}
            >
            {expandedTime && (
              place.working_hours ? (
                <ListItem bottomDivider containerStyle={styles.listItem}>
                    <ListItem.Content>
                        <ListItem.Subtitle style={styles.hoursStyle}>Sunday: {place.working_hours.Sunday}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.hoursStyle}>Monday: {place.working_hours.Monday}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.hoursStyle}>Tuesday: {place.working_hours.Tuesday}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.hoursStyle}>Wednesday: {place.working_hours.Wednesday}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.hoursStyle}>Thursday: {place.working_hours.Thursday}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.hoursStyle}>Friday: {place.working_hours.Friday}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.hoursStyle}>Saturday: {place.working_hours.Saturday}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                ) : (
                  <ListItem bottomDivider containerStyle={styles.listItem}>
                    <ListItem.Content>
                      <ListItem.Subtitle style={{padding: 10}}>No working hours available.</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                )
              )}
          </ListItem.Accordion>
          
          {/* Ratings */}
          <ListItem.Accordion
            containerStyle={styles.accordion}
            content={
                <>
                <Feather name="star" size={25} style={{padding: 10}}/>
                <ListItem.Content>
                    <ListItem.Title style={{ color: 'black' }}>Ratings</ListItem.Title>
                </ListItem.Content>
                </>
            }
            isExpanded={expandedRatings}
            onPress={() => setExpandedRatings(!expandedRatings)}
            >
            {expandedRatings && (
                 place.rating ? (
                  <ListItem bottomDivider containerStyle={styles.listItem}>
                    <ListItem.Content>
                      <ListItem.Subtitle style={{paddingBottom: 20}}>Number of People reviewed this Place: {place.review_count}</ListItem.Subtitle>
                      <ListItem.Subtitle>Rating: {place.rating}</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                ) : (
                  <ListItem bottomDivider containerStyle={styles.listItem}>
                    <ListItem.Content>
                      <ListItem.Subtitle style={{padding: 10}}>No ratings available for this place.</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                )
              )}
          </ListItem.Accordion>
        </View>

        {/* Location */}
        <View style={styles.locationContainer}>

            <View style={styles.locationHeaderContainer}>
              <Text style={styles.locationHeaderTxt}>Location</Text>
              <Entypo name={'pin'} size={19} color={'white'} style={{paddingLeft: 10}}/>
            </View>

          <MapView style={styles.mapStyle} onPress={() => Linking.openURL(place.place_link)}
            initialRegion={{latitude: place.latitude, longitude: place.longitude, latitudeDelta: 0.0922,longitudeDelta: 0.0421}}
            showsUserLocation={true}>
            <Marker coordinate={{latitude: place.latitude, longitude: place.longitude}}/>
          </MapView>

        </View>

      </ScrollView>
    </GradientBackground>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({

  PlaceCardContainer: {
    // backgroundColor: "gray",
    width: screenWidth * 0.9,
    height: screenHeight * 0.5,
    marginTop: 30,
    marginLeft:20,
    borderRadius: 30,
    overflow: 'hidden',
    ...Platform.select({android: {marginTop: 50}})
  },
  imageContainer: {
    // backgroundColor: "pink",
    width: "100%",
    height: "70%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  // Location inside the Card
  placeNameContainer: {
    // backgroundColor: "lightgray",
    width: "100%",
    height: "15%",
    justifyContent: "center",
    paddingLeft: 20,
  },
  placeName: {
    backgroundColor: "gray",
    width: "80%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  placeNameText: {
    paddingLeft: 10,
    color: "white",
    fontWeight: "bold",
  },
  
  // Contact Info Inside the Card
  contactInfoContainer:{
    // backgroundColor: "red",
    width: "100%",
    height: "15%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  website:{
    // backgroundColor: "gray",
    width: "50%",
    height: "70%",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
  },
  phoneNumber:{
    // backgroundColor: "lightgray",
    width: "50%",
    height: "70%",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10
  },
  contactInfoTxt:{
    color: 'white',
    fontSize: 14
  },

  // About The Place 
  AboutPlaceContainer: {
    // backgroundColor: "pink",
    width: screenWidth,
    height: screenHeight * 0.3,
    marginTop: 10,
    // justifyContent: "center",
  },
  aboutePlaceHeader: {
    // backgroundColor: "gray",
    width: "100%",
    height: "25%",
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerTxtStyle: {
    paddingLeft: 20,
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white'
  },
  description:{
    backgroundColor: 'white',
    width: '90%',
    height: '65%',
    // minHeight: screenHeight * 0.2,
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 10,
  },
  desctiptionText:{
    paddingTop: 10,
    fontSize: 16,
    padding: 10,
  },

  // Place Details Lists 
  placeDetails:{
    // backgroundColor: "red",
    width: screenWidth * 0.9,
    minHeight: screenHeight * 0.2,
    alignSelf: 'center',
    marginTop: 10,
  },
  listItem:{
    backgroundColor: '#E5E5E5'
  },

  // Working Hours Style
  hoursStyle:{
    margin: 10
  },

  // Locaiton 
  mapStyle:{ 
    height: 250, 
    width:  400,
    borderRadius: 10,
    marginTop: 15,
    ...Platform.select({android: {width: 360, height: 250}})
  },
  locationContainer:{
    // backgroundColor: 'tomato',
    width: screenWidth,
    height: screenHeight * 0.5,
    alignItems: 'center'
  },
  locationHeaderContainer:{
    // backgroundColor: 'gray',
    width: screenWidth,
    height: screenHeight * 0.06,
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationName:{
    // backgroundColor: 'tomato',
    width: screenWidth,
    height: screenHeight * 0.05,
    justifyContent: 'center',
    alignItems: 'center'
  },
  locationHeaderTxt:{
    fontSize: 30, 
    fontWeight: 'bold', 
    color: 'white', 
    marginLeft: 25, 
    marginTop: 10
  }
});
