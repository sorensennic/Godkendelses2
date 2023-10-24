import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import {useEffect, useState} from "react";
import { getDatabase, ref, remove } from "firebase/database";
import { useNavigation } from '@react-navigation/native';


function OfficeDetails  ({route,navigation})  {
  const [office,setOffice] = useState({});

  useEffect(() => {

    setOffice(route.params.office[1])

    return() => {
      setOffice({})
    }

  })

  const handlePay = () => {
    // Handle logic related to payment here

    // Navigate to PaymentScreen when "Pay" button is pressed
    navigation.navigate('PaymentScreen');
  };

  
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
    <TouchableOpacity style={styles.button} onPress={handleEdit}>
      <Text style={styles.buttonText}>Edit</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={confirmDelete}>
      <Text style={styles.buttonText}>Delete</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={handlePay}>
      <Text style={styles.buttonText}>Pay</Text>
    </TouchableOpacity>
    {Object.entries(office).map((item, index) => {
      return (
        <View style={styles.row} key={index}>
          <Text style={styles.label}>{item[0]}</Text>
          <Text style={styles.value}>{item[1]}</Text>
        </View>
      );
    })}
  </View>
);
}

export default OfficeDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',

  }
});