import { StyleSheet, Text, View, TextInput, Button, SafeAreaView } from 'react-native'
import React, { useState } from "react";

import {doc, setDoc} from "firebase/firestore";
import { db } from './config'

import {addDoc, getDoc, getDocs, query, where, collection} from "firebase/firestore";

const TestDetails = () => {

    const [name, setName] = useState()
    const [GPA, setGPA] = useState()
    const [userID, setUserID] = useState()

    const mySet = async() => {
        const docRef = doc(db, "users", userID)
        await setDoc(docRef, { name: name, GPA: GPA})
        .then(() => { console.log('data submitted') })
        .catch((error) => { console.log(error.message) })
    }

    const add = async () => {
        const docRef = await addDoc(collection(db, "users"), {
        name: name,
        GPA: GPA
        });
        console.log("Document written with ID: ", docRef.id);
    }
    
    const read = async () => {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
    }

    const readAllWhere = async () => {
        const q = query(collection(db, "users"), where("name", ">=", 'W'));
        const docs = await getDocs(q);
        docs.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        });
    }

    const readAll = async () => {
        const docs = await getDocs(collection(db, "users"));
        docs.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        });
    }

    const deleteUser = async () => {
        const userDoc = doc(db, 'users', userID)
        await deleteDoc(userDoc)
    }
    
    const deleteF = async () => {
        const docRef = doc(db, 'users', userID);
        await updateDoc(docRef, {
        name: deleteField()
        }).then(() => console.log("Deleted"))
        .catch((error) => console.log(error.message))
    }
        
  return (
    <SafeAreaView style={styles.container}>
      <Text>Enter Your Details</Text>
      <TextInput placeholder='ID' onChangeText={(txt)=>setUserID(txt)}/>
      <TextInput placeholder='name' onChangeText={(txt)=>setName(txt)}/>
      <TextInput placeholder='GPA' onChangeText={(txt)=>setGPA(txt)}/>
    
        <Button title='Save' onPress={read}/>
    </SafeAreaView>
  )
}

export default TestDetails

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})