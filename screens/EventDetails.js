import {StyleSheet, Dimensions, View, TouchableOpacity, Platform, ScrollView, Image, Text, Linking}  from "react-native";
import {FontAwesome6, MaterialIcons, AntDesign, Feather, Ionicons} from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import GradientBackground from "../components/GradientBackground";

import { ListItem } from "@rneui/themed";

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const EventDetails = ({ route, navigation }) => {

  const { event } = route.params
  const venue = event.venue
  // console.log(venue)

  const [expandedTime, setExpandedTime] = useState()
  const [expandedTicketsInfo, setExpandedTicketsInfo] = useState()
  const [expandedLocation, setExpandedLocation] = useState()

  // Function to Open URLs
  const openURL = async (url) => {
    const supported = await Linking.canOpenURL(url)
    if (supported) {
      await Linking.openURL(url)
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`)
  }}


  return (
    <GradientBackground style={styles.container}>

      {/* Evemt Image and location */}
      <View style={styles.eventCardContainer}>

        <LinearGradient colors={['#1C5E85', '#5D8FAD']} style={styles.gradient} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}>

          {/* Event Image */}
          <View style={styles.eventimageContainer}>
            <Image source={{ uri: event.thumbnail }} style={styles.image} />
          </View>

          {/* Event Card Container*/}
          <View style={styles.eventNameContainer}>
            <View style={styles.eventName}>
              <FontAwesome6 name={"building-circle-arrow-right"} size={20} color={"white"} style={{ margin: 10 }}/>
              <Text style={styles.eventNameText}>{event.title}</Text>
            </View>
          </View>
          
          {/* Event Contact Inforamtion */}
          <View style={styles.contactInfoContainer}>     
              <TouchableOpacity style={styles.website}>
                <Feather name={"globe"} size={17} color={'white'} style={{ margin: 10 }}/>
                <TouchableOpacity onPress={() => openURL(event.link)}>
                  <Text style={styles.contactInfoTxt}>{event.link}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      
      <ScrollView>

      {/* About The Event */}
      <View style={styles.AboutEventContainer}>

        <View style={styles.abouteEventHeader}>
          <Text style={styles.headerTxtStyle}>About This Event</Text>
          <Feather name={'info'} size={22} color={'white'} style={{paddingLeft: 5}}/>
        </View>

        <View style={styles.description}>
          <Text style={styles.desctiptionText}>{event.description}</Text>
        </View>
      </View>

      <View style={styles.eventDetails}>

        {/* ************************ Date ************************ */}

        <ListItem.Accordion
            containerStyle={styles.accordion}
            content={
                <>
                <AntDesign name="calendar" size={25} style={{padding: 10}}/>
                <ListItem.Content>
                    <ListItem.Title style={{ color: 'black' }}>Date</ListItem.Title>
                </ListItem.Content>
                </>
            }
            isExpanded={expandedTime}
            onPress={() => setExpandedTime(!expandedTime)}
            >
            {expandedTime && (
                <ListItem bottomDivider containerStyle={styles.listItem}>
                    <ListItem.Content>
                        <ListItem.Subtitle style={styles.dateStyle}>{event.date.when}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            )}
          </ListItem.Accordion>
          

          {/* ************************ Tickets Info ************************ */}

          <ListItem.Accordion
            containerStyle={styles.accordion}
            content={
                <>
                <MaterialIcons name="newspaper" size={25} style={{padding: 10}}/>
                <ListItem.Content>
                    <ListItem.Title style={{ color: 'black' }}>Tickets Info</ListItem.Title>
                </ListItem.Content>
                </>
            }
            isExpanded={expandedTicketsInfo}
            onPress={() => setExpandedTicketsInfo(!expandedTicketsInfo)}
            >
            {expandedTicketsInfo && (
                <ListItem bottomDivider containerStyle={styles.listItem}>
                    <ListItem.Content>
                        <ListItem.Subtitle>
                            {event.ticket_info.map((ticket, index) => (
                              <View key={index} style={{paddingBottom: 10}}>
                                <Text style={{paddingBottom: 10}}>{ticket.source}</Text>
                                <TouchableOpacity onPress={() => openURL(ticket.link)}>
                                  <Text style={{color: '#3382EB'}}>{ticket.link}</Text>
                                </TouchableOpacity>
                              </View>
                            ))}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            )}
          </ListItem.Accordion>

          {/* ************************ Location ************************ */}

          <ListItem.Accordion
                containerStyle={styles.accordion}
                content={
                    <>
                    <Ionicons name="location-outline" size={25} style={{padding: 10}}/>
                    <ListItem.Content>
                        <ListItem.Title style={{ color: 'black' }}>Venue Info</ListItem.Title>
                    </ListItem.Content>
                    </>
                }
                isExpanded={expandedLocation}
                onPress={() => setExpandedLocation(!expandedLocation)}
                >
                {expandedLocation && (
                    <ListItem bottomDivider containerStyle={styles.listItem}>
                        <ListItem.Content style={{padding: 10}}>
                            <ListItem.Subtitle style={{paddingBottom: 20}}>{venue.name}</ListItem.Subtitle>
                              <TouchableOpacity onPress={() => openURL(venue.link)}>
                                <Text style={{color: '#3382EB'}}>Click Here For More Information</Text>
                              </TouchableOpacity>
                        </ListItem.Content>
                    </ListItem>
                )}
          </ListItem.Accordion>

        </View>
      </ScrollView>
    </GradientBackground>
  )
}

export default EventDetails

const styles = StyleSheet.create({
    eventCardContainer: {
      // backgroundColor: "gray",
      width: screenWidth * 0.9,
      height: screenHeight * 0.5,
      marginTop: 30,
      marginLeft:20,
      borderRadius: 30,
      overflow: 'hidden',
      ...Platform.select({android: {marginTop: 50}})
    },
    eventimageContainer: {
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
    eventNameContainer: {
      // backgroundColor: "lightgray",
      width: "100%",
      height: "15%",
      justifyContent: "center",
      paddingLeft: 20,
    },
    eventName: {
      backgroundColor: "gray",
      width: "80%",
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    eventNameText: {
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
      justifyContent: 'flex-start',
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
    contactInfoTxt:{
      color: 'white',
      fontSize: 14
    },
  
    // About The Event  
    AboutEventContainer: {
      // backgroundColor: "pink",
      width: screenWidth,
      height: screenHeight * 0.3,
      marginTop: 10,
      // justifyContent: "center",
    },
    abouteEventHeader: {
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
  
    // Event Details Lists 
    eventDetails:{
      // backgroundColor: "red",
      width: screenWidth * 0.9,
      minHeight: screenHeight * 0.4,
      alignSelf: 'center',
      marginTop: 10,
    },
    listItem:{
      backgroundColor: '#E5E5E5'
    },
  
    // Date
    dateStyle:{
      margin: 10
    },
    
})