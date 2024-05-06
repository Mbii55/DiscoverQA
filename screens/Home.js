import {StyleSheet, Dimensions, Image, Text, View, TouchableOpacity, Platform, TextInput, ScrollView, ActivityIndicator} from "react-native";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { AntDesign, MaterialIcons } from "react-native-vector-icons";
import { Avatar, Card } from "@rneui/themed";
import EventCard from "../components/EventCard";
import PlaceCard from "../components/PlaceCard";
import ProfileHeader from "../components/ProfileHeader";
import GradientBackground from "../components/GradientBackground";
import { auth } from "../config";
import { doc, setDoc, getDoc, } from "firebase/firestore";
import { db } from '../config'
import { useFocusEffect } from '@react-navigation/native'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Home = ({ route, navigation }) => {
  
  const [events, setEvents] = useState([])
  const [popularPlaces, setPopularPlaces] = useState([])
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  
  // Listing Current Events
  useEffect(() => {
    const fetchEvents = async () => {
      const options = {
        method: 'GET',
        url: 'https://serpapi.com/search.json',
        params: {
          engine: "google_events",
          q: "Events in Qatar",
          hl: "en",
          api_key: "ef041e543549127e285037378b05a385f432d1506847a9cdc08288967dce8176"
        },
        headers: {
          'Content-Type': 'application/json'
        },
      }
      try {
        const response = await axios.request(options)
        // console.log(response.data)
        setEvents(response.data)
      } catch (error) {
        console.log(error)
        setEvents([])
      }
    }
    fetchEvents()
  }, [])

  // Search Places 
  const searchPlaces = async () => {
  setIsLoading(true)
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://local-business-data.p.rapidapi.com/search',
      params: { query: `${query} in QATAR`, limit: '20', lat: '25.3548', zoom: '13', language: 'en', region: 'QA' },
      headers: {
        // Another API key, incase you got a status error with 429 code: 3509c1a838msh4ab7d062384eb84p114ed4jsn50c2655a30fc
        'X-RapidAPI-Key': 'b5b40441e3mshc94e182b936405ep19e10cjsnb404ee6d5858',
        'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com',
      },
    })
    setSearchResults(response.data.data)
    // console.log(response.data.data)
    setIsLoading(false)
  } catch (error) {
    console.log(error)
    setIsLoading(false)
  }
}

