import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useEffect, useState} from "react";
import { getDatabase, ref, onValue } from "firebase/database";

function OfficeList({navigation}){

    const [offices,setOffices] = useState()

    /*
    useEffect(() => {
        if(!cars) {
            firebase
                .database()
                .ref('/Cars')
                .on('value', snapshot => {
                    setCars(snapshot.val())
                });
        }
    },[]);*/
    useEffect(() => {
        const db = getDatabase();
        const officesRef = ref(db, "Offices");
    
        // Use the 'onValue' function to listen for changes in the 'offices' node
        onValue(officesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // If data exists, set it in the 'offices' state
                setOffices(data);
            }
        });
    
        // Clean up the listener when the component unmounts
        return () => {
            // Unsubscribe the listener
            off(officesRef);
        };
    }, []); // The empty dependency array means this effect runs only once

    // Vi viser ingenting hvis der ikke er data
    if (!offices) {
        return <Text>Loading...</Text>;
    }

    const handleSelectOffice = id => {
        /*Her søger vi direkte i vores array af biler og finder bil objektet som matcher idet vi har tilsendt*/
        const office = Object.entries(offices).find( office => office[0] === id /*id*/)
        navigation.navigate('Office Details', { office });
    };
    
    // Flatlist forventer et array. Derfor tager vi alle values fra vores cars objekt, og bruger som array til listen
    const officeArray = Object.values(offices);
    const officeKeys = Object.keys(offices);

    return (
        <FlatList
            data={officeArray}
            // Vi bruger ofifceKeys til at finde ID på den aktuelle office og returnerer dette som key, og giver det med som ID til OfficeListItem
            keyExtractor={(item, index) => officeKeys[index]}
            renderItem={({ item, index }) => {
               
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectOffice(officeKeys[index])}>
                        
                        <Text>
                            Kontor: {item.kontor}  
                        </Text>
                        <Text>By: {item.by}</Text>
                        <Text>Addresse: {item.addresse}</Text>
                        <Text style={styles.itemText}>Tryk for mere info</Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
}

export default OfficeList;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 100,
        justifyContent:'center',
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Align items in a row with space between them
      marginBottom: 10,
      // Add other styles for your item container if needed
    },
    itemText: {
        textAlign: 'right'
      // Add styles for your item text
    },
    viewMoreText: {
      color: 'blue', // Customize the color of "View more" text
      // Add other styles for your "View more" text if needed
    },
  });
  