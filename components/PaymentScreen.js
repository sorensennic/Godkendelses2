import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';


const PaymentScreen = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Credit Card');

  const handlePayment = () => {
    // Handle payment logic here
    // This function will be called when the "Pay Now" button is pressed
    // Implement your payment processing logic based on selectedPaymentMethod
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment Details</Text>
      <Text style={styles.subheading}>Choose payment method:</Text>
      <Picker
        selectedValue={selectedPaymentMethod}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setSelectedPaymentMethod(itemValue)}
      >
        <Picker.Item label="Credit Card" value="Credit Card" />
        <Picker.Item label="Debit Card" value="Debit Card" />
        <Picker.Item label="PayPal" value="PayPal" />
        <Picker.Item label="Mobilepay" value="Mobilepay" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry Date (MM/YY)"
        value={expiryDate}
        onChangeText={setExpiryDate}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        keyboardType="numeric"
        value={cvv}
        onChangeText={setCVV}
      />
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PaymentScreen;