// Listing Popular Places
useEffect(() => {
  const fetchPopularPlaces = async () => {
    const options = {
      method: 'GET',
      url: 'https://local-business-data.p.rapidapi.com/search',
      params: {
        query: 'Popular Places in Qatar',
        limit: '20',
        lat: '25.3548',
        lng: '51.1839',
        zoom: '13',
        language: 'en',
        region: 'QA'
      },
      headers: {
        // Another API key, incase you got a status error with 429 code: 3509c1a838msh4ab7d062384eb84p114ed4jsn50c2655a30fc
        'X-RapidAPI-Key': 'b5b40441e3mshc94e182b936405ep19e10cjsnb404ee6d5858',
        'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com',
      }
    }
    try {
      const response = await axios.request(options)
      setPopularPlaces(response.data)
      // console.log(response.data)
    } catch (error) {
      console.error(error)
      setPopularPlaces([])
    }
  }
  fetchPopularPlaces()
}, [])

  const [fname, setFname] = useState()
  const [lname, setLname] = useState()
  const [email, setEmail] = useState()
  const [favourites, setFavourites] = useState([])
  const [fileName, setFileName] = useState()

  const [flag, setFlag] = useState(true)

  const read = async () => {
    const docRef = doc(db, "users", auth.currentUser.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
    setFname(docSnap.data().firstName)
    setLname(docSnap.data().lastName)
    setEmail(docSnap.data().email)
    setFavourites(docSnap.data().favourites)
    setFileName(docSnap.data().picture)
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      read()
  },[flag])
)
  
  const addFavList = async (p) => {
    let temp = [...favourites]

    let present = temp.filter(place => place.name == p.name)

    if(!present.length) {
      temp.push(p)
    }

    else {
      temp = temp.filter(place => place.name != p.name)
    }
    addFavDB(temp)
  }


  const addFavDB = async(pList) => {
    const docRef = doc(db, "users", email)
    await setDoc(docRef, { firstName: fname, lastName: lname, email: email, favourites: pList, picture: fileName })
    setFlag(!flag)
  }

  return (
    <GradientBackground style={styles.container}>
      {/* Profile and settigns header  */}
      <ProfileHeader />

      {/* Header container */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTxt}>Where you want to {"\n"}go?</Text>
      </View>

      {/* Search box container */}
      <View style={styles.searchContainer}>
        <View style={styles.inputIconContainer}>
          <TouchableOpacity onPress={searchPlaces}>
          <AntDesign
            name="search1"
            size={19}
            color={"#BABABA"}
            style={styles.searchIcon}
            />
          </TouchableOpacity>
          <TextInput placeholder="Search a place ..." style={styles.searchBox} value={query} onChangeText={setQuery}/>
        </View>
      </View>

        {/* Search Button */}
        <View style={styles.searchButtonContainer}>
          <TouchableOpacity style={styles.SearchButton} onPress={searchPlaces}>
              <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>

      {isLoading ? 
        <View>
          <ActivityIndicator size="large" color={'white'}/>
        </View>
       : 
        searchResults.length > 0 && (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {searchResults.map((place, index) => (
              <PlaceCard key={index} place={place} navigation={navigation} />
            ))}
          </ScrollView>
        )
      }

      {/* Events card */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderTxt}>Current Events</Text>
      </View>

      <View style={styles.eventCardContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {events.events_results?.map((event, index) => (
              <EventCard key={index} event={event} navigation={navigation} />
            ))}
          {/* <EventCard/> */}
        </ScrollView>
      </View>

      {/* Popular Destinations */}
      <View style={styles.suggestionsHeader}>
        <Text style={styles.cardHeaderTxt}>Popular Destinations</Text>
        {/* <TouchableOpacity> */}
          {/* <Text style={styles.viewAllTxt}>View All</Text> */}
        {/* </TouchableOpacity> */}
      </View>

      <View style={styles.DestenationsContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {popularPlaces.data?.map((place, index) => {
              let temp = [...favourites]

              let present = temp.filter(p => p.name == place.name)
              let icon = "favorite-border"
              let iconColor = "#5A5A5A"
          
              if(!present.length) {
                icon = "favorite-border"
              }

              else {
                icon = "favorite"
                iconColor = "#E00000"
              }
              
              return(
              <PlaceCard key={index} place={place} navigation={navigation} addFav={() => addFavList(place)} icon={icon} iconColor={iconColor} />
            )})}

        </ScrollView>
      </View>
    </GradientBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    // backgroundColor: 'yellow',
    // justifyContent: 'center',
    alignItems: "center",
  },

  // Header Container
  headerContainer: {
    // backgroundColor: 'gray',
    marginTop: 10,
    width: screenWidth,
    height: screenHeight * 0.12,
    justifyContent: "center",
  },
  headerTxt: {
    fontSize: 37,
    fontWeight: "bold",
    color: "white",
    marginLeft: 25,
  },

  // Search container
  searchContainer: {
    // backgroundColor: 'pink',
    width: screenWidth,
    height: screenHeight * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    width: screenWidth * 0.83,
    borderRadius: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchBox: {
    // backgroundColor: 'white',
    width: screenWidth * 0.78,
    height: screenHeight * 0.056,
    borderRadius: 10,
    paddingLeft: 10,
  },
  searchButtonContainer:{
    // backgroundColor: 'tomato',
    width: screenWidth,
    height: screenHeight * 0.07,
    alignItems: 'center',
  },
  SearchButton:{
    backgroundColor: '#2F7694',
    width: '35%',
    height: '60%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchText:{
    color: 'white',
    fontSize: 16,
    paddingBottom: 3
  },

  // Card header container
  cardHeader: {
    // backgroundColor: 'red',
    width: screenWidth,
    height: screenHeight * 0.06,
    justifyContent: "center",
  },
  cardHeaderTxt: {
    fontSize: 23,
    fontWeight: "bold",
    color: "white",
    marginLeft: 25,
  },

  // Events Card container
  eventCardContainer: {
    // backgroundColor: 'pink',
    flexDirection: "row",
    height: screenHeight * 0.24,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },

  // Popular Destinations header
  suggestionsHeader: {
    width: screenWidth,
    height: screenHeight * 0.06,
    // backgroundColor: 'red',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },
  viewAllTxt: {
    fontSize: 15,
    color: "white",
    marginRight: 25,
    textDecorationLine: "underline",
  },
  DestenationsContainer: {
    // backgroundColor: 'gray',
    width: screenWidth,
    height: screenHeight * 0.4,
    // flexDirection: "row",
  },
});
