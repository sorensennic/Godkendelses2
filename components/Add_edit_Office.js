import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
//import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

import { getDatabase, ref, child, push, update  } from "firebase/database";


function Add_edit_Office({navigation,route}){

    const db = getDatabase();

    const initialState = {
        kontor: '',
        by: '',
        addresse: '',
        periode: '',
        info: '',
        pris: ''
    }

    const [newOffice,setNewOffice] = useState(initialState);

    /*Returnere true, hvis vi er på edit office*/
    const isEditOffice = route.name === "Edit Office";

    useEffect(() => {
        if(isEditOffice){
            const office = route.params.office[1];
            setNewOffice(office)
        }
        /*Fjern data, når vi går væk fra screenen*/
        return () => {
            setNewOffice(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewOffice({...newOffice, [name]: event});
    }

    const handleSave = async () => {

        const { kontor, by, addresse, periode, info, pris } = newOffice;

        if(kontor.length === 0 || by.length === 0 || addresse.length === 0 || periode.length === 0 ){
            return Alert.alert('Et af felterne er tomme!');
        }

        if(isEditOffice){
            const id = route.params.office[0];
            // Define the path to the specific office node you want to update
            const officeRef = ref(db, `Offices/${id}`); //dobbeltjek om stort eller småt

            // Define the fields you want to update
            const updatedFields = {
                kontor,
                by,
                addresse,
                periode,
                info,
                pris,
            };
            
            // Use the 'update' function to update the specified fields
            await update(officeRef, updatedFields)
                .then(() => {
                Alert.alert("Din info er nu opdateret");
                const office = newOffice
                navigation.navigate("Office Details", { office });
                })
                .catch((error) => {
                console.error(`Error: ${error.message}`);
                });

        }else{
        // Define the path to the "office" node where you want to push the new data
        const officesRef = ref(db, "/Offices/");
        
        // Data to push
        const newOfficeData = {
            kontor,
            by,
            addresse,
            periode,
            info,
            pris,
        };
        
        // Push the new data to the "office" node
        await push(officesRef, newOfficeData)
            .then(() => {
            Alert.alert("Saved");
            setNewOffice(initialState);
            })
            .catch((error) => {
            console.error(`Error: ${error.message}`);
            });
    }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newOffice[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                {/*Hvis vi er inde på edit office, vis save changes i stedet for add office*/}
                <Button title={ isEditOffice ? "Save changes" : "Add office"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Add_edit_Office;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
});