import React from 'react';
import { Platform,StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient colors={['#4093CE', '#5ba4d8']} style={styles.gradient}>
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {children}
        </ScrollView>
      </SafeAreaView>
    
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    // flex: 1,
    // height: screenHeight,
    backgroundColor: 'yellow',
    ...Platform.select({android: {marginTop: 50}})
  },
  safeArea: {
    // flex: 1,
    // backgroundColor: 'yellow'
  },
});

export default GradientBackground;
