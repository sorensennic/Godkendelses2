import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import {useEffect, useState} from "react";
import { getDatabase, ref, remove } from "firebase/database";

function CarDetails  ({route,navigation})  {
  const [car,setCar] = useState({});

  useEffect(() => {

    setCar(route.params.car[1])

    return() => {
      setCar({})
    }

  })
  
  const handleEdit = () => {
    // Vi navigerer videre til EditCar skærmen og sender bilen videre med
    const car = route.params.car
    navigation.navigate('Edit Car', { car });
};

  // Vi spørger brugeren om han er sikker
  const confirmDelete = () => {
    /*Er det mobile?*/
    if(Platform.OS ==='ios' || Platform.OS ==='android'){
        Alert.alert('Are you sure?', 'Do you want to delete the car?', [
            { text: 'Cancel', style: 'cancel' },
            // Vi bruger this.handleDelete som eventHandler til onPress
            { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
        ]);
    }
};

const handleDelete = async () => {
  const id = route.params.car[0];
  const db = getDatabase();
  //Define the path to the specifi car node you want to remove
  const carRef = ref(db, `Cars/${id}`);

  // Use the "remove" function to delete the car node
  await remove(carRef)
    .then(() => {
      navigation.goBack();
    })
    .catch((error) => {
      Alert.alert(error.messge)
    })
}
  
if (!car) {
  return <Text>No data</Text>
}

return (
  <View style={styles.container}>
      <Button title="Edit" onPress={ () => handleEdit()} />
      <Button title="Delete" onPress={() => confirmDelete()} />
      {
          Object.entries(car).map((item,index)=>{
              return(
                  <View style={styles.row} key={index}>
                      {/*Vores car keys navn*/}
                      <Text style={styles.label}>{item[0]} </Text>
                      {/*Vores car values navne */}
                      <Text style={styles.value}>{item[1]}</Text>
                  </View>
              )
          })
      }
  </View>
);
}

export default CarDetails

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