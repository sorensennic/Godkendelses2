// Importerer nødvendige moduler og komponenter fra React Native og Firebase Realtime Database
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import { getDatabase, ref, push, update } from "firebase/database";

// Komponent til tilføjelse og redigering af kontoroplysninger
function Add_edit_Office({ navigation, route }) {
    // Opretter en forbindelse til Firebase Realtime Database
    const db = getDatabase();

    // Initialiserer tilstand for kontoroplysninger
    const initialState = {
        kontor: '',
        by: '',
        addresse: '',
        periode: '',
        info: '',
        pris: ''
    };

    // Bruger useState-hook til at håndtere tilstand for kontoroplysninger
    const [newOffice, setNewOffice] = useState(initialState);

    // Tjekker om komponenten bruges til redigering af kontoroplysninger
    const isEditOffice = route.name === "Edit Office";

    // Effekt-hook til at håndtere redigeringstilstand
    useEffect(() => {
        if (isEditOffice) {
            const office = route.params.office[1];
            setNewOffice(office);
        }
        // Rydder tilstanden, når komponenten unmounts
        return () => {
            setNewOffice(initialState);
        };
    }, []);

    // Funktion til at opdatere tilstand ved tekstinput-ændringer
    const changeTextInput = (name, event) => {
        setNewOffice({ ...newOffice, [name]: event });
    };

    // Funktion til at håndtere gemme-aktionen
    const handleSave = async () => {
        const { kontor, by, addresse, periode, info, pris } = newOffice;

        // Validerer om påkrævede felter er udfyldt
        if (kontor.length === 0 || by.length === 0 || addresse.length === 0 || periode.length === 0) {
            return Alert.alert('Et af felterne er tomme!');
        }

        if (isEditOffice) {
            // Håndterer redigering af kontoroplysninger
            const id = route.params.office[0];
            const officeRef = ref(db, `Offices/${id}`);

            const updatedFields = {
                kontor,
                by,
                addresse,
                periode,
                info,
                pris,
            };

            await update(officeRef, updatedFields)
                .then(() => {
                    Alert.alert("Din info er nu opdateret");
                    const office = newOffice;
                    navigation.navigate("Office Details", { office });
                })
                .catch((error) => {
                    console.error(`Fejl: ${error.message}`);
                });

        } else {
            // Håndterer tilføjelse af nye kontoroplysninger
            const officesRef = ref(db, "/Offices/");

            const newOfficeData = {
                kontor,
                by,
                addresse,
                periode,
                info,
                pris,
            };

            await push(officesRef, newOfficeData)
                .then(() => {
                    Alert.alert("Gemt");
                    setNewOffice(initialState);
                })
                .catch((error) => {
                    console.error(`Fejl: ${error.message}`);
                });
        }
    };

    // Renderer komponenten med tekstinputfelter og gemmeknap
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Tekstinputfelter */}
                {Object.keys(initialState).map((key, index) => {
                    return (
                        <View style={styles.row} key={index}>
                            <Text style={styles.label}>{key}</Text>
                            <TextInput
                                value={newOffice[key]}
                                onChangeText={(event) => changeTextInput(key, event)}
                                style={styles.input}
                            />
                        </View>
                    );
                })}

                {/* Stylet knap til at gemme ændringer eller tilføje kontoroplysninger */}
                <TouchableOpacity style={styles.button} onPress={() => handleSave()}>
                    <Text style={styles.buttonText}>
                        {isEditOffice ? 'Gem ændringer' : 'Tilføj kontor'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

// Eksporterer komponenten som standard eksport fra denne fil
export default Add_edit_Office;

// Stildefinitioner for komponenten
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
        padding: 5,
        flex: 1
    },
    button: {
        backgroundColor: 'blue',
        padding: 12,
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
