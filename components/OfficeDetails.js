import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import {useEffect, useState} from "react";
import { getDatabase, ref, remove } from "firebase/database";

function OfficeDetails  ({route,navigation})  {
  const [office,setOffice] = useState({});

  useEffect(() => {

    setOffice(route.params.office[1])

    return() => {
      setOffice({})
    }

  })
  
  const handleEdit = () => {
    // Vi navigerer videre til EditOffice skærmen og sender bilen videre med
    const office = route.params.office
    navigation.navigate('Edit Office', { office });
};

  // Vi spørger brugeren om han er sikker
  const confirmDelete = () => {
    /*Er det mobile?*/
    if(Platform.OS ==='ios' || Platform.OS ==='android'){
        Alert.alert('Are you sure?', 'Do you want to delete the office?', [
            { text: 'Cancel', style: 'cancel' },
            // Vi bruger this.handleDelete som eventHandler til onPress
            { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
        ]);
    }
};

const handleDelete = async () => {
  const id = route.params.office[0];
  const db = getDatabase();
  //Define the path to the specifi office node you want to remove
  const officeRef = ref(db, `Offices/${id}`);  //Dobbelttjek om flertal eller ental

  // Use the "remove" function to delete the office node
  await remove(officeRef)
    .then(() => {
      navigation.goBack();
    })
    .catch((error) => {
      Alert.alert(error.messge)
    })
}
  
if (!office) {
  return <Text>No data</Text>
}

return (
  <View style={styles.container}>
      <Button title="Edit" onPress={ () => handleEdit()} />
      <Button title="Delete" onPress={() => confirmDelete()} />
      {
          Object.entries(office).map((item,index)=>{
              return(
                  <View style={styles.row} key={index}>
                      {/*Vores office keys navn*/}
                      <Text style={styles.label}>{item[0]} </Text>
                      {/*Vores office values navne */}
                      <Text style={styles.value}>{item[1]}</Text>
                  </View>
              )
          })
      }
  </View>
);
}

export default OfficeDetails

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start' },
  row: {
      margin: 5,
      padding: 5,
      flexDirection: 'row',
  },
  label: { width: 100, fontWeight: 'bold' },
  value: { flex: 1 },
});