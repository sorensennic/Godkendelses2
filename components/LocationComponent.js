// Importerer nødvendige moduler og komponenter fra React Native og Expo
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Accuracy } from 'expo-location';

// Funktionskomponent for at håndtere lokationsfunktionaliteten
function LocationComponent() {
  // Initialiserer statevariabler
  const [hasLocationPermission, setlocationPermission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [userMarkerCoordinates, setUserMarkerCoordinates] = useState([]);
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Funktion til at anmode om lokationstilladelse
  const getLocationPermission = async () => {
    await Location.requestForegroundPermissionsAsync().then((item) => {
      setlocationPermission(item.granted);
    });
  };

  // Effekt-hook til at anmode om lokationstilladelse, når komponenten indlæses
  useEffect(() => {
    getLocationPermission();
  }, []);

  // Funktion til at opdatere brugerens aktuelle lokation
  const updateLocation = async () => {
    await Location.getCurrentPositionAsync({ accuracy: Accuracy.Balanced }).then((item) => {
      setCurrentLocation(item.coords);
    });
  };

  // Funktion til at håndtere markører ved langt tryk
  const handleLongPress = (event) => {
    const coordinate = event.nativeEvent.coordinate;
    setUserMarkerCoordinates((oldArray) => [...oldArray, coordinate]);
  };

  // Funktion til at håndtere valg af en markør og vise adresseoplysninger
  const handleSelectMarker = async (coordinate) => {
    setSelectedCoordinate(coordinate);
    await Location.reverseGeocodeAsync(coordinate).then((data) => {
      setSelectedAddress(data);
    });
  };

  // Funktion til at lukke infovinduet med adresseoplysninger
  const closeInfoBox = () => {
    setSelectedCoordinate(null);
    setSelectedAddress(null);
  };

  // Renderkomponenten
  return (
    <SafeAreaView style={styles.container}>
      {/* Viser brugerens aktuelle lokation og en knap til at opdatere lokation */}
      <RenderCurrentLocation
        hasLocationPermission={hasLocationPermission}
        currentLocation={currentLocation}
      />
      {/* Viser kortet med brugerens lokation og markerer samt valgte markører */}
      <MapView
        provider="google"
        style={styles.map}
        showsUserLocation
        onLongPress={handleLongPress}
      >
        {/* Standard markører */}
        <Marker
          coordinate={{ latitude: 55.67592993, longitude: 12.57271325 }}
          title="Accutics"
          description="Farvergade 17"
        />
        <Marker
          coordinate={{ latitude: 55.67061179, longitude: 12.5817532 }}
          title="Kontolink"
          description="Langebrogade 4"
        />
        {/* Brugerens tilføjede markører */}
        {userMarkerCoordinates.map((coordinate, index) => (
          <Marker
            coordinate={coordinate}
            key={index.toString()}
            onPress={() => handleSelectMarker(coordinate)}
          />
        ))}
      </MapView>
      {/* Infovindue med valgte markørers adresseoplysninger */}
      {selectedCoordinate && selectedAddress && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            {selectedCoordinate.latitude}, {selectedCoordinate.longitude}
          </Text>
          <Text style={styles.infoText}>
            name: {selectedAddress[0].name} region: {selectedAddress[0].region}
          </Text>
          <Button title="close" onPress={closeInfoBox} />
        </View>
      )}
    </SafeAreaView>
  );
}

export default LocationComponent;

// Lokal styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  map: { flex: 1 },
  infoBox: {
    height: 200,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    fontSize: 15,
  },
});
