import React from 'react';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const EventCard = ( {event, navigation} ) => {

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('EventDetails', { event: event })}>

      <LinearGradient colors={['#1C5E85', '#5D8FAD']} style={styles.gradient} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}>

        {/* Date container */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{event.date.when}</Text>
        </View>

        {/* Event Title Container */}
        <View style={styles.eventTitleContainer}>
          <Text style={styles.titleText}>{event.title}</Text>
          <View style={styles.titleCircles}>
            <View style={styles.circle}/>
            <View style={styles.circle}/>
            <View style={styles.circle}/>
            <View style={styles.circle}/>
          </View>
        </View>

        {/* Event Location Container */}
        <View style={styles.locationContainer}>
          <View style={styles.locationStyle}>
            <Text style={styles.locationText}>{event.venue ? event.venue.name : 'No Venue Available'}</Text>
            <Entypo name='location' size={15} color={'#3F7EA4'}/>
          </View>
        </View>

      </LinearGradient>
    </TouchableOpacity>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 15,
    width: screenWidth * 0.93,
    height: screenHeight * 0.20,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: "100%",
    height: '20%',
    marginTop: 4,
  },
  dateText: {
    marginTop: 10,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
  eventTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: '50%', 
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleCircles: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 6,
    width: screenWidth * 0.2,
    marginTop: 10,
  },
  circle: {
    width: screenWidth * 0.013,
    height: screenWidth * 0.013,
    borderRadius: screenWidth / 2,
    backgroundColor: '#95A5AE',
  },
  locationContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: "100%",
    height: '20%'
  },
  locationStyle: {
    backgroundColor: '#ADCEE1',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  locationText: {
    color: '#3F7EA4',
    fontSize: 15,
    paddingRight: 15,
  },
});
